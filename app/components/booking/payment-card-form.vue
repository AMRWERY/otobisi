<template>
  <div
    class="mt-5 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-4"
    @click.stop
  >
    <!-- Card Number -->
    <div class="md:col-span-2">
      <label class="block text-xs font-semibold text-text-primary mb-1.5">
        Card Number
      </label>
      <div
        class="relative flex items-center bg-surface-1 border border-border rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500"
      >
        <input
          v-model="cardNumber"
          type="text"
          class="w-full bg-transparent border-0 focus:border-0 ring-0 focus:ring-0 outline-none focus:outline-none p-0 text-xs sm:text-sm font-semibold text-text-primary placeholder:text-text-muted font-mono"
          placeholder="4215 •••••••• 1084"
        />
        <Icon
          name="ph:credit-card-bold"
          class="w-5 h-5 text-text-muted shrink-0 ms-2"
        />
      </div>
    </div>

    <!-- Expiry Date -->
    <div>
      <label class="block text-xs font-semibold text-text-primary mb-1.5">
        Expiry Date
      </label>
      <div
        class="relative flex items-center bg-surface-1 border border-border rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500"
      >
        <input
          v-model="cardExpiry"
          type="text"
          class="w-full bg-transparent border-0 focus:border-0 ring-0 focus:ring-0 outline-none focus:outline-none p-0 text-xs sm:text-sm font-semibold text-text-primary placeholder:text-text-muted font-mono"
          placeholder="MM / YY"
        />
      </div>
    </div>

    <!-- CVV -->
    <div>
      <div class="flex items-center justify-between mb-1.5">
        <label class="block text-xs font-semibold text-text-primary">
          CVV / Security Code
        </label>
        <span class="text-[10px] text-text-muted flex items-center gap-1">
          <Icon name="ph:info-bold" class="w-3 h-3 text-orange-500" />
          3 digits on back
        </span>
      </div>
      <div
        class="relative flex items-center bg-surface-1 border border-border rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500"
      >
        <input
          v-model="cardCvv"
          type="password"
          maxlength="4"
          class="w-full bg-transparent border-0 focus:border-0 ring-0 focus:ring-0 outline-none focus:outline-none p-0 text-xs sm:text-sm font-semibold text-text-primary placeholder:text-text-muted font-mono"
          placeholder="•••"
        />
      </div>
    </div>

    <!-- Save Card Checkbox & PCI Badge -->
    <div
      class="md:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2"
    >
      <label class="inline-flex items-center gap-2 cursor-pointer select-none">
        <input
          v-model="saveCard"
          type="checkbox"
          class="w-4 h-4 rounded text-[#A1331B] focus:ring-[#A1331B] border-border bg-surface-1 cursor-pointer"
        />
        <span class="text-xs font-medium text-text-secondary">
          Securely save card for 1-click booking on Otobisi
        </span>
      </label>

      <div
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
      >
        <Icon name="ph:shield-check-bold" class="w-4 h-4" />
        <span>PCI-DSS Compliant</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const cardNumber = ref("4215 •••••••• 1084");
const cardExpiry = ref("08 / 27");
const cardCvv = ref("•••");
const saveCard = ref(true);
</script>