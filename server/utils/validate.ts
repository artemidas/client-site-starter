import { z } from "zod";

export const contactInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Please enter a valid email").max(254),
  phone: z.string().trim().max(40).optional().default(""),
  company: z.string().trim().max(120).optional().default(""),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy to submit." }),
  }),
  hp_company: z.string().max(0, "Bot detected").optional().default(""),
  submittedAt: z.number().int().nonnegative().optional(),
});

export type ContactInput = z.infer<typeof contactInputSchema>;

export const MIN_SUBMIT_MS = 1500;

export type ValidationFailure = {
  ok: false;
  fieldErrors: Record<string, string>;
};

export type ValidationSuccess = { ok: true; data: ContactInput };

export function validateContact(input: unknown): ValidationSuccess | ValidationFailure {
  const parsed = contactInputSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return { ok: false, fieldErrors };
  }
  const data = parsed.data;
  if (data.hp_company && data.hp_company.length > 0) {
    return { ok: false, fieldErrors: { hp_company: "Bot detected" } };
  }
  if (data.submittedAt && Date.now() - data.submittedAt < MIN_SUBMIT_MS) {
    return { ok: false, fieldErrors: { message: "Form submitted too quickly. Please try again." } };
  }
  return { ok: true, data };
}
