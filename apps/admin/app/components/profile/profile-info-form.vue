<template>
  <settings-section-card
    title="Personal Information"
    subtitle="Shown to your team and on the manifests and receipts you issue."
    icon="ph:identification-card-bold"
    icon-class="bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-500/15 dark:border-teal-500/25 dark:text-teal-300"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <VInput
        v-model="form.nameEn"
        label="Full Name (English)"
        required
        size="sm"
        rounded="lg"
      />
      <VInput
        v-model="form.nameAr"
        label="الاسم الكامل (عربي)"
        size="sm"
        rounded="lg"
        dir="rtl"
      />
      <VInput
        v-model="form.email"
        label="Work Email"
        type="email"
        required
        icon="ph:envelope-simple"
        size="sm"
        rounded="lg"
        hint="Used to sign in and for security notices"
      />
      <VInput
        v-model="form.phone"
        label="Mobile Number"
        icon="ph:phone"
        size="sm"
        rounded="lg"
        hint="Receives SMS verification codes"
      />
      <VFormSelect
        v-model="form.language"
        label="Interface Language"
        :options="PROFILE_LANGUAGE_OPTIONS"
      />
      <VFormSelect
        v-model="form.timezone"
        label="Time Zone"
        :options="PROFILE_TIMEZONE_OPTIONS"
      />
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { ProfileForm } from "~/types/profile";

// The page's reactive form; fields are edited in place
const form = defineModel<ProfileForm>({ required: true });
</script>
