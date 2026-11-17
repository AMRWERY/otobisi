<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 h-5 px-2 rounded-full border text-[11px] font-semibold leading-none whitespace-nowrap',
      tone.pill,
    ]"
  >
    <span :class="['w-1.5 h-1.5 rounded-full', tone.dot]" />
    {{ tone.label }}
  </span>
</template>

<script lang="ts" setup>
import type { AuditSeverity } from "~/types/audit";

const props = defineProps<{
  severity: AuditSeverity;
}>();

const tone = computed(() => AUDIT_SEVERITIES[props.severity]);
</script>
