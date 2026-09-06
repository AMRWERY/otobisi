export type DatePickerSize = "sm" | "md" | "lg";

export type DatePickerRounded =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "full";

export type DatePickerVariant = "default" | "surface";

export interface DatePickerProps {
  modelValue?: string;
  label?: string;
  labelClass?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  min?: string;
  max?: string;
  icon?: string;
  iconClass?: string;
  size?: DatePickerSize;
  rounded?: DatePickerRounded;
  variant?: DatePickerVariant;
  wrapperClass?: string;
  error?: string | boolean;
  hint?: string;
  format?: (dateString: string) => string;
}
