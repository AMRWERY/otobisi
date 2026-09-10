<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:lock-key-bold" class="w-4 h-4" />
        <span>Authorized Fleet Access</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Fleet Operator Portal
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Centralized portal for licensed bus operators, fleet managers, station gatekeepers, and ticket counter dispatchers across Egypt.
      </p>
    </div>

    <!-- Login & Portal Info Grid -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
      <!-- Portal Login Card (7 cols) -->
      <div class="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-6 flex flex-col justify-between">
        <div class="space-y-2">
          <h2 class="text-xl font-bold text-text-primary">Operator Sign In</h2>
          <p class="text-xs text-text-muted">Enter your registered operator fleet credentials</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-text-primary">Operator Code / ID</label>
            <input
              v-model="loginForm.operatorCode"
              required
              type="text"
              placeholder="e.g. OP-EGY-042"
              class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-text-primary">Official Email / Username</label>
            <input
              v-model="loginForm.email"
              required
              type="email"
              placeholder="dispatch@fleetoperator.com"
              class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
            />
          </div>

          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-semibold text-text-primary">Password</label>
              <a href="#" class="text-[11px] text-[#EA580C] hover:underline" @click.prevent="alert('Please contact your fleet admin or Otobisi Operator Support (19XXX) for password recovery.')">Forgot?</a>
            </div>
            <input
              v-model="loginForm.password"
              required
              type="password"
              placeholder="••••••••••••"
              class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
            />
          </div>

          <div v-if="loginError" class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-400 font-medium">
            {{ loginError }}
          </div>

          <button
            type="submit"
            class="w-full py-2.5 rounded-xl bg-[#EA580C] hover:bg-orange-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
          >
            Access Fleet Dashboard
          </button>
        </form>

        <div class="pt-4 border-t border-border/60 text-center text-xs text-text-muted">
          New bus operator?
          <nuxt-link-locale to="/operators" class="font-bold text-[#EA580C] hover:underline">
            Apply for partnership
          </nuxt-link-locale>
        </div>
      </div>

      <!-- Feature Highlights (5 cols) -->
      <div class="md:col-span-5 space-y-4 flex flex-col justify-between">
        <div class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-3">
          <div class="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-[#EA580C] flex items-center justify-center">
            <Icon name="ph:calendar-check-bold" class="w-5 h-5" />
          </div>
          <h3 class="text-sm font-bold text-text-primary">Real-Time Dispatch & Schedules</h3>
          <p class="text-xs text-text-secondary leading-relaxed">
            Create departure times, adjust pricing per seat class, and mark coaches as delayed or boarding with instantaneous passenger SMS notification.
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-3">
          <div class="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Icon name="ph:qr-code-bold" class="w-5 h-5" />
          </div>
          <h3 class="text-sm font-bold text-text-primary">Gatekeeper Mobile Scanner</h3>
          <p class="text-xs text-text-secondary leading-relaxed">
            Download our conductor APK for rapid QR code scanning at the bus doors. Instant validation preventing fraudulent or duplicated tickets.
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-3">
          <div class="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Icon name="ph:bank-bold" class="w-5 h-5" />
          </div>
          <h3 class="text-sm font-bold text-text-primary">Automated Financial Settlement</h3>
          <p class="text-xs text-text-secondary leading-relaxed">
            Download weekly VAT tax invoices, bank transfer receipts, and line-item ticket manifests for clean accounting reconciliation.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const loginForm = reactive({
  operatorCode: "",
  email: "",
  password: "",
});

const loginError = ref("");

const handleLogin = () => {
  loginError.value = "Operator credentials verified. Redirecting to dispatch terminal...";
  setTimeout(() => {
    loginError.value = "Demo environment: fleet dashboard integration is active.";
  }, 1200);
};

useSeo({
  title: "Fleet Operator Portal | Otobisi Egypt",
  description:
    "Official operator portal for Egyptian intercity bus operators. Real-time fleet dispatch, gatekeeper QR validation, seat inventory management, and financial payouts.",
  private: true,
});
</script>
