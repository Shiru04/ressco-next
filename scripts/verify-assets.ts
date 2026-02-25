import fs from "node:fs";
import path from "node:path";

type ManifestItem = {
  inputFromPublic: string;
  widths: number[];
  variants: string[];
};

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const MANIFEST = path.resolve(PUBLIC_DIR, "image-manifest.json");

function mustExist(relFromPublic: string) {
  const abs = path.join(PUBLIC_DIR, relFromPublic);
  if (!fs.existsSync(abs)) {
    throw new Error(`[verify-assets] Missing: public/${relFromPublic}`);
  }
}

async function main() {
  if (!fs.existsSync(MANIFEST)) {
    throw new Error(
      "[verify-assets] Missing public/image-manifest.json (run optimize-images first)",
    );
  }

  const items = JSON.parse(fs.readFileSync(MANIFEST, "utf8")) as ManifestItem[];

  for (const it of items) {
    mustExist(it.inputFromPublic);
    for (const v of it.variants) mustExist(v);
  }

  console.log(`[verify-assets] OK items=${items.length}`);
}

main().catch((err) => {
  console.error("[verify-assets] failed", err);
  process.exit(1);
});
