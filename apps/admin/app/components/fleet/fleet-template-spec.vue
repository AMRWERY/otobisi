<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 shadow-xs flex flex-col justify-between"
  >
    <div>
      <div class="flex items-center justify-between mb-2 gap-3">
        <div>
          <h3 class="font-bold text-sm text-text-primary">
            Standard Template Spec
          </h3>
          <div class="text-[11px] font-mono text-text-muted">
            MCV 600 Coaches • 32 Reclining Orthopedic seats
          </div>
        </div>
        <span
          class="bg-surface-1 dark:bg-surface-2 text-text-secondary px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0"
        >
          VIP 2+1 Suite
        </span>
      </div>

      <p class="text-[11px] text-text-muted mb-3 leading-snug">
        Integrated USB-C telematics, 145° ergonomic recline with individual AC
        climate zones.
      </p>

      <!-- Cabin matrix -->
      <div
        class="bg-surface-1 dark:bg-surface-2/30 border border-border rounded-lg p-3 font-mono text-[11px]"
      >
        <div
          class="flex justify-between text-[10px] text-text-muted pb-2 border-b border-border"
        >
          <span>COCKPIT / FRONT</span>
          <span>DOOR • A</span>
        </div>

        <div class="space-y-1.5 my-3">
          <div
            v-for="row in rows"
            :key="row"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-1.5">
              <span v-for="col in ['A', 'B']" :key="col" :class="seatClass">
                {{ row }}{{ col }}
              </span>
            </div>
            <div
              class="text-[9px] text-text-muted/60 font-bold uppercase tracking-widest"
            >
              AISLE
            </div>
            <span :class="seatClass">{{ row }}C</span>
          </div>
        </div>

        <div
          class="flex justify-between text-[10px] text-text-muted pt-2 border-t border-border"
        >
          <span>GALLEY / WC</span>
          <span>REAR ACCESS</span>
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-between pt-3 mt-3 border-t border-border/60 text-xs font-mono"
    >
      <span class="text-text-secondary">
        Capacity:
        <strong class="text-text-primary">{{ capacity }} Passengers</strong>
      </span>
      <NuxtLinkLocale
        to="/seat-maps"
        class="text-accent-700 dark:text-accent-300 font-bold hover:underline flex items-center gap-1"
      >
        <span>Edit Templates</span>
        <Icon name="ph:arrow-right-bold" class="w-3 h-3 rtl:rotate-180" />
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<script lang="ts" setup>
const capacity = COACH_TEMPLATES.vip.seats;
const rows = [1, 2, 3];

const seatClass =
  "w-8 h-7 bg-accent-100 text-accent-900 dark:bg-accent-500/20 dark:text-accent-200 rounded font-bold flex items-center justify-center text-[10px] border border-accent-200 dark:border-accent-500/25 shadow-2xs";
</script>
