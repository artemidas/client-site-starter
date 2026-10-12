import { defineEventHandler, readBody, setResponseStatus, getRequestHeader } from "h3";
import { contactInputSchema, validateContact } from "../utils/validate";
import { sendContactEmail, isDryRun } from "../utils/resend";
import { checkRateLimit, clientKeyFromRequest } from "../utils/rate-limit";
import { logger } from "../utils/logger";
import { business, siteBrand } from "../site-content.server";

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event);
  const rateKey = clientKeyFromRequest({
    headers: { "x-forwarded-for": getRequestHeader(event, "x-forwarded-for") },
  });
  const limit = Number(process.env.RATE_LIMIT_PER_HOUR ?? 5);
  const rate = checkRateLimit(rateKey, limit);
  if (!rate.ok) {
    setResponseStatus(event, 429);
    return { ok: false, error: "Too many requests. Please try again later." };
  }

  const validation = validateContact(body);
  if (!validation.ok) {
    setResponseStatus(event, 400);
    return { ok: false, fieldErrors: validation.fieldErrors };
  }

  // Extra defense: re-parse against the canonical schema after our custom checks.
  const recheck = contactInputSchema.safeParse(validation.data);
  if (!recheck.success) {
    setResponseStatus(event, 400);
    return { ok: false, error: "Invalid input." };
  }

  const resendApiKey = process.env.RESEND_API_KEY ?? "";
  const to = process.env.CONTACT_TO ?? business.email;
  const from = process.env.CONTACT_FROM ?? `noreply@${new URL(siteBrand.url).hostname}`;
  const dryRun = isDryRun(resendApiKey, to, from);

  const result = await sendContactEmail(recheck.data, {
    resendApiKey,
    to,
    from,
    siteName: siteBrand.name,
  });

  if (!result.ok) {
    setResponseStatus(event, 502);
    return { ok: false, error: "We could not send your message right now. Please email us directly." };
  }

  logger.info("contact.sent", { id: result.id, dryRun: result.dryRun, email: recheck.data.email });
  return { ok: true, dryRun: result.dryRun, id: result.id };
});
