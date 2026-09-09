<template>
  <div
    class="bg-surface-1 border border-border rounded-2xl p-5 sm:p-6 shadow-xs"
  >
    <!-- Header -->
    <div class="flex items-start gap-3 mb-5">
      <div
        class="w-10 h-10 rounded-xl bg-orange-500/10 text-[#A1331B] dark:text-orange-400 flex items-center justify-center shrink-0"
      >
        <Icon name="ph:envelope-simple-bold" class="w-5 h-5" />
      </div>
      <div>
        <h3 class="text-base font-extrabold text-text-primary">
          Digital Boarding Pass Delivery
        </h3>
        <p class="text-xs text-text-secondary mt-0.5">
          Where should we deliver your PDF invoice & terminal QR pass?
        </p>
      </div>
    </div>

    <!-- Inputs Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Email Address -->
      <div>
        <label class="block text-xs font-semibold text-text-primary mb-1.5">
          Email Address for E-Ticket
        </label>
        <div
          class="relative flex items-center bg-surface-2 border border-border rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500"
        >
          <input
            v-model="email"
            type="email"
            class="w-full bg-transparent border-0 focus:border-0 ring-0 focus:ring-0 outline-none focus:outline-none p-0 text-xs sm:text-sm font-semibold text-text-primary placeholder:text-text-muted"
            placeholder="your.email@example.com"
          />
          <Icon
            name="ph:check-circle-bold"
            class="w-4 h-4 text-emerald-500 shrink-0 ms-2"
          />
        </div>
        <span class="text-[11px] text-text-muted mt-1 block">
          Official PDF ticket sent instantly after payment
        </span>
      </div>

      <!-- WhatsApp Updates Card -->
      <div
        class="flex items-center justify-between p-3.5 rounded-xl bg-surface-2 border border-border"
      >
        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5"
          >
            <Icon name="ph:whatsapp-logo-bold" class="w-4 h-4" />
          </div>
          <div>
            <span class="font-bold text-xs text-text-primary block">
              Live WhatsApp Updates
            </span>
            <span class="text-[11px] text-text-muted block">
              Gate changes, bus live tracking & delays
            </span>
          </div>
        </div>

        <label
          class="relative inline-flex items-center cursor-pointer select-none ms-2"
        >
          <input
            v-model="whatsappAlerts"
            type="checkbox"
            class="sr-only peer"
          />
          <div
            class="w-9 h-5 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#A1331B]"
          ></div>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const email = ref("amr_mohamed@exmaple.com");

const whatsappAlerts = ref(true);
</script>