<template>
  <!-- Auth page: no top padding to allow the hero gradient to bleed full-width -->
  <div class="min-h-screen bg-surface-0 flex flex-col">
    <!-- Hero gradient backdrop (dark: dark radial, light: soft warm) -->
    <div
      class="absolute inset-0 pointer-events-none -z-10"
      :class="[
        'bg-gradient-to-b from-surface-1 via-surface-0 to-surface-0',
        'dark:from-[#1b2135] dark:via-[#151a2a] dark:to-[#151a2a]',
      ]"
    />

    <!-- Top trust badge -->
    <div class="pt-8 pb-2 text-center">
      <span
        class="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400"
      >
        <Icon name="ph:shield-check-bold" class="w-3.5 h-3.5" />
        <span>{{ $t('auth.trustBadge') }}</span>
      </span>
    </div>

    <!-- Brand Identity -->
    <div class="text-center mb-6 mt-3">
      <div
        class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-[#A1331B] flex items-center justify-center text-white shadow-lg shadow-orange-950/25 mx-auto mb-3"
      >
        <Icon name="ph:bus-duotone" class="w-7 h-7" />
      </div>

      <!-- Light: brand wordmark; Dark: hero headline -->
      <div class="hidden dark:block">
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {{ $t('auth.encryptedGateway') }}
        </span>
        <h1 class="text-3xl sm:text-4xl font-black text-text-primary tracking-tight mb-2">
          {{ $t('auth.heroTitle') }}
        </h1>
        <p class="text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
          {{ $t('auth.heroSubtitle') }}
        </p>
      </div>

      <!-- Light mode: compact logo wordmark -->
      <div class="dark:hidden">
        <div class="flex items-center justify-center gap-2">
          <span class="text-2xl font-black tracking-tight">
            <span class="text-[#A1331B]">Otobisi</span>
          </span>
          <span class="text-xs font-arabic text-text-muted font-medium">أوتوبيسي</span>
        </div>
        <p class="text-[11px] text-text-muted mt-0.5">
          Egypt's Intercity Bus Network
        </p>
      </div>
    </div>

    <!-- Auth Card -->
    <div class="flex-1 flex flex-col items-center px-4 pb-10">
      <div
        class="w-full max-w-md bg-white dark:bg-surface-1 border border-gray-200 dark:border-border rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden"
      >
        <!-- Tab Row -->
        <div class="flex border-b border-gray-200 dark:border-border">
          <button
            type="button"
            class="flex-1 py-3.5 text-sm font-bold transition-colors flex items-center justify-center gap-1.5"
            :class="[
              activeTab === 'login'
                ? 'text-[#A1331B] dark:text-orange-400 border-b-2 border-[#A1331B] dark:border-orange-400 bg-orange-50/50 dark:bg-orange-500/5'
                : 'text-gray-500 dark:text-text-muted hover:text-gray-700 dark:hover:text-text-secondary bg-gray-50/50 dark:bg-surface-2/30'
            ]"
            @click="activeTab = 'login'"
          >
            <Icon name="ph:sign-in-bold" class="w-4 h-4" />
            {{ $t('auth.logIn') }}
          </button>
          <button
            type="button"
            class="flex-1 py-3.5 text-sm font-bold transition-colors flex items-center justify-center gap-1.5"
            :class="[
              activeTab === 'register'
                ? 'text-[#A1331B] dark:text-orange-400 border-b-2 border-[#A1331B] dark:border-orange-400 bg-orange-50/50 dark:bg-orange-500/5'
                : 'text-gray-500 dark:text-text-muted hover:text-gray-700 dark:hover:text-text-secondary bg-gray-50/50 dark:bg-surface-2/30'
            ]"
            @click="activeTab = 'register'"
          >
            <Icon name="ph:user-plus-bold" class="w-4 h-4" />
            {{ $t('auth.createAccount') }}
          </button>
        </div>

        <div class="p-5 sm:p-6">
          <!-- STEP 1: Phone Number Entry -->
          <div v-if="step === 1">
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-sm font-bold text-gray-800 dark:text-text-primary">
                {{ $t('auth.mobileNumber') }}
              </label>
              <span class="inline-flex items-center gap-1 text-[11px] font-bold text-[#A1331B] dark:text-orange-400">
                <Icon name="ph:lightning-bold" class="w-3 h-3" />
                {{ $t('auth.instantOTP') }}
              </span>
            </div>

            <!-- Phone Input Row -->
            <div
              class="flex items-center gap-0 border rounded-xl overflow-hidden transition-all"
              :class="[
                phoneValid
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-gray-300 dark:border-border focus-within:border-orange-500/60 focus-within:ring-2 focus-within:ring-orange-500/20'
              ]"
            >
              <!-- Country Code -->
              <div
                class="flex items-center gap-1.5 px-3 py-3 border-e border-gray-200 dark:border-border bg-gray-50 dark:bg-surface-2 shrink-0 cursor-pointer select-none"
              >
                <span class="text-lg leading-none">🇪🇬</span>
                <span class="text-sm font-bold text-gray-700 dark:text-text-primary">+20</span>
                <Icon name="ph:caret-down-bold" class="w-3 h-3 text-gray-400 dark:text-text-muted" />
              </div>

              <!-- Number input -->
              <input
                v-model="phoneNumber"
                type="tel"
                inputmode="numeric"
                placeholder="010 1234 5678"
                maxlength="12"
                class="flex-1 px-3 py-3 text-sm font-medium bg-transparent text-gray-800 dark:text-text-primary placeholder:text-gray-400 dark:placeholder:text-text-muted outline-none"
                @keyup.enter="sendOtp"
              />

              <!-- Valid check -->
              <Transition name="fade">
                <div v-if="phoneValid" class="pe-3 shrink-0">
                  <Icon name="ph:check-circle-fill" class="w-5 h-5 text-emerald-500" />
                </div>
              </Transition>
            </div>

            <p class="text-[11px] text-gray-500 dark:text-text-muted mt-2 flex items-center gap-1">
              <Icon name="ph:clock-bold" class="w-3 h-3 shrink-0" />
              {{ $t('auth.otpHint') }}
            </p>

            <!-- Send OTP Button -->
            <button
              type="button"
              class="mt-4 w-full bg-[#A1331B] hover:bg-[#8B2B16] text-white py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-950/15 hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              :disabled="!phoneValid"
              @click="sendOtp"
            >
              <span>{{ $t('auth.sendCode') }}</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          <!-- STEP 2: OTP Verification -->
          <div v-else-if="step === 2">
            <div class="flex items-start justify-between mb-3">
              <div>
                <p class="text-xs font-bold text-gray-500 dark:text-text-muted uppercase tracking-wider mb-0.5">
                  {{ $t('auth.verificationCode') }}
                </p>
                <p class="text-[11px] text-gray-500 dark:text-text-muted">
                  {{ $t('auth.sentTo') }} <strong class="text-gray-800 dark:text-text-primary">+20 {{ phoneNumber }}</strong>
                </p>

                <!-- Step indicator (dark only) -->
                <span class="hidden dark:inline-flex items-center gap-1 text-[10px] font-bold text-text-muted mt-1">
                  STEP 2 OF 2
                </span>
              </div>

              <button
                type="button"
                class="inline-flex items-center gap-1 text-[11px] font-bold text-[#A1331B] dark:text-orange-400 hover:underline cursor-pointer"
                @click="step = 1"
              >
                <Icon name="ph:pencil-simple-bold" class="w-3 h-3" />
                {{ $t('auth.edit') }}
              </button>
            </div>

            <!-- OTP Boxes -->
            <div class="flex gap-2 justify-between mb-3">
              <input
                v-for="(digit, idx) in otpDigits"
                :key="idx"
                :ref="(el) => setOtpRef(el, idx)"
                v-model="otpDigits[idx]"
                type="text"
                inputmode="numeric"
                maxlength="1"
                class="w-full aspect-square max-w-[52px] text-center text-lg font-black rounded-xl border transition-all outline-none"
                :class="[
                  otpDigits[idx]
                    ? 'border-[#A1331B] dark:border-orange-400 bg-orange-50/60 dark:bg-orange-500/10 text-[#A1331B] dark:text-orange-300 ring-2 ring-orange-500/20'
                    : 'border-gray-300 dark:border-border bg-white dark:bg-surface-2 text-gray-800 dark:text-text-primary focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20'
                ]"
                @input="onOtpInput(idx, $event)"
                @keydown.backspace="onOtpBackspace(idx)"
                @paste.prevent="onOtpPaste($event)"
              />
            </div>

            <!-- Resend & WhatsApp row -->
            <div class="flex items-center justify-between text-[11px] mb-4">
              <span class="text-gray-500 dark:text-text-muted flex items-center gap-1">
                <Icon name="ph:hourglass-medium-bold" class="w-3.5 h-3.5 text-amber-500" />
                {{ $t('auth.resendIn') }} <strong class="ms-0.5 text-gray-700 dark:text-text-primary">{{ resendTimerDisplay }}</strong>
              </span>
              <button
                type="button"
                class="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                :disabled="resendSeconds > 0"
                @click="resendOtp"
              >
                <Icon name="ph:whatsapp-logo-bold" class="w-3.5 h-3.5" />
                {{ $t('auth.sendViaWhatsApp') }}
              </button>
            </div>

            <!-- Verify Button -->
            <button
              type="button"
              class="w-full bg-[#A1331B] hover:bg-[#8B2B16] text-white py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-950/15 hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              :disabled="otpDigits.filter(Boolean).length < 6"
              @click="verifyOtp"
            >
              <span>{{ $t('auth.verifyAndContinue') }}</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          <!-- Divider -->
          <div class="relative flex items-center gap-3 my-5">
            <div class="flex-1 h-px bg-gray-200 dark:bg-border"></div>
            <span class="text-[11px] font-bold text-gray-400 dark:text-text-muted uppercase tracking-wider shrink-0">
              {{ $t('auth.orContinueWith') }}
            </span>
            <div class="flex-1 h-px bg-gray-200 dark:bg-border"></div>
          </div>

          <!-- Social Buttons -->
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-surface-2 hover:bg-gray-50 dark:hover:bg-surface-0 text-gray-700 dark:text-text-primary text-xs font-bold transition-all shadow-2xs cursor-pointer"
              @click="loginWithGoogle"
            >
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span>Google</span>
            </button>

            <!-- Light: Meeza Card; Dark: Email & Pass -->
            <button
              type="button"
              class="hidden dark:flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-surface-2 hover:bg-gray-50 dark:hover:bg-surface-0 text-gray-700 dark:text-text-primary text-xs font-bold transition-all shadow-2xs cursor-pointer"
              @click="loginWithEmail"
            >
              <Icon name="ph:envelope-bold" class="w-4 h-4 text-orange-500 shrink-0" />
              <span>Email &amp; Pass</span>
            </button>

            <button
              type="button"
              class="flex dark:hidden items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-surface-2 hover:bg-gray-50 dark:hover:bg-surface-0 text-gray-700 dark:text-text-primary text-xs font-bold transition-all shadow-2xs cursor-pointer"
              @click="loginWithMeeza"
            >
              <Icon name="ph:credit-card-bold" class="w-4 h-4 text-orange-500 shrink-0" />
              <span>Meeza Card</span>
            </button>
          </div>

          <!-- Email sign in link (light mode only) -->
          <button
            type="button"
            class="dark:hidden mt-3 w-full flex items-center justify-center gap-1.5 text-[11px] text-gray-500 dark:text-text-muted hover:text-gray-700 dark:hover:text-text-secondary font-medium cursor-pointer transition-colors"
            @click="loginWithEmail"
          >
            <Icon name="ph:envelope-bold" class="w-3.5 h-3.5" />
            <span>{{ $t('auth.signInWithEmail') }}</span>
          </button>

          <!-- MOT Integration Banner (dark mode) -->
          <div
            class="hidden dark:flex mt-4 p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 items-start gap-3"
          >
            <div class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="ph:shield-check-bold" class="w-4 h-4" />
            </div>
            <div>
              <h4 class="font-bold text-xs text-text-primary mb-0.5">
                Official Ministry of Transport Integration
              </h4>
              <p class="text-[11px] text-text-secondary leading-relaxed">
                Tickets are linked to National ID / Passport numbers for automated boarding gate access at Cairo Ramses, Torgoman, and Moharam Bek.
              </p>
            </div>
          </div>

          <!-- Terms footer -->
          <p class="text-center text-[11px] text-gray-400 dark:text-text-muted mt-4 leading-relaxed">
            {{ $t('auth.termsPrefix') }}
            <button type="button" class="text-[#A1331B] dark:text-orange-400 hover:underline font-medium cursor-pointer">
              {{ $t('auth.termsOfService') }}
            </button>
            {{ $t('auth.termsAnd') }}
            <button type="button" class="text-[#A1331B] dark:text-orange-400 hover:underline font-medium cursor-pointer">
              {{ $t('auth.privacyPolicy') }}
            </button>
          </p>
        </div>
      </div>

      <!-- Trust Strip -->
      <div
        class="mt-6 w-full max-w-md flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium text-gray-500 dark:text-text-muted"
      >
        <span class="flex items-center gap-1">
          <Icon name="ph:shield-check-bold" class="w-3.5 h-3.5 text-emerald-500" />
          {{ $t('auth.regulatedBy') }}
        </span>
        <span class="hidden dark:inline text-border">|</span>
        <div class="hidden dark:flex items-center gap-3 font-bold">
          <span class="dark:text-text-secondary">Privacy Notice</span>
          <span class="text-border">•</span>
          <span class="dark:text-text-secondary">Terms of Carriage</span>
          <span class="text-border">•</span>
          <span class="dark:text-text-secondary">Station Security</span>
        </div>
        <div class="flex dark:hidden items-center gap-3">
          <span class="px-2 py-0.5 rounded bg-gray-100 dark:bg-surface-2 border border-gray-200 dark:border-border font-bold text-gray-600 dark:text-text-secondary">Fawry</span>
          <span class="px-2 py-0.5 rounded bg-gray-100 dark:bg-surface-2 border border-gray-200 dark:border-border font-bold text-gray-600 dark:text-text-secondary">Meeza</span>
          <span class="px-2 py-0.5 rounded bg-gray-100 dark:bg-surface-2 border border-gray-200 dark:border-border font-bold text-gray-600 dark:text-text-secondary">Vodafone Cash</span>
        </div>
        <span class="flex items-center gap-1">
          <Icon name="ph:phone-call-bold" class="w-3.5 h-3.5 text-[#A1331B]" />
          {{ $t('auth.hotline') }}
        </span>
      </div>

      <!-- Dark mode: NileBus credit line -->
      <p class="hidden dark:block mt-3 text-[10px] text-text-muted text-center">
        NileBus Network Egypt SAE • Operations Center Heliopolis, Cairo
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

