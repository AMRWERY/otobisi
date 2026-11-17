<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 h-5 px-2 rounded-full border text-[11px] font-semibold leading-none whitespace-nowrap',
      tone.pill,
    ]"
  >
    <span :class="['w-1.5 h-1.5 rounded-full', tone.dot]" />
    <slot>{{ MANIFEST_STATUS_LABELS[status] }}</slot>
  </span>
</template>

<script lang="ts" setup>
import type { ManifestBoardStatus } from "~/types/manifest";

const props = defineProps<{
  status: ManifestBoardStatus;
}>();

const tone = computed(() => MANIFEST_STATUS_TONES[props.status]);
</script>
