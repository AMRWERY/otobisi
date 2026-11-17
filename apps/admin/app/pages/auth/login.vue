<template>
  <div class="space-y-7">
    <!-- Step 1: credentials -->
    <template v-if="step === 'credentials'">
      <auth-form-header
        icon="ph:sign-in-bold"
        title="Sign in to your console"
        subtitle="Use your NileBus staff account to manage dispatch, bookings and settlements."
      />

      <form class="space-y-4" novalidate @submit.prevent="submitCredentials">
        <auth-alert v-if="formError" tone="error">{{ formError }}</auth-alert>

        <VInput
          v-model="form.email"
          label="Work email"
          type="email"
          autocomplete="username"
          :placeholder="`you${AUTH_EMAIL_DOMAIN}`"
          icon="ph:envelope-simple-bold"
          size="md"
          rounded="xl"
          required
          :error="errors.email"
          :disabled="loading"
        />

        <auth-password-field
          v-model="form.password"
          :error="errors.password"
          :disabled="loading"
        />

        <div class="flex items-center justify-between gap-3 text-xs">
          <VCheckboxInput v-model="form.remember" wrapper-class="text-text-secondary">
            Keep me signed in on this device
          </VCheckboxInput>
          <NuxtLinkLocale
            to="/auth/forgot-password"
            class="font-semibold text-teal-700 dark:text-teal-300 hover:underline"
          >
            Forgot password?
          </NuxtLinkLocale>
        </div>

        <VButton
          type="submit"
          variant="primary"
          size="md"
          rounded="xl"
          block
          :loading="loading"
          icon-right="ph:arrow-right-bold"
          custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20 rtl:[&_svg]:rotate-180"
        >
          Continue
        </VButton>
      </form>

      <p class="text-center text-xs text-text-muted">
        Don't have an account? Ask an owner or manager to invite you from
        <span class="font-semibold text-text-secondary">Team &amp; Roles</span>.
      </p>
    </template>

    <!-- Step 2: two-factor code -->
    <template v-else>
      <auth-form-header
        icon="ph:shield-check-bold"
        title="Two-step verification"
      >
        Enter the 6-digit code sent to
        <span class="font-mono text-text-primary">{{ authMaskEmail(form.email) }}</span>
        to finish signing in.
      </auth-form-header>

      <div class="space-y-4">
        <auth-code-input
          v-model="code"
          :error="codeError"
          :disabled="loading"
          @complete="submitCode"
          @resend="resendCode"
        />

        <VButton
          variant="primary"
          size="md"
          rounded="xl"
          block
          :loading="loading"
          :disabled="code.length < AUTH_CODE_LENGTH"
          custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
          @click="submitCode(code)"
        >
          Verify and sign in
        </VButton>

        <button
          type="button"
          class="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-text-muted hover:text-text-primary cursor-pointer"
          @click="backToCredentials"
        >
          <Icon name="ph:arrow-left-bold" class="w-3.5 h-3.5 rtl:rotate-180" />
          Use a different account
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: "auth" });

const localePath = useLocalePath();
const toast = useToast();
const { loading, login, verifyCode } = useAdminAuth();

const step = ref<"credentials" | "code">("credentials");
const form = reactive({ email: "", password: "", remember: true });
const errors = reactive({ email: "", password: "" });
const formError = ref("");

const code = ref("");
const codeError = ref("");

function validate() {
  errors.email = !form.email.trim()
    ? "Enter your work email"
    : !authIsEmail(form.email)
      ? "Enter a valid email address"
      : "";
  errors.password = form.password ? "" : "Enter your password";
  return !errors.email && !errors.password;
}

async function submitCredentials() {
  formError.value = "";
  if (!validate()) return;

  const result = await login(form.email, form.password);
  if (!result.ok) {
    formError.value = result.error ?? "Sign in failed";
    return;
  }
  code.value = "";
  codeError.value = "";
  step.value = "code";
}

async function submitCode(value: string) {
  if (loading.value || value.length < AUTH_CODE_LENGTH) return;
  codeError.value = "";

  const result = await verifyCode(value);
  if (!result.ok) {
    codeError.value = result.error ?? "Verification failed";
    code.value = "";
    return;
  }
  toast.success("Signed in");
  await navigateTo(localePath("/"));
}

function resendCode() {
  toast.info(`A new code was sent to ${authMaskEmail(form.email)}`);
}

function backToCredentials() {
  step.value = "credentials";
  form.password = "";
}

useSeoMeta({
  title: "Sign in",
  description: "Sign in to the NileBus operator console.",
  robots: "noindex, nofollow",
});
</script>
