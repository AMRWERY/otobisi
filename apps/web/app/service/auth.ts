import type {
  LoginInput,
  RegisterInput,
  SessionUser,
  User,
} from "~/service/types/user";

export type AuthErrorCode = "INVALID_CREDENTIALS" | "EMAIL_TAKEN";

export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  INVALID_CREDENTIALS: "Incorrect email/username or password.",
  EMAIL_TAKEN: "An account with this email already exists.",
};

export class AuthError extends Error {
  constructor(public readonly code: AuthErrorCode) {
    super(AUTH_ERROR_MESSAGES[code]);
    this.name = "AuthError";
  }
}

const normalize = (value: string) => value.trim().toLowerCase();

export const toSessionUser = ({
  password: _password,
  creditCard: _creditCard,
  ...user
}: User): SessionUser => user;

/** Finds the user matching the email/username + password, or throws. */
export const authenticate = (pool: User[], input: LoginInput): User => {
  const identifier = normalize(input.identifier);
  const user = pool.find(
    (u) =>
      normalize(u.email) === identifier || normalize(u.username) === identifier,
  );
  if (!user || user.password !== input.password) {
    throw new AuthError("INVALID_CREDENTIALS");
  }
  return user;
};

/** Username derived from the email's local part, suffixed until unique. */
const uniqueUsername = (pool: User[], email: string) => {
  const base = normalize(email).split("@")[0] || "user";
  const taken = new Set(pool.map((u) => normalize(u.username)));
  let candidate = base;
  for (let i = 2; taken.has(candidate); i++) candidate = `${base}${i}`;
  return candidate;
};

/** Builds a new user from the sign-up input, or throws if the email is taken. */
export const createUser = (pool: User[], input: RegisterInput): User => {
  const email = normalize(input.email);
  if (pool.some((u) => normalize(u.email) === email)) {
    throw new AuthError("EMAIL_TAKEN");
  }
  return {
    id: Math.max(0, ...pool.map((u) => u.id)) + 1,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    username: uniqueUsername(pool, email),
    email,
    password: input.password,
    lastLogin: new Date().toISOString(),
  };
};
