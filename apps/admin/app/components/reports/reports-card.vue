<template>
  <section
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 shadow-xs flex flex-col justify-between"
  >
    <div>
      <header class="flex items-center justify-between gap-3 mb-3">
        <div>
          <h3 class="font-bold text-sm text-text-primary">{{ title }}</h3>
          <div v-if="subtitle" class="text-[11px] font-mono text-text-muted">
            {{ subtitle }}
          </div>
        </div>
        <slot name="aside" />
      </header>

      <slot />
    </div>

    <footer
      v-if="$slots.footer"
      class="flex flex-wrap items-center justify-between gap-2 pt-3 mt-4 border-t border-border/60 text-[11px] font-mono text-text-muted"
    >
      <slot name="footer" />
    </footer>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>
