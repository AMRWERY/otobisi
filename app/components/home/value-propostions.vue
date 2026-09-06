<template>
  <div>
    <section class="bg-surface-1 border-y border-border py-16">
      <div class="text-center max-w-xl mx-auto mb-10">
        <span
          class="text-[11px] font-bold tracking-wider text-amber-600 uppercase"
          >Built for Reliable Journeys</span
        >
        <h2 class="text-2xl sm:text-3xl font-extrabold text-text-primary mt-1">
          Why Egyptians & travelers trust Otobisi
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div
          class="bg-surface-2 border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div
              class="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-amber-600 mb-4"
            >
              <Icon name="ph:arrows-split-bold" class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-base text-text-primary mb-2">
              Compare all companies
            </h3>
            <p class="text-xs text-text-secondary leading-relaxed">
              Browse timetables, seat classes (VIP, Classic, Royal, Sleeper),
              and real-time fares from BlueBus, Go Bus, West Delta, and Super
              Jet side-by-side.
            </p>
          </div>
          <div
            class="mt-6 pt-3 border-t border-border flex items-center gap-1.5 text-[11px] font-bold text-text-secondary"
          >
            <Icon
              name="ph:check-circle-bold"
              class="w-3.5 h-3.5 text-emerald-600"
            />
            <span>Zero markups guaranteed</span>
          </div>
        </div>

        <!-- Card 2 -->
        <div
          class="bg-surface-2 border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div
              class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 mb-4"
            >
              <Icon name="ph:wallet-bold" class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-base text-text-primary mb-2">
              100% Secure Egyptian Payments
            </h3>
            <p class="text-xs text-text-secondary leading-relaxed">
              Pay in Egyptian Pounds via national Meeza cards, Fawry reference
              codes, Vodafone Cash, InstaPay, or international Visa &
              Mastercard.
            </p>
          </div>
          <div
            class="mt-6 pt-3 border-t border-border flex items-center gap-1.5 text-[11px] font-bold text-text-secondary"
          >
            <Icon
              name="ph:shield-check-bold"
              class="w-3.5 h-3.5 text-amber-600"
            />
            <span>PCI-DSS Tier-1 Compliant</span>
          </div>
        </div>

        <!-- Card 3 -->
        <div
          class="bg-surface-2 border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div
              class="w-10 h-10 rounded-xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-700 mb-4"
            >
              <Icon name="ph:arrow-counter-clockwise-bold" class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-base text-text-primary mb-2">
              Instant refund & easy cancellation
            </h3>
            <p class="text-xs text-text-secondary leading-relaxed">
              Plans change? Cancel your ticket up to 3 hours prior to departure
              for instant credit to your Otobisi wallet or prompt bank account
              reversal.
            </p>
          </div>
          <div
            class="mt-6 pt-3 border-t border-border flex items-center gap-1.5 text-[11px] font-bold text-text-secondary"
          >
            <Icon
              name="ph:arrows-clockwise-bold"
              class="w-3.5 h-3.5 text-[#A1331B]"
            />
            <span>Automated 1-click refunds</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup></script>
