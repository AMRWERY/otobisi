<template>
  <div class="px-6 py-6 space-y-5 max-w-[1600px] mx-auto">
    <lazy-reports-header
      v-model:period="filters.period"
      v-model:date-range="filters.dateRange"
      v-model:corridor="filters.corridor"
      @export-csv="exportCsv"
      @export-pdf="exportPdf"
    />

    <lazy-reports-stats :kpis="kpis" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <lazy-reports-corridor-revenue
        class="lg:col-span-7"
        :corridors="corridors"
        :top-share="topCorridorShare"
      />
      <lazy-reports-payment-rails
        class="lg:col-span-5"
        :rails="rails"
        :total="totalBookings"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <lazy-reports-volume-chart class="lg:col-span-7" />
      <lazy-reports-occupancy-ranking
        class="lg:col-span-5"
        :ranking="ranking"
        :below-target="belowTargetCount"
      />
    </div>

    <lazy-reports-audit-strip @view-log="viewSyncLog" />
  </div>
</template>

<script lang="ts" setup>
const {
  filters,
  kpis,
  corridors,
  rails,
  ranking,
  totalBookings,
  belowTargetCount,
  topCorridorShare,
  exportCsv,
  exportPdf,
} = useReports();

const toast = useToast();

function viewSyncLog() {
  toast.info("Sync log is not available yet");
}

useSeoMeta({
  title: "Reports & Analytics",
  description:
    "Revenue, occupancy and payment-rail analytics across Otobisi corridors.",
  private: false,
});
</script>