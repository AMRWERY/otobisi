<template>
  <!-- Fixed to the viewport so <main> is the scroll area (sticky page elements rely on it) -->
  <div class="h-screen overflow-hidden bg-surface-0 text-text-primary flex">
    <!-- Mobile drawer backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileOpen"
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        @click="closeMobile"
      />
    </Transition>

    <!-- Sidebar (fixed on mobile, sticky on desktop) -->
    <sidebar />

    <!-- Main content area -->
    <div class="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
      <!-- Top Header -->
      <Header />

      <!-- Page content -->
      <main
        ref="mainRef"
        class="flex-1 overflow-y-auto bg-surface-0 dark:bg-[#0B1018]"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { isMobileOpen, closeMobile } = useAdminSidebar();

// <main> scrolls (not the window), so a route change must reset it by hand
const mainRef = ref<HTMLElement | null>(null);
const route = useRoute();
watch(
  () => route.path,
  () => mainRef.value?.scrollTo({ top: 0 }),
);
</script>