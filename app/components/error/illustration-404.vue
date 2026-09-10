<template>
  <div
    class="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center"
  >
    <!-- Ambient outer rings -->
    <div
      class="absolute inset-0 rounded-full bg-gradient-to-b from-orange-500/5 to-transparent dark:from-orange-500/10 dark:to-transparent ring-1 ring-orange-500/10 dark:ring-orange-500/20 animate-pulse"
      style="animation-duration: 4s"
    />
    <div
      class="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-white dark:bg-[#111827] border border-gray-200/80 dark:border-[#1f293d] shadow-lg shadow-black/5 dark:shadow-black/30 flex items-center justify-center relative overflow-hidden"
    >
      <!-- Subtle starry dots in dark mode -->
      <div
        class="absolute inset-0 opacity-0 dark:opacity-40 pointer-events-none"
      >
        <span
          class="absolute top-4 left-6 w-1 h-1 rounded-full bg-amber-200"
        ></span>
        <span
          class="absolute top-8 end-8 w-1 h-1 rounded-full bg-orange-200"
        ></span>
        <span
          class="absolute bottom-6 left-10 w-0.5 h-0.5 rounded-full bg-white"
        ></span>
        <span
          class="absolute top-14 left-14 w-0.5 h-0.5 rounded-full bg-amber-300"
        ></span>
      </div>

      <!-- SVG Line-Art Road Signpost & Desert Station Milestone -->
      <svg
        class="w-24 h-24 sm:w-28 sm:h-28"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Ground / Desert Dunes line -->
        <path
          d="M15 96C32 94 48 97 65 95C82 93 98 96 105 95"
          class="stroke-gray-300 dark:stroke-gray-700"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="2 4"
        />
        <path
          d="M25 99C40 98 80 98 95 99"
          class="stroke-gray-200 dark:stroke-gray-800"
          stroke-width="1.5"
          stroke-linecap="round"
        />

        <!-- Signpost Pole -->
        <path
          d="M60 95V38"
          class="stroke-gray-700 dark:stroke-gray-300"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          d="M58 95H62"
          class="stroke-[#A1331B] dark:stroke-orange-500"
          stroke-width="4"
          stroke-linecap="round"
        />

        <!-- Directional Arrow Sign 1: pointing Right (Bus Route) -->
        <g class="transition-transform hover:translate-x-0.5">
          <path
            d="M60 48H84L91 55L84 62H60V48Z"
            class="fill-[#A1331B]/10 dark:fill-[#A1331B]/30 stroke-[#A1331B] dark:stroke-orange-400"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <!-- Mini Bus Icon inside sign -->
          <rect
            x="66"
            y="52"
            width="14"
            height="7"
            rx="1.5"
            class="fill-[#A1331B] dark:fill-orange-400"
          />
          <circle
            cx="69"
            cy="60"
            r="1.2"
            class="fill-gray-800 dark:fill-gray-900"
          />
          <circle
            cx="77"
            cy="60"
            r="1.2"
            class="fill-gray-800 dark:fill-gray-900"
          />
          <rect x="68" y="53.5" width="4" height="2.5" rx="0.5" fill="white" />
          <rect x="74" y="53.5" width="4" height="2.5" rx="0.5" fill="white" />
        </g>

        <!-- Directional Arrow Sign 2: pointing Left -->
        <g class="transition-transform hover:-translate-x-0.5">
          <path
            d="M60 63H36L29 70L36 77H60V63Z"
            class="fill-amber-500/10 dark:fill-amber-500/20 stroke-amber-600 dark:stroke-amber-400"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <!-- Arrow Indicator -->
          <path
            d="M48 70H38M38 70L42 67M38 70L42 73"
            class="stroke-amber-700 dark:stroke-amber-300"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>

        <!-- Floating Question Mark / Location Pin -->
        <g>
          <circle
            cx="60"
            cy="24"
            r="11"
            class="fill-amber-50 dark:fill-amber-950/80 stroke-amber-500 dark:stroke-amber-400"
            stroke-width="2"
          />
          <text
            x="60"
            y="29"
            text-anchor="middle"
            class="fill-amber-600 dark:fill-amber-400 font-extrabold text-[13px] select-none"
            font-family="system-ui, sans-serif"
          >
            ?
          </text>
        </g>

        <!-- Small milestone rock at base -->
        <rect
          x="44"
          y="87"
          width="12"
          height="8"
          rx="2"
          class="fill-gray-100 dark:fill-gray-800 stroke-gray-400 dark:stroke-gray-600"
          stroke-width="1.5"
        />
        <path
          d="M48 91H52"
          class="stroke-gray-500 dark:stroke-gray-400"
          stroke-width="1"
          stroke-linecap="round"
        />
      </svg>

      <!-- Bottom Milestone Tag -->
      <div
        class="absolute bottom-2.5 px-2 py-0.5 rounded-md bg-gray-100/90 dark:bg-[#1f293d]/90 border border-gray-200 dark:border-gray-700 text-[9px] font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1 shadow-2xs tracking-wider uppercase select-none"
      >
        <span class="w-1 h-1 rounded-full bg-[#A1331B]"></span>
        <span>KM ∞ NO STOP</span>
      </div>
    </div>

    <!-- Floating Badge (Off Grid) -->
    <div
      class="absolute -bottom-1 -end-1 sm:bottom-0 sm:end-0 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-md text-[10px] font-bold text-gray-700 dark:text-gray-200 select-none"
    >
      <Icon
        name="ph:compass-bold"
        class="w-3.5 h-3.5 text-[#A1331B] dark:text-orange-400"
      />
      <span>Off Grid</span>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>