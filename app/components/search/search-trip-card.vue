<template>
  <div
    class="bg-surface-1 border border-border rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 text-start group"
  >
    <!-- Card Top Header (Operator, Rating, Badges) -->
    <div
      class="flex flex-wrap items-center justify-between gap-2.5 pb-3.5 border-b border-border"
    >
      <!-- Operator Info -->
      <div class="flex items-center gap-2.5">
        <div
          :class="[
            'w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs tracking-tighter border border-border shrink-0 shadow-2xs',
            trip.operatorLogoBg || 'bg-surface-2 text-text-primary',
          ]"
        >
          {{ trip.operatorAbbr }}
        </div>
        <div class="flex items-baseline gap-1.5 flex-wrap">
          <h4
            class="font-bold text-sm text-text-primary group-hover:text-orange-500 transition-colors"
          >
            {{ trip.operatorName }}
          </h4>
          <span class="text-xs text-text-secondary font-medium">
            {{ trip.busClass }}
          </span>
        </div>
      </div>

      <!-- Badges and Rating -->
      <div class="flex items-center gap-2 flex-wrap">
        <!-- Direct Route Badge -->
        <span
          v-if="trip.routeHighlight"
          class="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md"
        >
          <Icon name="ph:lightning-fill" class="w-3 h-3" />
          <span>{{ trip.routeHighlight }}</span>
        </span>

        <!-- Rating -->
        <span
          v-if="trip.rating"
          class="inline-flex items-center gap-1 text-[11px] font-bold text-text-primary bg-surface-2 border border-border px-2 py-0.5 rounded-md"
        >
          <Icon name="ph:star-fill" class="w-3 h-3 text-amber-500" />
          <span>{{ trip.rating }} ({{ trip.reviewsCount }})</span>
        </span>

        <!-- Seats Urgency Badge -->
        <span
          v-if="trip.availableSeats <= 5"
          class="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md animate-pulse"
        >
          <Icon name="ph:warning-bold" class="w-3 h-3" />
          <span>Only {{ trip.availableSeats }} seats left!</span>
        </span>
        <span
          v-else
          class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md"
        >
          <span>{{ trip.availableSeats }} seats left</span>
        </span>
      </div>
    </div>

    <!-- Main Section (Timeline + Price + CTA) -->
    <div
      class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center py-4"
    >
      <!-- Schedule Timeline -->
      <div class="lg:col-span-8 flex items-center justify-between">
        <!-- Departure Point -->
        <div class="text-start min-w-[100px] sm:min-w-[130px]">
          <span
            class="text-xl sm:text-2xl font-black text-text-primary block tracking-tight"
          >
            {{ trip.departureTime }}
          </span>
          <span class="text-xs font-bold text-text-primary block mt-0.5">
            {{ trip.departureCity }}
          </span>
          <span
            class="text-[11px] text-text-secondary truncate block max-w-[140px] sm:max-w-[170px]"
            :title="trip.departureStation"
          >
            {{ trip.departureStation }}
          </span>
        </div>

        <!-- Route Visualization Track -->
        <div class="flex-1 mx-3 sm:mx-6 text-center">
          <span class="text-[11px] font-bold text-text-muted block mb-1">
            {{ trip.duration }} • Non-stop
          </span>

          <div class="relative flex items-center justify-center">
            <div class="h-0.5 bg-border-strong w-full"></div>
            <!-- Start Node -->
            <div
              class="absolute w-2.5 h-2.5 rounded-full bg-orange-500 start-0 ring-2 ring-surface-1"
            ></div>
            <!-- Center Bus Indicator -->
            <div
              class="absolute w-6 h-6 rounded-full bg-surface-2 border border-border flex items-center justify-center text-orange-500 shadow-2xs"
            >
              <Icon name="ph:bus-fill" class="w-3 h-3" />
            </div>
            <!-- End Node -->
            <div
              class="absolute w-2.5 h-2.5 rounded-full bg-emerald-500 end-0 ring-2 ring-surface-1"
            ></div>
          </div>

          <span
            v-if="trip.highwayBadge"
            class="inline-block mt-1 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.2 rounded-full border border-cyan-500/20"
          >
            {{ trip.highwayBadge }}
          </span>
        </div>

        <!-- Arrival Point -->
        <div class="text-end min-w-[100px] sm:min-w-[130px]">
          <span
            class="text-xl sm:text-2xl font-black text-text-primary block tracking-tight"
          >
            {{ trip.arrivalTime }}
          </span>
          <span class="text-xs font-bold text-text-primary block mt-0.5">
            {{ trip.arrivalCity }}
          </span>
          <span
            class="text-[11px] text-text-secondary truncate block max-w-[140px] sm:max-w-[170px]"
            :title="trip.arrivalStation"
          >
            {{ trip.arrivalStation }}
          </span>
        </div>
      </div>

      <!-- Price & CTA Action -->
      <div
        class="lg:col-span-4 flex lg:flex-col items-center lg:items-end justify-between gap-3 border-t lg:border-t-0 lg:border-s lg:border-border pt-3 lg:pt-0 lg:ps-6"
      >
        <div class="text-start lg:text-end">
          <span
            class="text-[10px] text-text-muted uppercase font-bold tracking-wider block"
          >
            per seat
          </span>
          <div class="flex items-baseline gap-1">
            <span
              class="text-2xl sm:text-3xl font-black text-[#F26A36] tracking-tight"
            >
              {{ trip.price }}
            </span>
            <span class="text-xs font-bold text-text-secondary">EGP</span>
          </div>
        </div>

        <LazyVButton
          size="md"
          icon="ph:armchair-bold"
          :to="`/trip/${trip.id}`"
          custom-class="w-full sm:w-auto px-5"
          @click="selectTrip"
        >
          Select Seats
        </LazyVButton>
      </div>
    </div>

    <!-- Card Bottom (Amenities & Coach Info) -->
    <div
      class="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-border/70 text-xs text-text-secondary"
    >
      <!-- Amenities list -->
      <div class="flex flex-wrap items-center gap-3 text-[11px]">
        <div
          v-for="am in trip.amenities"
          :key="am.id"
          class="flex items-center gap-1 text-text-muted hover:text-text-primary transition-colors"
          :title="am.name"
        >
          <Icon
            :name="am.icon"
            :class="['w-3.5 h-3.5', am.iconClass || 'text-text-secondary']"
          />
          <span>{{ am.name }}</span>
        </div>
      </div>

      <!-- Live status or coach model badge -->
      <div
        class="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
      >
        <Icon
          name="ph:broadcast-bold"
          class="w-3.5 h-3.5 text-emerald-500 animate-pulse"
        />
        <span>{{ trip.busModel || "Live Tracking Active" }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from "~/types/search/results";

const localePath = useLocalePath();

const props = defineProps<{
  trip: Trip;
}>();

const emit = defineEmits<{
  (e: "select-seats", trip: Trip): void;
}>();

const selectTrip = () => {
  emit("select-seats", props.trip);
};
</script>