import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { PUBLIC_DIR, getJobs } from "./image-jobs";

type Ext = "webp" | "avif";

function outPath(inputFromPublic: string, width: number, ext: Ext) {
  const dir = path.dirname(inputFromPublic);
  const base = path.basename(inputFromPublic, path.extname(inputFromPublic));
  return path.join(PUBLIC_DIR, dir, `${base}-w${width}.${ext}`);
}

async function runJob(
  inputFromPublic: string,
  widths: number[],
  webpQuality?: number,
  avifQuality?: number,
) {
  const inputAbs = path.join(PUBLIC_DIR, inputFromPublic);

  if (!fs.existsSync(inputAbs)) {
    // STRICT: fail
    throw new Error(
      `[optimize-images] Missing required input: ${inputFromPublic}`,
    );
  }

  const baseImg = sharp(inputAbs, { failOn: "none" });

  for (const w of widths) {
    // WEBP
    {
      const outAbs = outPath(inputFromPublic, w, "webp");
      await fs.promises.mkdir(path.dirname(outAbs), { recursive: true });
      if (!fs.existsSync(outAbs)) {
        await baseImg
          .clone()
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: webpQuality ?? 72, effort: 5, smartSubsample: true })
          .toFile(outAbs);
      }
    }

    // AVIF
    {
      const outAbs = outPath(inputFromPublic, w, "avif");
      await fs.promises.mkdir(path.dirname(outAbs), { recursive: true });
      if (!fs.existsSync(outAbs)) {
        await baseImg
          .clone()
          .resize({ width: w, withoutEnlargement: true })
          .avif({ quality: avifQuality ?? 48, effort: 5 })
          .toFile(outAbs);
      }
    }
  }

  console.log(
    `[optimize-images] OK ${inputFromPublic} -> ${widths.length} widths`,
  );
}

async function main() {
  console.log(`[optimize-images] public dir: ${PUBLIC_DIR}`);

  const jobs = await getJobs();

  // run
  for (const job of jobs) {
    await runJob(
      job.inputFromPublic,
      job.widths,
      job.webpQuality,
      job.avifQuality,
    );
  }

  // manifest for CI
  const manifest = jobs.map((j) => ({
    inputFromPublic: j.inputFromPublic,
    widths: j.widths,
    variants: j.widths.flatMap((w) => [
      j.inputFromPublic.replace(path.extname(j.inputFromPublic), `-w${w}.webp`),
      j.inputFromPublic.replace(path.extname(j.inputFromPublic), `-w${w}.avif`),
    ]),
  }));

  const outPathManifest = path.resolve(
    process.cwd(),
    "public",
    "image-manifest.json",
  );
  fs.writeFileSync(outPathManifest, JSON.stringify(manifest, null, 2), "utf8");

  console.log(`[optimize-images] wrote manifest: ${outPathManifest}`);
  console.log("[optimize-images] done");
}

main().catch((err) => {
  console.error("[optimize-images] failed", err);
  process.exit(1);
});
