<template>
  <div>
    <button
      @click="toggleDark($event)"
      class="px-2 py-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors flex items-center justify-center"
    >
      <ClientOnly>
        <Icon
          :name="isDark ? 'noto-v1:sun' : 'noto-v1:crescent-moon'"
          class="w-4 h-4"
        />
        <template #fallback>
          <Icon name="noto-v1:crescent-moon" class="w-4 h-4" />
        </template>
      </ClientOnly>
    </button>
  </div>
</template>

<script lang="ts" setup>
const { isDark, toggleDark } = useTheme();
</script>