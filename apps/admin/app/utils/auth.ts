// Constants + pure helpers for the admin auth pages (auto-imported)
import type { AuthPasswordRule } from "~/types/auth";

/** Staff accounts are issued on the operator's own mail domain */
export const AUTH_EMAIL_DOMAIN = "@nilebus.eg";
export const AUTH_MIN_PASSWORD = 8;
export const AUTH_CODE_LENGTH = 6;
/** Seconds before a verification code or reset link can be requested again */
export const AUTH_RESEND_SECONDS = 30;

export const AUTH_PASSWORD_RULES: AuthPasswordRule[] = [
  {
    key: "length",
    label: `At least ${AUTH_MIN_PASSWORD} characters`,
    test: (p) => p.length >= AUTH_MIN_PASSWORD,
  },
  {
    key: "case",
    label: "Upper and lower case letters",
    test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p),
  },
  { key: "number", label: "At least one number", test: (p) => /\d/.test(p) },
  {
    key: "symbol",
    label: "One symbol (recommended)",
    test: (p) => /[^A-Za-z0-9]/.test(p),
  },
];

export const AUTH_STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"];

/** Tailwind bg class for each strength level (index = score) */
export const AUTH_STRENGTH_TONES = [
  "bg-surface-2",
  "bg-rose-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-emerald-500",
];

/** 0–4: how many of the password rules pass */
export function authPasswordScore(password: string): number {
  if (!password) return 0;
  return AUTH_PASSWORD_RULES.filter((r) => r.test(password)).length;
}

/** The first three rules are mandatory; the symbol rule only raises the score */
export function authPasswordValid(password: string): boolean {
  return AUTH_PASSWORD_RULES.slice(0, 3).every((r) => r.test(password));
}

export const authIsEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/** "amr.m@nilebus.eg" → "ka•••@nilebus.eg" */
export function authMaskEmail(email: string): string {
  const [name = "", domain = ""] = email.split("@");
  return `${name.slice(0, 2)}${"•".repeat(Math.max(3, name.length - 2))}@${domain}`;
}
