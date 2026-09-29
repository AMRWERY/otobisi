<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LazyVToast />
  </div>
</template>

<script lang="ts" setup>
useHead(useLocaleHead({ seo: false }));
</script>
