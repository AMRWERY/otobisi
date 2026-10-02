<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        @click="emit('close')"
      />

      <!-- Modal Card -->
      <div
        class="relative w-full max-w-lg bg-surface-0 dark:bg-[#111927] rounded-3xl border border-border shadow-2xl p-6 overflow-hidden z-10 space-y-5"
      >
        <div class="flex items-start justify-between">
          <div>
            <span
              class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
            >
              Customer Mobile & Web View Preview
            </span>
            <h3 class="text-base font-extrabold text-text-primary">
              {{ title || "VIP 2+1 Executive Suite" }}
            </h3>
          </div>
          <LazyVButton
            variant="ghost"
            size="xs"
            rounded="lg"
            icon="ph:x-bold"
            aria-label="Close"
            @click="emit('close')"
          />
        </div>

        <div
          class="p-4 rounded-2xl bg-surface-1/40 dark:bg-surface-2/20 border border-border/70 text-center space-y-3"
        >
          <div
            class="flex items-center justify-center gap-4 text-xs font-semibold"
          >
            <div class="flex items-center gap-1.5">
              <span
                class="w-3.5 h-3.5 rounded bg-surface-2 border border-border"
              />
              <span class="text-text-muted">Available</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-3.5 h-3.5 rounded bg-[#0F5A47] text-white" />
              <span class="text-text-primary">Selected</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span
                class="w-3.5 h-3.5 rounded bg-slate-300 dark:bg-slate-700 opacity-60"
              />
              <span class="text-text-muted">Booked</span>
            </div>
          </div>

          <p class="text-xs text-text-muted">
            Front to back passenger seating layout with live interactive
            selection in checkout.
          </p>
        </div>

        <div class="flex justify-end">
          <LazyVButton
            variant="primary"
            size="sm"
            rounded="xl"
            custom-class="bg-[#0F5A47] hover:bg-[#0c4939] text-white"
            @click="emit('close')"
          >
            Close Preview
          </LazyVButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps<{
  isOpen: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>