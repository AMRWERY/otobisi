<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <VStatCard
      v-for="kpi in kpis"
      :key="kpi.label"
      :label="kpi.label"
      :value="kpi.value"
      :unit="kpi.unit"
      :icon="kpi.icon"
      :delta="kpi.delta"
      :footer="kpi.footLeft"
      :note="kpi.footRight"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ReportKpi } from "~/types/report";

defineProps<{
  kpis: ReportKpi[];
}>();
</script>
