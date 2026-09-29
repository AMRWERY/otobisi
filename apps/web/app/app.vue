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
// SEO tags (canonical/hreflang/og) are handled per-page by useSeo(); only
// pull dir/lang from i18n here.
useHead(useLocaleHead({ seo: false }));

if (import.meta.client && import.meta.dev) {
  const t = useToast();
  (window as any).__toast = t;
}
</script>