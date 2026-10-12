// Deploy helper. Without GitHub Actions wired up yet, this script
// runs the local build, then either:
//   - uploads the .output/public directory to Cloudflare Pages via wrangler, if
//     CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID + CF_PAGES_PROJECT are set;
//   - prints a one-liner showing the exact wrangler command to run, otherwise.
//
// Pushing to a Git remote is intentionally out of scope for this script;
// once the GitHub connection is set up, prefer the GitHub Actions workflow.

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

function run(cmd: string, opts: Record<string, unknown> = {}) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: "inherit", ...opts });
}

const PUBLIC_DIR = ".output/public";
if (!existsSync(PUBLIC_DIR)) {
  console.error("Run `npm run build` first; .output/public not found.");
  process.exit(1);
}

const token = process.env.CLOUDFLARE_API_TOKEN;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const project = process.env.CF_PAGES_PROJECT;

if (!token || !accountId || !project) {
  console.log("\nNo Cloudflare credentials found. To deploy manually:\n");
  console.log("  npx wrangler pages deploy .output/public --project-name=<your-project>\n");
  console.log("Or set CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, and CF_PAGES_PROJECT and re-run.");
  process.exit(0);
}

run(`npx wrangler pages deploy ${PUBLIC_DIR} --project-name=${project}`);
console.log("Deploy finished.");