// Tab: 'login' | 'register'
const route = useRoute();
const activeTab = ref<'login' | 'register'>(
  route.query.tab === 'register' ? 'register' : 'login',
);

// Step: 1 = phone, 2 = OTP
const step = ref(1);

// Phone
const phoneNumber = ref('');
const phoneValid = computed(() => /^(010|011|012|015)\d{8}$/.test(phoneNumber.value.replace(/\s/g, '')));

// OTP
const otpDigits = ref<string[]>(['', '', '', '', '', '']);
const otpRefs = ref<(HTMLInputElement | null)[]>([]);

const setOtpRef = (el: unknown, idx: number) => {
  otpRefs.value[idx] = el as HTMLInputElement | null;
};

const onOtpInput = (idx: number, event: Event) => {
  const val = (event.target as HTMLInputElement).value.replace(/\D/g, '');
  otpDigits.value[idx] = val.slice(-1);
  if (val && idx < 5) {
    otpRefs.value[idx + 1]?.focus();
  }
};

const onOtpBackspace = (idx: number) => {
  if (!otpDigits.value[idx] && idx > 0) {
    otpDigits.value[idx - 1] = '';
    otpRefs.value[idx - 1]?.focus();
  }
};

const onOtpPaste = (event: ClipboardEvent) => {
  const pasted = event.clipboardData?.getData('text').replace(/\D/g, '') ?? '';
  for (let i = 0; i < 6 && i < pasted.length; i++) {
    otpDigits.value[i] = pasted[i];
  }
  otpRefs.value[Math.min(pasted.length, 5)]?.focus();
};

