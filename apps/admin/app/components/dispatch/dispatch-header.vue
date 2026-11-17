<template>
  <div class="flex items-center justify-between flex-wrap gap-4">
    <div
      class="flex items-center gap-2 text-xs text-text-muted font-medium flex-wrap"
    >
      <span>Operations</span>
      <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
      <span>Live Dispatch Map</span>
      <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
      <h1 class="text-base font-extrabold text-text-primary tracking-tight">
        Fleet Tracking
      </h1>
      <span
        class="ms-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
      >
        <span
          :class="[
            'w-1.5 h-1.5 rounded-full',
            isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400',
          ]"
        />
        {{ isLive ? "Live" : "Paused" }} • Updated
        <span class="font-mono tabular-nums">{{ updatedLabel }}</span>
      </span>
    </div>

    <div class="flex items-center gap-4 flex-wrap">
      <label
        class="flex items-center gap-2 text-xs font-semibold text-text-secondary cursor-pointer select-none"
      >
        <VSwitchButton v-model="isLive" label="Live tracking" />
        Live tracking
      </label>

      <VButton
        variant="primary"
        size="sm"
        rounded="xl"
        icon="ph:paper-plane-tilt-bold"
        custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
        @click="emit('dispatch')"
      >
        New Dispatch
      </VButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  lastUpdated: Date;
}>();

const emit = defineEmits<{ (e: "dispatch"): void }>();

const isLive = defineModel<boolean>("live", { required: true });

const updatedLabel = computed(() =>
  props.lastUpdated.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }),
);
</script>
