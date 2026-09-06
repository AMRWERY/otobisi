<template>
  <nav
    aria-label="Checkout Progress"
    :class="[
      'flex items-center gap-2 sm:gap-3 text-xs font-semibold overflow-x-auto py-1 select-none',
      customClass,
    ]"
  >
    <template v-for="(step, index) in steps" :key="step.step">
      <!-- Step item -->
      <component
        :is="getStepComponent(step)"
        :to="getStepTo(step)"
        :class="[
          'flex items-center gap-1.5 shrink-0 transition-colors',
          getStepStateClass(step.step),
          isClickable(step.step)
            ? 'cursor-pointer hover:opacity-80'
            : 'cursor-default',
        ]"
        @click="handleStepClick(step)"
      >
        <!-- Completed Step -->
        <div
          v-if="step.step < currentStep"
          class="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
        >
          <Icon name="ph:check-bold" class="w-3 h-3" />
        </div>

        <!-- Active Step -->
        <div
          v-else-if="step.step === currentStep"
          class="w-5 h-5 rounded-full bg-[#F26A36] text-white flex items-center justify-center text-[11px] font-black shadow-xs"
        >
          {{ step.step }}
        </div>

        <!-- Upcoming Step -->
        <div
          v-else
          class="w-5 h-5 rounded-full bg-surface-2 border border-border flex items-center justify-center text-[11px] text-text-muted"
        >
          {{ step.step }}
        </div>

        <!-- Step Label -->
        <span>{{ step.label }}</span>
      </component>

      <!-- Connector line between steps (not after the last step) -->
      <div
        v-if="index < steps.length - 1"
        :class="[
          'w-4 sm:w-6 h-0.5 shrink-0 transition-colors',
          step.step < currentStep ? 'bg-emerald-500/40' : 'bg-border',
        ]"
      />
    </template>
  </nav>
</template>

<script lang="ts" setup>
import type { StepperProps, StepItem } from "~/types/shared/VStepper";

const props = withDefaults(defineProps<StepperProps>(), {
  steps: () => [
    { step: 1, label: "1. Search" },
    { step: 2, label: "2. Select Seats" },
    { step: 3, label: "3. Passenger Details" },
    { step: 4, label: "4. Payment" },
  ],
  currentStep: 2,
  allowNavigation: false,
  customClass: "",
});

const emit = defineEmits<{
  (e: "step-click", step: StepItem): void;
}>();

const isClickable = (stepNumber: number) => {
  return props.allowNavigation && stepNumber < props.currentStep;
};

const getStepComponent = (step: StepItem) => {
  if (isClickable(step.step) && step.to) {
    return resolveComponent("NuxtLinkLocale");
  }
  return "div";
};

const getStepTo = (step: StepItem) => {
  return isClickable(step.step) ? step.to : undefined;
};

const getStepStateClass = (stepNumber: number) => {
  if (stepNumber < props.currentStep) {
    return "text-emerald-600 dark:text-emerald-400";
  }
  if (stepNumber === props.currentStep) {
    return "text-orange-600 dark:text-orange-400 font-bold";
  }
  return "text-text-muted";
};

const handleStepClick = (step: StepItem) => {
  if (isClickable(step.step)) {
    emit("step-click", step);
  }
};
</script>