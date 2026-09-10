<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Hero / Header -->
    <div class="text-center space-y-4 max-w-3xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:handshake-bold" class="w-4 h-4" />
        <span>Bus Operator Hub</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Grow Your Bus Fleet Revenue with Otobisi
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Join 30+ licensed Egyptian coach operators. Connect your seat inventory to millions of travelers, modernize terminal dispatch, and eliminate counter ticket friction.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <a
          href="#partner-form"
          class="px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          Become a Partner
        </a>
        <nuxt-link-locale
          to="/operators/portal"
          class="px-6 py-3 rounded-xl bg-surface-1 dark:bg-[#131B2E] hover:bg-surface-2 dark:hover:bg-[#1B2438] border border-border/80 text-text-primary font-bold text-xs transition-colors"
        >
          Fleet Operator Portal →
        </nuxt-link-locale>
      </div>
    </div>

    <!-- Key Operator Metrics -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 text-center space-y-1"
      >
        <div class="text-3xl sm:text-4xl font-black text-[#EA580C] dark:text-orange-400">
          {{ stat.value }}
        </div>
        <div class="text-xs font-bold text-text-primary">{{ stat.label }}</div>
        <p class="text-[11px] text-text-muted leading-tight">{{ stat.desc }}</p>
      </div>
    </div>

    <!-- Value Propositions for Fleets -->
    <div class="space-y-6">
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-black text-text-primary tracking-tight">Why Fleets Partner with Otobisi</h2>
        <p class="text-xs sm:text-sm text-text-muted">Designed specifically for the Egyptian transit ecosystem</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-3"
        >
          <div class="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-[#EA580C] flex items-center justify-center mb-2">
            <Icon :name="feature.icon" class="w-6 h-6" />
          </div>
          <h3 class="text-base font-bold text-text-primary">{{ feature.title }}</h3>
          <p class="text-xs text-text-secondary leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>

    <!-- Operator Portal & API Callout Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Portal Card -->
      <div class="p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="w-10 h-10 rounded-xl bg-surface-2 dark:bg-[#1B2438] text-[#EA580C] flex items-center justify-center">
            <Icon name="ph:browsers-bold" class="w-5 h-5" />
          </div>
          <h3 class="text-xl font-black text-text-primary">Fleet Operator Portal</h3>
          <p class="text-xs text-text-secondary leading-relaxed">
            Manage your daily coach departures, seat pricing tiers, driver dispatch manifests, and automated revenue settlements from a single cloud dashboard.
          </p>
        </div>
        <div class="pt-4 border-t border-border/60">
          <nuxt-link-locale
            to="/operators/portal"
            class="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1.5"
          >
            <span>Access Operator Portal</span>
            <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
          </nuxt-link-locale>
        </div>
      </div>

      <!-- API Card -->
      <div class="p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="w-10 h-10 rounded-xl bg-surface-2 dark:bg-[#1B2438] text-[#EA580C] flex items-center justify-center">
            <Icon name="ph:code-bold" class="w-5 h-5" />
          </div>
          <h3 class="text-xl font-black text-text-primary">Terminal Integration API</h3>
          <p class="text-xs text-text-secondary leading-relaxed">
            Connect your existing in-house ticketing ERP, counter POS terminals, and station turnstile scanners seamlessly via high-availability REST webhooks.
          </p>
        </div>
        <div class="pt-4 border-t border-border/60">
          <nuxt-link-locale
            to="/operators/api"
            class="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1.5"
          >
            <span>Explore Developer API</span>
            <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
          </nuxt-link-locale>
        </div>
      </div>
    </div>

    <!-- Success Stories (id="stories") -->
    <div id="stories" class="space-y-6 pt-4">
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-black text-text-primary tracking-tight">Operator Success Stories</h2>
        <p class="text-xs sm:text-sm text-text-muted">Real results from fleet partners across Egypt</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="story in stories"
          :key="story.operator"
          class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-4"
        >
          <div class="flex items-center justify-between">
            <span class="text-base font-black text-text-primary">{{ story.operator }}</span>
            <span class="text-xs font-bold text-[#EA580C]">{{ story.highlight }}</span>
          </div>
          <p class="text-xs text-text-secondary italic leading-relaxed">
            "{{ story.quote }}"
          </p>
          <div class="text-[11px] text-text-muted">
            <span class="font-bold text-text-primary">{{ story.author }}</span> — {{ story.role }}
          </div>
        </div>
      </div>
    </div>

    <!-- Partnership Application Form (id="partner-form") -->
    <div id="partner-form" class="p-8 sm:p-10 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-6 max-w-3xl mx-auto">
      <div class="text-center space-y-1">
        <h2 class="text-2xl font-black text-text-primary">Apply for Fleet Partnership</h2>
        <p class="text-xs text-text-muted">Our commercial team will review your fleet profile and get in touch within 24 hours.</p>
      </div>

      <form @submit.prevent="submitPartnerForm" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-text-primary">Company / Fleet Name</label>
            <input
              v-model="partnerForm.company"
              required
              type="text"
              placeholder="e.g. Nile Express Transit"
              class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-text-primary">Fleet Size (Number of Coaches)</label>
            <select
              v-model="partnerForm.fleetSize"
              class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
            >
              <option value="5-15">5 - 15 Buses</option>
              <option value="16-50">16 - 50 Buses</option>
              <option value="50+">50+ Buses</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-text-primary">Contact Person Name</label>
            <input
              v-model="partnerForm.name"
              required
              type="text"
              placeholder="Full Name"
              class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-text-primary">Direct Phone Number</label>
            <input
              v-model="partnerForm.phone"
              required
              type="tel"
              placeholder="01XXXXXXXXX"
              class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-text-primary">Primary Operating Routes & Governorates</label>
          <textarea
            v-model="partnerForm.routes"
            rows="3"
            placeholder="e.g. Cairo to Hurghada, Alexandria to Matrouh, Cairo to Assiut"
            class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
          ></textarea>
        </div>

        <div v-if="partnerSubmitted" class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
          Partnership request submitted successfully! Our commercial fleet director will contact you promptly.
        </div>

        <button
          type="submit"
          class="w-full py-3 rounded-xl bg-[#EA580C] hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
        >
          Submit Partnership Request
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const stats = [
  { value: "+28%", label: "Average Load Factor Gain", desc: "Filling previously empty off-peak seats" },
  { value: "0%", label: "Counter Cash Leakage", desc: "Digital reconciliation & instant receipts" },
  { value: "150K+", label: "Monthly Search Queries", desc: "High-intent travelers booking trips" },
  { value: "Weekly", label: "Guaranteed Payouts", desc: "Direct automated Egyptian bank deposits" },
];

const features = [
  {
    icon: "ph:chart-line-up-bold",
    title: "Dynamic Revenue Optimization",
    description:
      "Publish seasonal tariffs, early-bird rates, and off-peak incentives with real-time yield management algorithms.",
  },
  {
    icon: "ph:device-tablet-bold",
    title: "Gate QR Validation App",
    description:
      "Equip station conductors and drivers with Android barcode scanning apps that validate tickets even with zero offline internet.",
  },
  {
    icon: "ph:money-bold",
    title: "Automated Financial Settlement",
    description:
      "Consolidated settlement manifests every Monday morning with detailed breakdowns for accounting and tax audits.",
  },
];

const stories = [
  {
    operator: "Red Sea Coastal Fleet",
    highlight: "+34% Summer Occupancy",
    quote:
      "Connecting our Cairo–Hurghada line to Otobisi filled empty mid-day departures that used to run half-empty. Digital boarding has completely removed terminal arguments over seat reservations.",
    author: "Eng. Tarek Fathy",
    role: "Managing Director",
  },
  {
    operator: "Delta Regional Express",
    highlight: "100% Cashless Stations",
    quote:
      "The driver barcode scanning app and Fawry wallet integration gave our passengers instant peace of mind. We grew our fleet from 12 to 25 coaches within 18 months of partnering.",
    author: "Mahmoud El-Sayed",
    role: "Fleet Operations Head",
  },
];

const partnerForm = reactive({
  company: "",
  fleetSize: "16-50",
  name: "",
  phone: "",
  routes: "",
});

const partnerSubmitted = ref(false);

const submitPartnerForm = () => {
  partnerSubmitted.value = true;
  setTimeout(() => {
    partnerForm.company = "";
    partnerForm.name = "";
    partnerForm.phone = "";
    partnerForm.routes = "";
  }, 1000);
};

useSeo({
  title: "Partner With Us | Bus Operator Hub | Otobisi Egypt",
  description:
    "Join 30+ licensed Egyptian coach operators on Otobisi. Maximize bus occupancy, manage digital manifests, and access the Fleet Operator Portal.",
  private: false,
});
</script>
