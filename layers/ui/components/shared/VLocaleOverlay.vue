<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        :dir="dir"
        :lang="locale"
        role="status"
        aria-live="polite"
        :class="[
          'fixed inset-0 z-[9999] flex items-center justify-center bg-surface-0/90 backdrop-blur-md',
          backdropClass,
        ]"
      >
        <!-- Default content can be replaced via the slot -->
        <slot :locale="locale" :message="message" :dir="dir">
          <div class="flex flex-col items-center gap-6">
            <!-- Brand: logo mark + website name (same as the web navbar) -->
            <div class="flex items-center gap-3 locale-overlay-brand">
              <div
                class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] flex items-center justify-center text-white shadow-lg shadow-orange-950/20"
              >
                <Icon name="ph:bus-duotone" class="w-8 h-8 text-white" />
              </div>
              <span
                dir="ltr"
                class="text-3xl font-black tracking-tight text-text-primary"
              >
                {{ brandName }}<span class="text-[#EA580C]">.</span>
              </span>
            </div>

            <!-- Progress bar fills over the switch duration -->
            <span
              class="block w-40 h-1 rounded-full bg-border overflow-hidden"
              aria-hidden="true"
            >
              <span
                class="locale-overlay-bar block h-full rounded-full bg-[#EA580C]"
                :style="{ animationDuration: `${duration}ms` }"
              />
            </span>
          </div>
        </slot>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
interface LocaleOverlayProps {
  /** Website name shown next to the logo mark */
  brandName?: string;
  /** Message per locale code, shown in the target language. Merged over the defaults. */
  messages?: Record<string, string>;
  /** Locale codes that render right-to-left. Defaults to `["ar"]`. */
  rtlLocales?: string[];
  /** Duration of the progress bar in ms; keep in sync with the switch duration */
  duration?: number;
  /** Extra classes for the full-screen backdrop */
  backdropClass?: string;
}

const props = withDefaults(defineProps<LocaleOverlayProps>(), {
  brandName: "Otobisi",
  messages: () => ({}),
  rtlLocales: () => ["ar"],
  duration: 2000,
  backdropClass: "",
});

const defaultMessages: Record<string, string> = {
  en: "Switching language…",
  ar: "جارٍ تغيير اللغة…",
};

const { visible, locale } = useLocaleOverlay();

const dir = computed(() =>
  props.rtlLocales.includes(locale.value) ? "rtl" : "ltr",
);
const message = computed(
  () =>
    props.messages[locale.value] ??
    defaultMessages[locale.value] ??
    defaultMessages.en,
);
</script>

<style scoped>
.locale-overlay-bar {
  width: 100%;
  transform-origin: left;
  animation: locale-overlay-fill linear both;
}

.locale-overlay-brand {
  animation: locale-overlay-pulse 1200ms ease-in-out infinite;
}

@keyframes locale-overlay-fill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes locale-overlay-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04);
  }
}

/* Progress fill is mirrored in RTL */
[dir="rtl"] .locale-overlay-bar {
  transform-origin: right;
}

@media (prefers-reduced-motion: reduce) {
  .locale-overlay-bar,
  .locale-overlay-brand {
    animation: none;
  }
}
</style>