<template>
  <div
    class="relative bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <header
      class="px-4 py-3 border-b border-border/80 flex items-center justify-between gap-3 flex-wrap"
    >
      <div>
        <h2 class="text-sm font-bold text-text-primary">Corridor Network</h2>
        <p class="font-mono text-[11px] text-text-muted">
          {{ trips.length }} buses • click a marker to inspect
        </p>
      </div>

      <!-- Legend -->
      <ul class="flex items-center gap-3 text-[11px] text-text-muted">
        <li
          v-for="(tone, key) in DISPATCH_STATUS_TONES"
          :key="key"
          class="flex items-center gap-1.5"
        >
          <span :class="['w-2 h-2 rounded-full', tone.dot]" />
          {{ DISPATCH_STATUS_LABELS[key] }}
        </li>
      </ul>
    </header>

    <!-- The map is geographic, so it keeps its left-to-right orientation in RTL -->
    <div class="relative p-2" dir="ltr">
      <svg
        viewBox="0 0 400 420"
        class="w-full h-auto max-h-[560px] select-none"
        role="img"
        aria-label="Stylised map of Otobisi intercity corridors with live bus positions"
      >
        <!-- Land + Nile -->
        <path
          :d="DISPATCH_OUTLINE_PATH"
          class="fill-surface-1 stroke-border"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <path
          :d="DISPATCH_NILE_PATH"
          fill="none"
          class="stroke-teal-600/30 dark:stroke-teal-400/25"
          stroke-width="3"
          stroke-linecap="round"
        />

        <!-- Corridors -->
        <polyline
          v-for="key in DISPATCH_CORRIDOR_KEYS"
          :key="key"
          :points="corridorPoints(key)"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="
            key === activeCorridor
              ? 'stroke-teal-600 dark:stroke-teal-400'
              : 'stroke-border-strong'
          "
          :stroke-width="key === activeCorridor ? 2 : 1.25"
          :stroke-dasharray="key === activeCorridor ? undefined : '4 4'"
        />

        <!-- Cities -->
        <g v-for="(city, key) in DISPATCH_CITIES" :key="key">
          <circle
            :cx="city.x"
            :cy="city.y"
            :r="city.hub ? 4.5 : 3"
            class="fill-surface-0 stroke-text-muted"
            stroke-width="1.5"
          />
          <text
            :x="city.x + (city.labelSide === 'end' ? 9 : -9)"
            :y="city.y + 3"
            :text-anchor="city.labelSide"
            class="fill-text-secondary font-mono"
            font-size="9"
            font-weight="600"
          >
            {{ city.name }}
          </text>
        </g>

        <!-- Buses -->
        <g
          v-for="trip in trips"
          :key="trip.id"
          role="button"
          tabindex="0"
          class="cursor-pointer outline-none"
          :aria-label="`${trip.id}, ${DISPATCH_STATUS_LABELS[trip.status]}`"
          :style="busStyle(trip)"
          @click="emit('select', trip.id)"
          @keydown.enter.prevent="emit('select', trip.id)"
          @keydown.space.prevent="emit('select', trip.id)"
        >
          <circle
            v-if="trip.id === selectedId"
            r="10"
            fill="none"
            class="stroke-teal-600 dark:stroke-teal-400"
            stroke-width="1.5"
          >
            <animate
              attributeName="r"
              values="8;13;8"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.15;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <!-- Hit area -->
          <circle r="10" fill="transparent" />
          <circle
            r="5.5"
            :fill="DISPATCH_STATUS_TONES[trip.status].marker"
            class="stroke-surface-0"
            stroke-width="1.5"
          />
          <text
            y="-9"
            text-anchor="middle"
            class="fill-text-primary font-mono"
            font-size="8"
            font-weight="700"
            :opacity="trip.id === selectedId ? 1 : 0.7"
          >
            {{ trip.id }}
          </text>
        </g>
      </svg>

      <p
        v-if="!trips.length"
        class="absolute inset-0 flex items-center justify-center text-sm text-text-muted"
      >
        No buses match the current filters
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DispatchCorridorKey, DispatchTrip } from "~/types/dispatch";

const props = defineProps<{
  trips: DispatchTrip[];
  selectedId: string | null;
}>();

const emit = defineEmits<{ (e: "select", id: string): void }>();

const activeCorridor = computed<DispatchCorridorKey | null>(
  () => props.trips.find((t) => t.id === props.selectedId)?.corridor ?? null,
);

const corridorPoints = (key: DispatchCorridorKey) =>
  DISPATCH_CORRIDORS[key].path
    .map((city) => `${DISPATCH_CITIES[city].x},${DISPATCH_CITIES[city].y}`)
    .join(" ");

// A CSS transform (user units on SVG) lets the marker glide between ticks
function busStyle(trip: DispatchTrip) {
  const { x, y } = dispatchPosition(trip);
  return {
    transform: `translate(${x}px, ${y}px)`,
    transition: "transform 1.9s linear",
  };
}
</script>
