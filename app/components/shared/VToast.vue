<template>
  <!-- ── Single Toast Mode (when passed as <VToast :toast="..." />) ── -->
  <div
    v-if="props.toast"
    :class="[
      'group relative flex items-start gap-3 w-full rounded-2xl overflow-hidden',
      'bg-white dark:bg-[#131B2E]',
      'border border-slate-200/80 dark:border-[#1E293B]',
      'shadow-xl shadow-slate-900/10 dark:shadow-black/50',
      'p-4 transition-all duration-200 select-none',
      props.toast.removing
        ? 'opacity-0 scale-95 -translate-y-2'
        : 'opacity-100 scale-100 translate-y-0',
    ]"
    role="alert"
    :aria-live="
      props.toast.type === 'error' || props.toast.type === 'warning'
        ? 'assertive'
        : 'polite'
    "
    @mouseenter="onCardMouseEnter(props.toast.id)"
    @mouseleave="onCardMouseLeave(props.toast.id)"
    @touchstart.passive="onCardMouseEnter(props.toast.id)"
    @touchend.passive="onCardMouseLeave(props.toast.id)"
  >
    <!-- Start semantic accent border -->
    <div
      :class="[
        'absolute start-0 top-0 bottom-0 w-1.5 rounded-s-2xl',
        getAccentBg(props.toast.type),
      ]"
    />

    <!-- Icon -->
    <div
      :class="[
        'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
        getIconBg(props.toast.type),
      ]"
    >
      <Icon
        :name="getIconName(props.toast.type)"
        class="w-5 h-5"
        :class="getIconColor(props.toast.type)"
      />
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0 pt-0.5">
      <!-- Title row -->
      <div class="flex items-center gap-2 flex-wrap">
        <h4
          class="text-sm font-bold text-slate-900 dark:text-white leading-tight"
        >
          {{ props.toast.title }}
        </h4>

        <!-- Optional Badge -->
        <span
          v-if="props.toast.badge"
          class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-50 dark:bg-orange-950/40 text-[#F05023] dark:text-orange-400 border border-orange-200/70 dark:border-orange-900/50"
        >
          {{ props.toast.badge }}
        </span>

        <!-- Optional Timestamp -->
        <span
          v-if="props.toast.timestamp"
          class="text-[11px] text-slate-400 dark:text-slate-500 font-medium ms-auto"
        >
          {{ props.toast.timestamp }}
        </span>
      </div>

      <!-- Description -->
      <p
        v-if="props.toast.description"
        class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1"
      >
        {{ props.toast.description }}
      </p>

      <!-- Action buttons -->
      <div
        v-if="props.toast.actions?.length"
        class="flex flex-wrap items-center gap-2.5 mt-3"
      >
        <button
          v-for="(action, idx) in props.toast.actions"
          :key="idx"
          type="button"
          :class="getActionClass(action, props.toast.type)"
          @click="handleAction(action, props.toast.id)"
        >
          {{ action.label }}
          <Icon
            :name="action.icon || 'ph:arrow-right-bold'"
            class="w-3.5 h-3.5 rtl:rotate-180 transition-transform"
          />
        </button>
      </div>
    </div>

    <!-- Dismiss Button -->
    <button
      v-if="props.toast.dismissible !== false"
      type="button"
      class="w-7 h-7 -mt-1 -me-1 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
      aria-label="Close notification"
      @click="handleDismiss(props.toast.id)"
    >
      <Icon name="ph:x-bold" class="w-3.5 h-3.5" />
    </button>

    <!-- Auto-dismiss Progress Bar -->
    <div
      v-if="props.toast.duration && props.toast.duration > 0"
      class="absolute bottom-0 inset-x-0 h-0.5 bg-slate-100 dark:bg-slate-800/80 overflow-hidden"
    >
      <div
        :class="['h-full rounded-full', getAccentBg(props.toast.type)]"
        :style="{
          animation: `v-toast-progress ${props.toast.duration}ms linear forwards`,
          animationPlayState: props.toast.paused ? 'paused' : 'running',
        }"
      />
    </div>
  </div>

  <!-- ── Global Container Mode (when mounted as <LazyVToast /> with no props) ── -->
  <Teleport v-else to="body">
    <div
      v-if="toasts.length"
      class="fixed top-4 right-4 rtl:right-auto rtl:left-4 z-50 flex flex-col gap-3 pointer-events-none w-full max-w-[420px] max-sm:inset-x-4 max-sm:w-auto"
      aria-live="polite"
      aria-atomic="true"
    >
      <TransitionGroup
        enter-active-class="transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
        enter-from-class="opacity-0 scale-95 -translate-y-2 sm:translate-y-0 sm:translate-x-4 rtl:sm:-translate-x-4"
        enter-to-class="opacity-100 scale-100 translate-y-0 translate-x-0"
        leave-active-class="transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]"
        leave-from-class="opacity-100 scale-100 translate-y-0 translate-x-0"
        leave-to-class="opacity-0 scale-95 translate-y-2 sm:translate-y-0 sm:translate-x-4 rtl:sm:-translate-x-4"
        move-class="transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
      >
        <div
          v-for="item in toasts"
          :key="item.id"
          :class="[
            'pointer-events-auto group relative flex items-start gap-3 w-full rounded-2xl overflow-hidden',
            'bg-white dark:bg-[#131B2E]',
            'border border-slate-200/80 dark:border-[#1E293B]',
            'shadow-xl shadow-slate-900/10 dark:shadow-black/50',
            'p-4 select-none',
            item.removing ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
          ]"
          role="alert"
          :aria-live="
            item.type === 'error' || item.type === 'warning'
              ? 'assertive'
              : 'polite'
          "
          @mouseenter="onCardMouseEnter(item.id)"
          @mouseleave="onCardMouseLeave(item.id)"
          @touchstart.passive="onCardMouseEnter(item.id)"
          @touchend.passive="onCardMouseLeave(item.id)"
        >
          <!-- Start semantic accent border -->
          <div
            :class="[
              'absolute start-0 top-0 bottom-0 w-1.5 rounded-s-2xl',
              getAccentBg(item.type),
            ]"
          />

          <!-- Icon -->
          <div
            :class="[
              'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
              getIconBg(item.type),
            ]"
          >
            <Icon
              :name="getIconName(item.type)"
              class="w-5 h-5"
              :class="getIconColor(item.type)"
            />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0 pt-0.5">
            <!-- Title row -->
            <div class="flex items-center gap-2 flex-wrap">
              <h4
                class="text-sm font-bold text-slate-900 dark:text-white leading-tight"
              >
                {{ item.title }}
              </h4>

              <!-- Optional Badge -->
              <span
                v-if="item.badge"
                class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-50 dark:bg-orange-950/40 text-[#F05023] dark:text-orange-400 border border-orange-200/70 dark:border-orange-900/50"
              >
                {{ item.badge }}
              </span>

              <!-- Optional Timestamp -->
              <span
                v-if="item.timestamp"
                class="text-[11px] text-slate-400 dark:text-slate-500 font-medium ms-auto"
              >
                {{ item.timestamp }}
              </span>
            </div>

            <!-- Description -->
            <p
              v-if="item.description"
              class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1"
            >
              {{ item.description }}
            </p>

            <!-- Action buttons -->
            <div
              v-if="item.actions?.length"
              class="flex flex-wrap items-center gap-2.5 mt-3"
            >
              <button
                v-for="(action, idx) in item.actions"
                :key="idx"
                type="button"
                :class="getActionClass(action, item.type)"
                @click="handleAction(action, item.id)"
              >
                {{ action.label }}
                <Icon
                  :name="action.icon || 'ph:arrow-right-bold'"
                  class="w-3.5 h-3.5 rtl:rotate-180 transition-transform"
                />
              </button>
            </div>
          </div>

          <!-- Dismiss Button -->
          <button
            v-if="item.dismissible !== false"
            type="button"
            class="w-7 h-7 -mt-1 -me-1 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            aria-label="Close notification"
            @click="handleDismiss(item.id)"
          >
            <Icon name="ph:x-bold" class="w-3.5 h-3.5" />
          </button>

          <!-- Auto-dismiss Progress Bar -->
          <div
            v-if="item.duration && item.duration > 0"
            class="absolute bottom-0 inset-x-0 h-0.5 bg-slate-100 dark:bg-slate-800/80 overflow-hidden"
          >
            <div
              :class="['h-full rounded-full', getAccentBg(item.type)]"
              :style="{
                animation: `v-toast-progress ${item.duration}ms linear forwards`,
                animationPlayState: item.paused ? 'paused' : 'running',
              }"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { Toast, ToastAction, ToastType } from "~/types/shared/VToast";

