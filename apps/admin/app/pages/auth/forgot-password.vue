<template>
  <div class="space-y-7">
    <!-- Sent -->
    <template v-if="sent">
      <auth-form-header icon="ph:envelope-open-bold" title="Check your inbox">
        If an account exists for
        <span class="font-mono text-text-primary">{{ email }}</span>, we've sent
        a link to reset the password. It expires in 30 minutes.
      </auth-form-header>

      <auth-alert tone="info">
        Nothing arrived? Check your spam folder, or make sure you used the
        address your owner or manager invited.
      </auth-alert>

      <div class="space-y-3">
        <VButton
          variant="surface"
          size="md"
          rounded="xl"
          block
          :loading="loading"
          :disabled="seconds > 0"
          @click="resend"
        >
          {{ seconds > 0 ? `Resend email in ${seconds}s` : "Resend email" }}
        </VButton>

        <NuxtLinkLocale
          to="/auth/login"
          class="flex items-center justify-center gap-1.5 text-xs font-semibold text-text-muted hover:text-text-primary"
        >
          <Icon name="ph:arrow-left-bold" class="w-3.5 h-3.5 rtl:rotate-180" />
          Back to sign in
        </NuxtLinkLocale>
      </div>
    </template>

    <!-- Request -->
    <template v-else>
      <auth-form-header
        icon="ph:key-bold"
        title="Reset your password"
        subtitle="Enter your work email and we'll send you a link to choose a new password."
      />

      <form class="space-y-4" novalidate @submit.prevent="submit">
        <VInput
          v-model="email"
          label="Work email"
          type="email"
          autocomplete="username"
          :placeholder="`you${AUTH_EMAIL_DOMAIN}`"
          icon="ph:envelope-simple-bold"
          size="md"
          rounded="xl"
          required
          :error="error"
          :disabled="loading"
        />

        <VButton
          type="submit"
          variant="primary"
          size="md"
          rounded="xl"
          block
          :loading="loading"
          icon="ph:paper-plane-right-bold"
          custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
        >
          Send reset link
        </VButton>

        <NuxtLinkLocale
          to="/auth/login"
          class="flex items-center justify-center gap-1.5 text-xs font-semibold text-text-muted hover:text-text-primary"
        >
          <Icon name="ph:arrow-left-bold" class="w-3.5 h-3.5 rtl:rotate-180" />
          Back to sign in
        </NuxtLinkLocale>
      </form>
    </template>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: "auth" });

const toast = useToast();
const { loading, requestReset } = useAdminAuth();

const email = ref("");
const error = ref("");
const sent = ref(false);

// Resend cooldown
const seconds = ref(0);
let timer: ReturnType<typeof setInterval> | undefined;

function startCooldown() {
  seconds.value = AUTH_RESEND_SECONDS;
  clearInterval(timer);
  timer = setInterval(() => {
    seconds.value--;
    if (seconds.value <= 0) clearInterval(timer);
  }, 1000);
}

async function submit() {
  error.value = !email.value.trim()
    ? "Enter your work email"
    : !authIsEmail(email.value)
      ? "Enter a valid email address"
      : "";
  if (error.value) return;

  await requestReset(email.value);
  sent.value = true;
  startCooldown();
}

async function resend() {
  await requestReset(email.value);
  startCooldown();
  toast.success("Reset link sent again");
}

onBeforeUnmount(() => clearInterval(timer));

useSeoMeta({
  title: "Forgot password",
  description: "Request a password reset link for the NileBus operator console.",
  robots: "noindex, nofollow",
});
</script>
