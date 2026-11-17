<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
    <!-- Organization lead -->
    <div :class="cardClass">
      <div class="flex items-center justify-between mb-1">
        <span :class="labelClass">Organization Lead</span>
        <Icon name="ph:shield-check-bold" class="w-4 h-4 text-teal-700" />
      </div>
      <div v-if="owner">
        <div class="text-base font-bold text-text-primary">
          {{ owner.name }}
          <span class="font-normal text-text-muted text-xs">
            {{ owner.arabicName }}
          </span>
        </div>
        <div class="text-[11px] text-text-muted mt-0.5">{{ owner.title }}</div>
      </div>
      <div v-else class="text-xs text-text-muted">No owner assigned</div>
      <div :class="footClass">
        <span class="text-teal-800 dark:text-teal-300 font-bold">
          Root Operations
        </span>
        <span
          class="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/25 font-semibold"
        >
          Full Concession Access
        </span>
      </div>
    </div>

    <!-- On duty -->
    <div :class="cardClass">
      <div class="flex items-center justify-between mb-1">
        <span :class="labelClass">Dispatch & Counter Active</span>
        <Icon name="ph:headset-bold" class="w-4 h-4 text-emerald-600" />
      </div>
      <div>
        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-black text-text-primary">
            {{ active }} / {{ total }}
          </span>
          <span class="text-xs text-emerald-600 font-bold">Active Staff</span>
        </div>
        <div class="text-[10px] text-text-muted truncate mt-0.5">
          {{ hubBreakdown }}
        </div>
      </div>
      <div :class="footClass">
        <span class="text-text-muted">Online right now</span>
        <span class="text-emerald-700 dark:text-emerald-400 font-bold">
          {{ online }} on shift
        </span>
      </div>
    </div>

    <!-- 2FA -->
    <div :class="cardClass">
      <div class="flex items-center justify-between mb-1">
        <span :class="labelClass">2FA Security Enforcement</span>
        <Icon name="ph:lock-key-bold" class="w-4 h-4 text-teal-700" />
      </div>
      <div>
        <div class="flex items-baseline gap-2">
          <span
            :class="[
              'text-2xl font-black',
              twoFactorPercent === 100 ? 'text-emerald-600' : 'text-amber-600',
            ]"
          >
            {{ twoFactorPercent }}%
          </span>
          <span class="text-xs text-text-secondary font-bold">Compliant</span>
        </div>
        <div class="text-[10px] text-text-muted mt-0.5">
          Mandatory SMS & Authenticator App
        </div>
      </div>
      <div :class="footClass">
        <span class="text-text-muted">Exceptions</span>
        <span class="text-teal-800 dark:text-teal-300 font-bold">
          {{ twoFactorPercent === 100 ? "Zero active bypasses" : "Review needed" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TeamMember } from "~/types/team";

defineProps<{
  owner?: TeamMember;
  total: number;
  active: number;
  online: number;
  hubBreakdown: string;
  twoFactorPercent: number;
}>();

const cardClass =
  "bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 shadow-xs flex flex-col justify-between gap-1";
const labelClass = "text-[10px] uppercase font-bold tracking-wider text-text-muted";
const footClass =
  "mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-[10px]";
</script>
