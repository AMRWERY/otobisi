<template>
  <div
    class="grid gap-2"
    :style="{ gridTemplateColumns: `repeat(${boxCount}, minmax(0, 1fr))` }"
    dir="ltr"
  >
    <input
      v-for="(digit, idx) in digits"
      :key="idx"
      :ref="(el) => setRef(el, idx)"
      :value="digit"
      type="text"
      inputmode="numeric"
      autocomplete="one-time-code"
      maxlength="1"
      :disabled="disabled"
      class="h-11 sm:h-12 w-full text-center text-lg font-black rounded-xl border transition-all outline-none disabled:opacity-60 disabled:cursor-not-allowed"
      :class="[
        activeIdx === idx
          ? 'border-2 border-[#A1331B] dark:border-orange-500 bg-white dark:bg-[#0b101c] text-gray-900 dark:text-white ring-2 ring-orange-500/10'
          : digit
            ? 'border-gray-200 dark:border-[#26334f] bg-white dark:bg-[#0b101c] text-gray-900 dark:text-white'
            : 'border-gray-200 dark:border-[#222c44] bg-white dark:bg-[#0b101c] text-gray-400 dark:text-gray-500',
      ]"
      @focus="activeIdx = idx"
      @input="onInput(idx, $event)"
      @keydown.backspace="onBackspace(idx)"
      @keydown.left.prevent="focusIdx(idx - 1)"
      @keydown.right.prevent="focusIdx(idx + 1)"
      @paste.prevent="onPaste($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { OtpProps } from "../../types/shared/VOTP";

const MIN_LENGTH = 4;
const MAX_LENGTH = 6;

const props = withDefaults(defineProps<OtpProps>(), {
  modelValue: "",
  length: 6,
  disabled: false,
  autoFocus: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "complete", value: string): void;
}>();

// Only 4–6 boxes are supported; anything outside that range is clamped
const boxCount = computed(() =>
  Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, props.length)),
);

const splitValue = (value: string, len: number): string[] => {
  const clean = value.replace(/\D/g, "").slice(0, len).split("");
  return Array.from({ length: len }, (_, i) => clean[i] ?? "");
};

const digits = ref<string[]>(splitValue(props.modelValue, boxCount.value));
const activeIdx = ref(0);
const inputRefs = ref<(HTMLInputElement | null)[]>([]);

// Keep in sync if the parent resets/changes modelValue externally
watch(
  () => props.modelValue,
  (val) => {
    const next = splitValue(val, boxCount.value);
    if (next.join("") !== digits.value.join("")) digits.value = next;
  },
);

watch(boxCount, (len) => {
  digits.value = splitValue(digits.value.join(""), len);
});

const setRef = (el: unknown, idx: number) => {
  inputRefs.value[idx] = el as HTMLInputElement | null;
};

const firstEmptyOrLastIdx = () => {
  const nextEmpty = digits.value.findIndex((d) => !d);
  return nextEmpty === -1 ? boxCount.value - 1 : nextEmpty;
};

const focusIdx = (idx: number) => {
  if (idx < 0 || idx >= boxCount.value) return;
  activeIdx.value = idx;
  inputRefs.value[idx]?.focus();
};

const emitValue = () => {
  const value = digits.value.join("");
  emit("update:modelValue", value);
  if (value.length === boxCount.value && !value.includes("")) {
    emit("complete", value);
  }
};

const onInput = (idx: number, event: Event) => {
  const val = (event.target as HTMLInputElement).value.replace(/\D/g, "");
  digits.value[idx] = val.slice(-1);
  emitValue();
  if (val && idx < boxCount.value - 1) {
    focusIdx(idx + 1);
  }
};

const onBackspace = (idx: number) => {
  if (digits.value[idx]) {
    digits.value[idx] = "";
    emitValue();
    return;
  }
  if (idx > 0) {
    digits.value[idx - 1] = "";
    emitValue();
    focusIdx(idx - 1);
  }
};

const onPaste = (event: ClipboardEvent) => {
  const pasted = event.clipboardData?.getData("text").replace(/\D/g, "") ?? "";
  if (!pasted) return;
  for (let i = 0; i < boxCount.value && i < pasted.length; i++) {
    digits.value[i] = pasted[i];
  }
  emitValue();
  focusIdx(firstEmptyOrLastIdx());
};

onMounted(() => {
  if (props.autoFocus) focusIdx(firstEmptyOrLastIdx());
});

defineExpose({
  focus: () => focusIdx(firstEmptyOrLastIdx()),
  clear: () => {
    digits.value = Array(boxCount.value).fill("");
    emitValue();
    focusIdx(0);
  },
});
</script>