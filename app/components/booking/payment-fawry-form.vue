<template>
  <div class="mt-5 pt-4 border-t border-border flex flex-col gap-3" @click.stop>
    <div
      class="p-3.5 rounded-xl bg-surface-1 border border-border flex items-start gap-3"
    >
      <div
        class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5"
      >
        <Icon name="ph:receipt-bold" class="w-4 h-4" />
      </div>
      <div>
        <span class="font-bold text-xs text-text-primary block">
          Fawry Reference Code Generated at Checkout
        </span>
        <p class="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
          Provide code
          <span class="font-bold font-mono text-orange-600 dark:text-orange-400"
            >788-XXX-XXX</span
          >
          at any Fawry retail point or through myFawry app within 4 hours.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>