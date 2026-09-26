export interface OtpProps {
  /** Current code as a plain digit string, e.g. "1234" */
  modelValue?: string;
  /** Number of input boxes; clamped to the supported 4–6 range */
  length?: number;
  disabled?: boolean;
  /** Focus the first empty box (or the last one, if none is empty) once mounted */
  autoFocus?: boolean;
}
