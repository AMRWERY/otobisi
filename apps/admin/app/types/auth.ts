export type AuthAlertTone = "error" | "success" | "info";

export interface AuthPasswordRule {
  key: "length" | "case" | "number" | "symbol";
  label: string;
  test: (password: string) => boolean;
}

export interface AuthResult {
  ok: boolean;
  /** Human-readable reason when `ok` is false */
  error?: string;
}

export interface AuthInvitation {
  email: string;
  roleLabel: string;
  hubLabel: string;
  invitedBy: string;
}
