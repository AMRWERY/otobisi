<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-invite-title"
    >
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-xs"
        @click="emit('close')"
      />

      <div
        class="relative bg-surface-0 dark:bg-[#0E131F] w-full max-w-xl max-h-full overflow-y-auto rounded-2xl shadow-2xl border border-border"
      >
        <!-- Header -->
        <div
          class="p-4 sm:p-5 border-b border-border/80 flex items-start justify-between gap-4 bg-surface-1/30 dark:bg-surface-2/10"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/25 flex items-center justify-center text-teal-800 dark:text-teal-300 shrink-0"
            >
              <Icon name="ph:user-plus-bold" class="w-5 h-5" />
            </div>
            <div>
              <h3
                id="team-invite-title"
                class="text-base font-bold text-text-primary"
              >
                Invite New Team Member
              </h3>
              <p class="text-xs text-text-muted mt-0.5">
                Send an invitation link with granular access rights across
                operator hubs.
              </p>
            </div>
          </div>
          <VButton
            variant="ghost"
            size="xs"
            rounded="lg"
            icon="ph:x-bold"
            aria-label="Close dialog"
            @click="emit('close')"
          />
        </div>

        <form
          class="p-5 sm:p-6 space-y-4 text-xs"
          @submit.prevent="emit('submit', { ...form })"
        >
          <VInput
            v-model="form.name"
            label="Full Name (English / Arabic)"
            hint="Format: Omar Farouk / عمر فاروق"
            required
            size="sm"
            rounded="lg"
            placeholder="e.g. Omar Farouk / عمر فاروق"
          />

          <VInput
            v-model="form.email"
            label="Work Email Address"
            :hint="`Must end in ${TEAM_EMAIL_DOMAIN}`"
            type="email"
            required
            icon="ph:envelope-simple"
            size="sm"
            rounded="lg"
            :placeholder="`omar.farouk${TEAM_EMAIL_DOMAIN}`"
          />

          <VFormSelect
            v-model="form.hub"
            label="Assigned Terminal / Operating Hub"
            :options="hubOptions"
          />

          <!-- Role cards -->
          <fieldset>
            <legend class="font-semibold text-text-primary/90 mb-2">
              Select Organizational Role
            </legend>
            <div class="space-y-2">
              <label
                v-for="key in TEAM_ROLE_KEYS"
                :key="key"
                :class="[
                  'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all',
                  form.role === key
                    ? 'border-[#0F5A47] bg-teal-50/40 dark:bg-teal-500/10 ring-1 ring-[#0F5A47]'
                    : 'border-border bg-surface-0 dark:bg-transparent hover:bg-surface-1',
                ]"
              >
                <input
                  v-model="form.role"
                  type="radio"
                  name="team-role"
                  :value="key"
                  class="mt-1"
                />
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="font-bold text-text-primary text-xs">
                      {{ TEAM_ROLES[key].label }}
                    </span>
                    <span
                      v-if="TEAM_ROLES[key].tag"
                      :class="[
                        'px-1.5 rounded text-[9px] font-bold',
                        TEAM_ROLES[key].tagClass,
                      ]"
                    >
                      {{ TEAM_ROLES[key].tag }}
                    </span>
                  </div>
                  <p class="text-[11px] text-text-muted mt-0.5 leading-snug">
                    {{ TEAM_ROLES[key].description }}
                  </p>
                </div>
              </label>
            </div>
          </fieldset>

          <VCheckboxInput
            v-model="form.require2FA"
            wrapper-class="text-text-secondary pt-1"
            label-class="flex items-center gap-2"
          >
            <Icon name="ph:shield-check-bold" class="w-3.5 h-3.5 text-teal-700" />
            <span class="font-semibold text-[11px]">
              Require two-factor authentication (2FA) on first login
            </span>
          </VCheckboxInput>

          <div
            class="pt-4 border-t border-border/80 flex items-center justify-end gap-2"
          >
            <VButton
              variant="surface"
              size="sm"
              rounded="xl"
              @click="emit('close')"
            >
              Cancel
            </VButton>
            <VButton
              type="submit"
              variant="primary"
              size="sm"
              rounded="xl"
              icon="ph:paper-plane-right-bold"
              custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
            >
              Send Invitation
            </VButton>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { InviteForm } from "~/types/team";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", form: InviteForm): void;
}>();

const form = ref<InviteForm>(emptyInviteForm());

const hubOptions = TEAM_HUB_KEYS.map((key) => ({
  value: key,
  label: TEAM_HUBS[key].label,
}));

// Start every opening with a clean form
watch(
  () => props.isOpen,
  (open) => {
    if (open) form.value = emptyInviteForm();
  },
);
</script>
