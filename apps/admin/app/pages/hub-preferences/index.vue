<template>
  <div class="px-6 py-6 pb-24 space-y-5 max-w-[1600px] mx-auto">
    <lazy-hubprefs-header
      :is-dirty="isDirty"
      :hub-name="form.general.name"
      :open-days="openDays"
      @discard="discard"
      @save="save"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      <!-- Section navigation: stays pinned while the panels scroll -->
      <div
        class="lg:col-span-3 sticky top-0 lg:top-6 z-20 -mx-6 px-6 py-2 lg:mx-0 lg:px-0 lg:py-0 bg-surface-0 dark:bg-[#0B1018] lg:bg-transparent lg:dark:bg-transparent"
      >
        <hubprefs-nav :active="activeSection" @select="selectSection" />
      </div>

      <!-- Panels are eager (not lazy) so the scroll-spy finds every section on mount -->
      <div class="lg:col-span-9 space-y-5">
        <hubprefs-general v-model="form" />
        <hubprefs-hours v-model="form" />
        <hubprefs-boarding v-model="form" />
        <hubprefs-defaults v-model="form" />
        <hubprefs-ticketing v-model="form" />
        <hubprefs-display v-model="form" />
      </div>
    </div>

    <lazy-hubprefs-unsaved-bar
      :visible="isDirty"
      @discard="discard"
      @save="save"
    />
  </div>
</template>

<script lang="ts" setup>
const { form, isDirty, activeSection, selectSection, save, discard, openDays } =
  useHubPrefs();

useSeoMeta({
  title: "Hub Preferences",
  description:
    "Operating hours, boarding rules, ticketing and display defaults for your Otobisi hub.",
  private: false,
});
</script>
