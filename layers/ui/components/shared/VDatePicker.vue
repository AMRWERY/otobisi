<template>
  <div
    ref="containerRef"
    :class="[
      'relative flex flex-col gap-1.5 transition-all',
      isOpen ? 'z-50' : 'z-10',
      wrapperClass,
    ]"
  >
    <!-- Label -->
    <label
      v-if="label || $slots.label"
      :class="[
        'text-xs font-semibold text-text-primary/90 flex items-center justify-between select-none',
        labelClass,
      ]"
      @click="toggleDropdown"
    >
      <slot name="label">
        <span>
          {{ label }}
          <span v-if="required" class="text-red-500 ms-0.5">*</span>
        </span>
      </slot>
    </label>

    <!-- Trigger Input / Field -->
    <div
      tabindex="0"
      role="button"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :class="[
        'relative flex items-center transition-all duration-150 cursor-pointer select-none outline-none',
        sizeClasses[size],
        roundedClasses[rounded],
        variantClasses[variant],
        isOpen
          ? 'ring-2 ring-orange-500/20 border-orange-500 shadow-md'
          : error
            ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
            : 'border-border hover:border-border-strong focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
        disabled ? 'opacity-60 cursor-not-allowed bg-surface-1' : '',
      ]"
      @click="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.esc="closeDropdown"
    >
      <!-- Leading Icon / Slot -->
      <slot name="leading">
        <Icon
          v-if="icon"
          :name="icon"
          :class="[
            'shrink-0 text-text-primary transition-colors',
            iconSizes[size],
            iconClass,
          ]"
        />
      </slot>

      <!-- Formatted Date Display -->
      <div class="flex-1 truncate">
        <slot name="display" :value="modelValue" :formatted="formattedDate">
          <span
            :class="[
              'truncate font-semibold block leading-tight',
              fontSize[size],
              modelValue ? 'text-text-primary' : 'text-text-muted font-normal',
            ]"
          >
            {{ formattedDate || placeholder }}
          </span>
        </slot>
      </div>

      <!-- Trailing Slot / Indicator -->
      <slot name="trailing">
        <Icon
          name="ph:caret-down-bold"
          :class="[
            'w-3.5 h-3.5 text-text-muted transition-transform duration-200',
            isOpen ? 'rotate-180 text-orange-500' : '',
          ]"
        />
      </slot>
    </div>

    <!-- Hidden Input for Form Submissions -->
    <input
      type="hidden"
      :name="name"
      :value="modelValue"
      :required="required"
    />

    <!-- Custom Styled Calendar Popover -->
    <Transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 translate-y-1 scale-98"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-1 scale-98"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 top-full mt-2 end-0 w-full min-w-[290px] sm:min-w-[320px] max-w-[340px] p-4 rounded-2xl bg-surface-1 border border-border shadow-2xl backdrop-blur-xl select-none"
      >
        <!-- Calendar Header (Month / Year Navigation) -->
        <div class="flex items-center justify-between mb-4">
          <button
            type="button"
            aria-label="Previous month"
            class="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-0 border border-border flex items-center justify-center text-text-primary hover:text-orange-500 transition-colors shadow-2xs active:scale-95"
            @click.stop="prevMonth"
          >
            <Icon name="ph:caret-left-bold" class="w-4 h-4 rtl:rotate-180" />
          </button>

          <span class="font-bold text-sm text-text-primary">
            {{ currentMonthName }} {{ currentYear }}
          </span>

          <button
            type="button"
            aria-label="Next month"
            class="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-0 border border-border flex items-center justify-center text-text-primary hover:text-orange-500 transition-colors shadow-2xs active:scale-95"
            @click.stop="nextMonth"
          >
            <Icon name="ph:caret-right-bold" class="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <!-- Weekday Headers -->
        <div class="grid grid-cols-7 gap-1 text-center mb-1.5">
          <span
            v-for="day in weekDays"
            :key="day"
            class="text-[11px] font-bold text-text-muted uppercase py-1"
          >
            {{ day }}
          </span>
        </div>

        <!-- Days Grid -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="cell in calendarDays"
            :key="cell.dateString"
            type="button"
            :disabled="cell.isDisabled"
            :class="[
              'h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all relative',
              cell.isSelected
                ? 'bg-[#F26A36] text-white font-bold shadow-md shadow-orange-900/20 scale-105 z-10'
                : cell.isToday
                  ? 'border border-[#F26A36]/60 font-bold text-[#F26A36] hover:bg-surface-2'
                  : cell.isCurrentMonth
                    ? 'text-text-primary hover:bg-surface-2 hover:text-orange-500'
                    : 'text-text-muted/40 hover:text-text-muted hover:bg-surface-2/40',
              cell.isDisabled
                ? 'opacity-20 cursor-not-allowed pointer-events-none'
                : 'active:scale-95',
            ]"
            @click.stop="selectDate(cell.dateString)"
          >
            {{ cell.dayNumber }}
          </button>
        </div>

        <!-- Popover Footer (Clear & Today Shortcuts) -->
        <div
          class="flex items-center justify-between pt-3 mt-3 border-t border-border text-xs font-semibold"
        >
          <button
            type="button"
            class="text-text-muted hover:text-text-primary transition-colors px-1 py-0.5"
            @click.stop="clearDate"
          >
            Clear
          </button>
          <button
            type="button"
            class="text-[#F26A36] hover:text-[#E05925] font-bold transition-colors px-1 py-0.5"
            @click.stop="selectToday"
          >
            Today
          </button>
        </div>
      </div>
    </Transition>

    <!-- Error or Hint Message -->
    <div v-if="hasError || hint || $slots.hint || $slots.error" class="text-xs">
      <div
        v-if="hasError"
        class="text-red-500 font-medium flex items-center gap-1 mt-0.5"
      >
        <slot name="error">
          <Icon name="ph:warning-circle-bold" class="w-3.5 h-3.5 shrink-0" />
          <span>{{ typeof error === "string" ? error : "" }}</span>
        </slot>
      </div>
      <div v-else-if="hint || $slots.hint" class="text-text-secondary mt-0.5">
        <slot name="hint">
          <span>{{ hint }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DatePickerProps, CalendarCell } from "~/types/shared/VDatePicker";

