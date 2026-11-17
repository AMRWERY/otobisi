<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <VTableBulkBar
      :count="selectedIds.length"
      label="Members Selected"
      @clear="selectedIds = []"
    >
      <VTableBulkAction
        icon="ph:trash-bold"
        danger
        @click="emit('remove-selected')"
      >
        Remove from team
      </VTableBulkAction>
    </VTableBulkBar>

    <VTable
      v-model:selected="selectedIds"
      v-model:sort="sort"
      selectable
      :columns="columns"
      :rows="pagedMembers"
      row-key="id"
      density="comfortable"
      min-width-class="min-w-[960px]"
      empty-icon="ph:users-three-bold"
      empty-title="No team members match your filters"
      empty-description="Try a different role or station."
    >
      <template #empty-actions>
        <VButton
          v-if="hasActiveFilters"
          variant="surface"
          size="sm"
          rounded="lg"
          icon="ph:funnel-x-bold"
          @click="emit('reset')"
        >
          Reset Active Filters
        </VButton>
      </template>

      <template #cell-member="{ row }">
        <div class="flex items-center gap-2.5">
          <div
            class="w-8 h-8 rounded-full bg-surface-1 dark:bg-surface-2 border border-border flex items-center justify-center font-bold text-text-secondary text-xs shrink-0"
          >
            {{ row.initials }}
          </div>
          <div class="leading-tight">
            <div class="flex items-center gap-1.5 font-bold text-text-primary text-xs">
              <span>{{ row.name }}</span>
              <span class="font-normal text-text-muted text-[11px]">
                {{ row.arabicName }}
              </span>
            </div>
            <div class="text-[10px] text-text-muted font-mono">
              {{ row.title }}
            </div>
          </div>
        </div>
      </template>

      <template #cell-contact="{ row }">
        <div class="text-[11px] text-text-secondary">{{ row.email }}</div>
        <div class="text-[10px] font-mono text-text-muted">{{ row.phone }}</div>
      </template>

      <template #cell-role="{ row }">
        <team-role-badge :role="row.role as TeamRoleKey" />
      </template>

      <template #cell-station="{ row }">
        <div class="text-[11px] font-bold text-text-primary">
          {{ TEAM_HUBS[row.hub as TeamHubKey].short }}
        </div>
        <div class="text-[10px] text-text-muted">{{ row.stationRole }}</div>
      </template>

      <template #cell-activity="{ row }">
        <div
          :class="[
            'flex items-center gap-1.5 text-[11px] whitespace-nowrap',
            row.isOnline
              ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
              : 'text-text-muted',
          ]"
        >
          <span
            :class="[
              'w-1.5 h-1.5 rounded-full',
              row.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300',
            ]"
          />
          <span>{{ row.lastSeen }}</span>
        </div>
      </template>

      <template #cell-security="{ row }">
        <span
          v-if="row.twoFactor"
          class="inline-flex items-center gap-1 text-[10px] text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-500/15 border border-teal-200/60 dark:border-teal-500/25 px-1.5 py-0.5 rounded font-bold"
        >
          <Icon name="ph:shield-check-fill" class="w-3 h-3" />
          Verified
        </span>
        <span
          v-else
          class="inline-flex items-center gap-1 text-[10px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/15 border border-amber-200/60 dark:border-amber-500/25 px-1.5 py-0.5 rounded font-bold"
        >
          <Icon name="ph:hourglass-medium-bold" class="w-3 h-3" />
          Pending
        </span>
      </template>

      <!-- Row actions flyout -->
      <template #cell-actions="{ row }">
        <VDropdownMenu :items="actionItems(row as TeamMember)" align="right">
          <template #trigger>
            <VButton
              variant="ghost"
              size="xs"
              rounded="lg"
              icon="ph:dots-three-vertical-bold"
              :aria-label="`Actions for ${row.name}`"
            />
          </template>
        </VDropdownMenu>
      </template>
    </VTable>

    <VPagination
      v-model="currentPage"
      v-model:page-size="perPage"
      :page-size-options="TEAM_PER_PAGE_OPTIONS"
      :total="members.length"
      item-label="members"
      show-summary
      :active-class="PAGINATION_ACTIVE_CLASS"
      class="px-4 py-3 bg-surface-1/40 dark:bg-surface-2/10"
    />
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "@otobisi/ui/types/shared/VDropdownMenu";
import type { TableColumn, TableSort } from "@otobisi/ui/types/shared/VTable";
import type { TeamHubKey, TeamMember, TeamRoleKey } from "~/types/team";

const props = defineProps<{
  /** Already filtered members; this component sorts and paginates them */
  members: TeamMember[];
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  (e: "resend", member: TeamMember): void;
  (e: "remove", member: TeamMember): void;
  (e: "remove-selected"): void;
  (e: "reset"): void;
}>();

/** Ids of the checked members (kept across pages) */
const selectedIds = defineModel<(string | number)[]>("selectedIds", {
  required: true,
});

const columns: TableColumn[] = [
  { key: "member", label: "Staff Member", sortable: true },
  { key: "contact", label: "Contact & Credentials" },
  { key: "role", label: "Role", sortable: true },
  { key: "station", label: "Assigned Hub / Station", sortable: true },
  { key: "activity", label: "Last Activity" },
  { key: "security", label: "Security" },
  { key: "actions", label: "Actions", align: "center", headerClass: "pe-4", cellClass: "pe-4" },
];

function actionItems(member: TeamMember): DropdownItem[] {
  const items: DropdownItem[] = [];
  if (member.status === "pending") {
    items.push({
      type: "button",
      label: "Resend invitation",
      icon: "ph:paper-plane-right-bold",
      onClick: () => emit("resend", member),
    });
  }
  // The root owner can never be removed from here
  if (member.role !== "owner") {
    if (items.length) items.push({ type: "divider" });
    items.push({
      type: "button",
      label: "Remove from team",
      icon: "ph:trash-bold",
      iconClass: "text-rose-600",
      danger: true,
      onClick: () => emit("remove", member),
    });
  }
  return items.length
    ? items
    : [{ type: "button", label: "Root owner — no actions", class: "pointer-events-none opacity-60" }];
}

// ── Sorting ─────────────────────────────────────────────
const sort = ref<TableSort | null>(null);

const sortedMembers = computed(() =>
  sortRows(props.members, sort.value, {
    member: (m) => m.name,
    role: (m) => TEAM_ROLES[m.role].label,
    station: (m) => TEAM_HUBS[m.hub].short,
  }),
);

// ── Pagination ──────────────────────────────────────────
const currentPage = ref(1);
const perPage = ref(TEAM_PER_PAGE_OPTIONS[0]!);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.members.length / perPage.value)),
);

// Filtering or removing can shrink the list below the current page
watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});

const pagedMembers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return sortedMembers.value.slice(start, start + perPage.value);
});
</script>
