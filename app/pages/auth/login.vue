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

      <!-- MOBILE NUMBER INPUT -->
      <lazy-auth-phone-input
        v-model="phoneNumber"
        :is-valid="phoneValid"
        :input-ref="(el) => (phoneInputRef = el as HTMLInputElement | null)"
        @enter="handleEnterKey"
      />

      <!-- OTP CODE INPUT -->
      <lazy-auth-otp-input
        :digits="otpDigits"
        :active-idx="activeOtpIdx"
        :formatted-phone="formattedPhone"
        :timer-display="resendTimerDisplay"
        :set-ref="setOtpRef"
        @edit="editPhone"
        @focus="focusOtp"
        @input="onOtpInput"
        @backspace="onOtpBackspace"
        @paste="onOtpPaste"
        @whatsapp="sendViaWhatsApp"
      />

      <!-- VERIFY & CONTINUE CTA BUTTON -->
      <button
        type="button"
        class="mt-4 w-full bg-[#A1331B] hover:bg-[#8d2a13] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-950/15 transition-all active:scale-[0.99] cursor-pointer"
        @click="verifyOtp"
      >
        <span>Verify &amp; Continue</span>
        <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
      </button>

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
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

// Tab state: 'login' | 'register'
const activeTab = ref<"login" | "register">(
  route.query.tab === "register" ? "register" : "login",
);

// Phone Number initialised with demo Egyptian phone number
const phoneNumber = ref("010 1234 5678");
const phoneInputRef = ref<HTMLInputElement | null>(null);

// Validate Egyptian mobile number format
const phoneValid = computed(() => {
  const digits = phoneNumber.value.replace(/\s/g, "");
  return /^(010|011|012|015)\d{8}$/.test(digits) || /^1\d{9}$/.test(digits);
});

// Formatted phone string for display
const formattedPhone = computed(() => {
  const clean = phoneNumber.value.replace(/\D/g, "");
  if (clean.startsWith("010") && clean.length >= 11) {
    return `10 ${clean.slice(3, 7)} ${clean.slice(7)}`;
  }
  return clean || "10 1234 5678";
});

// 6 OTP Digits
const otpDigits = ref<string[]>(["8", "4", "9", "2", "", ""]);
const activeOtpIdx = ref(4);
const otpRefs = ref<(HTMLInputElement | null)[]>([]);

const setOtpRef = (el: unknown, idx: number) => {
  otpRefs.value[idx] = el as HTMLInputElement | null;
};

const focusOtp = (idx: number) => {
  activeOtpIdx.value = idx;
  otpRefs.value[idx]?.focus();
};

const editPhone = () => {
  phoneInputRef.value?.focus();
};

const onOtpInput = (idx: number, event: Event) => {
  const val = (event.target as HTMLInputElement).value.replace(/\D/g, "");
  otpDigits.value[idx] = val.slice(-1);
  if (val && idx < 5) {
    activeOtpIdx.value = idx + 1;
    otpRefs.value[idx + 1]?.focus();
  }
};

const onOtpBackspace = (idx: number) => {
  if (!otpDigits.value[idx] && idx > 0) {
    otpDigits.value[idx - 1] = "";
    activeOtpIdx.value = idx - 1;
    otpRefs.value[idx - 1]?.focus();
  }
};

const onOtpPaste = (event: ClipboardEvent) => {
  const pasted = event.clipboardData?.getData("text").replace(/\D/g, "") ?? "";
  for (let i = 0; i < 6 && i < pasted.length; i++) {
    otpDigits.value[i] = pasted[i];
  }
  const nextEmpty = otpDigits.value.findIndex((d) => !d);
  const targetIdx = nextEmpty === -1 ? 5 : nextEmpty;
  activeOtpIdx.value = targetIdx;
  otpRefs.value[targetIdx]?.focus();
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
  alert("Verification code sent to WhatsApp");
};

const handleEnterKey = () => {
  const nextEmpty = otpDigits.value.findIndex((d) => !d);
  focusOtp(nextEmpty === -1 ? 5 : nextEmpty);
};

const verifyOtp = async () => {
  await router.push(localePath("/bookings"));
};

const loginWithGoogle = () => {
  alert("Connecting to Google Identity Provider...");
};

const loginWithMeeza = () => {
  alert("Redirecting to Meeza Payment Gateway...");
};

const loginWithEmail = () => {
  alert("Opening Email & Password Authentication form...");
};

// Sync activeTab with URL query string
watch(activeTab, (tab) => {
  router.replace({
    query: { ...(tab === "register" ? { tab: "register" } : {}) },
  });
});

onMounted(() => {
  startResendTimer();
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