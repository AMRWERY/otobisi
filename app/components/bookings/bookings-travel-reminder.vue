<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="visible"
      class="mb-6 p-3.5 sm:px-4 sm:py-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-3 text-xs shadow-xs"
    >
      <div class="flex items-center gap-2.5">
        <div class="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
          <Icon name="ph:warning-circle-bold" class="w-4 h-4" />
        </div>
        <p class="leading-relaxed font-medium">
          <strong class="font-bold text-amber-950 dark:text-amber-100">Travel Reminder:</strong>
          Please arrive at <strong>Almaza Intercity Terminal</strong> at least 30 minutes prior to departure for luggage tagging and ticket validation.
        </p>
      </div>

      <button
        type="button"
        class="p-1 rounded-lg hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 transition-colors cursor-pointer shrink-0"
        title="Dismiss reminder"
        @click="visible = false"
      >
        <Icon name="ph:x-bold" class="w-4 h-4" />
      </button>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const visible = ref(true);
</script>
