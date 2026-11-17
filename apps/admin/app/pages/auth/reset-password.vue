<template>
  <div class="space-y-7">
    <!-- Missing / malformed link -->
    <template v-if="!hasToken">
      <auth-form-header icon="ph:link-break-bold" title="This link isn't valid">
        The password reset link is missing or has expired. Request a new one to
        continue.
      </auth-form-header>

      <VButton
        to="/auth/forgot-password"
        variant="primary"
        size="md"
        rounded="xl"
        block
        custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
      >
        Request a new link
      </VButton>
    </template>

    <template v-else>
      <auth-form-header
        icon="ph:lock-key-open-bold"
        title="Choose a new password"
        subtitle="Pick something you don't use anywhere else. You'll be asked to sign in again afterwards."
      />

      <form class="space-y-4" novalidate @submit.prevent="submit">
        <auth-alert v-if="formError" tone="error">{{ formError }}</auth-alert>

        <auth-password-field
          v-model="form.password"
          label="New password"
          autocomplete="new-password"
          show-strength
          :error="errors.password"
          :disabled="loading"
        />

        <auth-password-field
          v-model="form.confirm"
          label="Confirm new password"
          autocomplete="new-password"
          :error="errors.confirm"
          :disabled="loading"
        />

        <VButton
          type="submit"
          variant="primary"
          size="md"
          rounded="xl"
          block
          :loading="loading"
          icon="ph:check-bold"
          custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
        >
          Update password
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

const route = useRoute();
const localePath = useLocalePath();
const toast = useToast();
const { loading, resetPassword } = useAdminAuth();

const token = computed(() => {
  const value = route.query.token;
  return (Array.isArray(value) ? value[0] : value) ?? "";
});
// Demo: any reasonably long token counts as a valid link
const hasToken = computed(() => token.value.length >= 8);

const form = reactive({ password: "", confirm: "" });
const errors = reactive({ password: "", confirm: "" });
const formError = ref("");

function validate() {
  errors.password = authPasswordValid(form.password)
    ? ""
    : "Password does not meet the requirements below";
  errors.confirm =
    form.confirm === form.password ? "" : "The two passwords don't match";
  return !errors.password && !errors.confirm;
}

async function submit() {
  formError.value = "";
  if (!validate()) return;

  const result = await resetPassword(token.value, form.password);
  if (!result.ok) {
    formError.value = result.error ?? "Could not update the password";
    return;
  }
  toast.success("Password updated. Sign in with your new password.");
  await navigateTo(localePath("/auth/login"));
}

useSeoMeta({
  title: "Reset password",
  description: "Choose a new password for the NileBus operator console.",
  robots: "noindex, nofollow",
});
</script>
