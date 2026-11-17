<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-5 shadow-xs flex flex-col items-center text-center gap-3"
  >
    <div class="relative">
      <div
        class="w-20 h-20 rounded-full bg-teal-600/10 dark:bg-teal-500/15 border border-teal-500/30 text-teal-700 dark:text-teal-300 flex items-center justify-center text-2xl font-extrabold"
      >
        {{ initials }}
      </div>
      <span
        class="absolute bottom-1 end-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-surface-0 dark:ring-[#111927]"
        title="Online"
      />
    </div>

    <div class="leading-tight">
      <div class="text-base font-extrabold text-text-primary">{{ nameEn }}</div>
      <div class="text-sm text-text-muted" dir="rtl">{{ nameAr }}</div>
    </div>

    <span
      class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 dark:bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-200/70 dark:border-teal-500/25"
    >
      <Icon name="ph:briefcase-fill" class="w-3 h-3" />
      {{ PROFILE_FACTS.role }}
    </span>

    <dl
      class="w-full pt-3 mt-1 border-t border-border/60 space-y-2 text-xs text-start"
    >
      <div
        v-for="fact in facts"
        :key="fact.label"
        class="flex items-center justify-between gap-3"
      >
        <dt class="flex items-center gap-1.5 text-text-muted">
          <Icon :name="fact.icon" class="w-3.5 h-3.5" />
          {{ fact.label }}
        </dt>
        <dd class="font-mono text-text-secondary text-end">{{ fact.value }}</dd>
      </div>
    </dl>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  nameEn: string;
  nameAr: string;
  initials: string;
}>();

const facts = [
  { icon: "ph:map-pin-bold", label: "Hub", value: PROFILE_FACTS.hub },
  { icon: "ph:sign-in-bold", label: "Last sign-in", value: PROFILE_FACTS.lastSignIn },
  { icon: "ph:calendar-check-bold", label: "Member since", value: PROFILE_FACTS.memberSince },
];
</script>
