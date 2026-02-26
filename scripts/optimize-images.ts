import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

type ManifestJob = {
  inputFromPublic: string; // canonical path, usually .webp
  widths?: number[];
};

const PUBLIC_DIR = path.join(process.cwd(), "public");

// GC-style widths (ajusta si tu repo usa otros)
const DEFAULT_WIDTHS = [320, 480, 640, 960, 1200, 1600];

const INPUT_EXTS = [".webp", ".jpg", ".jpeg", ".png"];

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
 * Priority: webp, jpg, jpeg, png
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

  // Create canonical .webp from whatever the input is.
  await fs.promises.mkdir(path.dirname(canonicalAbs), { recursive: true });
  await sharp(inputAbs)
    .rotate() // respect EXIF orientation
    .webp({ quality: 82, effort: 5 })
    .toFile(canonicalAbs);

  return canonicalAbs;
}

async function writeVariant(
  canonicalWebpAbs: string,
  outAbs: string,
  width: number,
  format: "webp" | "avif",
) {
  await fs.promises.mkdir(path.dirname(outAbs), { recursive: true });

  const pipeline = sharp(canonicalWebpAbs).rotate().resize({ width });

  if (format === "webp") {
    await pipeline.webp({ quality: 80, effort: 5 }).toFile(outAbs);
  } else {
    await pipeline.avif({ quality: 60, effort: 5 }).toFile(outAbs);
  }
}

async function runJob(job: ManifestJob) {
  const canonicalFromPublic = job.inputFromPublic; // e.g. hero/home-hero.webp
  const inputAbs = resolveInputAbs(canonicalFromPublic);

  if (!inputAbs) {
    // STRICT FAIL: missing asset in any supported format
    const base = withoutExt(canonicalFromPublic);
    throw new Error(
      `[optimize-images] Missing required input: ${canonicalFromPublic}\n` +
        `Tried: ${INPUT_EXTS.map((e) => `${base}${e}`).join(", ")}`,
    );
  }

  // Generate canonical .webp if needed (from jpg/png/etc)
  const canonicalWebpAbs = await ensureCanonicalWebp(
    inputAbs,
    canonicalFromPublic,
  );

  const meta = await sharp(canonicalWebpAbs).metadata();
  if (!meta.width || meta.width < 50) {
    throw new Error(
      `[optimize-images] Invalid canonical image: ${canonicalFromPublic}`,
    );
  }

  const widths = job.widths?.length ? job.widths : DEFAULT_WIDTHS;
  const baseNoExt = withoutExt(canonicalFromPublic); // hero/home-hero

  for (const w of widths) {
    if (w >= meta.width) continue;

    const outWebp = path.join(PUBLIC_DIR, `${baseNoExt}-w${w}.webp`);
    const outAvif = path.join(PUBLIC_DIR, `${baseNoExt}-w${w}.avif`);

    await writeVariant(canonicalWebpAbs, outWebp, w, "webp");
    await writeVariant(canonicalWebpAbs, outAvif, w, "avif");
  }

  console.log(
    `[optimize-images] OK ${canonicalFromPublic} (input=${path.relative(PUBLIC_DIR, inputAbs)})`,
  );
}

async function main() {
  console.log(`[optimize-images] public dir: ${PUBLIC_DIR}`);

  const manifestAbs = path.join(PUBLIC_DIR, "image-manifest.json");
  if (!exists(manifestAbs)) {
    throw new Error(
      "[optimize-images] image-manifest.json not found in public/",
    );
  }

  const jobs: ManifestJob[] = JSON.parse(
    await fs.promises.readFile(manifestAbs, "utf8"),
  );

  for (const job of jobs) {
    await runJob(job);
  }

  console.log("[optimize-images] done");
}

main().catch((err) => {
  console.error("[optimize-images] failed", err);
  process.exit(1);
});
