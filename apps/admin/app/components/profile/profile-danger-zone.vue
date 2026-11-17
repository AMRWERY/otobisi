<template>
  <section
    class="border border-rose-300/70 dark:border-rose-500/30 bg-rose-50/40 dark:bg-rose-500/5 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4 flex-wrap"
  >
    <div class="flex items-start gap-3">
      <div
        class="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 flex items-center justify-center shrink-0"
      >
        <Icon name="ph:warning-octagon-bold" class="w-4 h-4" />
      </div>
      <div>
        <h3 class="text-sm font-bold text-text-primary">Sign out everywhere</h3>
        <p class="text-[11px] text-text-muted max-w-md">
          Ends every other session on phones and computers. You stay signed in
          here. Use it if you lost a device or suspect someone else has access.
        </p>
      </div>
    </div>

    <VButton
      variant="danger"
      size="sm"
      rounded="xl"
      icon="ph:sign-out-bold"
      icon-class="rtl:-scale-x-100"
      @click="emit('sign-out-everywhere')"
    >
      Sign Out Other Sessions
    </VButton>
  </section>
</template>

<script lang="ts" setup>
const emit = defineEmits<{ (e: "sign-out-everywhere"): void }>();
</script>
