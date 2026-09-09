<template>
  <div class="text-center mb-6">
    <!-- Bus Icon -->
    <div
      class="w-12 h-12 rounded-xl bg-[#A1331B] text-white flex items-center justify-center shadow-lg shadow-orange-950/30 mx-auto mb-3"
    >
      <Icon name="ph:bus-fill" class="w-6 h-6" />
    </div>

    <!-- Light: trust badge + wordmark -->
    <div class="dark:hidden">
      <div
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#9C391D] bg-[#fcf6f3] border border-[#f5ded5] shadow-2xs mb-3"
      >
        <Icon
          name="ph:shield-check-bold"
          class="w-3.5 h-3.5 text-emerald-600 shrink-0"
        />
        <span
          >Ministry of Transport Licensed Partner • 256-Bit SSL Encrypted</span
        >
      </div>
      <div class="flex items-center justify-center gap-2">
        <span
          class="text-2xl font-black text-[#A1331B] tracking-tight leading-none"
          >Otobisi</span
        >
        <span class="text-[11px] text-gray-400 font-medium"
          >أوتوبيسي • Egypt's Intercity Bus Network</span
        >
      </div>
    </div>

    <!-- Dark: hero heading + encrypted pill -->
    <div class="hidden dark:block">
      <span
        class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-800/40 mb-3"
      >
        <span
          class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
        ></span>
        Encrypted Intercity Gateway
      </span>
      <h1 class="text-3xl font-black text-white tracking-tight mb-1.5">
        Access NileBus
      </h1>
      <p class="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
        Reserve, modify, and track intercity coaches across all 27 Egyptian
        governorates
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>