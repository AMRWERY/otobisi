<template>
  <div
    class="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center"
  >
    <!-- Ambient outer glow ring -->
    <div
      class="absolute inset-0 rounded-full bg-gradient-to-b from-[#A1331B]/5 to-transparent dark:from-orange-500/10 dark:to-transparent ring-1 ring-[#A1331B]/10 dark:ring-orange-500/20"
    />
    <div
      class="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-[#1f293d] shadow-lg shadow-black/5 dark:shadow-black/30 flex items-center justify-center relative overflow-hidden"
    >
      <!-- SVG Line-Art Bus Engine Hiccup with Gears and Tools -->
      <svg
        class="w-24 h-24 sm:w-28 sm:h-28"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Floating Gear / Cog (Animated/Detailed Line Art) -->
        <g transform="translate(68, 20)">
          <circle
            cx="12"
            cy="12"
            r="7"
            class="fill-orange-50 dark:fill-orange-950/50 stroke-[#A1331B] dark:stroke-orange-400"
            stroke-width="2"
          />
          <circle
            cx="12"
            cy="12"
            r="2.5"
            class="fill-[#A1331B] dark:fill-orange-400"
          />
          <!-- Gear Teeth -->
          <path
            d="M12 2V4M12 20V22M2 12H4M20 12H22M4.9 4.9L6.3 6.3M17.7 17.7L19.1 19.1M4.9 19.1L6.3 17.7M17.7 6.3L19.1 4.9"
            class="stroke-[#A1331B] dark:stroke-orange-400"
            stroke-width="2"
            stroke-linecap="round"
          />
        </g>

        <!-- Mechanic Spanner / Wrench crossed -->
        <g transform="translate(36, 22) rotate(-25)">
          <path
            d="M8 2C6 2 4.5 3 4 5L8 9L5 12L1 8C0.5 9 1 11.5 2 13C4 16 7 17 9 15L22 28C23 29 24.5 29 25.5 28C26.5 27 26.5 25.5 25.5 24.5L12.5 11.5C14.5 9.5 13.5 6.5 10.5 4.5C9.8 4 8.8 2 8 2Z"
            class="fill-amber-100 dark:fill-amber-950/60 stroke-amber-600 dark:stroke-amber-400"
            stroke-width="1.6"
            stroke-linejoin="round"
          />
        </g>

        <!-- Bus Body Profile / Chassis -->
        <rect
          x="26"
          y="48"
          width="68"
          height="36"
          rx="6"
          class="fill-[#f8fafc] dark:fill-[#172033] stroke-gray-700 dark:stroke-gray-300"
          stroke-width="2.5"
        />

        <!-- Side Windows Row -->
        <rect
          x="32"
          y="54"
          width="14"
          height="11"
          rx="2"
          class="fill-blue-50/60 dark:fill-blue-950/40 stroke-gray-600 dark:stroke-gray-400"
          stroke-width="1.2"
        />
        <rect
          x="50"
          y="54"
          width="14"
          height="11"
          rx="2"
          class="fill-blue-50/60 dark:fill-blue-950/40 stroke-gray-600 dark:stroke-gray-400"
          stroke-width="1.2"
        />
        <rect
          x="68"
          y="54"
          width="14"
          height="11"
          rx="2"
          class="fill-blue-50/60 dark:fill-blue-950/40 stroke-gray-600 dark:stroke-gray-400"
          stroke-width="1.2"
        />

        <!-- Engine Hood / Rear compartment line -->
        <path
          d="M84 50V80"
          class="stroke-[#A1331B] dark:stroke-orange-500"
          stroke-width="1.8"
          stroke-dasharray="3 2"
        />

        <!-- Steam / Exclamation dots rising from engine compartment -->
        <path
          d="M86 42C88 38 91 38 90 34"
          class="stroke-orange-400 dark:stroke-orange-300"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M82 44C83 41 85 40 84 37"
          class="stroke-orange-400/70"
          stroke-width="1.2"
          stroke-linecap="round"
        />

        <!-- Side Bus Stripe -->
        <path
          d="M26 72H94"
          class="stroke-amber-500/80 dark:stroke-amber-400/80"
          stroke-width="2"
        />

        <!-- Wheels / Tires -->
        <circle
          cx="42"
          cy="84"
          r="7"
          class="fill-gray-800 dark:fill-gray-900 stroke-gray-700 dark:stroke-gray-500"
          stroke-width="2"
        />
        <circle
          cx="42"
          cy="84"
          r="3"
          class="fill-gray-300 dark:fill-gray-600"
        />

        <circle
          cx="78"
          cy="84"
          r="7"
          class="fill-gray-800 dark:fill-gray-900 stroke-gray-700 dark:stroke-gray-500"
          stroke-width="2"
        />
        <circle
          cx="78"
          cy="84"
          r="3"
          class="fill-gray-300 dark:fill-gray-600"
        />

        <!-- Dotted Road Line -->
        <path
          d="M18 94C38 94 82 94 102 94"
          class="stroke-gray-300 dark:stroke-gray-700"
          stroke-width="2"
          stroke-dasharray="3 4"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <!-- Floating Badge at Corner (Gear / Warning) -->
    <div
      class="absolute -bottom-1 -end-1 sm:bottom-0 sm:end-0 w-8 h-8 rounded-full bg-[#A1331B] dark:bg-orange-600 text-white flex items-center justify-center shadow-md ring-3 ring-white dark:ring-[#111827]"
    >
      <Icon name="ph:wrench-bold" class="w-4 h-4" />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>