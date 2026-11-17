<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <VStatCard
      label="Events (24h)"
      :value="summary.total"
      icon="ph:list-checks-bold"
      footer="All categories"
    />
    <VStatCard
      label="Security Events"
      :value="summary.security"
      icon="ph:shield-warning-bold"
      footer="Sign-ins, 2FA, sessions"
    />
    <VStatCard
      label="Failed Actions"
      :value="summary.failed"
      icon="ph:warning-circle-bold"
      footer="Rejected or errored"
    >
      <template #footer-end>
        <VTrendBadge
          :tone="summary.failed ? 'negative' : 'positive'"
          :label="summary.failed ? 'Review' : 'Clean'"
        />
      </template>
    </VStatCard>
    <VStatCard
      label="Critical Severity"
      :value="summary.critical"
      icon="ph:siren-bold"
      footer="Needs a second look"
    >
      <template #footer-end>
        <VTrendBadge v-if="summary.critical" tone="critical" label="Action" />
      </template>
    </VStatCard>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  summary: { total: number; security: number; failed: number; critical: number };
}>();
</script>
