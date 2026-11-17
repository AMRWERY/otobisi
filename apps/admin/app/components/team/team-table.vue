<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <div
      class="px-4 py-2.5 border-b border-border/80 flex items-center justify-between flex-wrap gap-3 bg-surface-1/60 dark:bg-surface-2/10"
    >
      <label
        class="flex items-center gap-3 text-[11px] font-mono text-text-secondary cursor-pointer select-none"
      >
        <input
          type="checkbox"
          class="checkbox"
          :checked="allSelected"
          :indeterminate="someSelected"
          :disabled="!members.length"
          @change="emit('toggle-all')"
        />
        <span v-if="selectedIds.length" class="font-semibold text-text-primary">
          {{ selectedIds.length }} selected
        </span>
        <span v-else>Select all {{ members.length }} members</span>
      </label>
    </div>

    <VTable
      :columns="columns"
      :rows="pagedMembers"
      row-key="id"
      min-width-class="min-w-[960px]"
      :row-class="rowClass"
      empty-text="No team members match your filters"
    >
      <template #header-select>
        <span class="sr-only">Select</span>
      </template>

      <template #cell-select="{ row }">
        <input
          type="checkbox"
          class="checkbox"
          :checked="selectedIds.includes(row.id)"
          :aria-label="`Select ${row.name}`"
          @change="emit('toggle', row.id)"
        />
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

      <template #cell-actions="{ row }">
        <VDropdownMenu :items="actionItems(row as TeamMember)" align="right">
          <template #trigger>
            <VButton
              variant="ghost"
              size="xs"
              rounded="lg"
              icon="ph:dots-three-vertical-bold"
              :aria-label="`Actions for ${row.name}`"
              @click.stop
            />
          </template>
        </VDropdownMenu>
      </template>
    </VTable>

    <div
      class="px-4 py-3 border-t border-border/80 flex items-center justify-between flex-wrap gap-4 text-xs"
    >
      <VDropdownMenu :items="perPageItems" align="left">
        <template #trigger>
          <VButton
            variant="surface"
            size="xs"
            rounded="lg"
            icon-right="ph:caret-down-bold"
          >
            {{ perPage }} per page
          </VButton>
        </template>
      </VDropdownMenu>

      <VPagination
        v-model="currentPage"
        :total="members.length"
        :page-size="perPage"
        item-label="members"
        show-summary
        class="flex-1 border-t-0 pt-0"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "@otobisi/ui/types/shared/VDropdownMenu";
import type { TableColumn } from "@otobisi/ui/types/shared/VTable";
import type { TeamHubKey, TeamMember, TeamRoleKey } from "~/types/team";

const props = defineProps<{
  /** Already filtered members; this component only paginates them */
  members: TeamMember[];
  selectedIds: number[];
  allSelected: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle", id: number): void;
  (e: "toggle-all"): void;
  (e: "resend", member: TeamMember): void;
  (e: "remove", member: TeamMember): void;
}>();

const columns: TableColumn[] = [
  { key: "select", label: "", headerClass: "w-10 ps-4", cellClass: "ps-4" },
  { key: "member", label: "STAFF MEMBER" },
  { key: "contact", label: "CONTACT & CREDENTIALS" },
  { key: "role", label: "ROLE" },
  { key: "station", label: "ASSIGNED HUB / STATION" },
  { key: "activity", label: "LAST ACTIVITY" },
  { key: "security", label: "SECURITY" },
  { key: "actions", label: "ACTIONS", headerClass: "text-center pe-4", cellClass: "text-center pe-4" },
];

const someSelected = computed(
  () => props.selectedIds.length > 0 && !props.allSelected,
);

function rowClass(row: Record<string, any>) {
  return props.selectedIds.includes(row.id)
    ? "bg-surface-1/70 dark:bg-surface-2/20"
    : "";
}

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

// ── Pagination ──────────────────────────────────────────
const currentPage = ref(1);
const perPage = ref(TEAM_PER_PAGE_OPTIONS[0]!);

const perPageItems = computed<DropdownItem[]>(() =>
  TEAM_PER_PAGE_OPTIONS.map((size) => ({
    type: "button",
    label: `${size} per page`,
    onClick: () => {
      perPage.value = size;
      currentPage.value = 1;
    },
  })),
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.members.length / perPage.value)),
);

// Filtering or removing can shrink the list below the current page
watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});

const pagedMembers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return props.members.slice(start, start + perPage.value);
});
</script>

<style scoped>
.checkbox {
  width: 0.95rem;
  height: 0.95rem;
  border-radius: 0.25rem;
  cursor: pointer;
  color: #188577;
}
</style>
