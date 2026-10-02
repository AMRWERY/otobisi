<template>
  <div class="px-6 py-6 space-y-6 max-w-[1600px] mx-auto">
    <!-- ─── Breadcrumb ─── -->
    <LazyVBreadcrumb
      :items="[
        { label: 'Fleet Management', to: '/fleet' },
        { label: 'Seat Layout & Configuration Architect' },
      ]"
    />

    <!-- ─── Page Title & Actions ─── -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3 flex-wrap">
        <h1 class="text-base font-extrabold text-text-primary tracking-tight">
          Seat Layout & Configuration Architect
        </h1>
        <span
          class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-1 dark:bg-surface-2 border border-border/80 text-text-secondary"
        >
          EGP Standard Hub
        </span>
        <span
          class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          CAD Auto-Sync Engine v3.1
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <LazyVButton
          variant="outline"
          size="sm"
          rounded="xl"
          icon="ph:file-arrow-up-bold"
          @click="handleImportCAD"
        >
          Import JSON / CAD
        </LazyVButton>

        <LazyVButton
          variant="primary"
          size="sm"
          rounded="xl"
          icon="ph:plus-bold"
          custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
          @click="handleNewLayout"
        >
          New Layout
        </LazyVButton>
      </div>
    </div>

    <!-- ─── Saved Layout Templates Carousel ─── -->
    <lazy-seat-template-cards
      :templates="templates"
      :selected-id="selectedTemplateId"
      @select="handleSelectTemplate"
    />

    <!-- ─── Main Editor Grid: Canvas (Left) + Configuration (Right) ─── -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      <!-- Blueprint Canvas & Tools (takes 7 cols on XL) -->
      <div class="xl:col-span-7">
        <lazy-seat-map-editor />
      </div>

      <!-- Sidebar Configuration (takes 5 cols on XL) -->
      <div class="xl:col-span-5">
        <lazy-seat-map-sidebar
          @save="handleSave"
          @preview="isPreviewOpen = true"
          @discard="handleDiscard"
        />
      </div>
    </div>

    <!-- ─── Client Preview Modal ─── -->
    <lazy-seat-preview-modal
      :is-open="isPreviewOpen"
      @close="isPreviewOpen = false"
    />
  </div>
</template>

<script lang="ts" setup>
import type { LayoutTemplate } from "~/components/seat-maps/seat-template-cards.vue";

const toast = useToast();

const selectedTemplateId = ref("tmp-1");
const isPreviewOpen = ref(false);

const templates = ref<LayoutTemplate[]>([
  {
    id: "tmp-1",
    name: "VIP 2+1 Executive Suite",
    code: "MCV-600-RF",
    tag: "Active Editing",
    tagClass:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
    chassis: "MCV 600 VIP Chassis",
    gridSpec: "11 x 4 Grid",
    capacity: 32,
    busesAssigned: 14,
    rows: 11,
    cols: 4,
    leftSeats: 2,
    rightSeats: 1,
    amenities: [
      "ph:wifi-high-bold",
      "ph:plug-charging-bold",
      "ph:television-simple-bold",
      "ph:armchair-bold",
    ],
  },
  {
    id: "tmp-2",
    name: "Standard Express 2+2",
    code: "MAN-LC-48",
    tag: "Standard",
    tagClass: "bg-surface-2 text-text-secondary",
    chassis: "MAN Lion's Coach",
    gridSpec: "12 x 5 Grid",
    capacity: 48,
    busesAssigned: 22,
    rows: 12,
    cols: 5,
    leftSeats: 2,
    rightSeats: 2,
    amenities: [
      "ph:wind-bold",
      "ph:plug-charging-bold",
      "ph:suitcase-simple-bold",
    ],
  },
  {
    id: "tmp-3",
    name: "Sleeper VIP Berth",
    code: "MB-TRAV-30",
    tag: "Overnight Sleeper",
    tagClass: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400",
    chassis: "Mercedes Travego",
    gridSpec: "10 x 4 Grid",
    capacity: 30,
    busesAssigned: 8,
    rows: 10,
    cols: 4,
    leftSeats: 1,
    rightSeats: 1,
    amenities: ["ph:bed-bold", "ph:toilet-bold", "ph:plug-charging-bold"],
  },
  {
    id: "tmp-4",
    name: "Intercity Shuttle 2+2",
    code: "DW-ROY-36",
    tag: "Intercity Direct",
    tagClass:
      "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400",
    chassis: "Daewoo Royal",
    gridSpec: "9 x 5 Grid",
    capacity: 36,
    busesAssigned: 4,
    rows: 9,
    cols: 5,
    leftSeats: 2,
    rightSeats: 2,
    amenities: ["ph:wind-bold", "ph:suitcase-simple-bold", "ph:trash-bold"],
  },
]);

const handleSelectTemplate = (template: LayoutTemplate) => {
  selectedTemplateId.value = template.id;
  toast.info(`Switched to ${template.name}`);
};

const handleImportCAD = () => {
  toast.info("Opening CAD/JSON import wizard...");
};

const handleNewLayout = () => {
  toast.success("Initialized new blank seat map layout canvas");
};

const handleDiscard = () => {
  toast.warning("Reverted all unsaved template modifications");
};

const handleSave = (formData: any) => {
  toast.success(
    `Template "${formData.name}" deployed to 14 active fleet vehicles`
  );
};

useSeoMeta({
  title: "Bus Seat Map Configuration",
  description:
    "Bus seat layout builder and configuration for fleet vehicles across NileBus networks.",
  private: false,
});
</script>