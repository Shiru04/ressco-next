/**
 * Parallel prebuild orchestrator.
 *
 * Dependency graph:
 *   sync-catalog  (must run first — generates lib/catalog.generated.ts)
 *       |
 *       +---> optimize-images  (reads catalog placeholders)
 *       +---> generate-sitemap (reads catalog routes)
 *       |
 *   verify-assets  (must run after optimize-images)
 *
 * By running optimize-images and generate-sitemap in parallel we save
 * the full duration of whichever is shorter (sitemap is ~1-2s).
 */

import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function runSync(label: string, cmd: string, args: string[]) {
  const t0 = Date.now();
  console.log(`[prebuild] start: ${label}`);
  execSync([cmd, ...args].join(" "), { stdio: "inherit" });
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[prebuild] done:  ${label} (${elapsed}s)`);
}

function runAsync(label: string, cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const t0 = Date.now();
    console.log(`[prebuild] start: ${label}`);

    const child = spawn(cmd, args, {
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => {
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      if (code === 0) {
        console.log(`[prebuild] done:  ${label} (${elapsed}s)`);
        resolve();
      } else {
        reject(new Error(`[prebuild] ${label} exited with code ${code}`));
      }
    });

    child.on("error", (err) => {
      reject(new Error(`[prebuild] ${label} spawn error: ${err.message}`));
    });
  });
}

async function main() {
  const t0 = Date.now();

  // Phase 1: sync catalog (sequential prerequisite)
  runSync("sync-catalog", "tsx", ["scripts/sync-catalog.ts"]);

  // Phase 1.5: purge cached image variants so optimize-images regenerates
  // from the committed base files (avoids stale variants from build cache)
  const catDir = path.join(process.cwd(), "public", "products", "categories");
  if (fs.existsSync(catDir)) {
    const stale = fs.readdirSync(catDir).filter((f) => /-w\d+\./.test(f));
    for (const f of stale) fs.unlinkSync(path.join(catDir, f));
    if (stale.length > 0) {
      console.log(`[prebuild] purged ${stale.length} cached category variants`);
    }
  }

  // Phase 2: optimize-images + generate-sitemap in parallel
  const results = await Promise.allSettled([
    runAsync("optimize-images", "tsx", ["scripts/optimize-images.ts"]),
    runAsync("generate-sitemap", "tsx", ["scripts/generate-sitemap.ts"]),
  ]);

  // Check for failures
  const failures = results.filter(
    (r): r is PromiseRejectedResult => r.status === "rejected",
  );
  if (failures.length > 0) {
    for (const f of failures) {
      console.error("[prebuild] FAILED:", f.reason);
    }
    process.exit(1);
  }

  // Phase 3: verify assets (depends on optimize-images)
  runSync("verify-assets", "tsx", ["scripts/verify-assets.ts"]);

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[prebuild] all done in ${elapsed}s`);
}

main().catch((err) => {
  console.error("[prebuild] failed", err);
  process.exit(1);
});
