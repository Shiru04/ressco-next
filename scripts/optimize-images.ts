// ── Expand libuv thread pool BEFORE any imports that use it ──────────
import os from "node:os";
const CPUS = os.cpus().length;
const MAX_CONCURRENCY = Math.max(1, Math.min(CPUS, 6));
process.env.UV_THREADPOOL_SIZE = String(Math.max(4, MAX_CONCURRENCY));

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// ── CLI flags ────────────────────────────────────────────────────────
const SKIP_AVIF = process.argv.includes("--skip-avif");

type ManifestJob = {
  inputFromPublic: string; // canonical path, usually .webp
  widths?: number[];
  variants?: string[];
};

const PUBLIC_DIR = path.join(process.cwd(), "public");

const DEFAULT_WIDTHS = [320, 480, 640, 960, 1200, 1600];

const INPUT_EXTS = [".webp", ".jpg", ".jpeg", ".png"];

// Threshold (px) below which an image is considered a "thumbnail" and
// gets lower AVIF effort for faster encoding.
const AVIF_LARGE_THRESHOLD = 800;

// ── Concurrency control ─────────────────────────────────────────────
async function runParallel<T>(
  items: T[],
  fn: (item: T) => Promise<void>,
  concurrency: number,
): Promise<void> {
  let idx = 0;
  const errors: Error[] = [];

  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      try {
        await fn(items[i]);
      } catch (err) {
        errors.push(err instanceof Error ? err : new Error(String(err)));
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);

  if (errors.length > 0) {
    throw new AggregateError(errors, `${errors.length} image job(s) failed`);
  }
}

// ── Helpers ──────────────────────────────────────────────────────────

function exists(p: string) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function withoutExt(p: string) {
  return p.replace(/\.[a-z0-9]+$/i, "");
}

/**
 * Given a canonical manifest input (e.g. hero/home-hero.webp),
 * find an existing file in public with any supported extension.
 */
function resolveInputAbs(canonicalFromPublic: string) {
  const canonicalAbs = path.join(PUBLIC_DIR, canonicalFromPublic);
  if (exists(canonicalAbs)) return canonicalAbs;

  const base = withoutExt(canonicalFromPublic);
  for (const ext of INPUT_EXTS) {
    const candidateAbs = path.join(PUBLIC_DIR, `${base}${ext}`);
    if (exists(candidateAbs)) return candidateAbs;
  }

  return null;
}

/**
 * Ensure canonical .webp exists at public/<base>.webp even if input is jpg/png.
 */
async function ensureCanonicalWebp(
  inputAbs: string,
  canonicalFromPublic: string,
) {
  const canonicalAbs = path.join(PUBLIC_DIR, canonicalFromPublic);
  if (exists(canonicalAbs)) return canonicalAbs;

  await fs.promises.mkdir(path.dirname(canonicalAbs), { recursive: true });
  await sharp(inputAbs)
    .rotate()
    .webp({ quality: 82, effort: 4 })
    .toFile(canonicalAbs);

  return canonicalAbs;
}

// ── Variant types ────────────────────────────────────────────────────

type VariantTask = {
  outAbs: string;
  width: number;
  format: "webp" | "avif";
};

/**
 * Check if a variant is already up-to-date (exists and newer than source).
 */
function isUpToDate(srcAbs: string, outAbs: string): boolean {
  if (!exists(outAbs)) return false;
  const srcStat = fs.statSync(srcAbs);
  const outStat = fs.statSync(outAbs);
  return outStat.mtimeMs >= srcStat.mtimeMs && outStat.size > 0;
}

/**
 * Process a single job: decode source ONCE, clone for each variant.
 * Returns arrays of WebP and AVIF tasks that were NOT skipped (i.e. actually encoded).
 */
