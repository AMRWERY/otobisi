<template>
  <div
    class="min-h-screen flex flex-col items-center justify-start pt-6 sm:pt-8 pb-16 px-4 bg-[#fbfbfd] dark:bg-[#0d121f] transition-colors relative"
  >
    <!-- Background subtle radial ambient glow -->
    <div class="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      <div
        class="w-[600px] h-[600px] rounded-full blur-3xl opacity-30 bg-orange-100 dark:bg-blue-950/40 absolute -top-40 left-1/2 -translate-x-1/2"
      />
    </div>

    <!-- 1. HEADER & BRAND IDENTITY -->
    <lazy-auth-header />

    <!-- 2. AUTH CARD -->
    <div
      class="w-full max-w-[440px] bg-white dark:bg-[#141b2d] border border-gray-100 dark:border-[#212b42] rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-2xl transition-all"
    >
      <!-- TABS -->
      <lazy-auth-tabs v-model:active-tab="activeTab" />

      <!-- EMAIL & PASSWORD FORM -->
      <lazy-auth-email-form
        v-if="authMethod === 'email'"
        :mode="activeTab"
        @login="onEmailLogin"
        @register="onEmailRegister"
        @back="authMethod = 'phone'"
      />

      <template v-else>
      <!-- MOBILE NUMBER INPUT -->
      <lazy-auth-phone-input
        v-model="phoneNumber"
        v-model:country="selectedCountry"
        :countries="countries"
        :is-valid="phoneValid"
        :input-ref="(el) => (phoneInputRef = el as HTMLInputElement | null)"
        @enter="handleEnterKey"
      />

      <!-- OTP CODE INPUT -->
      <lazy-auth-otp-input
        ref="otpInputRef"
        v-model="otpCode"
        :formatted-phone="formattedPhone"
        :timer-display="resendTimerDisplay"
        @edit="editPhone"
        @whatsapp="sendViaWhatsApp"
      />

      <!-- VERIFY & CONTINUE CTA BUTTON -->
      <button
        type="button"
        class="mt-4 w-full bg-[#A1331B] hover:bg-[#8d2a13] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-950/15 transition-all active:scale-[0.99] cursor-pointer group"
        @click="verifyOtp"
      >
        <span>Verify &amp; Continue</span>
        <Icon name="ph:arrow-right-bold" class="w-4 h-4 icon-arrow-animated" />
      </button>
      </template>

      <!-- DIVIDER -->
      <div class="my-5 relative flex items-center justify-center">
        <div
          class="w-full border-t border-gray-200 dark:border-[#222c44]"
        ></div>
        <span
          class="absolute bg-white dark:bg-[#141b2d] px-3 text-[11px] text-gray-400 dark:text-gray-500 font-medium"
        >
          <span class="dark:hidden">or continue with</span>
          <span
            class="hidden dark:inline tracking-widest text-[10px] uppercase font-bold"
            >OR CONTINUE WITH</span
          >
        </span>
      </div>

      <!-- 3. SOCIAL & ALTERNATIVE AUTH BUTTONS -->
      <lazy-auth-social-buttons
        @google="loginWithGoogle"
        @meeza="loginWithMeeza"
        @email="loginWithEmail"
      />

      <!-- MOT INTEGRATION BANNER (dark mode) -->
      <lazy-auth-mot-banner />

      <!-- TERMS & CONDITIONS DISCLAIMER -->
      <p
        class="text-center text-[11px] text-gray-400 dark:text-gray-500 mt-4 leading-relaxed"
      >
        By continuing, you agree to Otobisi's
        <nuxt-link-locale
          to="/terms"
          class="text-[#A1331B] dark:text-orange-400 font-medium hover:underline"
        >
          Terms of Service
        </nuxt-link-locale>
        and
        <nuxt-link-locale
          to="/privacy"
          class="text-[#A1331B] dark:text-orange-400 font-medium hover:underline"
        >
          Privacy Policy </nuxt-link-locale
        >.
      </p>
    </div>

    <!-- 4. TRUST FOOTER ELEMENTS (BELOW THE CARD) -->
    <lazy-auth-trust-footer />
  </div>
</template>

<script lang="ts" setup>
import type { Country } from "~/service/types/country";
import {
  DEFAULT_COUNTRY_NAME,
  findCountryByName,
  loadCountries,
} from "~/service/countries";
import { AuthError } from "~/service/auth";
import type { LoginInput, RegisterInput } from "~/service/types/user";

const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const toast = useToast();

