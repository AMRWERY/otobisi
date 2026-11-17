<template>
  <settings-section-card
    id="hubprefs-ticketing"
    title="Ticketing"
    subtitle="How long seats are held while a passenger pays."
    icon="ph:ticket-bold"
    icon-class="bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-500/15 dark:border-emerald-500/25 dark:text-emerald-300"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <VInput
        v-model.number="form.ticketing.holdSeatMin"
        label="Seat Hold During Checkout"
        type="number"
        :min="1"
        size="sm"
        rounded="lg"
        hint="Minutes before the seat is released"
      />
    </div>

    <div
      class="p-3.5 rounded-xl bg-surface-1/60 dark:bg-surface-2/20 border border-border/80 space-y-3"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="text-xs font-bold text-text-primary">
            Auto-cancel unpaid bookings
          </div>
          <p class="text-[11px] text-text-muted mt-0.5">
            Pay-at-counter and Fawry reservations that are never settled free
            their seats automatically.
          </p>
        </div>
        <VSwitchButton
          v-model="form.ticketing.autoCancelUnpaid"
          label="Auto-cancel unpaid bookings"
        />
      </div>

      <VInput
        v-model.number="form.ticketing.autoCancelAfterMin"
        label="Cancel After"
        type="number"
        :min="1"
        size="sm"
        rounded="lg"
        :disabled="!form.ticketing.autoCancelUnpaid"
        hint="Minutes without payment"
        wrapper-class="sm:max-w-xs"
      />
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { HubPrefsForm } from "~/types/hubprefs";

// The page's reactive form; fields are edited in place
const form = defineModel<HubPrefsForm>({ required: true });
</script>
