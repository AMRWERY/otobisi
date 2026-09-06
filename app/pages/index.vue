<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 pb-16 space-y-8">
    <!-- HERO & SEARCH SECTION -->
    <lazy-search-section />

    <!-- POPULAR ROUTES SECTION -->
    <lazy-popular-routes-section />

    <!-- LIVE AVAILABILITY / FEATURED DEPARTURE -->
    <lazy-featured-departure />

    <!-- VALUE PROPOSITIONS (WHY EGYPTIANS TRUST Otobisi) -->
    <lazy-value-propostions />

    <!-- VISUAL SHOWCASE BANNERS -->
    <lazy-visual-showcase-banners />

    <!-- OPERATORS & FLEET COVERAGE -->
    <lazy-fleet-coverage />

    <!-- NO QUEUE CALLOUT BANNER -->
    <lazy-callout-banner />
  </div>
</template>

<script lang="ts" setup>
useSeo({});
</script>
