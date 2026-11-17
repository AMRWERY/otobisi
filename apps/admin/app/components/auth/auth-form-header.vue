<template>
  <header class="space-y-3">
    <div class="space-y-1">
      <h1 class="text-2xl font-black tracking-tight text-text-primary">
        {{ title }}
      </h1>
      <p class="text-sm text-text-muted leading-relaxed">
        <slot>{{ subtitle }}</slot>
      </p>
    </div>
  </header>
</template>

<script lang="ts" setup>
defineProps<{
  icon: string;
  title: string;
  subtitle?: string;
}>();
</script>