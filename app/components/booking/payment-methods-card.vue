<template>
  <div
    class="bg-surface-1 border border-border rounded-2xl p-5 sm:p-6 shadow-xs"
  >
    <!-- Header -->
    <div class="flex items-start gap-3 pb-4 border-b border-border mb-6">
      <div
        class="w-10 h-10 rounded-xl bg-orange-500/10 text-[#A1331B] dark:text-orange-400 flex items-center justify-center shrink-0"
      >
        <Icon name="ph:credit-card-bold" class="w-5 h-5" />
      </div>
      <div>
        <h2 class="text-base sm:text-lg font-extrabold text-text-primary">
          Step 2: Choose Payment Method
        </h2>
        <p class="text-xs text-text-secondary mt-0.5">
          Instant, secure transactions compliant with the Central Bank of Egypt.
        </p>
      </div>
    </div>

    <!-- Dynamic Payment Methods List -->
    <div class="flex flex-col gap-3.5">
      <div
        v-for="method in paymentMethods"
        :key="method.id"
        :class="
          selectedMethod === method.id
            ? 'border-orange-500/50 bg-surface-2 ring-1 ring-orange-500/30'
            : 'border-border bg-surface-2 hover:border-border-strong'
        "
        class="border rounded-2xl p-4 sm:p-5 transition-all cursor-pointer"
        @click="selectedMethod = method.id"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="pt-0.5">
              <div
                class="w-4 h-4 rounded-full border flex items-center justify-center"
                :class="
                  selectedMethod === method.id
                    ? 'border-[#A1331B] bg-white'
                    : 'border-border'
                "
              >
                <div
                  v-if="selectedMethod === method.id"
                  class="w-2 h-2 rounded-full bg-[#A1331B]"
                ></div>
              </div>
            </div>

            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-bold text-sm text-text-primary">
                  {{ method.title }}
                </span>
                <span
                  v-if="method.badge"
                  :class="method.badgeColor"
                  class="px-2 py-0.5 rounded-full text-[10px] font-extrabold border"
                >
                  {{ method.badge }}
                </span>
              </div>
              <p class="text-xs text-text-secondary mt-0.5 leading-relaxed">
                {{ method.description }}
              </p>

              <!-- Optional Wallet Tags -->
              <div
                v-if="method.tags"
                class="flex items-center gap-1.5 mt-2.5 flex-wrap"
              >
                <span
                  v-for="tag in method.tags"
                  :key="tag"
                  class="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-1 border border-border text-text-secondary"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Logos on Right -->
          <div
            v-if="method.logos"
            class="hidden sm:flex items-center gap-1.5 shrink-0"
          >
            <span
              v-for="logo in method.logos"
              :key="logo"
              class="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-1 border border-border text-text-secondary"
            >
              {{ logo }}
            </span>
          </div>

          <!-- Icon on Right -->
          <Icon
            v-else-if="method.icon"
            :name="method.icon"
            class="w-5 h-5 text-text-muted shrink-0"
          />
        </div>

        <!-- Dynamic Payment Sub-Component based on selected method -->
        <component
          :is="getComponentForMethod(method.id)"
          v-if="selectedMethod === method.id"
        />
      </div>
    </div>

    <!-- Security Badges Footer -->
    <div
      class="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold text-text-secondary"
    >
      <div class="flex items-center gap-1.5">
        <Icon
          name="ph:shield-check-bold"
          class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"
        />
        <span>Central Bank of Egypt Authorized</span>
      </div>

      <div class="flex items-center gap-1.5">
        <Icon
          name="ph:lock-key-bold"
          class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"
        />
        <span>256-Bit SSL Encrypted Protocol</span>
      </div>

      <div class="flex items-center gap-1.5">
        <Icon
          name="ph:seal-check-bold"
          class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"
        />
        <span>Ministry of Transport Licensed</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  PaymentMethodId,
  PaymentMethodOption,
} from "~/types/booking/payment";
import PaymentCardForm from "./payment-card-form.vue";
import PaymentWalletForm from "./payment-wallet-form.vue";
import PaymentFawryForm from "./payment-fawry-form.vue";

const selectedMethod = ref<PaymentMethodId>("card");

const paymentMethods: PaymentMethodOption[] = [
  {
    id: "card",
    title: "Credit or Debit Card",
    badge: "Most Popular",
    badgeColor:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    description:
      "Visa, Mastercard, and Egyptian Meeza national debit cards accepted with 0% gateway fee.",
    logos: ["Meeza", "Visa", "Mastercard"],
    component: "PaymentCardForm",
  },
  {
    id: "wallet",
    title: "Egyptian Mobile Wallets & InstaPay",
    badge: "Instant",
    badgeColor:
      "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    description:
      "Vodafone Cash, Orange Cash, Etisalat Cash, WE Pay, or InstaPay IPA handle.",
    icon: "ph:device-mobile-bold",
    tags: ["Vodafone Cash", "InstaPay", "Orange Money", "WE Pay"],
    component: "PaymentWalletForm",
  },
  {
    id: "fawry",
    title: "Fawry Pay / Station Kiosks (فوري)",
    badge: "Pay with Cash",
    badgeColor:
      "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    description:
      "A reference number will be generated immediately. Complete payment at any Fawry retail outlet within 4 hours before departure.",
    icon: "ph:storefront-bold",
    component: "PaymentFawryForm",
  },
];

const getComponentForMethod = (id: PaymentMethodId) => {
  switch (id) {
    case "card":
      return PaymentCardForm;
    case "wallet":
      return PaymentWalletForm;
    case "fawry":
      return PaymentFawryForm;
  }
};
</script>