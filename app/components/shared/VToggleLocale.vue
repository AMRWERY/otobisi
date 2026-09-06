<template>
  <div
    dir="ltr"
    class="inline-flex items-center p-1 bg-[#EEF2F6] dark:bg-surface-2 rounded-xl border border-border/40 select-none text-xs font-semibold"
  >
    <!-- English Option -->
    <button
      type="button"
      :class="[
        'px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer font-bold',
        locale === 'en'
          ? 'bg-surface-0 text-[#A1331B] shadow-xs'
          : 'text-text-primary hover:text-[#A1331B] bg-transparent',
      ]"
      aria-label="Switch to English"
      @click="switchLocale('en')"
    >
      EN
    </button>

    <!-- Arabic Option -->
    <button
      type="button"
      :class="[
        'px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer font-bold font-arabic',
        locale === 'ar'
          ? 'bg-surface-0 text-[#A1331B] shadow-xs'
          : 'text-text-primary hover:text-[#A1331B] bg-transparent',
      ]"
      aria-label="التبديل إلى العربية"
      @click="switchLocale('ar')"
    >
      العربية
    </button>
  </div>
</template>

<script lang="ts" setup>
const { locale, switchLocale } = useLocaleSwitch();
</script>