// Tab state: 'login' | 'register'
const activeTab = ref<"login" | "register">(
  route.query.tab === "register" ? "register" : "login",
);

// Auth method: mobile OTP (default) or email & password against mock users
const authMethod = ref<"phone" | "email">("phone");

const runAuth = async (action: () => void) => {
  try {
    action();
  } catch (err) {
    if (!(err instanceof AuthError)) throw err;
    toast.error(err.message);
    return;
  }
  await router.push(localePath("/bookings"));
};

const onEmailLogin = (input: LoginInput) =>
  runAuth(() => authStore.login(input));

const onEmailRegister = (input: RegisterInput) =>
  runAuth(() => authStore.register(input));

// Countries for the dial-code picker. Loaded client-side only so the ~5MB
// flags JSON never lands in the SSR payload.
const countries = ref<Country[]>([]);
const selectedCountry = ref<Country | null>(null);
const isEgypt = computed(
  () => !selectedCountry.value || selectedCountry.value.callingCode === 20,
);

// Phone Number initialised with demo Egyptian phone number
const phoneNumber = ref("010 1234 5678");
const phoneInputRef = ref<HTMLInputElement | null>(null);

// Validate Egyptian mobile format; other countries fall back to E.164 length
const phoneValid = computed(() => {
  const digits = phoneNumber.value.replace(/\s/g, "");
  if (!isEgypt.value) return /^\d{6,14}$/.test(digits);
  return /^(010|011|012|015)\d{8}$/.test(digits) || /^1\d{9}$/.test(digits);
});

// Formatted phone string (with dial code) for display
const formattedPhone = computed(() => {
  const dialCode = selectedCountry.value?.dialCode ?? "+20";
  const clean = phoneNumber.value.replace(/\D/g, "");
  if (isEgypt.value && clean.startsWith("0") && clean.length >= 11) {
    return `${dialCode} ${clean.slice(1, 3)} ${clean.slice(3, 7)} ${clean.slice(7)}`;
  }
  return `${dialCode} ${clean.replace(/^0/, "") || "10 1234 5678"}`;
});

// 6-digit OTP, handled by the reusable VOTP component under auth-otp-input.
// Pre-filled with 4 demo digits, matching the original mock (last 2 empty).
const otpCode = ref("8492");
const otpInputRef = useTemplateRef("otpInputRef");

const editPhone = () => {
  phoneInputRef.value?.focus();
};

// Resend countdown timer
const resendSeconds = ref(39);
let resendInterval: ReturnType<typeof setInterval> | null = null;

const startResendTimer = () => {
  resendSeconds.value = 39;
  if (resendInterval) clearInterval(resendInterval);
  resendInterval = setInterval(() => {
    if (resendSeconds.value > 0) {
      resendSeconds.value--;
    } else if (resendInterval) {
      clearInterval(resendInterval);
    }
  }, 1000);
};

const resendTimerDisplay = computed(() => {
  const s = resendSeconds.value;
  return `0:${s < 10 ? "0" : ""}${s}`;
});

const sendViaWhatsApp = () => {
  startResendTimer();
  toast.success("Verification code sent", {
    description: `We sent a 6-digit code to ${formattedPhone.value} on WhatsApp.`,
  });
};

const handleEnterKey = () => {
  otpInputRef.value?.focus();
};

const verifyOtp = async () => {
  await router.push(localePath("/bookings"));
};

const loginWithGoogle = () => {
  toast.info("Connecting to Google", {
    description: "Redirecting you to the Google sign-in page...",
  });
};

const loginWithMeeza = () => {
  toast.info("Connecting to Meeza", {
    description: "Redirecting you to the Meeza payment gateway...",
  });
};

const loginWithEmail = () => {
  authMethod.value = "email";
};

// Sync activeTab with URL query string
watch(activeTab, (tab) => {
  router.replace({
    query: { ...(tab === "register" ? { tab: "register" } : {}) },
  });
});

onMounted(async () => {
  startResendTimer();
  try {
    countries.value = await loadCountries();
    selectedCountry.value =
      findCountryByName(countries.value, DEFAULT_COUNTRY_NAME) ??
      countries.value[0] ??
      null;
  } catch (err) {
    console.error("Failed to load countries", err);
  }
});

onUnmounted(() => {
  if (resendInterval) clearInterval(resendInterval);
});

// SEO
useSeo({
  title: "Log In or Create Account | Otobisi",
  description:
    "Access your Otobisi account to manage, track, and book intercity bus trips across Egypt. Fast OTP login via SMS & WhatsApp.",
  private: false,
});
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera: remove spinner */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>