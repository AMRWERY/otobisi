<template>
  <div class="mt-5 pt-4 border-t border-border flex flex-col gap-4" @click.stop>
    <div>
      <label class="block text-xs font-semibold text-text-primary mb-1.5">
        Mobile Wallet / InstaPay IPA Handle
      </label>
      <div
        class="relative flex items-center bg-surface-1 border border-border rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500"
      >
        <span
          class="text-xs font-bold text-text-muted pe-2 border-e border-border me-2"
        >
          +20
        </span>
        <input
          v-model="walletNumber"
          type="tel"
          class="w-full bg-transparent border-0 focus:border-0 ring-0 focus:ring-0 outline-none focus:outline-none p-0 text-xs sm:text-sm font-semibold text-text-primary placeholder:text-text-muted"
          placeholder="010 1234 5678 or username@instapay"
        />
        <Icon
          name="ph:device-mobile-camera-bold"
          class="w-5 h-5 text-text-muted shrink-0 ms-2"
        />
      </div>
      <span class="text-[11px] text-text-muted mt-1 block">
        You will receive an instant push notification or SMS prompt to authorize
        payment.
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const walletNumber = ref("010 1234 5678");
</script>