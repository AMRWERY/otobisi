<template>
  <div class="px-6 py-6 pb-24 space-y-5 max-w-[1600px] mx-auto">
    <lazy-settings-header :is-dirty="isDirty" @discard="discard" @save="save" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      <!-- Section navigation: stays pinned while the panels scroll -->
      <div
        class="lg:col-span-3 space-y-4 sticky top-0 lg:top-6 z-20 -mx-6 px-6 py-2 lg:mx-0 lg:px-0 lg:py-0 bg-surface-0 dark:bg-[#0B1018] lg:bg-transparent lg:dark:bg-transparent"
      >
        <settings-nav :active="activeSection" @select="selectSection" />

        <lazy-settings-hub-health class="hidden lg:block" />
      </div>

      <!-- Panels are eager (not lazy) so the scroll-spy finds every section on mount -->
      <div class="lg:col-span-9 space-y-5">
        <settings-identity v-model="form" />

        <settings-branding v-model="form" />

        <settings-payment-rails @configure="configureGateways" />

        <settings-notifications v-model="form" />
      </div>
    </div>

    <lazy-settings-unsaved-bar
      :visible="isDirty"
      @discard="discard"
      @save="save"
    />
  </div>
</template>

<script lang="ts" setup>
const { form, isDirty, activeSection, selectSection, save, discard } =
  useSettings();

const toast = useToast();

function configureGateways() {
  toast.info("Gateway configuration is not available yet");
}

useSeoMeta({
  title: "Operator Settings",
  description:
    "Manage the operator's legal identity, public branding and payment rails on Otobisi.",
  private: false,
});
</script>
