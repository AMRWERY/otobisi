<template>
  <footer
    class="border-t border-border/70 bg-surface-0 dark:bg-[#0B0F19] text-text-secondary text-xs transition-colors duration-200"
  >
    <!-- ─── 1. TOP TRUST & ENDORSEMENTS BAR ─── -->
    <div class="border-b border-border/60 bg-surface-1/50 dark:bg-[#0E1424]">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-[11px]"
      >
        <!-- Left: Endorsements & Security -->
        <div
          class="flex flex-wrap items-center gap-4 sm:gap-6 text-text-secondary"
        >
          <div class="flex items-center gap-1.5">
            <Icon
              name="ph:check-circle-fill"
              class="w-4 h-4 text-emerald-500 shrink-0"
            />
            <span class="font-medium"
              >Licensed by Egypt Ministry of Transport (MOT)</span
            >
          </div>

          <div class="flex items-center gap-1.5">
            <Icon
              name="ph:lock-key-fill"
              class="w-4 h-4 text-blue-500 shrink-0"
            />
            <span class="font-medium"
              >256-Bit SSL Encrypted Booking System</span
            >
          </div>

          <div class="flex items-center gap-1.5">
            <Icon
              name="ph:phone-call-fill"
              class="w-4 h-4 text-[#EA580C] shrink-0"
            />
            <span>
              24/7 National Transit Hotline:
              <a
                href="tel:19999"
                class="font-bold text-[#EA580C] dark:text-orange-400 hover:underline"
                >19XXX</a
              >
            </span>
          </div>
        </div>

        <!-- Right: Certified Payments -->
        <div class="flex items-center gap-2.5">
          <span
            class="text-[10px] uppercase font-bold text-text-muted tracking-wider"
          >
            Certified Payments:
          </span>
          <div
            class="flex items-center gap-1 font-mono text-[9px] font-black tracking-wider"
          >
            <span
              class="px-2 py-0.5 rounded bg-surface-0 dark:bg-[#131B2E] border border-border/70 text-text-primary"
              >FAWRY</span
            >
            <span
              class="px-2 py-0.5 rounded bg-surface-0 dark:bg-[#131B2E] border border-border/70 text-text-primary"
              >MEEZA</span
            >
            <span
              class="px-2 py-0.5 rounded bg-surface-0 dark:bg-[#131B2E] border border-border/70 text-[#EA580C] dark:text-orange-400 font-bold"
              >VODAFONE CASH</span
            >
            <span
              class="px-2 py-0.5 rounded bg-surface-0 dark:bg-[#131B2E] border border-border/70 text-text-primary"
              >VISA / MC</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- ─── 2. MAIN 4-COLUMN + BRAND GRID (DESKTOP) ─── -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10"
      >
        <!-- ── COL 1: BRAND INFORMATION ── -->
        <div class="lg:col-span-4 space-y-4">
          <!-- Logo -->
          <nuxt-link-locale
            to="/"
            class="flex items-center gap-3 group select-none"
          >
            <div
              class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] flex items-center justify-center text-white shadow-md shadow-orange-950/15 group-hover:scale-105 transition-transform duration-200"
            >
              <Icon name="ph:bus-duotone" class="w-6 h-6 text-white" />
            </div>
            <div class="flex flex-col">
              <span
                class="text-xl font-black tracking-tight text-text-primary group-hover:text-[#EA580C] transition-colors"
              >
                Otobisi<span class="text-[#EA580C]">.</span>
              </span>
              <span
                class="text-[10px] text-text-muted font-medium leading-none mt-0.5"
              >
                Egypt Intercity Coach Network
              </span>
            </div>
          </nuxt-link-locale>

          <!-- Bio -->
          <p class="text-xs text-text-secondary leading-relaxed max-w-sm">
            Egypt's premier intercity bus reservation platform. Seamless booking
            across Cairo, Alexandria, Sharm El Sheikh, Hurghada, Luxor, and all
            27 governorates.
          </p>

          <!-- Real-Time Seat Synchronisation Pill -->
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-[11px] font-bold text-emerald-800 dark:text-emerald-300"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
              ></span>
            </span>
            <span>Real-time seat synchronisation</span>
          </div>
        </div>

        <!-- ── COL 2: COMPANY ── -->
        <div class="hidden md:block lg:col-span-2 space-y-3">
          <h4
            class="text-[11px] font-black uppercase tracking-wider text-text-primary"
          >
            COMPANY
          </h4>
          <ul class="space-y-2.5 text-xs">
            <li>
              <nuxt-link-locale
                to="/help#about"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                About Us
              </nuxt-link-locale>
            </li>
            <li class="flex items-center gap-1.5">
              <nuxt-link-locale
                to="/help#careers"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Careers
              </nuxt-link-locale>
              <span
                class="bg-[#EA580C] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider"
              >
                Hiring
              </span>
            </li>
            <li>
              <nuxt-link-locale
                to="/help"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Contact Us
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                to="/help#press"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Press & Media Kit
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                to="/help#stations"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Station Directory
              </nuxt-link-locale>
            </li>
          </ul>
        </div>

        <!-- ── COL 3: FOR TRAVELERS ── -->
        <div class="hidden md:block lg:col-span-2 space-y-3">
          <h4
            class="text-[11px] font-black uppercase tracking-wider text-text-primary"
          >
            FOR TRAVELERS
          </h4>
          <ul class="space-y-2.5 text-xs">
            <li>
              <nuxt-link-locale
                to="/help"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Help Center & Support
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                to="/help#cancellation"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Cancellation & Refund Policy
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                to="/help#faq"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Frequently Asked Questions (FAQ)
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                to="/help#luggage"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Luggage & Baggage Rules
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                to="/help#rights"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Passenger Rights (Egypt MOT)
              </nuxt-link-locale>
            </li>
          </ul>
        </div>

        <!-- ── COL 4: FOR BUS OPERATORS ── -->
        <div class="hidden md:block lg:col-span-2 space-y-3">
          <h4
            class="text-[11px] font-black uppercase tracking-wider text-text-primary"
          >
            FOR BUS OPERATORS
          </h4>
          <ul class="space-y-2.5 text-xs">
            <li>
              <nuxt-link-locale
                to="/operators"
                class="font-extrabold text-[#EA580C] dark:text-orange-400 hover:underline flex items-center gap-1"
              >
                <span>Partner With Us</span>
                <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5" />
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                to="/operators"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Fleet Operator Portal
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                to="/help#api"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Terminal Integration API
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                to="/operators"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Operator Success Stories
              </nuxt-link-locale>
            </li>
            <li>
              <nuxt-link-locale
                to="/help#safety"
                class="text-text-secondary hover:text-[#EA580C] transition-colors"
              >
                Safety Standards Compliance
              </nuxt-link-locale>
            </li>
          </ul>
        </div>

        <!-- ── COL 5: FOLLOW US & URGENT HELP ── -->
        <div class="hidden md:block lg:col-span-2 space-y-4">
          <h4
            class="text-[11px] font-black uppercase tracking-wider text-text-primary"
          >
            FOLLOW US
          </h4>
          <p class="text-[11px] text-text-secondary leading-relaxed">
            Stay updated with highway schedule releases, travel alerts, and
            regional discounts.
          </p>

          <!-- Social Icons Row -->
          <div class="flex items-center gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              class="w-8 h-8 rounded-lg bg-surface-1 dark:bg-[#131B2E] hover:bg-surface-2 dark:hover:bg-[#1B2438] border border-border/70 flex items-center justify-center text-text-secondary hover:text-[#EA580C] transition-colors"
            >
              <Icon name="ri:facebook-fill" class="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="w-8 h-8 rounded-lg bg-surface-1 dark:bg-[#131B2E] hover:bg-surface-2 dark:hover:bg-[#1B2438] border border-border/70 flex items-center justify-center text-text-secondary hover:text-[#EA580C] transition-colors"
            >
              <Icon name="ri:instagram-line" class="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Twitter"
              class="w-8 h-8 rounded-lg bg-surface-1 dark:bg-[#131B2E] hover:bg-surface-2 dark:hover:bg-[#1B2438] border border-border/70 flex items-center justify-center text-text-secondary hover:text-[#EA580C] transition-colors"
            >
              <Icon name="ri:twitter-x-fill" class="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="w-8 h-8 rounded-lg bg-surface-1 dark:bg-[#131B2E] hover:bg-surface-2 dark:hover:bg-[#1B2438] border border-border/70 flex items-center justify-center text-text-secondary hover:text-[#EA580C] transition-colors"
            >
              <Icon name="ri:linkedin-fill" class="w-4 h-4" />
            </a>
          </div>

          <!-- Urgent Booking Help Card -->
          <div
            class="p-3 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/40 dark:from-[#1A1824] dark:to-[#141B2E] border border-orange-200/70 dark:border-orange-900/40 space-y-1 text-start"
          >
            <div class="flex items-center gap-2">
              <span
                class="w-6 h-6 rounded-full bg-[#EA580C] text-white flex items-center justify-center text-[10px] font-black shrink-0"
              >
                24/7
              </span>
              <p class="text-[11px] font-bold text-text-primary leading-tight">
                Need Urgent Booking Help?
              </p>
            </div>
            <a
              href="tel:19999"
              class="block text-[11px] font-extrabold text-[#EA580C] dark:text-orange-400 hover:underline pt-1"
            >
              Dial Hotline 19XXX or WhatsApp
            </a>
          </div>
        </div>
      </div>

      <!-- ─── 3. MOBILE-FIRST ACCORDIONS (< 768px Viewport) ─── -->
      <div class="block md:hidden mt-8">
        <LazyVAccordion
          v-model="openAccordions"
          :items="footerAccordionItems"
          :multiple="true"
        >
          <!-- Slot: Company -->
          <template #company>
            <div class="space-y-2 text-xs">
              <nuxt-link-locale
                to="/help#about"
                class="block text-text-secondary hover:text-[#EA580C]"
                >About Us</nuxt-link-locale
              >
              <nuxt-link-locale
                to="/help#careers"
                class="block text-text-secondary hover:text-[#EA580C]"
                >Careers</nuxt-link-locale
              >
              <nuxt-link-locale
                to="/help"
                class="block text-text-secondary hover:text-[#EA580C]"
                >Contact Us</nuxt-link-locale
              >
              <nuxt-link-locale
                to="/help#press"
                class="block text-text-secondary hover:text-[#EA580C]"
                >Press & Media Kit</nuxt-link-locale
              >
              <nuxt-link-locale
                to="/help#stations"
                class="block text-text-secondary hover:text-[#EA580C]"
                >Station Directory</nuxt-link-locale
              >
            </div>
          </template>

          <!-- Slot: For Travelers -->
          <template #travelers>
            <div class="space-y-2 text-xs">
              <nuxt-link-locale
                to="/help"
                class="block text-text-secondary hover:text-[#EA580C]"
                >Help Center</nuxt-link-locale
              >
              <nuxt-link-locale
                to="/help#cancellation"
                class="block text-text-secondary hover:text-[#EA580C]"
                >Cancellation Policy</nuxt-link-locale
              >
              <nuxt-link-locale
                to="/help#faq"
                class="block text-text-secondary hover:text-[#EA580C]"
                >FAQ & Baggage</nuxt-link-locale
              >
              <nuxt-link-locale
                to="/help#rights"
                class="block text-text-secondary hover:text-[#EA580C]"
                >Passenger Rights (Egypt MOT)</nuxt-link-locale
              >
            </div>
          </template>

          <!-- Slot: For Bus Operators -->
          <template #operators>
            <div class="space-y-2 text-xs">
              <nuxt-link-locale
                to="/operators"
                class="block font-bold text-[#EA580C]"
                >Partner With Us →</nuxt-link-locale
              >
              <nuxt-link-locale
                to="/operators"
                class="block text-text-secondary hover:text-[#EA580C]"
                >Fleet Operator Portal</nuxt-link-locale
              >
              <nuxt-link-locale
                to="/help#api"
                class="block text-text-secondary hover:text-[#EA580C]"
                >Terminal Integration API</nuxt-link-locale
              >
              <nuxt-link-locale
                to="/help#safety"
                class="block text-text-secondary hover:text-[#EA580C]"
                >Safety Standards Compliance</nuxt-link-locale
              >
            </div>
          </template>

          <!-- Slot: Follow Us -->
          <template #social>
            <div class="pt-1 space-y-3 text-xs">
              <div class="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                  class="w-8 h-8 rounded-lg bg-surface-0 dark:bg-[#131B2E] border border-border flex items-center justify-center text-text-secondary hover:text-[#EA580C]"
                >
                  <Icon name="ri:facebook-fill" class="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  class="w-8 h-8 rounded-lg bg-surface-0 dark:bg-[#131B2E] border border-border flex items-center justify-center text-text-secondary hover:text-[#EA580C]"
                >
                  <Icon name="ri:instagram-line" class="w-4 h-4" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener"
                  aria-label="X Twitter"
                  class="w-8 h-8 rounded-lg bg-surface-0 dark:bg-[#131B2E] border border-border flex items-center justify-center text-text-secondary hover:text-[#EA580C]"
                >
                  <Icon name="ri:twitter-x-fill" class="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                  class="w-8 h-8 rounded-lg bg-surface-0 dark:bg-[#131B2E] border border-border flex items-center justify-center text-text-secondary hover:text-[#EA580C]"
                >
                  <Icon name="ri:linkedin-fill" class="w-4 h-4" />
                </a>
              </div>
              <a
                href="tel:19999"
                class="block text-xs font-bold text-[#EA580C]"
              >
                Hotline: 19XXX (24/7)
              </a>
            </div>
          </template>
        </LazyVAccordion>
      </div>
    </div>

    <!-- ─── 4. BOTTOM LEGAL & SELECTORS BAR ─── -->
    <div class="border-t border-border/60 bg-surface-1/40 dark:bg-[#0E1424]">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]"
      >
        <!-- Left / Copyright & Policies -->
        <div
          class="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-text-muted"
        >
          <span>© 2025 Otobisi Egypt SAE. All rights reserved.</span>
          <span class="hidden sm:inline">•</span>
          <nuxt-link-locale
            to="/help#terms"
            class="hover:text-text-primary transition-colors"
          >
            Terms of Service
          </nuxt-link-locale>
          <span>•</span>
          <nuxt-link-locale
            to="/help#privacy"
            class="hover:text-text-primary transition-colors"
          >
            Privacy Policy
          </nuxt-link-locale>
          <span>•</span>
          <button
            type="button"
            class="hover:text-text-primary transition-colors cursor-pointer"
            @click="openCookieSettings"
          >
            Cookie Preferences
          </button>
        </div>

        <!-- Right / Interactive Language & Currency Selectors -->
        <div class="flex items-center gap-2">
          <!-- Language Selector Dropdown -->
          <div class="relative">
            <button
              type="button"
              class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface-0 dark:bg-[#131B2E] hover:bg-surface-2 dark:hover:bg-[#1B2438] border border-border/80 text-[11px] font-semibold text-text-primary transition-colors cursor-pointer"
              @click="
                langMenuOpen = !langMenuOpen;
                currencyMenuOpen = false;
              "
            >
              <Icon name="ph:globe-bold" class="w-3.5 h-3.5 text-[#EA580C]" />
              <span>English (US)</span>
              <Icon
                name="ph:caret-down-bold"
                class="w-3 h-3 text-text-muted transition-transform"
                :class="{ 'rotate-180': langMenuOpen }"
              />
            </button>
            <div
              v-if="langMenuOpen"
              class="absolute bottom-full mb-1.5 w-36 rounded-xl bg-surface-0 dark:bg-[#131B2E] border border-border shadow-xl p-1 z-30 right-0"
            >
              <button
                type="button"
                class="w-full text-start px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#EA580C] hover:bg-surface-1 dark:hover:bg-[#1B2438] transition-colors cursor-pointer"
                @click="langMenuOpen = false"
              >
                English (US)
              </button>
            </div>
          </div>

          <!-- Currency Selector Dropdown -->
          <div class="relative">
            <button
              type="button"
              class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface-0 dark:bg-[#131B2E] hover:bg-surface-2 dark:hover:bg-[#1B2438] border border-border/80 text-[11px] font-semibold text-text-primary transition-colors cursor-pointer"
              @click="
                currencyMenuOpen = !currencyMenuOpen;
                langMenuOpen = false;
              "
            >
              <span class="font-extrabold text-[#EA580C]">{{
                selectedCurrency.code
              }}</span>
              <span>{{ selectedCurrency.label }}</span>
              <Icon
                name="ph:caret-down-bold"
                class="w-3 h-3 text-text-muted transition-transform"
                :class="{ 'rotate-180': currencyMenuOpen }"
              />
            </button>
            <div
              v-if="currencyMenuOpen"
              class="absolute bottom-full mb-1.5 w-36 rounded-xl bg-surface-0 dark:bg-[#131B2E] border border-border shadow-xl p-1 z-30 right-0"
            >
              <button
                v-for="curr in currencies"
                :key="curr.code"
                type="button"
                class="w-full text-start px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-surface-1 dark:hover:bg-[#1B2438] transition-colors flex items-center justify-between cursor-pointer"
                :class="{
                  'text-[#EA580C] font-bold':
                    selectedCurrency.code === curr.code,
                }"
                @click="
                  selectedCurrency = curr;
                  currencyMenuOpen = false;
                "
              >
                <span>{{ curr.code }}</span>
                <span class="text-text-muted text-[10px]">{{
                  curr.symbol
                }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import type { AccordionItem } from "~/types/shared/VAccordion";

// ─── Mobile Accordion Items (For Travelers active by default as in spec) ─────
const openAccordions = ref<(string | number)[]>(["travelers"]);

const footerAccordionItems: AccordionItem[] = [
  { id: "company", title: "Company" },
  { id: "travelers", title: "For Travelers (Active)", active: true },
  { id: "operators", title: "For Bus Operators" },
  { id: "social", title: "Follow Us" },
];

// ─── Currency Selector ───────────────────────────────────────────────────────
const langMenuOpen = ref(false);
const currencyMenuOpen = ref(false);

const currencies = [
  { code: "EGP", label: "EGP (ج.م)", symbol: "ج.م" },
  { code: "USD", label: "USD ($)", symbol: "$" },
  { code: "EUR", label: "EUR (€)", symbol: "€" },
  { code: "SAR", label: "SAR (ر.س)", symbol: "ر.س" },
];

const selectedCurrency = ref(currencies[0]);

const openCookieSettings = () => {
  alert("Cookie preferences are up to date.");
};

// Close dropdowns on outside click
onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".relative")) {
        langMenuOpen.value = false;
        currencyMenuOpen.value = false;
      }
    });
  }
});
</script>