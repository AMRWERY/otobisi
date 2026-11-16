<template>
  <footer
    class="flex items-center gap-x-6 gap-y-1 flex-wrap px-4 py-2 rounded-xl border border-border/80 bg-surface-1/60 dark:bg-surface-2/10 font-mono text-[11px] text-text-muted"
  >
    <span class="flex items-center gap-1.5 text-text-secondary">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      Cairo Central Dispatch Terminal Hub
    </span>
    <span>Fawry sync: <b class="text-text-secondary">100%</b></span>
    <span>Meeza POS: <b class="text-text-secondary">Connected</b></span>
    <span class="ms-auto">Last polled: {{ lastPolled }}</span>
  </footer>
</template>

<script lang="ts" setup>
// Placeholder until the gateway health endpoint exists
const lastPolled = ref("just now");
</script>
