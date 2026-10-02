/** Anything Vue accepts for `:class` — string, array of classes/conditionals, or object map */
export type ClassValue = string | (string | false | null | undefined)[] | Record<string, boolean>;

export type InputSize = "sm" | "md" | "lg";

export type InputRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export type InputVariant =
  | "default"
  | "surface"
  | "borderless"
  /** No built-in size/rounding/color/state classes — all box styling comes from `boxClass` */
  | "unstyled";

export interface InputProps {
  modelValue?: string | number;
  label?: string;
  labelClass?: ClassValue;
  placeholder?: string;
  type?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: string | boolean;
  hint?: string;
  icon?: string;
  iconRight?: string;
  iconClass?: ClassValue;
  clearable?: boolean;
  size?: InputSize;
  rounded?: InputRounded;
  variant?: InputVariant;
  wrapperClass?: ClassValue;
  inputClass?: ClassValue;
  /** Classes for the box container; only styling source when variant is "unstyled" */
  boxClass?: ClassValue;
  autocomplete?: string;
  maxlength?: number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}
