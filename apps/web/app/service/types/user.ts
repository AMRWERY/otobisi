export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface CreditCard {
  cardHolderName: string;
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  brand: "Visa" | "Mastercard" | "American Express" | "Discover";
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  /** Not collected at sign-up, so absent for newly registered users */
  address?: Address;
  lastLogin: string;
  creditCard?: CreditCard;
}

/** User as kept in the client session: no password or card details */
export type SessionUser = Omit<User, "password" | "creditCard">;

export interface LoginInput {
  /** Email or username */
  identifier: string;
  password: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
