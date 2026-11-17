<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="space-y-1.5">
        <div
          class="flex items-center gap-2 text-xs text-text-muted font-medium flex-wrap"
        >
          <span>System & Settings</span>
          <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
          <h1 class="text-base font-extrabold text-text-primary tracking-tight">
            Team & Staff Management
          </h1>
          <span
            class="ms-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 dark:bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-200/70 dark:border-teal-500/25"
          >
            {{ total }} Total Members • {{ active }} Active •
            {{ pending }} Pending Invites
          </span>
        </div>
        <p class="text-xs text-text-muted">
          Manage employee credentials, dispatch permissions, station counter
          admissions, and operator hierarchy across Egypt.
        </p>
      </div>

      <VButton
        variant="primary"
        size="sm"
        rounded="xl"
        icon="ph:user-plus-bold"
        custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
        @click="emit('invite')"
      >
        Invite Member
      </VButton>
    </div>

    <div class="flex items-center gap-2.5 flex-wrap">
      <VDropdownMenu :items="roleItems" align="left">
        <template #trigger="{ open }">
          <VButton
            variant="surface"
            size="sm"
            rounded="xl"
            icon="ph:identification-badge-bold"
            icon-right="ph:caret-down-bold"
            :custom-class="triggerClass(open)"
          >
            {{ roleLabel }}
          </VButton>
        </template>
      </VDropdownMenu>

      <VDropdownMenu :items="hubItems" align="left">
        <template #trigger="{ open }">
          <VButton
            variant="surface"
            size="sm"
            rounded="xl"
            icon="ph:map-pin-bold"
            icon-right="ph:caret-down-bold"
            :custom-class="triggerClass(open)"
          >
            {{ hubLabel }}
          </VButton>
        </template>
      </VDropdownMenu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "~/types/shared/VDropdownMenu";
import type { TeamHubKey, TeamRoleKey } from "~/types/team";

const props = defineProps<{
  total: number;
  active: number;
  pending: number;
  roleCounts: Record<TeamRoleKey, number>;
}>();

const emit = defineEmits<{ (e: "invite"): void }>();

const role = defineModel<string>("role", { required: true });
const hub = defineModel<string>("hub", { required: true });

const roleItems = computed<DropdownItem[]>(() => [
  {
    type: "button",
    label: `All Roles (${props.total})`,
    onClick: () => (role.value = ALL_TEAM),
  },
  ...TEAM_ROLE_KEYS.map(
    (key): DropdownItem => ({
      type: "button",
      label: `${TEAM_ROLES[key].label} (${props.roleCounts[key]})`,
      onClick: () => (role.value = key),
    }),
  ),
]);

const hubItems = computed<DropdownItem[]>(() => [
  {
    type: "button",
    label: "All Stations (Egypt-Wide)",
    onClick: () => (hub.value = ALL_TEAM),
  },
  ...TEAM_HUB_KEYS.map(
    (key): DropdownItem => ({
      type: "button",
      label: TEAM_HUBS[key].label,
      onClick: () => (hub.value = key),
    }),
  ),
]);

const roleLabel = computed(() =>
  role.value === ALL_TEAM
    ? `All Roles (${props.total})`
    : TEAM_ROLES[role.value as TeamRoleKey].label,
);

const hubLabel = computed(() =>
  hub.value === ALL_TEAM
    ? "All Stations (Egypt-Wide)"
    : TEAM_HUBS[hub.value as TeamHubKey].short,
);

const triggerClass = (open: boolean) => [
  "border-border/80 bg-surface-0 dark:bg-[#111927]",
  open ? "border-accent-500" : "",
];
</script>
