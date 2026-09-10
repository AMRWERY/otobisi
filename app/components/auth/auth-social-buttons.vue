<template>
  <div>
    <!-- Light: Google + Meeza Card -->
    <div class="dark:hidden grid grid-cols-2 gap-3">
      <button
        type="button"
        class="bg-[#f0f4f9] hover:bg-[#e4ebf5] rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-800 transition-all cursor-pointer active:scale-[0.99]"
        @click="$emit('google')"
      >
        <Icon name="material-icon-theme:google" class="w-4 h-4 shrink-0" />
        <span>Google</span>
      </button>
      <button
        type="button"
        class="bg-[#f0f4f9] hover:bg-[#e4ebf5] rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-800 transition-all cursor-pointer active:scale-[0.99]"
        @click="$emit('meeza')"
      >
        <Icon
          name="ph:credit-card-fill"
          class="w-4 h-4 text-[#A1331B] shrink-0"
        />
        <span>Meeza Card</span>
      </button>
    </div>

    <!-- Light: Email link -->
    <div class="dark:hidden mt-3.5 text-center">
      <button
        type="button"
        class="inline-flex items-center justify-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 font-semibold cursor-pointer transition-colors"
        @click="$emit('email')"
      >
        <Icon name="ph:envelope-simple-fill" class="w-4 h-4" />
        Sign in with Email &amp; Password instead
      </button>
    </div>

    <!-- Dark: Google + Email & Pass -->
    <div class="hidden dark:grid grid-cols-2 gap-3">
      <button
        type="button"
        class="bg-[#1a2337] hover:bg-[#222d46] border border-[#283550] rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-200 transition-all cursor-pointer active:scale-[0.99]"
        @click="$emit('google')"
      >
        <Icon name="material-icon-theme:google" class="w-4 h-4 shrink-0" />
        <span>Google</span>
      </button>
      <button
        type="button"
        class="bg-[#1a2337] hover:bg-[#222d46] border border-[#283550] rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-200 transition-all cursor-pointer active:scale-[0.99]"
        @click="$emit('email')"
      >
        <Icon
          name="ph:envelope-simple-fill"
          class="w-4 h-4 text-orange-400 shrink-0"
        />
        <span>Email &amp; Pass</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: "google"): void;
  (e: "meeza"): void;
  (e: "email"): void;
}>();
</script>