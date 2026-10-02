<template>
  <div>
    <h1 class="p-5 text-3xl">settings page</h1>
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();

useSeoMeta({
  title: "Operator Settings",
  description:
    "Official press announcements, company facts, brand assets, and media contact information for Otobisi Egypt SAE.",
  private: false,
});
</script>