/**
 * Prebuild orchestrator.
 *
 * Dependency graph:
 *   sync-catalog  (must run first — generates lib/catalog.generated.ts)
 *       |
 *       +---> generate-sitemap (reads catalog routes)
 *
 * Image optimization is handled by Vercel's Image Optimization API.
 * No pre-generation needed.
 */

import { execSync } from "node:child_process";

function runSync(label: string, cmd: string, args: string[]) {
  const t0 = Date.now();
  console.log(`[prebuild] start: ${label}`);
  execSync([cmd, ...args].join(" "), { stdio: "inherit" });
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[prebuild] done:  ${label} (${elapsed}s)`);
}

async function main() {
  const t0 = Date.now();

  // Sync catalog data (generates lib/catalog.generated.ts)
  runSync("sync-catalog", "tsx", ["scripts/sync-catalog.ts"]);

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[prebuild] all done in ${elapsed}s`);
}

main().catch((err) => {
  console.error("[prebuild] failed", err);
  process.exit(1);
});
