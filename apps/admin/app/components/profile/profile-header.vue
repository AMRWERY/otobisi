<template>
  <div class="flex items-center justify-between flex-wrap gap-4">
    <div class="space-y-1.5">
      <div
        class="flex items-center gap-2 text-xs text-text-muted font-medium flex-wrap"
      >
        <span>Account</span>
        <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
        <h1 class="text-base font-extrabold text-text-primary tracking-tight">
          Operator Profile
        </h1>
      </div>
      <p class="text-xs text-text-muted">
        Your personal details, sign-in security and the alerts sent to you.
      </p>
    </div>

    <div class="flex items-center gap-3">
      <VButton
        variant="outline"
        size="sm"
        rounded="xl"
        icon="ph:arrow-counter-clockwise-bold"
        :disabled="!isDirty"
        custom-class="bg-surface-0 dark:bg-surface-1 shadow-xs border-border/80"
        @click="emit('discard')"
      >
        Discard Changes
      </VButton>
      <VButton
        variant="primary"
        size="sm"
        rounded="xl"
        icon="ph:floppy-disk-bold"
        :disabled="!isDirty"
        custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
        @click="emit('save')"
      >
        Save Profile
      </VButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  isDirty: boolean;
}>();

const emit = defineEmits<{
  (e: "discard"): void;
  (e: "save"): void;
}>();
</script>
