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
        <v-button
          variant="unstyled"
          icon="ph:pencil-simple-bold"
          icon-class="w-3 h-3"
          class="dark:hidden text-xs font-bold text-[#A1331B] flex items-center gap-1 hover:underline cursor-pointer"
          @click="$emit('edit')"
        >
          Edit
        </v-button>
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
      Sent to <strong dir="ltr">{{ formattedPhone }}</strong>
    </p>
    <div v-if="!formattedPhone" class="hidden dark:block mb-3" />

    <!-- OTP boxes -->
    <LazyVOTP
      ref="otpRef"
      class="mb-3"
      :model-value="modelValue"
      :length="length"
      auto-focus
      @update:model-value="$emit('update:modelValue', $event)"
      @complete="$emit('complete', $event)"
    />

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
      <v-button
        variant="unstyled"
        icon="ph:whatsapp-logo-fill"
        icon-class="w-3.5 h-3.5 text-emerald-500"
        class="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline cursor-pointer"
        @click="$emit('whatsapp')"
      >
        Send via WhatsApp
      </v-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue: string;
    formattedPhone: string;
    timerDisplay: string;
    /** Number of OTP boxes (4–6) */
    length?: number;
  }>(),
  { length: 6 },
);

defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "complete", value: string): void;
  (e: "edit"): void;
  (e: "whatsapp"): void;
}>();

const otpRef = useTemplateRef("otpRef");

defineExpose({
  focus: () => otpRef.value?.focus(),
  clear: () => otpRef.value?.clear(),
});
</script>