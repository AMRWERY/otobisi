<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 h-5 px-2 rounded-full border text-[11px] font-semibold leading-none whitespace-nowrap',
      tone.pill,
    ]"
  >
    <span :class="['w-1.5 h-1.5 rounded-full', tone.dot]" />
    <slot>{{ STATUS_LABELS[status] }}</slot>
  </span>
</template>

<script lang="ts" setup>
import type { BookingStatus } from "~/types/booking";

const props = defineProps<{
  status: BookingStatus;
}>();

// Semantic palette from DESIGN.md: emerald = confirmed, sky = completed,
// rose = cancelled, amber = no-show
const TONES: Record<BookingStatus, { pill: string; dot: string }> = {
  confirmed: {
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/25",
    dot: "bg-emerald-500",
  },
  completed: {
    pill: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/15 dark:text-sky-400 dark:border-sky-500/25",
    dot: "bg-sky-500",
  },
  cancelled: {
    pill: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/25",
    dot: "bg-rose-500",
  },
  "no-show": {
    pill: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/25",
    dot: "bg-amber-500",
  },
};

const tone = computed(() => TONES[props.status]);
</script>
