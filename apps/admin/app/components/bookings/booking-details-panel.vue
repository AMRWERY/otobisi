<template>
  <section
    class="flex flex-col h-full max-h-full bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
    aria-label="Booking inspection"
  >
    <!-- Header -->
    <header
      class="px-5 py-4 border-b border-border/80 flex items-start justify-between gap-3 shrink-0"
    >
      <div class="space-y-1.5 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <h2 class="text-sm font-extrabold text-text-primary">
            Booking Details
          </h2>
          <span
            class="px-1.5 py-0.5 rounded bg-accent-50 dark:bg-accent-500/15 font-mono text-[11px] font-bold text-accent-700 dark:text-accent-300"
          >
            {{ booking.id }}
          </span>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <BookingStatusPill :status="booking.status">
            {{ STATUS_LABELS[booking.status] }} • {{ booking.gateway }}
            {{ booking.refunded ? "Refunded" : "Paid" }}
          </BookingStatusPill>
          <span class="font-mono text-[10px] text-text-muted">
            Created {{ booking.createdAt }}
          </span>
        </div>
      </div>
      <VButton
        variant="ghost"
        size="xs"
        rounded="lg"
        icon="ph:x-bold"
        aria-label="Close details"
        @click="emit('close')"
      />
    </header>

    <!-- Body -->
    <div class="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 space-y-6">
      <!-- Passengers -->
      <section class="space-y-2.5">
        <div class="flex items-center justify-between">
          <h3 class="section-title">Passenger information</h3>
          <span
            class="px-1.5 py-0.5 rounded bg-surface-1 dark:bg-surface-2 text-[10px] font-semibold text-text-secondary"
          >
            {{ travelerCount }} {{ travelerCount === 1 ? "Traveler" : "Travelers" }}
          </span>
        </div>

        <div
          class="rounded-lg border border-border/80 bg-surface-1/60 dark:bg-surface-2/10 divide-y divide-border/60"
        >
          <div class="p-3 space-y-2">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs font-bold text-text-primary">
                    {{ booking.passengerName }}
                  </span>
                  <span class="chip">Primary (Lead)</span>
                </div>
                <p class="mt-0.5 text-[11px] text-text-muted">
                  {{ booking.gender }} • {{ booking.age }} yrs
                </p>
              </div>
              <span
                v-if="booking.seats[0]"
                class="px-1.5 py-0.5 rounded bg-accent-600 text-white font-mono text-[10px] font-bold shrink-0"
              >
                Seat {{ booking.seats[0] }}
              </span>
            </div>

            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2">
              <div>
                <dt class="field-label">National ID</dt>
                <dd class="field-value font-mono">{{ booking.nationalId }}</dd>
              </div>
              <div>
                <dt class="field-label">Egyptian phone</dt>
                <dd class="field-value font-mono" dir="ltr">
                  {{ booking.phone }}
                </dd>
              </div>
              <div class="sm:col-span-2">
                <dt class="field-label">Email</dt>
                <dd class="field-value truncate">{{ booking.email }}</dd>
              </div>
            </dl>
          </div>

          <div
            v-for="c in booking.companions"
            :key="c.name"
            class="px-3 py-2.5 flex items-center justify-between gap-2"
          >
            <div class="min-w-0">
              <span class="text-xs font-semibold text-text-primary">
                {{ c.name }}
              </span>
              <span class="ms-2 text-[11px] text-text-muted font-mono">
                {{ c.relation }}
              </span>
            </div>
            <span
              class="px-1.5 py-0.5 rounded bg-accent-100 dark:bg-accent-500/20 text-accent-800 dark:text-accent-200 font-mono text-[10px] font-bold shrink-0"
            >
              Seat {{ c.seat }}
            </span>
          </div>
        </div>
      </section>

      <!-- Route & dispatch -->
      <section class="space-y-2.5">
        <div class="flex items-center justify-between">
          <h3 class="section-title">Route & dispatch info</h3>
          <span class="font-mono text-[10px] font-semibold text-accent-700 dark:text-accent-300">
            Trip {{ booking.tripId }}
          </span>
        </div>

        <div
          class="rounded-lg border border-border/80 bg-surface-1/60 dark:bg-surface-2/10 p-3 space-y-3"
        >
          <div class="flex items-center gap-2 text-xs font-bold text-text-primary">
            <Icon name="ph:bus-bold" class="w-4 h-4 text-accent-600 shrink-0" />
            <span>{{ booking.origin }}</span>
            <Icon
              name="ph:arrow-right"
              class="w-3 h-3 text-text-muted rtl:rotate-180 shrink-0"
            />
            <span>{{ booking.destination }}</span>
          </div>
          <p class="font-mono text-[11px] text-text-muted">
            Est. {{ booking.duration }}
          </p>

          <dl class="grid grid-cols-2 gap-2">
            <div class="cell">
              <dt class="field-label">Scheduled departure</dt>
              <dd class="field-value font-mono">
                {{ booking.departDay }}, {{ booking.departTime }} CLT
              </dd>
              <dd class="text-[11px] text-accent-700 dark:text-accent-300 font-mono">
                {{ booking.gate }}
              </dd>
            </div>
            <div class="cell">
              <dt class="field-label">Vehicle & driver</dt>
              <dd class="field-value">{{ booking.vehicle }}</dd>
              <dd class="text-[11px] text-text-muted font-mono">
                {{ booking.plate }} • {{ booking.driver }}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- Seats -->
      <section>
        <BookingSeatMap
          v-if="!isSleeper"
          :seats="booking.seats"
          :vehicle-class="booking.vehicleClass"
        />
        <template v-else>
          <h3 class="section-title mb-2">Berths ({{ booking.vehicleClass }})</h3>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="seat in booking.seats"
              :key="seat"
              class="px-2 py-1 rounded bg-accent-600 text-white font-mono text-[11px] font-bold"
            >
              {{ seat }}
            </span>
          </div>
        </template>
      </section>

      <!-- Payment -->
      <section class="space-y-2.5">
        <div class="flex items-center justify-between">
          <h3 class="section-title">Tariff & gateway ledger</h3>
          <span class="font-mono text-[10px] font-semibold text-text-muted uppercase">
            {{ booking.gateway }}
          </span>
        </div>

        <dl
          class="rounded-lg border border-border/80 bg-surface-1/60 dark:bg-surface-2/10 p-3 space-y-1.5 text-xs"
        >
          <div class="flex items-center justify-between gap-3">
            <dt class="text-text-secondary">
              Base fare ({{ booking.seats.length }}
              {{ booking.seats.length === 1 ? "seat" : "seats" }})
            </dt>
            <dd class="font-mono tabular-nums text-text-primary">
              {{ formatEgp(fare.base) }} EGP
            </dd>
          </div>
          <div class="flex items-center justify-between gap-3">
            <dt class="text-text-secondary">Egyptian 14% VAT (Law 67/2016)</dt>
            <dd class="font-mono tabular-nums text-text-primary">
              {{ formatEgp(fare.vat) }} EGP
            </dd>
          </div>
          <div
            class="flex items-center justify-between gap-3 pt-2 mt-1 border-t border-border/70"
          >
            <dt class="font-bold text-text-primary">
              {{ booking.refunded ? "Refunded" : "Total paid" }}
            </dt>
            <dd class="font-mono tabular-nums font-extrabold text-sm text-accent-700 dark:text-accent-300">
              {{ formatEgp(booking.fare) }} EGP
            </dd>
          </div>
          <div class="flex items-center justify-between gap-3 pt-1 text-[11px]">
            <dt class="text-text-muted">Gateway TxID</dt>
            <dd class="font-mono text-text-secondary">{{ booking.gatewayTxId }}</dd>
          </div>
          <div class="flex items-center justify-between gap-3 text-[11px]">
            <dt class="text-text-muted">Settled</dt>
            <dd class="font-mono text-text-secondary">{{ booking.settledAt }}</dd>
          </div>
        </dl>
      </section>
    </div>

    <!-- Actions -->
    <footer
      class="shrink-0 px-5 py-4 border-t border-border/80 bg-surface-0 dark:bg-[#111927] space-y-2"
    >
      <div class="grid grid-cols-2 gap-2">
        <VButton
          variant="surface"
          size="sm"
          rounded="lg"
          icon="ph:user-minus-bold"
          :disabled="booking.status !== 'confirmed'"
          @click="emit('no-show', booking)"
        >
          Mark No-Show
        </VButton>
        <VButton
          variant="unstyled"
          size="sm"
          icon="ph:x-circle-bold"
          :disabled="booking.status === 'cancelled' || booking.status === 'completed'"
          custom-class="inline-flex items-center justify-center gap-2 h-8 px-3 rounded-lg border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          @click="emit('refund', booking)"
        >
          Refund Booking
        </VButton>
      </div>
      <VButton
        variant="primary"
        size="sm"
        rounded="lg"
        block
        icon="ph:whatsapp-logo-bold"
        custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white"
        @click="emit('resend', booking)"
      >
        Resend e-Ticket (WhatsApp & SMS)
      </VButton>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import type { Booking } from "~/types/booking";

const props = defineProps<{
  booking: Booking;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "no-show", booking: Booking): void;
  (e: "refund", booking: Booking): void;
  (e: "resend", booking: Booking): void;
}>();

const travelerCount = computed(() => 1 + props.booking.companions.length);
const fare = computed(() => splitFare(props.booking.fare));
const isSleeper = computed(() => props.booking.vehicleClass === "Sleeper");
</script>

<style scoped>
.section-title {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.field-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
  color: var(--text-muted);
}
.field-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
}
.chip {
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  font-size: 10px;
  color: var(--text-secondary);
}
.cell {
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--surface-0);
  border: 1px solid var(--border);
}
</style>
