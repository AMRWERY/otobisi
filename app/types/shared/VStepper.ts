export interface StepItem {
  step: number;
  label: string;
  to?: string;
}

export interface StepperProps {
  steps?: StepItem[];
  currentStep?: number;
  allowNavigation?: boolean;
  customClass?: string;
}
