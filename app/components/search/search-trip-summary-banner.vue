<template>
  <div
    class="bg-surface-1 border border-border rounded-2xl p-4 sm:p-5 shadow-xs mb-6 text-start"
  >
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
      <!-- Left: Operator & Class -->
      <div class="md:col-span-5 flex items-start gap-3">
        <div
          class="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0 shadow-2xs"
        >
          <Icon name="ph:bus-duotone" class="w-6 h-6" />
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h2 class="text-base sm:text-lg font-black text-text-primary">
              {{ trip.operatorName }} {{ trip.busClass }}
            </h2>
            <span
              class="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold text-[11px] border border-orange-500/20"
            >
              {{ trip.busModel }}
            </span>
            <span
              class="px-2 py-0.5 rounded-md bg-surface-2 text-text-secondary text-[11px] border border-border"
            >
              Air Conditioned 2+2
            </span>
          </div>

          <div
            class="flex items-center gap-2 mt-1 text-xs text-text-secondary flex-wrap"
          >
            <span class="flex items-center gap-1 font-bold text-text-primary">
              <Icon name="ph:star-fill" class="w-3.5 h-3.5 text-amber-500" />
              {{ trip.rating }}
            </span>
            <span class="text-text-muted"
              >({{ trip.reviewsCount }} verified trips)</span
            >
            <span class="text-text-muted">•</span>
            <span
              class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold"
            >
              <Icon name="ph:seal-check-fill" class="w-3.5 h-3.5" />
              Ministry Certified
            </span>
            <span class="text-text-muted">•</span>
            <span>{{ trip.routeHighlight || "Non-stop Express" }}</span>
          </div>
        </div>
      </div>

      <!-- Middle: Time & Route Track -->
      <div
        class="md:col-span-4 flex items-center justify-between gap-2 px-2 sm:px-4 py-2 bg-surface-2/60 rounded-xl border border-border/70"
      >
        <!-- Departure -->
        <div class="text-start">
          <span class="text-lg sm:text-xl font-black text-text-primary block">
            {{ trip.departureTime }}
          </span>
          <span class="text-xs font-bold text-text-primary block">
            {{ trip.departureCity }}
          </span>
          <span
            class="text-[10px] text-text-muted block truncate max-w-[100px]"
          >
            {{ trip.departureStation.split("(")[0] }}
          </span>
        </div>

        <!-- Track -->
        <div class="flex-1 mx-2 text-center">
          <span class="text-[10px] font-bold text-text-muted block mb-0.5">
            {{ trip.duration }} • Direct
          </span>
          <div class="relative flex items-center justify-center">
            <div class="h-0.5 bg-border-strong w-full"></div>
            <div
              class="absolute w-2 h-2 rounded-full bg-orange-500 start-0 ring-2 ring-surface-1"
            ></div>
            <div
              class="absolute w-5 h-5 rounded-full bg-surface-1 border border-border flex items-center justify-center text-orange-500"
            >
              <Icon name="ph:bus-fill" class="w-2.5 h-2.5" />
            </div>
            <div
              class="absolute w-2 h-2 rounded-full bg-emerald-500 end-0 ring-2 ring-surface-1"
            ></div>
          </div>
        </div>

        <!-- Arrival -->
        <div class="text-end">
          <span class="text-lg sm:text-xl font-black text-text-primary block">
            {{ trip.arrivalTime }}
          </span>
          <span class="text-xs font-bold text-text-primary block">
            {{ trip.arrivalCity }}
          </span>
          <span
            class="text-[10px] text-text-muted block truncate max-w-[100px]"
          >
            {{ trip.arrivalStation.split("(")[0] }}
          </span>
        </div>
      </div>

      <!-- Right: Amenities & Date -->
      <div
        class="md:col-span-3 flex flex-col md:items-end justify-between gap-2"
      >
        <div class="flex items-center gap-1.5 flex-wrap">
          <div
            v-for="am in trip.amenities.slice(0, 4)"
            :key="am.id"
            class="w-7 h-7 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-secondary"
            :title="am.name"
          >
            <Icon :name="am.icon" class="w-3.5 h-3.5" />
          </div>
        </div>
        <span class="text-xs font-semibold text-text-secondary">
          {{ formattedDate }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from "~/types/search/results";

defineProps<{
  trip: Trip;
  formattedDate: string;
}>();
</script>