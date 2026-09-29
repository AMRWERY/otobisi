<template>
  <div
    class="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-border transition-all"
  >
    <!-- Passenger Box Header -->
    <div
      class="flex items-center justify-between pb-3.5 border-b border-border mb-4"
    >
      <div class="flex items-center gap-2.5">
        <div
          :class="isLead ? 'bg-[#A1331B]' : 'bg-slate-600'"
          class="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs"
        >
          {{ index + 1 }}
        </div>
        <div>
          <span class="font-bold text-sm text-text-primary block">
            {{ isLead ? "Lead Passenger" : `Passenger ${index + 1}` }} • Seat
            {{ seatId }}
          </span>
          <span class="text-[11px] text-text-muted">
            {{
              isLead
                ? "Window Seat (Front Upper Deck)"
                : "Aisle Seat (Adjacent to Lead Passenger)"
            }}
          </span>
        </div>
      </div>

      <!-- Verified / Action Required Badge -->
      <div
        v-if="isVerified"
        class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20"
      >
        <Icon name="ph:check-circle-fill" class="w-3.5 h-3.5" />
        <span>Details Verified</span>
      </div>

      <div
        v-else
        class="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20"
      >
        <Icon name="ph:warning-circle-bold" class="w-3.5 h-3.5" />
        <span>Action Required</span>
      </div>
    </div>

    <!-- Inputs Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Full Legal Name -->
      <div>
        <label class="block text-xs font-semibold text-text-primary mb-1.5">
          Full Legal Name{{ isLead ? " (as on ID / Passport)" : "" }}
        </label>
        <LazyVInput
          v-model="modelValue.name"
          type="text"
          :placeholder="isLead ? 'Full Legal Name' : 'Full Name'"
          variant="unstyled"
          box-class="bg-surface-1 border border-border rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500"
          input-class="text-xs sm:text-sm font-semibold text-text-primary placeholder:text-text-muted"
        >
          <template v-if="modelValue.name.length >= 3" #trailing>
            <Icon
              name="ph:check-circle-bold"
              class="w-4 h-4 text-emerald-500 shrink-0 ms-2"
            />
          </template>
        </LazyVInput>
        <span class="text-[11px] text-text-muted mt-1 block">
          {{
            isLead
              ? "Matches national identity registry"
              : "Must match government-issued card"
          }}
        </span>
      </div>

      <!-- Mobile Number (for Lead) / National ID (for non-lead) -->
      <div v-if="isLead">
        <label class="block text-xs font-semibold text-text-primary mb-1.5">
          Mobile Number (Egyptian Network)
        </label>
        <LazyVInput
          v-model="modelValue.phone"
          type="tel"
          placeholder="10 1234 5678"
          variant="unstyled"
          box-class="bg-surface-1 border border-border rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500"
          input-class="text-xs sm:text-sm font-semibold text-text-primary placeholder:text-text-muted"
        >
          <template #leading>
            <span
              class="text-xs font-bold text-text-muted pe-2 border-e border-border me-2"
            >
              +20
            </span>
          </template>
          <template v-if="modelValue.phone.length >= 8" #trailing>
            <Icon
              name="ph:check-circle-bold"
              class="w-4 h-4 text-emerald-500 shrink-0 ms-2"
            />
          </template>
        </LazyVInput>
        <span
          class="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1"
        >
          <Icon name="ph:chat-circle-dots-bold" class="w-3.5 h-3.5" />
          Ticket SMS & WhatsApp link will be sent here
        </span>
      </div>

      <!-- National ID Field -->
      <div>
        <label class="block text-xs font-semibold text-text-primary mb-1.5">
          {{
            isLead
              ? "Egyptian National ID (14 digits) or Passport"
              : "National ID / Passport"
          }}
        </label>
        <LazyVInput
          v-model="modelValue.nationalId"
          type="text"
          maxlength="14"
          placeholder="29408150102345"
          variant="unstyled"
          :box-class="[
            isNationalIdValid
              ? 'bg-surface-1 border-border focus-within:ring-orange-500/20 focus-within:border-orange-500'
              : 'bg-red-50/50 dark:bg-red-950/20 border-red-300 dark:border-red-800 focus-within:ring-red-500/20 focus-within:border-red-500',
            'border rounded-xl px-3.5 py-2.5 focus-within:ring-2',
          ]"
          :input-class="[
            isNationalIdValid ? 'text-text-primary' : 'text-red-600 dark:text-red-400',
            'text-xs sm:text-sm font-semibold font-mono',
          ]"
        >
          <template #trailing>
            <Icon
              v-if="isNationalIdValid"
              name="ph:check-circle-bold"
              class="w-4 h-4 text-emerald-500 shrink-0 ms-2"
            />
            <Icon
              v-else
              name="ph:warning-circle-bold"
              class="w-4 h-4 text-red-500 shrink-0 ms-2"
            />
          </template>
        </LazyVInput>
        <span
          v-if="isNationalIdValid"
          class="text-[11px] text-text-muted mt-1 block"
        >
          {{
            isLead
              ? "Citizen ID verified for Almaza Terminal E-Gate"
              : "National ID verified"
          }}
        </span>
        <span
          v-else
          class="text-[11px] text-red-600 dark:text-red-400 font-medium mt-1 flex items-center gap-1"
        >
          <Icon name="ph:warning-bold" class="w-3.5 h-3.5 shrink-0" />
          National ID must be exactly 14 digits ({{
            modelValue.nationalId.length
          }}
          entered)
        </span>
      </div>

      <!-- Gender Selection -->
      <div>
        <label class="block text-xs font-semibold text-text-primary mb-1.5">
          Gender{{ isLead ? " (Mandatory for coach seating rules)" : "" }}
        </label>
        <div class="grid grid-cols-2 gap-2">
          <LazyVButton
            variant="unstyled"
            size="sm"
            :class="
              modelValue.gender === 'male'
                ? 'bg-[#A1331B] text-white shadow-xs'
                : 'bg-surface-1 text-text-secondary hover:text-text-primary border border-border'
            "
            class="py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            icon="ph:gender-male-bold"
            @click="modelValue.gender = 'male'"
          >
            <span>Male</span>
          </LazyVButton>

          <LazyVButton
            variant="unstyled"
            size="sm"
            :class="
              modelValue.gender === 'female'
                ? 'bg-[#A1331B] text-white shadow-xs'
                : 'bg-surface-1 text-text-secondary hover:text-text-primary border border-border'
            "
            class="py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            icon="ph:gender-female-bold"
            @click="modelValue.gender = 'female'"
          >
            <span>Female</span>
          </LazyVButton>
        </div>
        <span v-if="isLead" class="text-[11px] text-text-muted mt-1 block">
          Required by bus operator seat policies
        </span>
      </div>

      <!-- Save to Profile Checkbox (for non-lead passengers) -->
      <div v-if="!isLead" class="flex items-center pt-2 md:col-span-2">
        <label
          class="inline-flex items-center gap-2 cursor-pointer select-none"
        >
          <input
            v-model="modelValue.saveToProfile"
            type="checkbox"
            class="w-4 h-4 rounded text-[#A1331B] focus:ring-[#A1331B] border-border bg-surface-1 cursor-pointer"
          />
          <span class="text-xs font-medium text-text-secondary">
            Save passenger details to my Otobisi profile for faster checkout
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PassengerInfo } from "~/types/booking/passenger-form-card";

const props = defineProps<{
  modelValue: PassengerInfo;
  seatId: string;
  index: number;
  isLead: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: PassengerInfo): void;
}>();

const isNationalIdValid = computed(() => {
  return props.modelValue.nationalId.length === 14;
});

const isVerified = computed(() => {
  return (
    props.modelValue.name.length >= 3 &&
    props.modelValue.nationalId.length === 14 &&
    (!props.isLead ||
      (props.modelValue.phone && props.modelValue.phone.length >= 8))
  );
});
</script>