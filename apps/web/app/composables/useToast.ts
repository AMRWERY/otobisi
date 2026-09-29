import type { Toast, ToastOptions, InternalToast } from "~/types/shared/VToast";

// ── Singleton state (shared across all composable calls) ─────────────────────
const toasts = ref<InternalToast[]>([]);
const MAX_TOASTS = 5;

export function useToast() {
  function toast(options: ToastOptions): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const duration = options.duration ?? 5000;

    const newToast: InternalToast = {
      id,
      type: options.type ?? "info",
      title: options.title,
      description: options.description,
      badge: options.badge,
      timestamp: options.timestamp,
      duration,
      dismissible: options.dismissible ?? true,
      actions: options.actions,
      removing: false,
      paused: false,
      _remainingTime: duration,
      _startTime: Date.now(),
    };

    // Limit visible stack to MAX_TOASTS by dismissing the oldest active ones
    if (toasts.value.length >= MAX_TOASTS) {
      const oldest = toasts.value.find((t) => !t.removing);
      if (oldest) {
        dismiss(oldest.id);
      }
    }

    toasts.value.push(newToast);

    if (duration > 0) {
      newToast._timerId = setTimeout(() => dismiss(id), duration);
    }

    return id;
  }

  function pause(id: string) {
    const item = toasts.value.find((t) => t.id === id);
    if (
      !item ||
      !item.duration ||
      item.duration <= 0 ||
      item.paused ||
      item.removing
    )
      return;

    if (item._timerId) {
      clearTimeout(item._timerId);
      item._timerId = undefined;
    }
    if (item._startTime && item._remainingTime !== undefined) {
      const elapsed = Date.now() - item._startTime;
      item._remainingTime = Math.max(0, item._remainingTime - elapsed);
    }
    item.paused = true;
  }

  function resume(id: string) {
    const item = toasts.value.find((t) => t.id === id);
    if (
      !item ||
      !item.duration ||
      item.duration <= 0 ||
      !item.paused ||
      item.removing
    )
      return;

    item.paused = false;
    item._startTime = Date.now();
    const remaining = item._remainingTime ?? item.duration;
    if (remaining > 0) {
      item._timerId = setTimeout(() => dismiss(id), remaining);
    } else {
      dismiss(id);
    }
  }

  function dismiss(id: string) {
    const item = toasts.value.find((t) => t.id === id);
    if (!item || item.removing) return;

    if (item._timerId) {
      clearTimeout(item._timerId);
      item._timerId = undefined;
    }

    item.removing = true;
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, 250); // matches exit animation
  }

  function clear() {
    toasts.value.forEach((t) => dismiss(t.id));
  }

  // ── Convenience helpers ──────────────────────────────────────────────────
  const success = (
    title: string,
    opts?: Omit<ToastOptions, "type" | "title">,
  ) => toast({ ...opts, type: "success", title });

  const error = (title: string, opts?: Omit<ToastOptions, "type" | "title">) =>
    toast({ ...opts, type: "error", title });

  const warning = (
    title: string,
    opts?: Omit<ToastOptions, "type" | "title">,
  ) => toast({ ...opts, type: "warning", title });

  const info = (title: string, opts?: Omit<ToastOptions, "type" | "title">) =>
    toast({ ...opts, type: "info", title });

  return {
    toasts: readonly(toasts) as Readonly<Ref<Toast[]>>,
    toast,
    dismiss,
    pause,
    resume,
    clear,
    success,
    error,
    warning,
    info,
  };
}
