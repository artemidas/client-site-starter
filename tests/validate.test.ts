import { describe, it, expect } from "vitest";
import { validateContact, contactInputSchema, MIN_SUBMIT_MS } from "../server/utils/validate";

describe("contact validation", () => {
  it("accepts a valid submission", () => {
    const r = validateContact({
      name: "Test User",
      email: "test@example.com",
      message: "Hello there, this is a real message.",
      consent: true,
      submittedAt: Date.now() - MIN_SUBMIT_MS - 100,
    });
    expect(r.ok).toBe(true);
  });

  it("rejects too-short messages", () => {
    const r = validateContact({
      name: "Test",
      email: "test@example.com",
      message: "short",
      consent: true,
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.fieldErrors.message).toBeTruthy();
    }
  });

  it("rejects invalid email", () => {
    const r = validateContact({
      name: "Test",
      email: "not-an-email",
      message: "Hello there, this is a real message.",
      consent: true,
    });
    expect(r.ok).toBe(false);
  });

  it("requires consent", () => {
    const r = validateContact({
      name: "Test",
      email: "test@example.com",
      message: "Hello there, this is a real message.",
      consent: false,
    });
    expect(r.ok).toBe(false);
  });

  it("flags the honeypot field", () => {
    const r = validateContact({
      name: "Test",
      email: "test@example.com",
      message: "Hello there, this is a real message.",
      consent: true,
      hp_company: "spammer",
    });
    expect(r.ok).toBe(false);
  });

  it("rejects too-fast submissions", () => {
    const r = validateContact({
      name: "Test",
      email: "test@example.com",
      message: "Hello there, this is a real message.",
      consent: true,
      submittedAt: Date.now(),
    });
    expect(r.ok).toBe(false);
  });

  it("schema rejects missing required fields", () => {
    const r = contactInputSchema.safeParse({});
    expect(r.success).toBe(false);
  });
});
