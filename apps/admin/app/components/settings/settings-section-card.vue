<template>
  <section
    :id="id"
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 sm:p-5 shadow-xs space-y-4 scroll-mt-20 lg:scroll-mt-6"
  >
    <header
      class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/60"
    >
      <div class="flex items-center gap-2">
        <div
          :class="[
            'w-7 h-7 rounded-lg border flex items-center justify-center shrink-0',
            iconClass,
          ]"
        >
          <Icon :name="icon" class="w-4 h-4" />
        </div>
        <div>
          <h2 class="text-sm font-bold text-text-primary">{{ title }}</h2>
          <p class="text-[11px] font-mono text-text-muted">{{ subtitle }}</p>
        </div>
      </div>
      <slot name="aside" />
    </header>

    <slot />
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  /** Anchor id used by the section nav */
  id?: string;
  title: string;
  subtitle: string;
  icon: string;
  /** Tailwind colour classes for the icon tile */
  iconClass: string;
}>();
</script>
