<template>
  <div
    class="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center"
  >
    <!-- Ambient outer rings / pulse signal -->
    <div
      class="absolute inset-0 rounded-full bg-gradient-to-b from-amber-500/5 to-transparent dark:from-amber-500/10 dark:to-transparent ring-1 ring-amber-500/10 dark:ring-amber-500/20"
    />
    <div
      class="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-[#1f293d] shadow-lg shadow-black/5 dark:shadow-black/30 flex items-center justify-center relative overflow-hidden"
    >
      <!-- SVG Line-Art Bus with Disconnected Signal Antenna -->
      <svg
        class="w-24 h-24 sm:w-28 sm:h-28"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Disconnected Wi-Fi Signal Arcs above the bus -->
        <g class="opacity-80">
          <!-- Top Arc (dashed/broken) -->
          <path
            d="M44 26C54 20 66 20 76 26"
            class="stroke-gray-300 dark:stroke-gray-600"
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="3 3"
          />
          <!-- Middle Arc -->
          <path
            d="M50 32C56 28 64 28 70 32"
            class="stroke-amber-400 dark:stroke-amber-500"
            stroke-width="2"
            stroke-linecap="round"
          />
          <!-- Mini Center Dot -->
          <circle
            cx="60"
            cy="37"
            r="1.5"
            class="fill-amber-500 dark:fill-amber-400"
          />
        </g>

        <!-- Red X Disconnect Badge on Signal -->
        <g transform="translate(72, 18)">
          <circle
            cx="8"
            cy="8"
            r="7"
            class="fill-rose-500 stroke-white dark:stroke-[#111827]"
            stroke-width="1.5"
          />
          <path
            d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </g>

        <!-- Antenna Pole from Roof -->
        <path
          d="M60 48V39"
          class="stroke-gray-600 dark:stroke-gray-400"
          stroke-width="2"
          stroke-linecap="round"
        />

        <!-- Bus Body (Front View Line-Art) -->
        <rect
          x="35"
          y="48"
          width="50"
          height="42"
          rx="8"
          class="fill-[#f8fafc] dark:fill-[#172033] stroke-gray-700 dark:stroke-gray-300"
          stroke-width="2.5"
        />

        <!-- Large Front Windshield -->
        <rect
          x="40"
          y="53"
          width="40"
          height="16"
          rx="3"
          class="fill-blue-50/50 dark:fill-blue-950/40 stroke-gray-600 dark:stroke-gray-400"
          stroke-width="1.5"
        />
        <!-- Windshield reflection glint -->
        <path
          d="M44 56L48 64M50 56L53 62"
          class="stroke-blue-300/60 dark:stroke-blue-400/40"
          stroke-width="1.2"
          stroke-linecap="round"
        />

        <!-- Destination Sign Board (OFFLINE) -->
        <rect
          x="46"
          y="50"
          width="28"
          height="3"
          rx="1"
          class="fill-amber-500/20 stroke-amber-500/60"
          stroke-width="0.8"
        />

        <!-- Middle Trim / Grille Line -->
        <path
          d="M35 73H85"
          class="stroke-gray-400 dark:stroke-gray-600"
          stroke-width="1.5"
        />

        <!-- Front Headlights (Warm amber) -->
        <circle
          cx="43"
          cy="79"
          r="3"
          class="fill-amber-400/80 dark:fill-amber-400 stroke-amber-600 dark:stroke-amber-300"
          stroke-width="1.2"
        />
        <circle
          cx="77"
          cy="79"
          r="3"
          class="fill-amber-400/80 dark:fill-amber-400 stroke-amber-600 dark:stroke-amber-300"
          stroke-width="1.2"
        />

        <!-- License Plate / Front Grille -->
        <rect
          x="53"
          y="77"
          width="14"
          height="5"
          rx="1"
          class="fill-gray-200 dark:fill-gray-700 stroke-gray-400 dark:stroke-gray-500"
          stroke-width="1"
        />
        <path
          d="M56 79.5H64"
          class="stroke-gray-500 dark:stroke-gray-400"
          stroke-width="0.8"
        />

        <!-- Front Wheels / Tires -->
        <rect
          x="38"
          y="88"
          width="7"
          height="6"
          rx="2"
          class="fill-gray-800 dark:fill-gray-900 stroke-gray-700 dark:stroke-gray-600"
          stroke-width="1.5"
        />
        <rect
          x="75"
          y="88"
          width="7"
          height="6"
          rx="2"
          class="fill-gray-800 dark:fill-gray-900 stroke-gray-700 dark:stroke-gray-600"
          stroke-width="1.5"
        />

        <!-- Road Base Line -->
        <path
          d="M26 94H94"
          class="stroke-gray-300 dark:stroke-gray-700"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <!-- Floating Badge at Bottom-Right (No Wi-Fi) -->
    <div
      class="absolute -bottom-1 -end-1 sm:bottom-0 sm:end-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md ring-3 ring-white dark:ring-[#111827]"
    >
      <Icon name="ph:wifi-slash-bold" class="w-4 h-4" />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>