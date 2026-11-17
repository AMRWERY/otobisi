<template>
  <settings-section-card
    id="settings-payments"
    title="Verified Egyptian Payment Rails & Tax Invoicing"
    subtitle="Configured payout settlements routed directly into the operator's corporate treasury account."
    icon="ph:bank-bold"
    icon-class="bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-500/15 dark:border-emerald-500/25 dark:text-emerald-300"
  >
    <template #aside>
      <VButton
        variant="surface"
        size="xs"
        rounded="lg"
        @click="emit('configure')"
      >
        Configure Gateways
      </VButton>
    </template>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div
        v-for="rail in SETTINGS_OPERATOR_RAILS"
        :key="rail.name"
        :class="[
          'p-3 border rounded-xl flex items-center justify-between gap-2 text-xs font-mono',
          rail.cardClass,
        ]"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <div
            :class="[
              'w-8 h-8 rounded-lg text-white font-bold flex items-center justify-center text-xs shrink-0',
              rail.initialClass,
            ]"
          >
            {{ rail.initial }}
          </div>
          <div class="min-w-0">
            <div class="font-bold text-text-primary truncate">
              {{ rail.name }}
            </div>
            <div class="text-[10px] text-text-muted">{{ rail.note }}</div>
          </div>
        </div>
        <Icon
          name="ph:check-circle-fill"
          class="w-4 h-4 text-emerald-600 shrink-0"
        />
      </div>
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
const emit = defineEmits<{ (e: "configure"): void }>();
</script>
