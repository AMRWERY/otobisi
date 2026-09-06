<template>
  <div>
    <footer
      class="bg-surface-1 border-t border-border pt-12 pb-8 text-text-secondary text-xs"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          class="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-border"
        >
          <!-- Col 1: Brand Info -->
          <div class="md:col-span-4">
            <!-- Logo -->
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-sm shadow-orange-500/20"
              >
                <Icon name="ph:bus-duotone" class="w-5 h-5 text-white" />
              </div>
              <div class="flex items-baseline gap-1.5">
                <span
                  class="text-xs font-arabic text-text-muted font-medium hidden sm:inline"
                  >أوتوبيسي</span
                >
                <span class="text-xl font-bold tracking-tight text-text-primary"
                  ><span class="text-amber-600">Otobisi</span></span
                >
              </div>
            </div>
            <p
              class="text-[11px] text-text-secondary leading-relaxed mb-4 mt-2"
            >
              Egypt's trusted intercity transport network connecting Cairo,
              Alexandria, Hurghada, Sharm El Sheikh, Luxor, and Aswan with
              guaranteed seat reservations.
            </p>
            <div
              class="inline-flex items-center gap-2 bg-surface-2 border border-border px-3 py-1.5 rounded-lg text-text-primary font-semibold text-[11px]"
            >
              <Icon
                name="ph:phone-call-fill"
                class="w-3.5 h-3.5 text-[#A1331B]"
              />
              <span>24/7 Hotline: +20 2 19XXX</span>
            </div>
          </div>

          <!-- Col 2: Top Corridors -->
          <div class="md:col-span-3">
            <h5 class="font-bold text-text-primary mb-3 text-xs">
              Top Corridors
            </h5>
            <ul class="space-y-2 text-[11px]">
              <li>
                <nuxt-link-locale to="#" class="hover:text-text-primary"
                  >Cairo → Alexandria Express</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="#" class="hover:text-text-primary"
                  >Cairo → Sharm El Sheikh</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="#" class="hover:text-text-primary"
                  >Cairo → Hurghada Super Jet</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="#" class="hover:text-text-primary"
                  >Alexandria → Marsa Matrouh</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="#" class="hover:text-text-primary"
                  >Giza → Luxor & Upper Egypt</nuxt-link-locale
                >
              </li>
            </ul>
          </div>

          <!-- Col 3: Regional Trust -->
          <div class="md:col-span-2">
            <h5 class="font-bold text-text-primary mb-3 text-xs">
              Regional Trust & Safety
            </h5>
            <ul class="space-y-2 text-[11px]">
              <li class="flex items-center gap-1.5">
                <Icon
                  name="ph:check-circle-bold"
                  class="w-3.5 h-3.5 text-emerald-600"
                />
                Ministry Licensed
              </li>
              <li class="flex items-center gap-1.5">
                <Icon
                  name="ph:lock-key-bold"
                  class="w-3.5 h-3.5 text-amber-600"
                />
                Encrypted Payment
              </li>
              <li class="flex items-center gap-1.5">
                <Icon
                  name="ph:armchair-bold"
                  class="w-3.5 h-3.5 text-[#A1331B]"
                />
                Verified Seat Class
              </li>
            </ul>
          </div>

          <!-- Col 4: Accepted Payments -->
          <div class="md:col-span-3">
            <h5 class="font-bold text-text-primary mb-3 text-xs">
              Accepted Payment Methods
            </h5>
            <p class="text-[11px] text-text-secondary mb-2">
              Pay instantly via local Egyptian wallets, cards, and kiosks:
            </p>
            <div
              class="flex flex-wrap gap-1.5 font-bold text-[10px] text-text-secondary"
            >
              <span class="bg-surface-2 border border-border px-2 py-1 rounded"
                >Fawry</span
              >
              <span class="bg-surface-2 border border-border px-2 py-1 rounded"
                >Meeza</span
              >
              <span class="bg-surface-2 border border-border px-2 py-1 rounded"
                >Visa</span
              >
              <span class="bg-surface-2 border border-border px-2 py-1 rounded"
                >Mastercard</span
              >
              <span class="bg-surface-2 border border-border px-2 py-1 rounded"
                >Vodafone Cash</span
              >
            </div>
          </div>
        </div>

        <!-- Copyright & Legal -->
        <div
          class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-muted"
        >
          <div>© 2025 Otobisi Egypt SAE. All rights reserved.</div>
          <div class="flex items-center gap-4">
            <nuxt-link-locale to="#" class="hover:text-text-secondary"
              >Terms & Conditions</nuxt-link-locale
            >
            <nuxt-link-locale to="#" class="hover:text-text-secondary"
              >Privacy Policy</nuxt-link-locale
            >
            <nuxt-link-locale to="#" class="hover:text-text-secondary"
              >Cancellation Policy</nuxt-link-locale
            >
            <nuxt-link-locale to="#" class="hover:text-text-secondary"
              >Contact Support</nuxt-link-locale
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup></script>
