<template>
  <section
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 shadow-xs flex flex-col gap-3"
  >
    <header class="flex items-start justify-between gap-3">
      <div>
        <h3 class="font-bold text-sm text-text-primary">Below-Target Alerts</h3>
        <p class="text-[11px] font-mono text-text-muted">
          Corridors under {{ REVENUE_OCCUPANCY_TARGET }}% average load
        </p>
      </div>
      <VTrendBadge
        :tone="alerts.length ? 'critical' : 'positive'"
        :label="alerts.length ? `${alerts.length} open` : 'All clear'"
      />
    </header>

    <ul v-if="alerts.length" class="space-y-2">
      <li
        v-for="alert in alerts"
        :key="alert.id"
        class="p-3 rounded-lg border border-border/70 bg-surface-1/60 dark:bg-surface-2/20 space-y-1.5"
      >
        <div class="flex items-center justify-between gap-2">
          <span class="flex items-center gap-2 min-w-0 text-xs font-bold text-text-primary">
            <span
              :class="[
                'w-2 h-2 rounded-full shrink-0',
                alert.severity === 'critical' ? 'bg-rose-500' : 'bg-amber-500',
              ]"
            />
            <span class="truncate">{{ alert.corridor }}</span>
          </span>
          <span
            :class="[
              'font-mono text-xs font-bold tabular-nums',
              alert.severity === 'critical'
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-amber-600 dark:text-amber-400',
            ]"
          >
            {{ alert.occupancy }}%
          </span>
        </div>
        <p class="text-[11px] text-text-muted leading-snug">
          {{ alert.suggestion }} • {{ alert.trips }} trips
        </p>
      </li>
    </ul>
    <p v-else class="text-xs text-text-muted py-6 text-center">
      Every corridor is at or above target.
    </p>

    <footer
      class="pt-3 mt-auto border-t border-border/60 flex items-center justify-end text-[11px] font-mono"
    >
      <NuxtLinkLocale
        to="/pricing"
        class="text-accent-700 dark:text-accent-300 font-bold hover:underline flex items-center gap-1"
      >
        Configure Dynamic Yield
        <Icon name="ph:arrow-right-bold" class="w-3 h-3 rtl:rotate-180" />
      </NuxtLinkLocale>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import type { RevenueAlert } from "~/types/revenue";

defineProps<{
  alerts: RevenueAlert[];
}>();
</script>
