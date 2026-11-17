import type { AuthResult } from "~/types/auth";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock admin auth. Real authentication is not implemented yet, so each call
 * only simulates latency and applies the demo rules; swap the bodies for the
 * real API later without touching the pages.
 */
export function useAdminAuth() {
  const loading = ref(false);

  async function run(fn: () => AuthResult): Promise<AuthResult> {
    loading.value = true;
    try {
      await wait(700);
      return fn();
    } finally {
      loading.value = false;
    }
  }

  /** Demo: any @nilebus.eg address with an 8+ character password gets to the 2FA step */
  const login = (email: string, password: string) =>
    run(() =>
      email.trim().toLowerCase().endsWith(AUTH_EMAIL_DOMAIN) &&
      password.length >= AUTH_MIN_PASSWORD
        ? { ok: true }
        : { ok: false, error: "Incorrect email or password. Check your details and try again." },
    );

  /** Demo: any 6-digit code except 000000 is accepted */
  const verifyCode = (code: string) =>
    run(() =>
      code.length === AUTH_CODE_LENGTH && code !== "000000"
        ? { ok: true }
        : { ok: false, error: "That code is invalid or has expired." },
    );

  /** Always succeeds, so the form never reveals which emails have accounts */
  const requestReset = (_email: string) => run(() => ({ ok: true }));

  const resetPassword = (_token: string, password: string) =>
    run(() =>
      authPasswordValid(password)
        ? { ok: true }
        : { ok: false, error: "Password does not meet the requirements." },
    );

  const acceptInvitation = (_email: string, password: string) =>
    run(() =>
      authPasswordValid(password)
        ? { ok: true }
        : { ok: false, error: "Password does not meet the requirements." },
    );

  return {
    loading: readonly(loading),
    login,
    verifyCode,
    requestReset,
    resetPassword,
    acceptInvitation,
  };
}
