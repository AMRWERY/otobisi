<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
        <Icon name="ph:lock-key-fill" class="w-4 h-4" />
        <span>Data Privacy & Security</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-text-primary">
        Privacy Policy
      </h1>
      <p class="text-xs sm:text-sm text-text-secondary leading-relaxed">
        Last updated: January 2025 • Compliant with Egyptian Personal Data Protection Law (Law No. 151 of 2020)
      </p>
    </div>

    <!-- Privacy Content Container -->
    <div
      class="p-6 sm:p-10 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-8 text-xs sm:text-sm text-text-secondary leading-relaxed">
      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">1. Overview & Commitment</h2>
        <p>
          Otobisi Egypt SAE ("Otobisi", "we", "our") is dedicated to safeguarding the privacy and personal data of every
          traveler. We strictly adhere to Egyptian Law No. 151 of 2020 concerning Personal Data Protection and follow
          international encryption standards.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">2. Information We Collect</h2>
        <p>To process your intercity bus reservations and comply with transit manifests, we collect:</p>
        <ul class="list-disc list-inside space-y-1.5 ps-2 text-text-secondary">
          <li><strong>Identity Information:</strong> Passenger full name and National ID / Passport number (mandated by
            Egyptian Highway Traffic Police).</li>
          <li><strong>Contact Details:</strong> Mobile phone number (for SMS/WhatsApp e-ticket delivery) and email
            address.</li>
          <li><strong>Payment Tokens:</strong> Encrypted transaction reference codes (raw credit card numbers are
            processed directly by certified CBE-regulated gateways and never stored on our servers).</li>
          <li><strong>Technical Data:</strong> IP address, device type, and locale preferences for fraud prevention.
          </li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">3. How Your Information Is Used</h2>
        <p>Your data is used solely to:</p>
        <ul class="list-disc list-inside space-y-1.5 ps-2 text-text-secondary">
          <li>Issue digital QR tickets and reserve confirmed seats with partner operators.</li>
          <li>Provide live departure alerts, delays, and WhatsApp travel assistance.</li>
          <li>Process refunds to your original payment method (Vodafone Cash, Fawry, Bank Card).</li>
          <li>Comply with Egyptian Ministry of Transport safety regulations and legal obligations.</li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">4. Data Sharing with Bus Operators</h2>
        <p>
          We only share necessary passenger information (name, seat assignment, National ID) with the specific bus
          operator operating your booked departure to generate the mandatory passenger manifest. We do not sell or rent
          passenger data to third parties.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">5. 256-Bit SSL Security & Retention</h2>
        <p>
          All data transmitted between your browser and our servers is encrypted using 256-bit SSL protocols. Passenger
          records are retained securely in compliance with Egyptian financial audit requirements.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-base sm:text-lg font-bold text-text-primary">6. Contact Our Data Protection Officer</h2>
        <p>
          If you have questions regarding your data privacy or wish to request data correction, contact our Data
          Protection Officer at <a href="mailto:privacy@otobisi.com"
            class="text-[#EA580C] underline font-semibold">privacy@otobisi.com</a>.
        </p>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
useSeo({
  title: "Privacy Policy | Otobisi Egypt",
  description:
    "Learn how Otobisi Egypt protects your personal information in compliance with Egyptian Personal Data Protection Law (Law No. 151 of 2020) and 256-bit SSL encryption.",
  private: false,
});
</script>
