<template>
  <span
    :class="[
      'inline-flex items-center gap-1 h-5 px-1.5 rounded border font-mono text-[11px] font-semibold leading-none whitespace-nowrap tabular-nums',
      TONES[resolvedTone],
    ]"
  >
    <span
      v-if="resolvedTone === 'critical'"
      class="w-1.5 h-1.5 rounded-full bg-white"
    />
    <Icon v-else :name="ICONS[resolvedTone]" class="w-3 h-3 shrink-0" />
    <slot>{{ text }}</slot>
  </span>
</template>

<script lang="ts" setup>
import type { Tone } from "~/types/shared/VTrendBadge";

const props = defineProps<{
  /** Percent change; sets the tone (and the text) unless overridden */
  delta?: number;
  tone?: Tone;
  /** Text shown instead of the formatted delta */
  label?: string;
}>();

// Calibrated, non-glare pairs: tinted fill, matching border, readable text on both themes
const TONES: Record<Tone, string> = {
  positive:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-400 dark:border-emerald-400/20",
  negative:
    "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-400/10 dark:text-rose-400 dark:border-rose-400/20",
  neutral:
    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-400/10 dark:text-slate-400 dark:border-slate-400/20",
  critical: "bg-rose-600 text-white border-rose-600",
};

const ICONS: Record<Tone, string> = {
  positive: "ph:arrow-up-bold",
  negative: "ph:arrow-down-bold",
  neutral: "ph:minus-bold",
  critical: "",
};

const resolvedTone = computed<Tone>(() => {
  if (props.tone) return props.tone;
  if (props.delta == null || props.delta === 0) return "neutral";
  return props.delta > 0 ? "positive" : "negative";
});

const text = computed(() => {
  if (props.label) return props.label;
  if (props.delta == null) return "";
  // The arrow carries the direction, so show the sign once with the magnitude
  const sign = props.delta > 0 ? "+" : props.delta < 0 ? "−" : "±";
  return `${sign}${Math.abs(props.delta)}%`;
});
</script>