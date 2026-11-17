<template>
  <settings-section-card
    id="settings-branding"
    title="Public Brand Accent & Passenger Preview"
    subtitle="Customize brand identity tokens across commuter checkout pages, ticket passes, and Otobisi marketplace results."
    icon="ph:paint-brush-bold"
    icon-class="bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-500/15 dark:border-indigo-500/25 dark:text-indigo-300"
  >
    <template #aside>
      <span
        class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/25 text-teal-800 dark:text-teal-300 flex items-center gap-1"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
        Live Interactive Preview
      </span>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
      <!-- Controls -->
      <div class="md:col-span-5 space-y-3.5 text-xs font-mono">
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <span class="text-xs font-semibold text-text-primary/90">
              Select Primary Accent Theme
            </span>
            <span class="text-[10px] font-bold" :style="{ color: form.accent }">
              {{ form.accent }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button
              v-for="color in SETTINGS_THEME_COLORS"
              :key="color.hex"
              type="button"
              :aria-label="color.name"
              :title="color.name"
              class="w-7 h-7 rounded-lg flex items-center justify-center transition-transform active:scale-95 shadow-xs cursor-pointer"
              :style="{ backgroundColor: color.hex }"
              @click="form.accent = color.hex"
            >
              <Icon
                v-if="form.accent.toLowerCase() === color.hex.toLowerCase()"
                name="ph:check-bold"
                class="w-4 h-4 text-white"
              />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <VInput
            v-model="form.accent"
            label="Custom Hex String"
            size="sm"
            rounded="lg"
            :error="isValidHex(form.accent) ? undefined : 'Use #RRGGBB'"
            input-class="uppercase"
            label-class="text-[10px] text-text-muted font-normal"
          >
            <template #leading>
              <span
                class="w-3 h-3 rounded-full shrink-0"
                :style="{ backgroundColor: form.accent }"
              />
            </template>
          </VInput>
          <div class="flex flex-col gap-1.5">
            <span class="text-[10px] text-text-muted">RGB Specifier</span>
            <div
              class="px-2.5 py-1.5 bg-surface-1 dark:bg-surface-2/50 border border-border rounded-lg text-text-secondary text-[11px] truncate"
            >
              {{ hexToRgb(form.accent) }}
            </div>
          </div>
        </div>

        <VInput
          v-model="form.tagline"
          label="Sub-Brand Commuter Tagline"
          size="sm"
          rounded="lg"
        />

        <VFormSelect
          v-model="form.tier"
          label="Fleet Comfort Tag Tier"
          :options="SETTINGS_TIER_OPTIONS"
        />

        <!-- WCAG score -->
        <div
          class="p-2.5 bg-surface-1 dark:bg-surface-2/30 border border-border rounded-lg flex items-center justify-between text-xs"
        >
          <div class="flex items-center gap-2">
            <Icon
              name="ph:check-circle-fill"
              class="w-4 h-4 text-emerald-600"
            />
            <div>
              <div class="font-bold text-text-primary">
                WCAG AAA Accessibility
              </div>
              <div class="text-[10px] text-text-muted">
                7.8:1 contrast on white canvas
              </div>
            </div>
          </div>
          <span
            class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]"
          >
            PASS
          </span>
        </div>
      </div>

      <settings-ticket-preview
        class="md:col-span-7"
        :brand-name="form.brandName"
        :tagline="form.tagline"
        :accent="form.accent"
        :tier="form.tier"
      />
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { SettingsForm } from "~/types/settings";

// The page's reactive form; fields are edited in place
const form = defineModel<SettingsForm>({ required: true });
</script>
