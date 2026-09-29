<template>
  <div
    class="max-w-4xl mx-auto mt-6 p-4 sm:p-5 rounded-2xl bg-surface-1 border border-border shadow-xs flex flex-wrap items-center justify-between gap-4 text-start"
  >
    <div class="flex items-center gap-3.5">
      <div
        class="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0"
      >
        <Icon name="ph:headset-bold" class="w-6 h-6" />
      </div>

      <div>
        <h4 class="font-bold text-sm text-text-primary">
          Need assistance or terminal directions?
        </h4>
        <p class="text-xs text-text-secondary mt-0.5">
          Otobisi traveler desk is available 24/7 across all Egyptian bus
          corridors.
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2.5 ms-auto sm:ms-0">
      <a
        href="tel:19999"
        class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border text-xs font-bold text-text-primary transition-colors cursor-pointer shadow-2xs"
      >
        <Icon name="ph:phone-call-bold" class="w-3.5 h-3.5 text-orange-500" />
        <span>Hotline 19XXX</span>
      </a>

      <a
        href="https://wa.me/201012345678"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
      >
        <Icon name="ph:whatsapp-logo-bold" class="w-3.5 h-3.5" />
        <span>WhatsApp Support</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>