<template>
  <component
    :is="to ? NuxtLinkLocale : 'div'"
    :to="to || undefined"
    :class="[
      'group block bg-surface-0 dark:bg-[#131926] border border-border dark:border-[#1E293B] rounded-lg shadow-xs transition-all duration-150',
      wide ? 'p-5' : 'p-4',
      inactive
        ? 'opacity-70'
        : 'hover:shadow-md hover:-translate-y-0.5 hover:border-teal-500/50 dark:hover:bg-[#1E293B]',
      to ? 'cursor-pointer' : '',
    ]"
  >
    <!-- Overline + glyph anchor -->
    <div class="flex items-start justify-between gap-2">
      <span
        class="font-mono text-[11px] uppercase tracking-wider text-text-muted leading-tight"
      >
        {{ label }}
      </span>
      <slot name="icon">
        <Icon
          v-if="icon"
          :name="icon"
          class="w-4 h-4 shrink-0 text-text-muted/70 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
        />
      </slot>
    </div>

    <!-- Value row -->
    <div class="mt-2 flex items-baseline gap-1.5 flex-wrap">
      <template v-if="inactive">
        <span class="font-mono text-2xl font-semibold text-text-muted">—</span>
        <span v-if="inactiveText" class="text-xs text-text-muted">
          {{ inactiveText }}
        </span>
      </template>
      <template v-else>
        <span
          :class="[
            'font-mono font-semibold tracking-tight tabular-nums text-text-primary leading-none',
            wide ? 'text-[32px]' : 'text-[28px]',
          ]"
        >
          {{ value }}
        </span>
        <span v-if="unit" class="text-xs text-text-muted">{{ unit }}</span>

        <!-- Inline meter, e.g. occupancy -->
        <span
          v-if="progress != null"
          class="self-center ms-2 h-1.5 w-14 rounded-full bg-surface-2 overflow-hidden"
          role="progressbar"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span
            class="block h-full rounded-full bg-teal-600 dark:bg-teal-400"
            :style="{ width: `${Math.min(100, Math.max(0, progress))}%` }"
          />
        </span>
      </template>
    </div>

    <slot />

    <!-- Context row: secondary metadata + trend -->
    <div
      v-if="footer || $slots.footer || delta != null || $slots['footer-end']"
      class="mt-3 pt-3 border-t border-border/60 dark:border-[#1E293B] flex items-center justify-between gap-2 text-xs text-text-muted"
    >
      <span class="min-w-0">
        <slot name="footer">{{ footer }}</slot>
      </span>
      <slot name="footer-end">
        <VTrendBadge v-if="delta != null" :delta="delta" />
      </slot>
    </div>

    <p
      v-if="note"
      class="mt-1.5 font-mono text-[10px] text-text-muted/80 leading-snug"
    >
      {{ note }}
    </p>
  </component>
</template>

<script lang="ts" setup>
const NuxtLinkLocale = resolveComponent("NuxtLinkLocale");

withDefaults(
  defineProps<{
    label: string;
    value?: string | number;
    unit?: string;
    icon?: string;
    /** Percent change; shows a trend badge in the context row */
    delta?: number;
    /** Context text, left of the trend badge */
    footer?: string;
    /** Small caption under the context row */
    note?: string;
    /** 0–100: draws a thin meter next to the value */
    progress?: number;
    /** Dims the card and replaces the value with a dash */
    inactive?: boolean;
    inactiveText?: string;
    /** Makes the whole card a link */
    to?: string;
    /** Roomier padding and a larger figure, for use beside charts */
    wide?: boolean;
  }>(),
  {
    value: undefined,
    unit: undefined,
    icon: undefined,
    delta: undefined,
    footer: undefined,
    note: undefined,
    progress: undefined,
    inactiveText: "No data",
    to: undefined,
  },
);
</script>
