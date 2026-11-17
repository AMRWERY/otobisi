<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 h-5 px-2 rounded-full border text-[11px] font-semibold leading-none whitespace-nowrap',
      tone.pill,
    ]"
  >
    <span :class="['w-1.5 h-1.5 rounded-full', tone.dot]" />
    <slot>{{ COACH_STATUS_LABELS[status] }}</slot>
  </span>
</template>

<script lang="ts" setup>
import type { CoachStatus } from "~/types/fleet";

const props = defineProps<{
  status: CoachStatus;
}>();

const tone = computed(() => COACH_STATUS_TONES[props.status]);
</script>
