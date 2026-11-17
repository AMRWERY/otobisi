<template>
  <div class="space-y-7">
    <!-- No usable invitation in the link -->
    <template v-if="!invitation">
      <auth-form-header
        icon="ph:envelope-simple-x-bold"
        title="Invitation not found"
      >
        This invitation link is incomplete or has expired. Ask your owner or
        manager to send a new one from Team &amp; Roles.
      </auth-form-header>

      <VButton
        to="/auth/login"
        variant="surface"
        size="md"
        rounded="xl"
        block
      >
        Go to sign in
      </VButton>
    </template>

    <template v-else>
      <auth-form-header
        icon="ph:user-plus-bold"
        title="Join the NileBus team"
        subtitle="Set a password to activate your account."
      />

      <!-- Who invited you, and to what -->
      <div
        class="rounded-xl border border-border/80 bg-surface-1/60 dark:bg-surface-2/20 p-3.5 space-y-2.5 text-xs"
      >
        <div class="flex items-center gap-2.5">
          <div
            class="w-8 h-8 rounded-full bg-surface-1 dark:bg-surface-2 border border-border flex items-center justify-center font-bold text-text-secondary text-[11px] shrink-0"
          >
            {{ initialsOf(invitation.invitedBy) }}
          </div>
          <p class="text-text-secondary leading-snug">
            <b class="text-text-primary">{{ invitation.invitedBy }}</b>
            invited you to join as
            <b class="text-text-primary">{{ invitation.roleLabel }}</b>
          </p>
        </div>
        <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-[11px]">
          <dt class="text-text-muted">Email</dt>
          <dd class="text-text-primary truncate">{{ invitation.email }}</dd>
          <dt class="text-text-muted">Station</dt>
          <dd class="text-text-primary truncate">{{ invitation.hubLabel }}</dd>
        </dl>
      </div>

      <form class="space-y-4" novalidate @submit.prevent="submit">
        <auth-alert v-if="formError" tone="error">{{ formError }}</auth-alert>

        <auth-password-field
          v-model="form.password"
          label="Create password"
          autocomplete="new-password"
          show-strength
          :error="errors.password"
          :disabled="loading"
        />

        <auth-password-field
          v-model="form.confirm"
          label="Confirm password"
          autocomplete="new-password"
          :error="errors.confirm"
          :disabled="loading"
        />

        <auth-alert tone="info" title="Two-factor sign-in is required">
          You'll confirm a 6-digit code each time you sign in. Nothing to set
          up now.
        </auth-alert>

        <div class="space-y-1">
          <VCheckboxInput
            v-model="form.terms"
            wrapper-class="items-start text-text-secondary"
            box-class="mt-0.5"
            label-class="text-xs"
          >
            <span>
              I agree to the operator terms and acceptable-use policy for the
              NileBus console.
            </span>
          </VCheckboxInput>
          <p v-if="errors.terms" class="text-xs font-medium text-rose-600 dark:text-rose-400">
            {{ errors.terms }}
          </p>
        </div>

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
          Activate account
        </VButton>
      </form>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { TeamHubKey, TeamRoleKey } from "~/types/team";
import type { AuthInvitation } from "~/types/auth";

definePageMeta({ layout: "auth" });

const route = useRoute();
const localePath = useLocalePath();
const toast = useToast();
const { loading, acceptInvitation } = useAdminAuth();

const param = (key: string) => {
  const value = route.query[key];
  return (Array.isArray(value) ? value[0] : value) ?? "";
};

// Role and hub arrive as the keys used by Team & Roles; unknown keys fall back to the raw text
const invitation = computed<AuthInvitation | null>(() => {
  const email = param("email");
  if (!authIsEmail(email)) return null;
  const role = param("role");
  const hub = param("hub");
  return {
    email,
    roleLabel: TEAM_ROLES[role as TeamRoleKey]?.label ?? (role || "Team member"),
    hubLabel: TEAM_HUBS[hub as TeamHubKey]?.label ?? (hub || "Assigned on first sign in"),
    invitedBy: param("invitedBy") || "Your administrator",
  };
});

const form = reactive({ password: "", confirm: "", terms: false });
const errors = reactive({ password: "", confirm: "", terms: "" });
const formError = ref("");

function validate() {
  errors.password = authPasswordValid(form.password)
    ? ""
    : "Password does not meet the requirements below";
  errors.confirm =
    form.confirm === form.password ? "" : "The two passwords don't match";
  errors.terms = form.terms ? "" : "Accept the terms to continue";
  return !errors.password && !errors.confirm && !errors.terms;
}

async function submit() {
  formError.value = "";
  if (!invitation.value || !validate()) return;

  const result = await acceptInvitation(invitation.value.email, form.password);
  if (!result.ok) {
    formError.value = result.error ?? "Could not activate the account";
    return;
  }
  toast.success("Account activated. Sign in to get started.");
  await navigateTo(localePath("/auth/login"));
}

useSeoMeta({
  title: "Accept invitation",
  description: "Activate your NileBus operator console account.",
  robots: "noindex, nofollow",
});
</script>
