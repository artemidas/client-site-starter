// Cloudflare Pages Function for the contact form. Mirrors the Nitro
// handler at server/api/contact.post.ts so the same validation,
// honeypot, rate-limit, and Resend transport work whether the site
// is deployed as a pure-static export with Pages Functions (default)
// or as a full Nitro server build (e.g. Node host, Vercel).
//
// Pages Functions are auto-discovered from /functions/** and run on
// every non-prerendered path. The static HTML assets in /.output/public
// are served first; this function only fires for /api/contact.
//
// Environment variables (set in Cloudflare Pages dashboard):
//   RESEND_API_KEY         — Resend API key (omit to dry-run)
//   CONTACT_TO             — destination address (defaults to site.business.email)
//   CONTACT_FROM           — verified From address in Resend
//   RATE_LIMIT_PER_HOUR    — submissions per hour (default 5)
//   SITE_URL               — public site origin (for the JSON schema URL)

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  RATE_LIMIT_PER_HOUR?: string;
  SITE_URL?: string;
}

// PagesFunction is provided by @cloudflare/workers-types; we declare
// it locally so this file stays portable without adding the dep.
type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}) => Response | Promise<Response>;

const HOUR_MS = 60 * 60 * 1000;
const buckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string, limit: number): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    const next = { count: 1, resetAt: now + HOUR_MS };
    buckets.set(key, next);
    return { ok: true, remaining: limit - 1, resetAt: next.resetAt };
  }
  existing.count += 1;
  const ok = existing.count <= limit;
  return { ok, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt };
}

function clientKey(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  const ip = xff?.split(",")[0]?.trim() || request.headers.get("cf-connecting-ip") || "unknown";
  return `ip:${ip}`;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  consent: boolean;
  hp_company?: string;
  submittedAt?: number;
}

const MIN_SUBMIT_MS = 1500;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_COMPANY = 120;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(input: unknown): { ok: true; data: ContactPayload } | { ok: false; fieldErrors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!input || typeof input !== "object") {
    return { ok: false, fieldErrors: { _: "Invalid request body." } };
  }
  const body = input as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const consent = body.consent === true;
  const hp_company = typeof body.hp_company === "string" ? body.hp_company : "";
  const submittedAt = typeof body.submittedAt === "number" ? body.submittedAt : undefined;

  if (!name) errors.name = "Name is required";
  else if (name.length > MAX_NAME) errors.name = `Name must be at most ${MAX_NAME} characters`;
  if (!email) errors.email = "Email is required";
  else if (!EMAIL_RE.test(email) || email.length > MAX_EMAIL) errors.email = "Please enter a valid email";
  if (phone.length > MAX_PHONE) errors.phone = `Phone must be at most ${MAX_PHONE} characters`;
  if (company.length > MAX_COMPANY) errors.company = `Company must be at most ${MAX_COMPANY} characters`;
  if (subject.length > MAX_SUBJECT) errors.subject = `Subject must be at most ${MAX_SUBJECT} characters`;
  if (!message || message.length < 10) errors.message = "Message must be at least 10 characters";
  else if (message.length > MAX_MESSAGE) errors.message = `Message must be at most ${MAX_MESSAGE} characters`;
  if (!consent) errors.consent = "You must agree to the privacy policy to submit.";
  if (hp_company) errors.hp_company = "Bot detected";
  if (submittedAt && Date.now() - submittedAt < MIN_SUBMIT_MS) {
    errors.message = "Form submitted too quickly. Please try again.";
  }
  if (Object.keys(errors).length > 0) return { ok: false, fieldErrors: errors };
  return {
    ok: true,
    data: {
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      subject: subject || undefined,
      message,
      consent,
      hp_company,
      submittedAt,
    },
  };
}

async function sendViaResend(env: Env, payload: ContactPayload, fromOverride?: string): Promise<{ ok: boolean; id: string; dryRun: boolean }> {
  const to = env.CONTACT_TO || "";
  const from = env.CONTACT_FROM || fromOverride || "";
  if (!env.RESEND_API_KEY || !to || !from) {
    console.warn("[contact] dry-run", JSON.stringify({ email: payload.email, subject: payload.subject }));
    return { ok: true, id: `dry-${Date.now().toString(36)}`, dryRun: true };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: payload.subject?.trim() || `New enquiry from ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.phone ? `Phone: ${payload.phone}` : null,
        payload.company ? `Company: ${payload.company}` : null,
        "",
        payload.message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("[contact] resend error", res.status, err);
    return { ok: false, id: "", dryRun: false };
  }
  const data = (await res.json()) as { id?: string };
  return { ok: true, id: data.id || "unknown", dryRun: false };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const env = context.env;
  const limit = Number(env.RATE_LIMIT_PER_HOUR ?? 5);
  const key = clientKey(context.request);
  const rate = rateLimit(key, limit);
  if (!rate.ok) {
    return json({ ok: false, error: "Too many requests. Please try again later." }, 429);
  }

  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON." }, 400);
  }

  const result = validate(body);
  if (!result.ok) {
    return json({ ok: false, fieldErrors: result.fieldErrors }, 400);
  }

  const siteUrl = env.SITE_URL || "";
  let fromOverride: string | undefined;
  if (!env.CONTACT_FROM && siteUrl) {
    try {
      fromOverride = `noreply@${new URL(siteUrl).hostname}`;
    } catch {
      fromOverride = undefined;
    }
  }

  const sent = await sendViaResend(env, result.data, fromOverride);
  if (!sent.ok) {
    return json(
      { ok: false, error: "We could not send your message right now. Please email us directly." },
      502,
    );
  }

  return json({ ok: true, dryRun: sent.dryRun, id: sent.id });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "Content-Type",
      "access-control-max-age": "86400",
    },
  });
};