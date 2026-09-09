<template>
  <div
    class="mt-4 p-4 rounded-xl bg-[#f8fafc] dark:bg-[#0b101c]/40 border border-gray-200/80 dark:border-[#222c44]"
  >
    <!-- Header row -->
    <div class="flex items-center justify-between mb-1">
      <div class="flex items-center gap-1.5">
        <Icon
          name="ph:chat-teardrop-dots-bold"
          class="hidden dark:inline w-3.5 h-3.5 text-amber-400"
        />
        <span class="text-xs font-bold text-gray-900 dark:text-gray-200">
          <span class="dark:hidden">Verification Code</span>
          <span class="hidden dark:inline">One-Time Passcode (OTP)</span>
        </span>
      </div>
      <div>
        <!-- Light: Edit link -->
        <button
          type="button"
          class="dark:hidden text-xs font-bold text-[#A1331B] flex items-center gap-1 hover:underline cursor-pointer"
          @click="$emit('edit')"
        >
          <Icon name="ph:pencil-simple-bold" class="w-3 h-3" />
          Edit
        </button>
        <!-- Dark: Step badge -->
        <span
          class="hidden dark:inline text-[10px] font-bold text-amber-500 tracking-wider"
        >
          STEP 2 OF 2
        </span>
      </div>
    </div>

    <!-- Sent-to subtitle (light only) -->
    <p class="dark:hidden text-[11px] text-gray-500 mb-3">
      Sent to <strong>+20 {{ formattedPhone }}</strong>
    </p>
    <div v-if="!formattedPhone" class="hidden dark:block mb-3" />

    <!-- 6 OTP boxes -->
    <div class="grid grid-cols-6 gap-2 mb-3" dir="ltr">
      <input
        v-for="(digit, idx) in digits"
        :key="idx"
        :ref="(el) => setRef(el, idx)"
        :value="digit"
        type="text"
        inputmode="numeric"
        maxlength="1"
        class="h-11 sm:h-12 w-full text-center text-lg font-black rounded-xl border transition-all outline-none"
        :class="[
          activeIdx === idx
            ? 'border-2 border-[#A1331B] dark:border-orange-500 bg-white dark:bg-[#0b101c] text-gray-900 dark:text-white ring-2 ring-orange-500/10'
            : digit
              ? 'border-gray-200 dark:border-[#26334f] bg-white dark:bg-[#0b101c] text-gray-900 dark:text-white'
              : 'border-gray-200 dark:border-[#222c44] bg-white dark:bg-[#0b101c] text-gray-400 dark:text-gray-500',
        ]"
        @focus="$emit('focus', idx)"
        @input="$emit('input', idx, $event)"
        @keydown.backspace="$emit('backspace', idx)"
        @paste.prevent="$emit('paste', $event)"
      />
    </div>

    <!-- Timer & WhatsApp row -->
    <div class="flex items-center justify-between text-[11px]">
      <span
        class="text-gray-500 dark:text-amber-500/90 flex items-center gap-1"
      >
        <Icon
          name="ph:clock-bold"
          class="w-3.5 h-3.5 text-gray-400 dark:text-amber-500 shrink-0"
        />
        Resend code in
        <strong class="ms-0.5 text-gray-700 dark:text-amber-400">{{
          timerDisplay
        }}</strong>
      </span>
      <button
        type="button"
        class="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline cursor-pointer"
        @click="$emit('whatsapp')"
      >
        <Icon
          name="ph:whatsapp-logo-fill"
          class="w-3.5 h-3.5 text-emerald-500"
        />
        Send via WhatsApp
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  digits: string[];
  activeIdx: number;
  formattedPhone: string;
  timerDisplay: string;
  setRef: (el: unknown, idx: number) => void;
}>();
defineEmits<{
  (e: "edit"): void;
  (e: "focus", idx: number): void;
  (e: "input", idx: number, event: Event): void;
  (e: "backspace", idx: number): void;
  (e: "paste", event: ClipboardEvent): void;
  (e: "whatsapp"): void;
}>();
</script>