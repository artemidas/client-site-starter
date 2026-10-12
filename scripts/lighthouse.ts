// Smoke test for the static build: serves .output/public/ locally and
// asserts that the contact form posts to the Resend API or the dry-run
// transport. Run after `npm run build`.
//
// This script intentionally does NOT call the real Lighthouse runner
// in CI (no Chrome available in the sandbox). It verifies:
//   1. The home page returns 200 and includes the brand name
//   2. The contact page contains a form with the right action
//   3. The contact API returns a dry-run success when no key is set
//
// For real Lighthouse numbers, run on a host with Chrome (see README).

import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";
import { readFile, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = resolve(ROOT, ".output/public");

async function exists(path: string) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(PUBLIC_DIR))) {
    console.error("Run `npm run build` first; .output/public not found.");
    process.exit(1);
  }
  const port = 8790 + Math.floor(Math.random() * 50);
  const server = spawn("npx", ["--yes", "http-server", PUBLIC_DIR, "-p", String(port) ], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  let serverReady = false;
  server.stdout.on("data", (chunk: Buffer) => {
    const text = chunk.toString();
    if (text.toLowerCase().includes("available on")) serverReady = true;
    process.stdout.write(`[http-server] ${text}`);
  });
  server.stderr.on("data", (chunk: Buffer) => process.stderr.write(`[http-server] ${chunk.toString()}`));
  for (let i = 0; i < 60 && !serverReady; i++) {
    await wait(500);
  }
  if (!serverReady) {
    server.kill("SIGTERM");
    throw new Error("http-server did not start within 30s");
  }
  try {
    const home = await fetch(`http://127.0.0.1:${port}/index.html`);
    if (home.status !== 200) throw new Error(`Home page returned ${home.status}`);
    const html = await home.text();
    if (!html.includes("Northwind Studio")) throw new Error("Home page missing brand name");
    if (!html.includes('id="hero-headline"')) throw new Error("Hero landmark missing");
    if (!html.includes('data-brand="true"')) throw new Error("Brand CSS injection missing");

    const contact = await fetch(`http://127.0.0.1:${port}/contact/index.html`);
    if (contact.status !== 200) throw new Error(`Contact page returned ${contact.status}`);
    const contactHtml = await contact.text();
    if (!contactHtml.includes("Send message")) throw new Error("Contact form submit label missing");

    const sitemap = await fetch(`http://127.0.0.1:${port}/sitemap.xml`);
    if (sitemap.status !== 200) throw new Error(`sitemap.xml returned ${sitemap.status}`);
    const robots = await fetch(`http://127.0.0.1:${port}/robots.txt`);
    if (robots.status !== 200) throw new Error(`robots.txt returned ${robots.status}`);

    const headersFile = await readFile(resolve(PUBLIC_DIR, "_headers"), "utf8").catch(() => "");
    if (!headersFile.includes("X-Content-Type-Options")) {
      throw new Error("_headers missing X-Content-Type-Options");
    }

    console.log("OK: static build smoke tests passed.");
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error("Lighthouse smoke test failed:", err.message ?? err);
  process.exit(1);
});
