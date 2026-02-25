import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { PUBLIC_DIR, getCatalogPlaceholders } from "./image-jobs";

function ensureDir(p: string) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

async function ensureWebp(absPath: string) {
  if (fs.existsSync(absPath)) return;

  ensureDir(absPath);
  // simple 32x32 placeholder
  const buf = await sharp({
    create: {
      width: 32,
      height: 32,
      channels: 4,
      background: { r: 240, g: 240, b: 240, alpha: 1 },
    },
  })
    .webp({ quality: 60 })
    .toBuffer();

  fs.writeFileSync(absPath, buf);
}

function ensureSvg(absPath: string) {
  if (fs.existsSync(absPath)) return;
  ensureDir(absPath);
  fs.writeFileSync(
    absPath,
    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="64"><rect width="100%" height="100%" fill="#111"/><text x="16" y="42" font-family="Arial" font-size="24" fill="#fff">RESSCO</text></svg>\n`,
    "utf8",
  );
}

function ensurePdf(absPath: string) {
  if (fs.existsSync(absPath)) return;
  ensureDir(absPath);
  // minimal PDF file (valid enough to download)
  const minimalPdf = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 44 >>\nstream\nBT /F1 18 Tf 20 80 Td (Order Form Placeholder) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000010 00000 n \n0000000060 00000 n \n0000000117 00000 n \n0000000213 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n310\n%%EOF\n`;
  fs.writeFileSync(absPath, minimalPdf, "utf8");
}

async function main() {
  const requiredWebps = [
    "hero/home-hero.webp",
    "hero/about-hero.webp",
    "hero/contact-banner.webp",
    "about/about-1.webp",
    "about/about-2.webp",
    "about/about-3.webp",
    "about/mission-hero.webp",
    "brand/footer-metal.webp",
    "brand/ressco-badge.webp",
  ];

  for (const rel of requiredWebps) {
    await ensureWebp(path.join(PUBLIC_DIR, rel));
  }

  ensureSvg(path.join(PUBLIC_DIR, "brand/logo-ressco.svg"));
  ensurePdf(path.join(PUBLIC_DIR, "forms/order-form.pdf"));

  // catalog placeholders (derived)
  const { categoryImages, productImages } = await getCatalogPlaceholders();
  const all = [...categoryImages, ...productImages].map((p) =>
    p.replace(/^\//, ""),
  );
  for (const rel of all) {
    await ensureWebp(path.join(PUBLIC_DIR, rel));
  }

  console.log(
    `[ensure-placeholders] OK (${requiredWebps.length + all.length} webp + svg + pdf)`,
  );
}

main().catch((err) => {
  console.error("[ensure-placeholders] failed", err);
  process.exit(1);
});
