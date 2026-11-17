<template>
  <div class="px-6 py-6 space-y-5 max-w-[1600px] mx-auto">
    <lazy-team-header
      v-model:role="filters.role"
      v-model:hub="filters.hub"
      :total="summary.total"
      :active="summary.active"
      :pending="summary.pending"
      :role-counts="roleCounts"
      @invite="isInviteOpen = true"
    />

    <lazy-team-stats
      :owner="owner"
      :total="summary.total"
      :active="summary.active"
      :online="summary.online"
      :hub-breakdown="hubBreakdown"
      :two-factor-percent="summary.twoFactorPercent"
    />

    <lazy-team-table
      v-model:selected-ids="selectedIds"
      :members="filteredMembers"
      :has-active-filters="hasActiveFilters"
      @resend="resendInvite"
      @remove="removeMember"
      @remove-selected="removeSelected"
      @reset="resetFilters"
    />

    <lazy-team-terminals :terminals="terminals" />

    <lazy-team-invite-modal
      :is-open="isInviteOpen"
      @close="isInviteOpen = false"
      @submit="handleInvite"
    />
  </div>
</template>

<script lang="ts" setup>
import type { InviteForm } from "~/types/team";

const {
  filters,
  roleCounts,
  summary,
  hubBreakdown,
  owner,
  filteredMembers,
  terminals,
  selectedIds,
  hasActiveFilters,
  resetFilters,
  removeSelected,
  inviteMember,
  resendInvite,
  removeMember,
} = useTeam();

const isInviteOpen = ref(false);

function handleInvite(form: InviteForm) {
  if (inviteMember(form)) isInviteOpen.value = false;
}

useSeoMeta({
  title: "Team & Roles",
  description:
    "Manage Otobisi operator staff, roles, hub assignments and access rights.",
  private: false,
});
</script>
