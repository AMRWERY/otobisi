<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:suitcase-simple-bold" class="w-4 h-4" />
        <span>Baggage Guidelines</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Luggage & Baggage Rules
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Everything you need to know about baggage weight allowances, cargo hold check-in, prohibited items, and lost item recovery on Egyptian buses.
      </p>
    </div>

    <!-- Allowances by Coach Class Grid -->
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-black text-text-primary tracking-tight">Standard Allowances Per Passenger</h2>
        <p class="text-xs text-text-muted mt-0.5">Complimentary luggage included with your ticket</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Carry-On Card -->
        <div class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-4">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-[#EA580C] flex items-center justify-center">
              <Icon name="ph:backpack-bold" class="w-6 h-6" />
            </div>
            <span class="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase">
              Free Onboard
            </span>
          </div>
          <div>
            <h3 class="text-lg font-bold text-text-primary">1 Personal Carry-On Bag</h3>
            <p class="text-xs text-text-secondary mt-1">Up to 7 kg • Must fit in overhead rack or beneath your seat</p>
          </div>
          <ul class="space-y-2 text-xs text-text-secondary border-t border-border/60 pt-3">
            <li class="flex items-center gap-2">
              <Icon name="ph:check-circle-fill" class="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Backpacks, laptop bags, small duffels, handbags</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon name="ph:check-circle-fill" class="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Valuables, medication, electronics & passports</span>
            </li>
          </ul>
        </div>

        <!-- Cargo Luggage Card -->
        <div class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-4">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-[#EA580C] flex items-center justify-center">
              <Icon name="ph:suitcase-rolling-bold" class="w-6 h-6" />
            </div>
            <span class="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase">
              Included
            </span>
          </div>
          <div>
            <h3 class="text-lg font-bold text-text-primary">1 Checked Cargo Suitcase</h3>
            <p class="text-xs text-text-secondary mt-1">Up to 25 kg (Standard) / Up to 32 kg (VIP/Royal)</p>
          </div>
          <ul class="space-y-2 text-xs text-text-secondary border-t border-border/60 pt-3">
            <li class="flex items-center gap-2">
              <Icon name="ph:check-circle-fill" class="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Secured in bus undercarriage luggage hold</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon name="ph:check-circle-fill" class="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Numbered receipt baggage tag handed upon loading</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Excess Baggage & Rates -->
    <div class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-4">
      <div class="flex items-center gap-2 text-[#EA580C] font-bold text-xs uppercase tracking-wider">
        <Icon name="ph:scales-bold" class="w-4 h-4" />
        <span>Additional Weight Policy</span>
      </div>
      <h3 class="text-lg font-bold text-text-primary">Traveling With Extra Luggage?</h3>
      <p class="text-xs text-text-secondary leading-relaxed">
        Additional bags beyond the complimentary allowance are subject to space availability and nominal operator tariffs (typically <strong>25 - 50 EGP per additional 10kg piece</strong>, or <strong>50 - 100 EGP</strong> for an extra full-sized suitcase). Fees are paid directly at the station luggage scale prior to boarding.
      </p>
    </div>

    <!-- Prohibited Items Warning -->
    <div class="p-6 sm:p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-4">
      <div class="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
        <Icon name="ph:warning-octagon-bold" class="w-4 h-4" />
        <span>Egyptian Highway Safety Compliance</span>
      </div>
      <h3 class="text-lg font-bold text-text-primary">Prohibited & Restricted Items</h3>
      <p class="text-xs text-text-secondary leading-relaxed">
        For passenger safety and highway checkpoint regulations, the following items are strictly prohibited from both the cabin and undercarriage cargo hold:
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-text-secondary pt-2">
        <div class="flex items-center gap-2">
          <Icon name="ph:x-circle-fill" class="w-4 h-4 text-rose-500 shrink-0" />
          <span>Flammables, gas cylinders, fuel & chemicals</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="ph:x-circle-fill" class="w-4 h-4 text-rose-500 shrink-0" />
          <span>Unpackaged seafood or perishable raw goods</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="ph:x-circle-fill" class="w-4 h-4 text-rose-500 shrink-0" />
          <span>Firearms, weapons & fireworks without permit</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="ph:x-circle-fill" class="w-4 h-4 text-rose-500 shrink-0" />
          <span>Live pets or animals in passenger compartments</span>
        </div>
      </div>
    </div>

    <!-- Lost Property Protocol Card -->
    <div class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="space-y-1 text-center sm:text-start">
        <div class="text-xs font-bold text-[#EA580C] uppercase tracking-wider">Lost & Found Assistance</div>
        <h3 class="text-lg font-bold text-text-primary">Left something on the bus?</h3>
        <p class="text-xs text-text-secondary max-w-md">
          Keep your luggage tag and ticket number handy. Call 19XXX immediately and our terminal operations team will secure your item.
        </p>
      </div>
      <a
        href="tel:19999"
        class="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-orange-700 text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
      >
        Call Hotline 19XXX
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
useSeo({
  title: "Luggage & Baggage Rules | Otobisi Egypt",
  description:
    "Luggage limits and baggage guidelines for Egyptian bus travelers. Learn about checked baggage weight allowances, carry-on dimensions, excess baggage fees, and lost property recovery.",
  private: false,
});
</script>
