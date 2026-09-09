<template>
  <nav class="flex items-center gap-1.5 text-xs text-text-muted mb-3 font-medium flex-wrap">
    <!-- Home (always first) -->
    <nuxt-link-locale
      to="/"
      class="hover:text-text-primary transition-colors flex items-center gap-1 shrink-0"
    >
      <Icon name="ph:house-bold" class="w-3.5 h-3.5" />
      <span>Home</span>
    </nuxt-link-locale>

    <!-- Dynamic crumbs -->
    <template v-for="(crumb, i) in items" :key="i">
      <span class="opacity-60 shrink-0">/</span>

      <!-- Last item: active page (not a link) -->
      <span
        v-if="i === items.length - 1"
        class="text-[#A1331B] dark:text-orange-400 font-bold"
      >
        {{ crumb.label }}
      </span>

      <!-- Middle items: clickable links -->
      <nuxt-link-locale
        v-else-if="crumb.to"
        :to="crumb.to"
        class="hover:text-text-primary transition-colors"
      >
        {{ crumb.label }}
      </nuxt-link-locale>

      <!-- Middle items: no link (plain text) -->
      <span
        v-else
        class="hover:text-text-primary transition-colors cursor-default"
      >
        {{ crumb.label }}
      </span>
    </template>
  </nav>
</template>

<script lang="ts" setup>
export interface BreadcrumbItem {
  /** Display text */
  label: string;
  /** Route path. Omit for non-linked intermediate crumbs. Last item is never linked. */
  to?: string;
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>