const props = defineProps<{
  toast?: Toast;
}>();

const emit = defineEmits<{
  (e: "dismiss", id?: string): void;
}>();

const { toasts, dismiss, pause, resume } = useToast();

function onCardMouseEnter(id: string) {
  pause(id);
}

function onCardMouseLeave(id: string) {
  resume(id);
}

function handleDismiss(id: string) {
  if (props.toast) {
    emit("dismiss", id);
  } else {
    dismiss(id);
  }
}

function handleAction(action: ToastAction, id: string) {
  action.onClick();
  handleDismiss(id);
}

// ── Appearance helpers ───────────────────────────────────────────────────────
function getAccentBg(type: ToastType): string {
  switch (type) {
    case "success":
      return "bg-emerald-500";
    case "error":
      return "bg-rose-500";
    case "warning":
      return "bg-amber-500";
    case "info":
    default:
      return "bg-blue-500";
  }
}

function getIconBg(type: ToastType): string {
  switch (type) {
    case "success":
      return "bg-emerald-50 dark:bg-emerald-950/50";
    case "error":
      return "bg-rose-50 dark:bg-rose-950/50";
    case "warning":
      return "bg-amber-50 dark:bg-amber-950/50";
    case "info":
    default:
      return "bg-blue-50 dark:bg-blue-950/50";
  }
}

function getIconColor(type: ToastType): string {
  switch (type) {
    case "success":
      return "text-emerald-600 dark:text-emerald-400";
    case "error":
      return "text-rose-600 dark:text-rose-400";
    case "warning":
      return "text-amber-600 dark:text-amber-400";
    case "info":
    default:
      return "text-blue-600 dark:text-blue-400";
  }
}

function getIconName(type: ToastType): string {
  switch (type) {
    case "success":
      return "ph:check-circle-bold";
    case "error":
      return "ph:x-circle-bold";
    case "warning":
      return "ph:warning-circle-bold";
    case "info":
    default:
      return "ph:info-bold";
  }
}

function getActionClass(
  action: ToastAction,
  type: ToastType,
): string[] | string {
  if (action.variant === "brand") {
    return "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-white bg-[#F05023] hover:bg-[#d9441c] shadow-sm transition-colors cursor-pointer";
  }

  if (action.variant === "ghost") {
    return "inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer";
  }

  // Default / primary
  if (type === "error") {
    return "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-colors cursor-pointer";
  }

  // Links with arrow style as shown in design for Success & Warning
  return "inline-flex items-center gap-1 text-xs font-bold text-[#F05023] dark:text-orange-400 hover:underline transition-all cursor-pointer";
}
</script>

<style>
@keyframes v-toast-progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>