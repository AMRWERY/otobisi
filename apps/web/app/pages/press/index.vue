<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:newspaper-bold" class="w-4 h-4" />
        <span>Media Center</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Press & Media Kit
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Official press announcements, brand assets, executive bios, and media contact resources for Otobisi Egypt SAE.
      </p>
    </div>

    <!-- Media Fast Facts -->
    <div class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-6">
      <h2 class="text-lg font-black text-text-primary tracking-tight">Otobisi at a Glance</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <div class="text-xs text-text-muted">Founded</div>
          <div class="text-base font-bold text-text-primary">2023 (Cairo, Egypt)</div>
        </div>
        <div>
          <div class="text-xs text-text-muted">Partner Operators</div>
          <div class="text-base font-bold text-[#EA580C]">30+ Licensed Fleets</div>
        </div>
        <div>
          <div class="text-xs text-text-muted">Annual Bookings</div>
          <div class="text-base font-bold text-text-primary">1.2M+ Passenger Trips</div>
        </div>
        <div>
          <div class="text-xs text-text-muted">Coverage</div>
          <div class="text-base font-bold text-text-primary">All 27 Governorates</div>
        </div>
      </div>
    </div>

    <!-- Press Releases -->
    <div class="space-y-4">
      <h2 class="text-xl font-black text-text-primary tracking-tight">Recent Press Releases</h2>
      <div class="space-y-3">
        <div
          v-for="article in pressReleases"
          :key="article.title"
          class="p-6 rounded-2xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 hover:border-[#EA580C]/40 transition-colors space-y-2"
        >
          <div class="flex items-center gap-3 text-xs text-text-muted">
            <span class="font-bold text-[#EA580C]">{{ article.date }}</span>
            <span>•</span>
            <span>{{ article.source }}</span>
          </div>
          <h3 class="text-base font-bold text-text-primary">{{ article.title }}</h3>
          <p class="text-xs text-text-secondary leading-relaxed">{{ article.summary }}</p>
        </div>
      </div>
    </div>

    <!-- Brand Assets Download Card -->
    <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-[#1A1824] dark:to-[#141B2E] border border-orange-200/70 dark:border-orange-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-[#EA580C] font-bold text-xs uppercase tracking-wider">
          <Icon name="ph:download-simple-bold" class="w-4 h-4" />
          <span>Brand Resources</span>
        </div>
        <h3 class="text-lg sm:text-xl font-black text-text-primary">Official Brand Asset Pack</h3>
        <p class="text-xs text-text-secondary max-w-md">
          Download high-resolution Otobisi SVG logos, product mockups, executive portraits, and brand color guidelines.
        </p>
      </div>
      <a
        href="mailto:press@otobisi.com?subject=Brand Asset Pack Request"
        class="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-orange-700 text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
      >
        Request Brand Kit
      </a>
    </div>

    <!-- Media Inquiries Box -->
    <div class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 text-center space-y-2">
      <h3 class="text-sm font-bold text-text-primary">Journalist & Media Contact</h3>
      <p class="text-xs text-text-secondary">
        For interview requests, transit market statistics, or speaking opportunities, reach our communications desk at:
      </p>
      <a href="mailto:press@otobisi.com" class="text-xs font-extrabold text-[#EA580C] hover:underline">
        press@otobisi.com
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const pressReleases = [
  {
    date: "August 2025",
    source: "Egypt Transport Digest",
    title: "Otobisi Surpasses 1 Million Digital Bus Reservations Across Egypt",
    summary:
      "Rapid adoption of digital QR boarding and nationwide operator sync drives record passenger volume during summer holiday peak.",
  },
  {
    date: "June 2025",
    source: "Cairo Tech Wire",
    title: "Otobisi Partners with Ministry of Transport for Centralized Station Integration",
    summary:
      "New automated gate APIs streamline bus terminal departures at Almaza, Moharam Bek, and Sharm El Sheikh coach stations.",
  },
  {
    date: "March 2025",
    source: "FinTech Egypt",
    title: "Otobisi Expands Real-Time Fawry & Vodafone Cash Ticketing Options",
    summary:
      "Unbanked travelers can now hold seats online and settle instantly at over 150,000 Fawry POS terminals across Egyptian governorates.",
  },
];

useSeo({
  title: "Press & Media Kit | Otobisi Egypt",
  description:
    "Official press announcements, company facts, brand assets, and media contact information for Otobisi Egypt SAE.",
  private: false,
});
</script>
