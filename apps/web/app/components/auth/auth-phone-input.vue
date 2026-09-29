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
      <!-- Country flag & code picker -->
      <div ref="pickerRef" class="relative shrink-0">
        <LazyVButton
          variant="unstyled"
          class="flex items-center gap-1 text-sm font-bold text-gray-700 dark:text-gray-200 select-none cursor-pointer disabled:cursor-wait"
          :disabled="!countries.length"
          :aria-expanded="isOpen"
          aria-haspopup="listbox"
          content-class="inline-flex items-center gap-1"
          @click="toggle"
        >
          <img
            v-if="country"
            :src="country.flag"
            :alt="country.name"
            class="w-5 h-3.5 rounded-sm object-cover"
          />
          <span v-else class="text-base leading-none">🇪🇬</span>
          <span dir="ltr">{{ country?.dialCode ?? "+20" }}</span>
          <Icon
            name="ph:caret-down-bold"
            class="w-3 h-3 text-gray-400 transition-transform"
            :class="{ 'rotate-180': isOpen }"
          />
        </LazyVButton>

        <div
          v-if="isOpen"
          class="absolute start-0 top-full mt-3 z-30 w-64 bg-white dark:bg-[#141b2d] border border-gray-100 dark:border-[#212b42] rounded-xl shadow-lg overflow-hidden"
        >
          <div class="p-2 border-b border-gray-100 dark:border-[#212b42]">
            <LazyVInput
              ref="searchRef"
              v-model="query"
              type="text"
              placeholder="Search country or code"
              variant="unstyled"
              box-class="bg-[#f0f4f9] dark:bg-[#0b101c] rounded-lg px-2.5 py-1.5"
              input-class="text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            />
          </div>
          <ul role="listbox" class="max-h-60 overflow-y-auto py-1">
            <li
              v-for="c in filteredCountries"
              :key="c.name"
              role="option"
              :aria-selected="c.name === country?.name"
              class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-[#f0f4f9] dark:hover:bg-[#0b101c]"
              :class="{
                'bg-[#f0f4f9] dark:bg-[#0b101c] font-semibold':
                  c.name === country?.name,
              }"
              @click="select(c)"
            >
              <img
                :src="c.flag"
                :alt="c.name"
                loading="lazy"
                class="w-5 h-3.5 rounded-sm object-cover shrink-0"
              />
              <span class="flex-1 truncate">{{ c.name }}</span>
              <span dir="ltr" class="text-gray-400 text-xs">{{
                c.dialCode
              }}</span>
            </li>
            <li
              v-if="!filteredCountries.length"
              class="px-3 py-2 text-sm text-gray-400"
            >
              No results
            </li>
          </ul>
        </div>
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
import type { Country } from "~/service/types/country";
import { searchCountries } from "~/service/countries";

const props = defineProps<{
  modelValue: string;
  isValid: boolean;
  inputRef?: (el: unknown) => void;
  countries: Country[];
  country: Country | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
  (e: "update:country", val: Country): void;
  (e: "enter"): void;
}>();

const isOpen = ref(false);
const query = ref("");
const pickerRef = ref<HTMLElement | null>(null);
const searchRef = ref<HTMLInputElement | null>(null);

const filteredCountries = computed(() =>
  searchCountries(props.countries, query.value),
);

const toggle = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    query.value = "";
    await nextTick();
    searchRef.value?.focus();
  }
};

const select = (c: Country) => {
  emit("update:country", c);
  isOpen.value = false;
};

onClickOutside(pickerRef, () => (isOpen.value = false));
onKeyStroke("Escape", () => (isOpen.value = false));
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