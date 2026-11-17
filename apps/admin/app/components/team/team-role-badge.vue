<template>
  <span
    :class="[
      'inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-bold whitespace-nowrap',
      info.badgeClass,
    ]"
  >
    <Icon :name="info.icon" class="w-3 h-3" />
    <span>{{ info.label }}</span>
  </span>
</template>

<script lang="ts" setup>
import type { TeamRoleKey } from "~/types/team";

const props = defineProps<{
  role: TeamRoleKey;
}>();

const info = computed(() => TEAM_ROLES[props.role]);
</script>
