<template>
  <div class="min-h-screen bg-surface-0 text-text-primary">
    <header class="flex items-center justify-between border-b border-border px-6 py-4">
      <span class="font-bold">Otobisi Admin</span>
      <div class="flex items-center gap-2">
        <VToggleLocale />
        <VToggleTheme />
      </div>
    </header>
    <main class="p-6">
      <slot />
    </main>
  </div>
</template>
