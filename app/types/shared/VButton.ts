export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "surface"
  | "link"
  /** No built-in color/size/rounding classes — all styling comes from `customClass` */
  | "unstyled";

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
  /** Applied to the leading icon; also the trailing icon's default unless `iconRightClass` is set */
  iconClass?: string;
  /** Classes for the trailing (iconRight) icon only, overriding iconClass for it */
  iconRightClass?: string;
  customClass?: string;
  /** Classes for the wrapper span around the default slot (icon/text gap, truncation, alignment) */
  contentClass?: string;
}
