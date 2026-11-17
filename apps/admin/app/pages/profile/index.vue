<template>
  <div class="px-6 py-6 pb-24 space-y-5 max-w-[1600px] mx-auto">
    <lazy-profile-header :is-dirty="isDirty" @discard="discard" @save="save" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      <!-- Identity + quick alerts stay in view while the forms scroll -->
      <div class="lg:col-span-4 space-y-5 lg:sticky lg:top-6">
        <lazy-profile-identity-card
          :name-en="form.nameEn"
          :name-ar="form.nameAr"
          :initials="initials"
        />
        <lazy-profile-notifications v-model="form" />
      </div>

      <div class="lg:col-span-8 space-y-5">
        <lazy-profile-info-form v-model="form" />
        <lazy-profile-password
          v-model="password"
          :strength="strength"
          :error="passwordError"
          @submit="changePassword"
        />
        <lazy-profile-two-factor v-model="twoFactor" />
        <lazy-profile-sessions :sessions="sessions" @revoke="revokeSession" />
        <lazy-profile-danger-zone @sign-out-everywhere="signOutEverywhere" />
      </div>
    </div>

    <lazy-profile-unsaved-bar
      :visible="isDirty"
      @discard="discard"
      @save="save"
    />
  </div>
</template>

<script lang="ts" setup>
const {
  form,
  isDirty,
  initials,
  save,
  discard,
  password,
  strength,
  passwordError,
  changePassword,
  twoFactor,
  sessions,
  revokeSession,
  signOutEverywhere,
} = useProfile();

useSeoMeta({
  title: "Operator Profile",
  description:
    "Manage your Otobisi operator profile, password, two-factor authentication and active sessions.",
  private: false,
});
</script>
