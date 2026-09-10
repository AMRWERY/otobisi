export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "ghost" | "brand";
  icon?: string;
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  badge?: string;
  timestamp?: string;
  duration?: number; // ms; 0 = sticky
  dismissible?: boolean;
  actions?: ToastAction[];
  /** Resolved internally — marks toast as being removed */
  removing?: boolean;
  /** Resolved internally — pause timer on hover */
  paused?: boolean;
}

export interface ToastOptions {
  type?: ToastType;
  title: string;
  description?: string;
  badge?: string;
  timestamp?: string;
  duration?: number;
  dismissible?: boolean;
  actions?: ToastAction[];
}

export interface InternalToast extends Toast {
  _timerId?: ReturnType<typeof setTimeout>;
  _startTime?: number;
  _remainingTime?: number;
}
