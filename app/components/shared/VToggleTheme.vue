<template>
  <div>
    <button
      @click="handleToggle"
      class="px-2 py-2 rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center active:scale-[0.97] cursor-pointer"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <ClientOnly>
        <Icon
          :name="isDark ? 'noto-v1:sun' : 'noto-v1:crescent-moon'"
          class="w-4 h-4"
          :class="{ 'icon-theme-spin': isSpinning }"
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

// ─── Icon spin-pop animation on toggle ───────────────────────────────────────
const isSpinning = ref(false);

function handleToggle() {
  // Always spin the icon
  isSpinning.value = true;
  setTimeout(() => { isSpinning.value = false; }, 360);

  // Use View Transitions API for the top-to-bottom page wipe (modern browsers)
  if (typeof document !== 'undefined' && 'startViewTransition' in document) {
    document.documentElement.classList.add('theme-transitioning');

    const transition = (document as Document & { startViewTransition: (cb: () => void) => { finished: Promise<void> } })
      .startViewTransition(() => {
        toggleDark();
      });

    transition.finished.finally(() => {
      document.documentElement.classList.remove('theme-transitioning');
    });
  } else {
    // Fallback: simple toggle (colors still cross-fade via CSS on html/body)
    toggleDark();
  }
}
</script>

<style scoped>
/* Icon spin-pop keyframe: rotates 360° and briefly scales up */
@keyframes icon-theme-spin {
  0%   { transform: rotate(0deg)   scale(1); }
  40%  { transform: rotate(200deg) scale(1.25); }
  70%  { transform: rotate(340deg) scale(0.85); }
  100% { transform: rotate(360deg) scale(1); }
}

.icon-theme-spin {
  animation: icon-theme-spin 350ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
</style>