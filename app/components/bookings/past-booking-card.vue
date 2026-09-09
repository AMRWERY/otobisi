<template>
  <div class="mb-8">
    <!-- Section Title & Subtitle -->
    <div class="flex items-center justify-between gap-3 mb-3.5">
      <div class="flex items-center gap-2">
        <h2 class="text-base sm:text-lg font-black text-text-primary tracking-tight">
          Past Trips
        </h2>
        <span
          class="w-5 h-5 rounded-full bg-surface-2 text-text-muted border border-border flex items-center justify-center text-[10px] font-black"
        >
          2
        </span>
      </div>
      <span class="text-xs text-text-muted font-medium hidden sm:inline">
        Archived Journeys & Tax Invoices
      </span>
    </div>

    <!-- Trips List -->
    <div class="flex flex-col gap-4">
      <!-- 1. Completed Trip: Super Jet -->
      <div
        class="bg-surface-1 border border-border rounded-2xl shadow-2xs hover:shadow-xs transition-all overflow-hidden"
      >
        <!-- Top Meta -->
        <div
          class="px-4 sm:px-6 py-2.5 bg-surface-2/60 border-b border-border flex flex-wrap items-center justify-between gap-3 text-xs"
        >
          <div class="flex items-center gap-2.5">
            <span
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20"
            >
              <Icon name="ph:check-circle-bold" class="w-3.5 h-3.5" />
              <span>Completed Journey</span>
            </span>

            <span class="font-mono text-xs text-text-secondary">
              PNR: <strong class="text-text-primary">#OTB-721940-EG</strong>
            </span>
          </div>

          <span class="text-[11px] text-text-muted font-medium ms-auto sm:ms-0">
            Traveled on Thu, 12 Sep 2024
          </span>
        </div>

        <!-- Body -->
        <div class="p-4 sm:p-5">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <!-- Operator -->
            <div class="md:col-span-3 flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-text-muted shrink-0"
              >
                <Icon name="ph:bus-bold" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-bold text-sm text-text-primary">
                  Super Jet
                </h3>
                <span class="text-[11px] text-text-secondary block">
                  VIP Express Non-Stop
                </span>
                <span class="text-[10px] text-text-muted">
                  1 Passenger • Seat 12 (Single)
                </span>
              </div>
            </div>

            <!-- Route Info -->
            <div class="md:col-span-5 flex items-center justify-between gap-2 text-center">
              <div class="text-start">
                <span class="font-black text-sm text-text-primary block">02:00 PM</span>
                <span class="text-xs font-bold text-text-primary">Alexandria</span>
                <span class="text-[10px] text-text-muted block">Moharam Bek Terminal</span>
              </div>

              <div class="flex flex-col items-center">
                <span class="text-[10px] text-text-muted font-medium">3h 00m</span>
                <div class="relative w-20 my-0.5 flex items-center justify-center">
                  <span class="flex-1 h-px bg-border"></span>
                  <Icon name="ph:arrow-right-bold" class="w-3 h-3 text-text-muted mx-1 rtl:rotate-180" />
                  <span class="flex-1 h-px bg-border"></span>
                </div>
                <span class="text-[9px] text-text-muted">Agricultural Rd</span>
              </div>

              <div class="text-end">
                <span class="font-black text-sm text-text-primary block">05:00 PM</span>
                <span class="text-xs font-bold text-text-primary">Cairo</span>
                <span class="text-[10px] text-text-muted block">Tahrir Square Hub</span>
              </div>
            </div>

            <!-- Price & Actions -->
            <div class="md:col-span-4 flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-border">
              <div class="text-start md:text-end">
                <span class="text-[9px] font-bold text-text-muted uppercase block">Fare Settled</span>
                <span class="font-black text-base text-text-primary">140.00 <span class="text-xs font-bold text-text-secondary">EGP</span></span>
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border text-xs font-bold text-text-primary transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                  @click="downloadInvoice('OTB-721940-EG')"
                >
                  <Icon name="ph:receipt-bold" class="w-3.5 h-3.5 text-text-muted" />
                  <span>Tax Invoice</span>
                </button>

                <nuxt-link-locale
                  to="/trip/gb-01"
                  class="px-3 py-1.5 rounded-xl bg-[#A1331B] hover:bg-[#8B2B16] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1"
                >
                  <Icon name="ph:arrows-clockwise-bold" class="w-3.5 h-3.5" />
                  <span>Book Again</span>
                </nuxt-link-locale>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Cancelled & Refunded Trip: Blue Bus -->
      <div
        class="bg-surface-1/80 border border-border rounded-2xl shadow-2xs transition-all overflow-hidden opacity-90 hover:opacity-100"
      >
        <!-- Top Meta -->
        <div
          class="px-4 sm:px-6 py-2.5 bg-surface-2/60 border-b border-border flex flex-wrap items-center justify-between gap-3 text-xs"
        >
          <div class="flex items-center gap-2.5">
            <span
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
            >
              <Icon name="ph:x-circle-bold" class="w-3.5 h-3.5" />
              <span>Cancelled • 100% Refunded</span>
            </span>

            <span class="font-mono text-xs text-text-secondary">
              PNR: <strong class="text-text-primary">#OTB-610482-EG</strong>
            </span>
          </div>

          <span class="text-[11px] text-text-muted font-medium ms-auto sm:ms-0">
            Cancelled on Wed, 28 Aug 2024
          </span>
        </div>

        <!-- Body -->
        <div class="p-4 sm:p-5">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <!-- Operator -->
            <div class="md:col-span-3 flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-text-muted shrink-0"
              >
                <Icon name="ph:bus-bold" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-bold text-sm text-text-primary line-through opacity-75">
                  Blue Bus
                </h3>
                <span class="text-[11px] text-text-secondary block">
                  First Class Recliner
                </span>
                <span class="text-[10px] text-text-muted">
                  1 Passenger • Seat 3A
                </span>
              </div>
            </div>

            <!-- Route Info -->
            <div class="md:col-span-5 flex items-center justify-between gap-2 text-center">
              <div class="text-start">
                <span class="font-black text-sm text-text-muted line-through block">07:00 AM</span>
                <span class="text-xs font-bold text-text-primary">Cairo (6th of October)</span>
                <span class="text-[10px] text-text-muted block">8th of October Central</span>
              </div>

              <div class="flex flex-col items-center">
                <span class="text-[10px] text-red-500 font-bold">Trip Cancelled</span>
                <div class="relative w-20 my-0.5 flex items-center justify-center">
                  <span class="flex-1 h-px bg-red-500/30"></span>
                  <Icon name="ph:x-bold" class="w-3 h-3 text-red-500 mx-1" />
                  <span class="flex-1 h-px bg-red-500/30"></span>
                </div>
                <span class="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">Refund processed</span>
              </div>

              <div class="text-end">
                <span class="font-black text-sm text-text-muted line-through block">12:30 PM</span>
                <span class="text-xs font-bold text-text-primary">Hurghada</span>
                <span class="text-[10px] text-text-muted block">El Gouna Terminal</span>
              </div>
            </div>

            <!-- Refund & Action -->
            <div class="md:col-span-4 flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-border">
              <div class="text-start md:text-end">
                <span class="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block">Refund Amount</span>
                <span class="font-black text-base text-emerald-600 dark:text-emerald-400">+260.00 <span class="text-xs font-bold">EGP</span></span>
                <span class="text-[10px] text-text-muted block">To Vodafone Cash (•••• 4118)</span>
              </div>

              <div>
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border text-xs font-bold text-text-primary transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                  @click="viewRefundAdvice('OTB-610482-EG')"
                >
                  <Icon name="ph:file-text-bold" class="w-3.5 h-3.5 text-text-muted" />
                  <span>Refund Advice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const downloadInvoice = (pnr: string) => {
  alert(`Downloading VAT Tax Invoice PDF for PNR ${pnr}...`);
};

const viewRefundAdvice = (pnr: string) => {
  alert(`Official Egyptian MOT Refund Advice Voucher for PNR ${pnr}: +260.00 EGP credited to Vodafone Cash.`);
};
</script>
