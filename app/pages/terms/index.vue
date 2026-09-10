<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:file-text-bold" class="w-4 h-4" />
        <span>Legal Terms</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-text-primary">
        Terms of Service
      </h1>
      <p class="text-xs sm:text-sm text-text-secondary leading-relaxed">
        Last updated: January 2025 • Governed by Egyptian Law & Ministry of Transport Regulations
      </p>
    </div>

    <!-- Terms Content Container -->
    <div class="p-6 sm:p-10 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-8 text-xs sm:text-sm text-text-secondary leading-relaxed">
      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Otobisi platform (otobisi.com, mobile applications, and authorized ticketing interfaces), you agree to be bound by these Terms of Service. Otobisi Egypt SAE ("Otobisi", "we", "us") acts as an authorized digital reservation platform connecting passengers with licensed Egyptian bus transport operators.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">2. Ticket Booking & Electronic Receipts</h2>
        <p>
          A booking is confirmed once payment is authorized and a unique Booking Reference Code along with a digital QR ticket is issued. Passengers must present their electronic ticket QR code along with a matching official government National ID or Passport at the departure terminal.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">3. Fares & Certified Payments</h2>
        <p>
          All ticket prices displayed are inclusive of official Ministry of Transport road transit tariffs and mandatory passenger accidental insurance. Payments via Visa, Mastercard, Meeza, Fawry, and Egyptian mobile wallets are processed through licensed Central Bank of Egypt (CBE) compliant payment gateways.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">4. Cancellations & Refund Rights</h2>
        <p>
          Ticket cancellations are governed by our official <nuxt-link-locale to="/cancellation" class="text-[#EA580C] underline font-semibold">Cancellation Policy</nuxt-link-locale>. Full refunds are available for requests made more than 24 hours prior to scheduled departure. Trips cancelled by the operator entitle passengers to an immediate 100% full refund.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">5. Passenger Conduct & Prohibited Items</h2>
        <p>
          Passengers must arrive at the boarding platform at least 30 minutes before departure. Smoking (including e-cigarettes), carriage of hazardous flammables, unpackaged perishables, and disruptive behavior are strictly prohibited by Egyptian transit police.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">6. Governing Law & Jurisdiction</h2>
        <p>
          These Terms of Service are governed by the laws of the Arab Republic of Egypt. Any legal disputes arising shall fall under the exclusive jurisdiction of the competent courts of Cairo, Egypt.
        </p>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
useSeo({
  title: "Terms of Service | Otobisi Egypt",
  description:
    "Official Terms of Service and user agreement for Otobisi Egypt SAE intercity bus reservations, payments, and ticketing services.",
  private: false,
});
</script>
