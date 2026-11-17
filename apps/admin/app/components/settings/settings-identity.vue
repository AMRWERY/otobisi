<template>
  <settings-section-card
    id="settings-identity"
    title="Organization & Legal Identity"
    subtitle="Official verified bus carrier record registered under Egyptian Ministry of Transport."
    icon="ph:buildings-bold"
    icon-class="bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-500/15 dark:border-teal-500/25 dark:text-teal-300"
  >
    <template #aside>
      <span
        class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-400 flex items-center gap-1"
      >
        <Icon name="ph:seal-check-bold" class="w-3 h-3" />
        Commercial Registry Active
      </span>
    </template>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <VInput
        v-model="form.legalNameEn"
        label="Company Legal Name (English)"
        hint="Official S.A.E."
        size="sm"
        rounded="lg"
      />
      <VInput
        v-model="form.legalNameAr"
        label="اسم الشركة التجاري المعتمد (عربي)"
        hint="السجل التجاري مصر"
        size="sm"
        rounded="lg"
        dir="rtl"
      />
      <VInput
        v-model="form.brandName"
        label="Public Brand Display Name"
        hint="Shown on the Otobisi booking app"
        icon="ph:bus"
        size="sm"
        rounded="lg"
        placeholder="NileBus (Otobisi Partner)"
      />
      <VInput
        :model-value="SETTINGS_TAX_ID"
        label="Commercial Register / Tax ID"
        hint="Cairo GAFI Authority"
        icon-right="ph:lock-key-bold"
        size="sm"
        rounded="lg"
        readonly
        box-class="bg-surface-2/60 cursor-not-allowed"
      />
    </div>

    <!-- Brandmark -->
    <div
      class="p-3 bg-surface-1/70 dark:bg-surface-2/20 border border-border/80 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0 transition-colors"
          :style="{ backgroundColor: form.accent }"
        >
          <Icon name="ph:bus-duotone" class="w-7 h-7" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-xs text-text-primary">
              Official Brandmark Badge
            </span>
            <span
              class="text-[9px] font-mono bg-surface-2 text-text-secondary px-1 rounded font-bold"
            >
              SVG • 512x512
            </span>
          </div>
          <p class="text-[10px] font-mono text-text-muted mt-0.5">
            Used on passenger booking PDFs, counter receipts & digital station
            terminal gates.
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <VButton variant="surface" size="xs" rounded="lg">
          Replace Asset
        </VButton>
        <VButton
          variant="ghost"
          size="xs"
          rounded="lg"
          custom-class="text-red-600 hover:text-red-700"
        >
          Reset
        </VButton>
      </div>
    </div>

    <!-- Contacts -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <VInput
        v-model="form.dispatchEmail"
        label="Operations & Manifest Dispatch Email"
        type="email"
        icon="ph:envelope-simple"
        size="sm"
        rounded="lg"
      />
      <VInput
        v-model="form.dispatchPhone"
        label="Operations Dispatch Line"
        hint="Hotline: 19842"
        icon="ph:phone-call"
        size="sm"
        rounded="lg"
      />
    </div>

    <!-- Concession banner -->
    <div
      class="p-3 bg-teal-50/70 dark:bg-teal-500/10 border border-teal-200/70 dark:border-teal-500/25 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono"
    >
      <div class="flex items-center gap-2.5">
        <Icon
          name="ph:shield-star-fill"
          class="w-5 h-5 text-teal-700 dark:text-teal-300 shrink-0"
        />
        <div>
          <div class="font-bold text-text-primary text-xs">
            Ministry of Transport Intercity Class A Concession
          </div>
          <div class="text-[11px] text-text-muted">
            Authorized for Cairo-Alexandria, Upper Egypt, and Red Sea
            corridors. Exp: Dec 2028
          </div>
        </div>
      </div>
      <div
        class="px-2.5 py-1 bg-surface-0 dark:bg-surface-1 border border-teal-200 dark:border-teal-500/25 text-teal-900 dark:text-teal-200 rounded font-bold text-[10px] uppercase shrink-0"
      >
        Verified Tier 1 (Audit Clean)
      </div>
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { SettingsForm } from "~/types/settings";

// The page's reactive form; fields are edited in place
const form = defineModel<SettingsForm>({ required: true });
</script>
