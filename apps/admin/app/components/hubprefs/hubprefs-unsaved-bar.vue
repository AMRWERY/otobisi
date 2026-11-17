<template>
  <Teleport to="body">
    <div
      v-if="visible"
      role="status"
      class="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-3xl bg-[#0F172A] text-white p-3 rounded-xl shadow-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 z-40"
    >
      <div class="flex items-center gap-2 text-xs font-mono">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
        <div>
          <span class="font-bold">Unsaved hub preferences</span>
          <span class="text-slate-300 ms-1">
            Changes apply to everyone at this hub once saved
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <VButton
          variant="unstyled"
          size="sm"
          custom-class="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          @click="emit('discard')"
        >
          Discard
        </VButton>
        <VButton
          variant="primary"
          size="sm"
          rounded="lg"
          icon="ph:check-bold"
          custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white"
          @click="emit('save')"
        >
          Save Changes
        </VButton>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: "discard"): void;
  (e: "save"): void;
}>();
</script>
