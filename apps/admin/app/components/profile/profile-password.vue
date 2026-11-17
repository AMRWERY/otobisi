<template>
  <settings-section-card
    title="Change Password"
    subtitle="Use a long, unique password. You'll stay signed in on this device."
    icon="ph:key-bold"
    icon-class="bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-500/15 dark:border-indigo-500/25 dark:text-indigo-300"
  >
    <form
      class="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
      @submit.prevent="emit('submit')"
    >
      <VInput
        v-model="password.current"
        label="Current Password"
        type="password"
        autocomplete="current-password"
        icon="ph:lock-simple"
        size="sm"
        rounded="lg"
        wrapper-class="sm:col-span-2"
      />

      <VInput
        v-model="password.next"
        label="New Password"
        type="password"
        autocomplete="new-password"
        icon="ph:lock-key"
        size="sm"
        rounded="lg"
        :error="error"
      />
      <VInput
        v-model="password.confirm"
        label="Confirm New Password"
        type="password"
        autocomplete="new-password"
        icon="ph:lock-key"
        size="sm"
        rounded="lg"
      />

      <!-- Strength meter -->
      <div class="sm:col-span-2 space-y-1.5">
        <div class="flex gap-1.5" role="meter" :aria-valuenow="strength.score" aria-valuemin="0" aria-valuemax="4" aria-label="Password strength">
          <span
            v-for="n in 4"
            :key="n"
            :class="[
              'h-1.5 flex-1 rounded-full transition-colors',
              n <= strength.score ? strength.barClass : 'bg-surface-2',
            ]"
          />
        </div>
        <p class="font-mono text-[11px] text-text-muted">
          Strength:
          <b class="text-text-primary">{{ strength.label }}</b>
          • {{ PROFILE_MIN_PASSWORD_LENGTH }}+ characters with upper and lower
          case, a number and a symbol
        </p>
      </div>

      <div class="sm:col-span-2 flex justify-end">
        <VButton
          type="submit"
          variant="primary"
          size="sm"
          rounded="xl"
          icon="ph:check-bold"
          custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
        >
          Update Password
        </VButton>
      </div>
    </form>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { ProfilePasswordForm, ProfilePasswordStrength } from "~/types/profile";

defineProps<{
  strength: ProfilePasswordStrength;
  error?: string;
}>();

const emit = defineEmits<{ (e: "submit"): void }>();

// The page's reactive password form; fields are edited in place
const password = defineModel<ProfilePasswordForm>({ required: true });
</script>