async function runJob(job: ManifestJob): Promise<{ webpCount: number; avifCount: number; variants: string[] }> {
  const canonicalFromPublic = job.inputFromPublic;
  const inputAbs = resolveInputAbs(canonicalFromPublic);

  if (!inputAbs) {
    const base = withoutExt(canonicalFromPublic);
    throw new Error(
      `[optimize-images] Missing required input: ${canonicalFromPublic}\n` +
        `Tried: ${INPUT_EXTS.map((e) => `${base}${e}`).join(", ")}`,
    );
  }

  // Generate canonical .webp if needed (from jpg/png/etc)
  const canonicalWebpAbs = await ensureCanonicalWebp(inputAbs, canonicalFromPublic);

  // Decode source image ONCE — reuse via clone() for every variant
  const sourceSharp = sharp(canonicalWebpAbs).rotate();
  const meta = await sourceSharp.metadata();

  if (!meta.width || meta.width < 50) {
    throw new Error(
      `[optimize-images] Invalid canonical image: ${canonicalFromPublic}`,
    );
  }

  const sourceWidth = meta.width;
  const requestedWidths = job.widths?.length ? job.widths : DEFAULT_WIDTHS;
  const baseNoExt = withoutExt(canonicalFromPublic);

  // ── Width selection ────────────────────────────────────────────
  // Generate a file for every requested width (clamped to source width).
  // Even if two widths produce the same effective size we still emit
  // both files so that <picture> srcset never 404s.
  const effectiveWidths = [...requestedWidths];

  // Build variant task list
  const webpTasks: (VariantTask & { effectiveWidth: number })[] = [];
  const avifTasks: (VariantTask & { effectiveWidth: number })[] = [];

  for (const w of effectiveWidths) {
    const ew = Math.min(w, sourceWidth);

    webpTasks.push({
      outAbs: path.join(PUBLIC_DIR, `${baseNoExt}-w${w}.webp`),
      width: w,
      effectiveWidth: ew,
      format: "webp",
    });

    if (!SKIP_AVIF) {
      avifTasks.push({
        outAbs: path.join(PUBLIC_DIR, `${baseNoExt}-w${w}.avif`),
        width: w,
        effectiveWidth: ew,
        format: "avif",
      });
    }
  }

  let webpEncoded = 0;
  let avifEncoded = 0;

  // ── WebP variants (fast) ───────────────────────────────────────
  await Promise.all(
    webpTasks.map(async (t) => {
      if (isUpToDate(canonicalWebpAbs, t.outAbs)) return;
      await fs.promises.mkdir(path.dirname(t.outAbs), { recursive: true });
      await sourceSharp
        .clone()
        .resize({ width: t.effectiveWidth })
        .webp({ quality: 80, effort: 4 })
        .toFile(t.outAbs);
      webpEncoded++;
    }),
  );

  // ── AVIF variants (slow) ──────────────────────────────────────
  await Promise.all(
    avifTasks.map(async (t) => {
      if (isUpToDate(canonicalWebpAbs, t.outAbs)) return;
      await fs.promises.mkdir(path.dirname(t.outAbs), { recursive: true });
      // Use lower effort for small images (thumbnails / product cards)
      const effort = t.effectiveWidth <= AVIF_LARGE_THRESHOLD ? 2 : 3;
      await sourceSharp
        .clone()
        .resize({ width: t.effectiveWidth })
        .avif({ quality: 60, effort })
        .toFile(t.outAbs);
      avifEncoded++;
    }),
  );

  const skipNote =
    webpEncoded === 0 && avifEncoded === 0
      ? " (all cached)"
      : ` (encoded: ${webpEncoded} webp, ${avifEncoded} avif)`;

  console.log(
    `  OK ${canonicalFromPublic}${skipNote}`,
  );

  // Collect variant paths (relative to public/) for the manifest
  const variants = [
    ...webpTasks.map((t) => path.relative(PUBLIC_DIR, t.outAbs).replace(/\\/g, "/")),
    ...avifTasks.map((t) => path.relative(PUBLIC_DIR, t.outAbs).replace(/\\/g, "/")),
  ];

  return { webpCount: webpEncoded, avifCount: avifEncoded, variants };
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  const t0 = Date.now();
  console.log(`[optimize-images] public dir: ${PUBLIC_DIR}`);
  console.log(`[optimize-images] concurrency: ${MAX_CONCURRENCY} workers (UV_THREADPOOL_SIZE=${process.env.UV_THREADPOOL_SIZE})`);
  if (SKIP_AVIF) {
    console.log("[optimize-images] --skip-avif: skipping AVIF generation (dev mode)");
  }

  const manifestAbs = path.join(PUBLIC_DIR, "image-manifest.json");
  if (!exists(manifestAbs)) {
    throw new Error(
      "[optimize-images] image-manifest.json not found in public/",
    );
  }

  const jobs: ManifestJob[] = JSON.parse(
    await fs.promises.readFile(manifestAbs, "utf8"),
  );

  // Accumulate per-format stats
  let totalWebp = 0;
  let totalAvif = 0;

  // Map job index → result so we can write variants back to the manifest
  const jobResults = new Map<number, { webpCount: number; avifCount: number; variants: string[] }>();

  console.log(`\n[optimize-images] processing ${jobs.length} jobs...`);

  await runParallel(
    jobs,
    async (job) => {
      const idx = jobs.indexOf(job);
      const result = await runJob(job);
      jobResults.set(idx, result);
    },
    MAX_CONCURRENCY,
  );

  for (const [idx, r] of jobResults) {
    totalWebp += r.webpCount;
    totalAvif += r.avifCount;
    // Write variants back into the manifest entry
    (jobs[idx] as ManifestJob & { variants: string[] }).variants = r.variants;
  }

  // Persist updated manifest with variants
  await fs.promises.writeFile(
    manifestAbs,
    JSON.stringify(jobs, null, 2) + "\n",
  );

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(
    `\n[optimize-images] done in ${elapsed}s` +
      ` | ${jobs.length} jobs` +
      ` | encoded: ${totalWebp} webp, ${totalAvif} avif` +
      (SKIP_AVIF ? " (avif skipped)" : ""),
  );
}

main().catch((err) => {
  console.error("[optimize-images] failed", err);
  process.exit(1);
});
