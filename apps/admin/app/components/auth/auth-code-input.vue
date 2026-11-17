<template>
  <div class="space-y-3">
    <VOTP
      v-model="model"
      :length="AUTH_CODE_LENGTH"
      :disabled="disabled"
      auto-focus
      @complete="emit('complete', $event)"
    />

    <p
      v-if="error"
      class="flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
    >
      <Icon name="ph:warning-circle-bold" class="w-3.5 h-3.5 shrink-0" />
      {{ error }}
    </p>

    <div class="flex items-center justify-between text-xs text-text-muted">
      <span>Didn't get a code?</span>
      <button
        type="button"
        :disabled="seconds > 0 || disabled"
        class="font-semibold text-teal-700 dark:text-teal-300 hover:underline disabled:no-underline disabled:text-text-muted disabled:cursor-not-allowed cursor-pointer"
        @click="resend"
      >
        {{ seconds > 0 ? `Resend in ${seconds}s` : "Resend code" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  error?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "complete", code: string): void;
  (e: "resend"): void;
}>();

const model = defineModel<string>({ default: "" });

// Resend cooldown
const seconds = ref(AUTH_RESEND_SECONDS);
let timer: ReturnType<typeof setInterval> | undefined;

function startCooldown() {
  seconds.value = AUTH_RESEND_SECONDS;
  clearInterval(timer);
  timer = setInterval(() => {
    seconds.value--;
    if (seconds.value <= 0) clearInterval(timer);
  }, 1000);
}

function resend() {
  model.value = "";
  startCooldown();
  emit("resend");
}

onMounted(startCooldown);
onBeforeUnmount(() => clearInterval(timer));
</script>
