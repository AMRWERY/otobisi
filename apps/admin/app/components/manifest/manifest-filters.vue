<template>
  <div
    class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3"
  >
    <VTabs v-model="status" :tabs="tabs" />

    <VInput
      ref="searchInputRef"
      v-model="search"
      size="sm"
      rounded="xl"
      icon="ph:magnifying-glass-bold"
      placeholder="Search passenger, PNR, phone or seat..."
      wrapper-class="w-full lg:w-96"
      box-class="bg-surface-0 dark:bg-[#111927] border-border/80"
    >
      <template #trailing>
        <kbd
          class="px-1.5 py-0.5 text-[10px] font-mono text-text-muted bg-surface-1 dark:bg-surface-2 rounded border border-border/60"
        >
          /
        </kbd>
      </template>
    </VInput>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  counts: { all: number; pending: number; boarded: number; "no-show": number };
}>();

const search = defineModel<string>("search", { required: true });
const status = defineModel<string>("status", { required: true });

const tabs = computed(() => [
  { key: ALL_MANIFEST, label: `All ${props.counts.all}` },
  { key: "pending", label: `Pending ${props.counts.pending}` },
  { key: "boarded", label: `Boarded ${props.counts.boarded}` },
  { key: "no-show", label: `No-show ${props.counts["no-show"]}` },
]);

// "/" focuses the search box, like the other list pages
const searchInputRef = ref<{ focus: () => void } | null>(null);

function onKeydown(e: KeyboardEvent) {
  const tag = document.activeElement?.tagName;
  if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
    e.preventDefault();
    searchInputRef.value?.focus();
  }
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>