// Resend timer
const resendSeconds = ref(39);
let resendInterval: ReturnType<typeof setInterval> | null = null;

const startResendTimer = () => {
  resendSeconds.value = 39;
  if (resendInterval) clearInterval(resendInterval);
  resendInterval = setInterval(() => {
    if (resendSeconds.value > 0) resendSeconds.value--;
    else if (resendInterval) clearInterval(resendInterval);
  }, 1000);
};

const resendTimerDisplay = computed(() => {
  const s = resendSeconds.value;
  return `0:${s < 10 ? '0' : ''}${s}`;
});

onUnmounted(() => {
  if (resendInterval) clearInterval(resendInterval);
});

// Actions
const sendOtp = () => {
  if (!phoneValid.value) return;
  step.value = 2;
  // Prefill demo digits
  otpDigits.value = ['8', '4', '9', '2', '', ''];
  startResendTimer();
  nextTick(() => otpRefs.value[4]?.focus());
};

const resendOtp = () => {
  if (resendSeconds.value > 0) return;
  otpDigits.value = ['', '', '', '', '', ''];
  startResendTimer();
  nextTick(() => otpRefs.value[0]?.focus());
};

const verifyOtp = async () => {
  const code = otpDigits.value.join('');
  if (code.length < 6) return;
  // Navigate to bookings after successful auth
  await router.push(localePath('/bookings'));
};

const loginWithGoogle = () => alert('Google OAuth — connecting to Google Identity Provider...');
const loginWithMeeza = () => alert('Meeza Card Login — redirecting to Meeza secure gateway...');
const loginWithEmail = () => alert('Email & Password — opening email login form...');

// Sync tab <-> URL query (stay on same page)
watch(activeTab, (tab) => {
  router.replace({ query: { ...(tab === 'register' ? { tab: 'register' } : {}) } });
  // Reset to step 1 on tab switch
  step.value = 1;
  phoneNumber.value = '';
  otpDigits.value = ['', '', '', '', '', ''];
});

// SEO
useSeo({
  title: 'Log In or Create Account | Otobisi',
  description: 'Access your Otobisi account to manage, track, and book intercity bus trips across Egypt. Fast OTP login via SMS & WhatsApp.',
  private: false,
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>