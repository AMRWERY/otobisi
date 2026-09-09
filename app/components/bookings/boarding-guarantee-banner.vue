<template>
  <div
    class="p-4 sm:p-5 rounded-2xl bg-surface-1 border border-border flex flex-wrap items-center justify-between gap-4 shadow-xs"
  >
    <div class="flex items-center gap-3.5">
      <div
        class="w-10 h-10 rounded-xl bg-orange-500/10 text-[#A1331B] dark:text-orange-400 flex items-center justify-center shrink-0"
      >
        <Icon name="ph:shield-check-bold" class="w-5 h-5" />
      </div>
      <div>
        <h4 class="font-bold text-sm text-text-primary">
          Guaranteed Boarding with Otobisi
        </h4>
        <p class="text-xs text-text-secondary mt-0.5">
          Every ticket includes direct digital verification with partner bus fleets. Present your QR code on arrival without paper prints.
        </p>
      </div>
    </div>

    <a
      href="tel:19999"
      class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border text-xs font-bold text-text-primary transition-colors cursor-pointer shadow-2xs ms-auto sm:ms-0"
    >
      <Icon name="ph:headset-bold" class="w-4 h-4 text-orange-500" />
      <span>Need Help? Hotline 19XXX</span>
    </a>
  </div>
</template>

<script lang="ts" setup>
</script>
