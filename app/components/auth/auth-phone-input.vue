<template>
  <div class="mb-2">
    <!-- Label row -->
    <div class="flex items-center justify-between mb-1.5">
      <label class="text-xs font-bold text-gray-900 dark:text-gray-200">
        <span class="dark:hidden">Mobile Number</span>
        <span class="hidden dark:inline">Mobile Phone Number</span>
      </label>
      <span
        class="dark:hidden flex items-center gap-1 text-xs font-semibold text-emerald-600"
      >
        <Icon name="ph:lightning-fill" class="w-3.5 h-3.5 text-emerald-500" />
        Instant OTP
      </span>
      <span class="hidden dark:inline text-xs text-gray-400 font-medium">
        Instant OTP Login
      </span>
    </div>

    <!-- Input box -->
    <div
      class="flex items-center bg-[#f0f4f9] dark:bg-[#0b101c] border rounded-xl px-3 py-2.5 transition-all"
      :class="
        isValid
          ? 'border-transparent dark:border-[#222c44]'
          : 'border-transparent dark:border-[#222c44] focus-within:border-orange-500/50'
      "
    >
      <!-- Country flag & code -->
      <div
        class="flex items-center gap-1 text-sm font-bold text-gray-700 dark:text-gray-200 shrink-0 select-none cursor-pointer"
      >
        <span class="text-base leading-none">🇪🇬</span>
        <span>+20</span>
        <Icon name="ph:caret-down-bold" class="w-3 h-3 text-gray-400" />
      </div>
      <div class="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-2.5 shrink-0"></div>
      <input
        :ref="inputRef"
        :value="modelValue"
        type="tel"
        inputmode="numeric"
        placeholder="010 1234 5678"
        dir="ltr"
        class="flex-1 text-sm font-medium bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 outline-none"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @keyup.enter="$emit('enter')"
      />
      <Transition name="fade">
        <Icon
          v-if="isValid"
          name="ph:check-circle-fill"
          class="w-5 h-5 text-emerald-500 ms-2 shrink-0"
        />
      </Transition>
    </div>

    <!-- Hint text -->
    <p
      class="text-[11px] mt-2 flex items-center gap-1.5 text-gray-500 dark:text-amber-500/90"
    >
      <Icon
        name="ph:info-fill"
        class="w-3.5 h-3.5 text-gray-400 dark:text-amber-500 shrink-0"
      />
      <span class="dark:hidden"
        >We'll send a 6-digit verification code via SMS & WhatsApp</span
      >
      <span class="hidden dark:inline"
        >We will dispatch a 6-digit verification code to your WhatsApp or
        SMS.</span
      >
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string;
  isValid: boolean;
  inputRef?: (el: unknown) => void;
}>();
defineEmits<{
  (e: "update:modelValue", val: string): void;
  (e: "enter"): void;
}>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>