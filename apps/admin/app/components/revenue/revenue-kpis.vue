<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <VStatCardWide
        label="Revenue Velocity"
        :value="revenueFormatEgp(totals.revenue)"
        unit="EGP"
        :delta="14.8"
        delta-note="vs prev period"
        :series="REVENUE_VELOCITY_SERIES"
        start-label="Period start"
        end-label="Today"
        :footer="`${totals.trips} trips • avg fare ${totals.avgFare} EGP`"
      />
      <VStatCardWide
        label="Network Occupancy"
        :value="totals.occupancy"
        unit="% load"
        :delta="3.6"
        delta-note="vs prev period"
        :series="REVENUE_OCCUPANCY_SERIES"
        start-label="Period start"
        end-label="Today"
        :footer="`Target ${REVENUE_OCCUPANCY_TARGET}% • ${totals.belowTarget} trips below`"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <VStatCard
        label="Seats Sold"
        :value="totals.seats.toLocaleString('en-US')"
        :unit="`/ ${totals.capacity.toLocaleString('en-US')}`"
        icon="ph:armchair-duotone"
        :progress="totals.occupancy"
        footer="Across filtered trips"
      />
      <VStatCard
        label="Avg Fare"
        :value="totals.avgFare"
        unit="EGP"
        icon="ph:ticket-duotone"
        :delta="2.3"
        footer="Per paying seat"
      />
      <VStatCard
        label="Yield per Seat-Km"
        :value="totals.yieldPerSeatKm"
        unit="EGP"
        icon="ph:trend-up-bold"
        :delta="5.1"
        footer="Breakeven 0.94"
      />
      <VStatCard
        label="Trips Below Target"
        :value="totals.belowTarget"
        :unit="`of ${totals.trips}`"
        icon="ph:warning-bold"
        footer="Under the occupancy target"
      >
        <template #footer-end>
          <VTrendBadge
            v-if="totals.belowTarget"
            tone="critical"
            label="Review"
          />
          <VTrendBadge v-else tone="positive" label="On target" />
        </template>
      </VStatCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  totals: {
    revenue: number;
    seats: number;
    capacity: number;
    trips: number;
    occupancy: number;
    avgFare: number;
    yieldPerSeatKm: number;
    belowTarget: number;
  };
}>();
</script>
