<template>
  <div>
    <button
      class="px-2 py-1 bg-surface-1 rounded shadow-2xs text-text-primary"
      @click="switchLocale(locale === 'ar' ? 'en' : 'ar')"
    >
      {{ locale === "ar" ? "EN" : "AR" }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const { locale, switchLocale } = useLocaleSwitch();
</script>