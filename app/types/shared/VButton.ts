export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "surface"
  | "link";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  type?: "button" | "submit" | "reset";
  to?: string | Record<string, any>;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  icon?: string;
  iconRight?: string;
  iconClass?: string;
  customClass?: string;
}