const props = withDefaults(defineProps<DatePickerProps>(), {
  placeholder: "Select date",
  icon: "ph:calendar-blank-bold",
  size: "md",
  rounded: "xl",
  variant: "surface",
  disabled: false,
  required: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}>();

const containerRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const hasError = computed(() => Boolean(props.error));

// Initialize view month/year from modelValue or today
const getInitialDate = () => {
  if (props.modelValue) {
    const [y, m] = props.modelValue.split("-").map(Number);
    if (y && m) return new Date(y, m - 1, 1);
  }
  return new Date();
};

const viewDate = ref(getInitialDate());

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const [y, m] = val.split("-").map(Number);
      if (y && m) viewDate.value = new Date(y, m - 1, 1);
    }
  },
);

const currentYear = computed(() => viewDate.value.getFullYear());
const currentMonth = computed(() => viewDate.value.getMonth());

const currentMonthName = computed(() => {
  return viewDate.value.toLocaleDateString("en-US", { month: "long" });
});

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const prevMonth = () => {
  viewDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};

const nextMonth = () => {
  viewDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
};

const formatDateToISO = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const todayString = formatDateToISO(new Date());

const calendarDays = computed<CalendarCell[]>(() => {
  const year = currentYear.value;
  const month = currentMonth.value;

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: CalendarCell[] = [];

  // Previous month filler days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    const dateString = formatDateToISO(date);
    cells.push({
      dateString,
      dayNumber: day,
      isCurrentMonth: false,
      isToday: dateString === todayString,
      isSelected: dateString === props.modelValue,
      isDisabled: isDateDisabled(dateString),
    });
  }

  // Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = formatDateToISO(date);
    cells.push({
      dateString,
      dayNumber: day,
      isCurrentMonth: true,
      isToday: dateString === todayString,
      isSelected: dateString === props.modelValue,
      isDisabled: isDateDisabled(dateString),
    });
  }

  // Next month filler days to complete 35 or 42 grid cells
  const remaining = (7 - (cells.length % 7)) % 7;
  for (let day = 1; day <= remaining; day++) {
    const date = new Date(year, month + 1, day);
    const dateString = formatDateToISO(date);
    cells.push({
      dateString,
      dayNumber: day,
      isCurrentMonth: false,
      isToday: dateString === todayString,
      isSelected: dateString === props.modelValue,
      isDisabled: isDateDisabled(dateString),
    });
  }

  return cells;
});

const isDateDisabled = (dateString: string) => {
  if (props.min && dateString < props.min) return true;
  if (props.max && dateString > props.max) return true;
  return false;
};

const formattedDate = computed(() => {
  if (!props.modelValue) return "";
  if (props.format) return props.format(props.modelValue);

  try {
    const [year, month, day] = props.modelValue.split("-").map(Number);
    if (!year || !month || !day) return props.modelValue;
    const date = new Date(year, month - 1, day);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const monthStr = date.toLocaleDateString("en-US", { month: "short" });
    return `${weekday}, ${day} ${monthStr} ${year}`;
  } catch {
    return props.modelValue;
  }
});

const selectDate = (dateString: string) => {
  emit("update:modelValue", dateString);
  emit("change", dateString);
  closeDropdown();
};

const selectToday = () => {
  selectDate(todayString);
  const now = new Date();
  viewDate.value = new Date(now.getFullYear(), now.getMonth(), 1);
};

const clearDate = () => {
  emit("update:modelValue", "");
  emit("change", "");
  closeDropdown();
};

const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    viewDate.value = getInitialDate();
  }
};

const closeDropdown = () => {
  isOpen.value = false;
};

// Close on outside click
onClickOutside(containerRef, () => {
  if (isOpen.value) closeDropdown();
});

const sizeClasses = {
  sm: "px-2.5 py-1.5 gap-2",
  md: "px-3.5 py-3 gap-3",
  lg: "px-4 py-3.5 gap-3.5",
};

const fontSize = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

const variantClasses = {
  default: "bg-surface-0 border",
  surface: "bg-surface-2 border",
};

defineExpose({
  open: () => (isOpen.value = true),
  close: closeDropdown,
  toggle: toggleDropdown,
});
</script>