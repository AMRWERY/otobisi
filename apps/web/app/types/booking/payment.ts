export type PaymentMethodId = "card" | "wallet" | "fawry";

export interface PaymentMethodOption {
  id: PaymentMethodId;
  title: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  icon?: string;
  logos?: string[];
  tags?: string[];
  component: string;
}
