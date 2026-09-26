<template>
  <div>
    <!-- Light: Google + Meeza Card -->
    <div class="dark:hidden grid grid-cols-2 gap-3">
      <v-button
        variant="unstyled"
        icon="material-icon-theme:google"
        icon-class="w-4 h-4 shrink-0"
        class="bg-[#f0f4f9] hover:bg-[#e4ebf5] rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-800 transition-all cursor-pointer active:scale-[0.99]"
        @click="$emit('google')"
      >
        <span>Google</span>
      </v-button>
      <v-button
        variant="unstyled"
        icon="ph:credit-card-fill"
        icon-class="w-4 h-4 text-[#A1331B] shrink-0"
        class="bg-[#f0f4f9] hover:bg-[#e4ebf5] rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-800 transition-all cursor-pointer active:scale-[0.99]"
        @click="$emit('meeza')"
      >
        <span>Meeza Card</span>
      </v-button>
    </div>

    <!-- Light: Email link -->
    <div class="dark:hidden mt-3.5 text-center">
      <v-button
        variant="unstyled"
        icon="ph:envelope-simple-fill"
        icon-class="w-4 h-4"
        class="inline-flex items-center justify-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 font-semibold cursor-pointer transition-colors"
        @click="$emit('email')"
      >
        Sign in with Email &amp; Password instead
      </v-button>
    </div>

    <!-- Dark: Google + Email & Pass -->
    <div class="hidden dark:grid grid-cols-2 gap-3">
      <v-button
        variant="unstyled"
        icon="material-icon-theme:google"
        icon-class="w-4 h-4 shrink-0"
        class="bg-[#1a2337] hover:bg-[#222d46] border border-[#283550] rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-200 transition-all cursor-pointer active:scale-[0.99]"
        @click="$emit('google')"
      >
        <span>Google</span>
      </v-button>
      <v-button
        variant="unstyled"
        icon="ph:envelope-simple-fill"
        icon-class="w-4 h-4 text-orange-400 shrink-0"
        class="bg-[#1a2337] hover:bg-[#222d46] border border-[#283550] rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-200 transition-all cursor-pointer active:scale-[0.99]"
        @click="$emit('email')"
      >
        <span>Email &amp; Pass</span>
      </v-button>
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