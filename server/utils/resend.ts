import { Resend } from "resend";
import type { ContactInput } from "./validate";
import { logger } from "./logger";

export type SendResult =
  | { ok: true; id: string; dryRun: boolean }
  | { ok: false; dryRun: boolean; error: string };

export function isDryRun(apiKey: string, to: string, from: string): boolean {
  return !apiKey || !to || !from;
}

export async function sendContactEmail(input: ContactInput, env: {
  resendApiKey: string;
  to: string;
  from: string;
  siteName: string;
}): Promise<SendResult> {
  if (isDryRun(env.resendApiKey, env.to, env.from)) {
    logger.warn("contact.dry_run", { email: input.email, subject: input.subject });
    return { ok: true, id: `dry-${Date.now().toString(36)}`, dryRun: true };
  }
  try {
    const resend = new Resend(env.resendApiKey);
    const subject = input.subject?.trim() || `New enquiry from ${input.name}`;
    const text = [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      input.phone ? `Phone: ${input.phone}` : null,
      input.company ? `Company: ${input.company}` : null,
      "",
      input.message,
    ]
      .filter((line) => line !== null)
      .join("\n");
    const result = await resend.emails.send({
      from: env.from,
      to: [env.to],
      replyTo: input.email,
      subject: `[${env.siteName}] ${subject}`,
      text,
    });
    if ("error" in result && result.error) {
      logger.error("contact.resend_error", { message: result.error.message });
      return { ok: false, dryRun: false, error: result.error.message };
    }
    const id = (result as { data?: { id?: string } }).data?.id ?? "unknown";
    return { ok: true, id, dryRun: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    logger.error("contact.exception", { message });
    return { ok: false, dryRun: false, error: message };
  }
}
