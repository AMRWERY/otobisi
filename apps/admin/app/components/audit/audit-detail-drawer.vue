<template>
  <Teleport to="body">
    <div
      v-if="entry"
      class="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      @keydown.esc="emit('close')"
    >
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-xs"
        @click="emit('close')"
      />

      <div class="fixed inset-y-0 end-0 flex max-w-full">
        <div
          class="w-screen max-w-md bg-surface-0 dark:bg-[#0E131F] border-s border-border shadow-2xl flex flex-col h-full"
        >
          <!-- Header -->
          <div
            class="px-6 py-5 border-b border-border/80 flex items-start justify-between gap-4 shrink-0 bg-surface-1/30 dark:bg-surface-2/10"
          >
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-base font-bold text-text-primary">
                  {{ entry.action }}
                </h2>
                <audit-severity-pill :severity="entry.severity" />
              </div>
              <p class="text-xs font-mono text-text-muted mt-0.5">
                {{ entry.id }} • {{ auditTime(entry.at) }} UTC
              </p>
            </div>
            <VButton
              variant="ghost"
              size="xs"
              rounded="lg"
              icon="ph:x-bold"
              aria-label="Close"
              @click="emit('close')"
            />
          </div>

          <div class="flex-1 overflow-y-auto px-6 py-5 space-y-5 custom-scrollbar">
            <p class="text-sm text-text-secondary leading-relaxed">
              {{ entry.detail }}
            </p>

            <dl
              class="rounded-xl border border-border/80 divide-y divide-border/50 text-xs"
            >
              <div
                v-for="row in facts"
                :key="row.label"
                class="flex items-center justify-between gap-4 px-3.5 py-2.5"
              >
                <dt class="font-mono uppercase tracking-wider text-[10px] text-text-muted">
                  {{ row.label }}
                </dt>
                <dd class="font-semibold text-text-primary text-end break-all">
                  {{ row.value }}
                </dd>
              </div>
            </dl>

            <!-- Before / after -->
            <section v-if="entry.changes.length" class="space-y-2">
              <h3 class="font-mono uppercase tracking-wider text-[10px] text-text-muted">
                Changes
              </h3>
              <div
                v-for="change in entry.changes"
                :key="change.field"
                class="rounded-xl border border-border/80 overflow-hidden"
              >
                <div
                  class="px-3.5 py-1.5 bg-surface-1/60 dark:bg-surface-2/10 text-[11px] font-semibold text-text-secondary"
                >
                  {{ change.field }}
                </div>
                <div class="grid grid-cols-2 divide-x divide-border/50 rtl:divide-x-reverse font-mono text-xs">
                  <div class="px-3.5 py-2.5 bg-rose-50/60 dark:bg-rose-500/5 text-rose-700 dark:text-rose-300">
                    <span class="block text-[9px] uppercase text-text-muted mb-0.5">From</span>
                    {{ change.from }}
                  </div>
                  <div class="px-3.5 py-2.5 bg-emerald-50/60 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-300">
                    <span class="block text-[9px] uppercase text-text-muted mb-0.5">To</span>
                    {{ change.to }}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { AuditEntry } from "~/types/audit";

const props = defineProps<{
  entry: AuditEntry | null;
}>();

const emit = defineEmits<{ (e: "close"): void }>();

const facts = computed(() => {
  const e = props.entry;
  if (!e) return [];
  return [
    { label: "Actor", value: `${e.actor} (${e.actorRole})` },
    { label: "Category", value: AUDIT_CATEGORIES[e.category].label },
    { label: "Target", value: e.target },
    { label: "Result", value: e.result === "success" ? "Success" : "Failed" },
    { label: "IP address", value: e.ip },
    { label: "Device", value: e.device },
  ];
});

// Escape should close even if focus is on the page behind
function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && props.entry) emit("close");
}
onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>
