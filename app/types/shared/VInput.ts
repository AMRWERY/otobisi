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
  labelClass?: string;
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
  iconClass?: string;
  clearable?: boolean;
  size?: InputSize;
  rounded?: InputRounded;
  variant?: InputVariant;
  wrapperClass?: string;
  inputClass?: string;
  /** Classes for the box container; only styling source when variant is "unstyled" */
  boxClass?: string;
  autocomplete?: string;
  maxlength?: number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}
