<template>
  <div class="w-full max-w-[440px] mt-8">
    <!-- Light Mode: Regulated badge + Payment badges + Hotline -->
    <div
      class="dark:hidden flex flex-wrap items-center justify-center gap-2.5 text-xs text-gray-600"
    >
      <div class="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
        <Icon
          name="ph:shield-check-bold"
          class="w-4 h-4 text-emerald-600 shrink-0"
        />
        <span class="leading-tight">Regulated by MOT Egypt</span>
      </div>
      <span
        class="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-[11px] font-bold text-gray-700 shadow-2xs"
      >
        Fawry
      </span>
      <span
        class="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-[11px] font-bold text-gray-700 shadow-2xs"
      >
        Meeza
      </span>
      <span
        class="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-[11px] font-bold text-gray-700 shadow-2xs"
      >
        Vodafone Cash
      </span>
      <div class="flex items-center gap-1 text-xs text-gray-700 font-medium">
        <Icon name="ph:headset-bold" class="w-4 h-4 text-[#A1331B] shrink-0" />
        <span
          >Hotline: <strong class="text-gray-900 font-bold">19XXX</strong></span
        >
      </div>
    </div>

    <!-- Dark Mode: Legal links + Company details -->
    <div
      class="hidden dark:block text-center text-xs text-gray-400 space-y-1.5"
    >
      <div class="flex items-center justify-center gap-2 font-medium">
        <a href="#" class="hover:text-gray-200 transition-colors"
          >Privacy Notice</a
        >
        <span>•</span>
        <a href="#" class="hover:text-gray-200 transition-colors"
          >Terms of Carriage</a
        >
        <span>•</span>
        <a href="#" class="hover:text-gray-200 transition-colors"
          >Station Security</a
        >
      </div>
      <p class="text-[11px] text-gray-400">
        NileBus Network Egypt SAE • Operations Center Heliopolis, Cairo
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>