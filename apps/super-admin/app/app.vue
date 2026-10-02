<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LazyVToast />
    <VLocaleOverlay />
  </div>
</template>

<script lang="ts" setup>
useHead(useLocaleHead({ seo: false }));
</script>
