<template>
  <header
    class="border-b border-border bg-surface-1/90 backdrop-blur-md sticky top-16 z-30"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4"
    >
      <!-- 4-Step Checkout Completed Stepper -->
      <div
        class="flex items-center gap-2 sm:gap-4 text-xs font-bold overflow-x-auto no-scrollbar py-1"
      >
        <div
          class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
        >
          <Icon name="ph:check-circle-fill" class="w-4 h-4 shrink-0" />
          <span>1. Search</span>
        </div>

        <span class="text-text-muted select-none">•</span>

        <div
          class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
        >
          <Icon name="ph:check-circle-fill" class="w-4 h-4 shrink-0" />
          <span>2. Seats</span>
        </div>

        <span class="text-text-muted select-none">•</span>

        <div
          class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
        >
          <Icon name="ph:check-circle-fill" class="w-4 h-4 shrink-0" />
          <span>3. Passenger Info</span>
        </div>

        <span class="text-text-muted select-none">•</span>

        <div
          class="flex items-center gap-1.5 text-[#A1331B] dark:text-orange-400"
        >
          <span
            class="w-4 h-4 rounded-full bg-[#A1331B] text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-xs"
          >
            4
          </span>
          <span class="font-extrabold">4. Confirmed & Issued</span>
        </div>
      </div>

      <!-- Top Right Status Badge -->
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-bold shadow-2xs"
      >
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Confirmed • E-Ticket delivered via WhatsApp & Email</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>

</script>