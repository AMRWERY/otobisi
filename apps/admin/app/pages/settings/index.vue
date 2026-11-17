<template>
  <div class="px-6 py-6 pb-24 space-y-5 max-w-[1600px] mx-auto">
    <lazy-settings-header :is-dirty="isDirty" @discard="discard" @save="save" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      <!-- Section navigation -->
      <div class="lg:col-span-3 space-y-4 lg:sticky lg:top-6">
        <lazy-settings-nav :active="activeSection" @select="selectSection" />

        <lazy-settings-hub-health />
      </div>

      <!-- Panels -->
      <div class="lg:col-span-9 space-y-5">
        <lazy-settings-identity v-model="form" />

        <lazy-settings-branding v-model="form" />

        <lazy-settings-payment-rails @configure="configureGateways" />
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