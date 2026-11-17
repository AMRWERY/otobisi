<template>
  <div
    class="min-h-screen bg-surface-0 dark:bg-[#0B1018] text-text-primary grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
  >
    <!-- Brand panel: desktop only -->
    <auth-brand-panel class="hidden lg:flex" />

    <div class="flex flex-col min-h-screen">
      <!-- Top bar: compact brand on mobile, theme + language everywhere -->
      <div class="flex items-center justify-between gap-3 px-5 sm:px-8 py-4">
        <div class="lg:hidden flex items-center gap-2.5">
          <div
            class="w-8 h-8 rounded-lg bg-teal-600/10 dark:bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-300 flex items-center justify-center"
          >
            <Icon name="ph:arrows-left-right-bold" class="w-4 h-4" />
          </div>
          <span class="font-extrabold text-sm">NileBus</span>
          <span
            class="text-[9px] font-mono font-bold px-1 rounded bg-teal-600/10 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300"
          >
            OPS
          </span>
        </div>

        <div class="flex items-center gap-2 ms-auto">
          <VToggleTheme />
          <VToggleLocale />
        </div>
      </div>

      <main class="flex-1 flex items-center justify-center px-5 sm:px-8 py-8">
        <div class="w-full max-w-md">
          <slot />
        </div>
      </main>

      <footer
        class="px-5 sm:px-8 py-4 text-center font-mono text-[11px] text-text-muted"
      >
        © {{ new Date().getFullYear() }} Otobisi • NileBus Operator Console
      </footer>
    </div>
  </div>
</template>
