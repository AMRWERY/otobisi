<template>
  <div class="space-y-3">
    <!-- Header with Counter and Navigation Controls -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <h2 class="text-sm font-extrabold text-text-primary">
          Saved Layout Templates
        </h2>
        <span class="text-xs text-text-muted font-medium">
          ({{ templates.length }} Master Profiles Registered)
        </span>
      </div>

      <div class="flex items-center gap-1.5">
        <LazyVButton
          variant="outline"
          size="xs"
          rounded="lg"
          icon="ph:caret-left-bold"
          class="rtl:rotate-180"
          aria-label="Previous template"
          @click="scrollLeft"
        />
        
        <LazyVButton
          variant="outline"
          size="xs"
          rounded="lg"
          icon="ph:caret-right-bold"
          class="rtl:rotate-180"
          aria-label="Next template"
          @click="scrollRight"
        />
      </div>
    </div>

    <!-- Templates Grid / Carousel -->
    <div
      ref="carouselRef"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-1 custom-scrollbar"
    >
      <div
        v-for="tpl in templates"
        :key="tpl.id"
        class="rounded-2xl border p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 group relative"
        :class="[
          selectedId === tpl.id
            ? 'bg-surface-0 dark:bg-[#111927] border-emerald-600 dark:border-emerald-500 shadow-md shadow-emerald-950/10 ring-1 ring-emerald-500/30'
            : 'bg-surface-0 dark:bg-[#111927] border-border/80 hover:border-border hover:shadow-xs',
        ]"
        @click="emit('select', tpl)"
      >
        <!-- Top Tags Row -->
        <div class="flex items-center justify-between gap-2">
          <span
            v-if="selectedId === tpl.id"
            class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
          >
            <span
              class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
            />
            Active Editing
          </span>
          <span
            v-else
            class="px-2 py-0.5 rounded-full text-[10px] font-bold"
            :class="tpl.tagClass"
          >
            {{ tpl.tag }}
          </span>

          <span
            class="font-mono text-[10px] text-text-muted font-semibold tracking-wider"
          >
            {{ tpl.code }}
          </span>
        </div>

        <!-- Title & Specs -->
        <div>
          <h3
            class="text-sm font-extrabold text-text-primary tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors"
          >
            {{ tpl.name }}
          </h3>
          <p class="text-[11px] text-text-muted mt-0.5">
            {{ tpl.chassis }} • {{ tpl.gridSpec }}
          </p>
        </div>

        <!-- Mini Visual Diagram Preview -->
        <div
          class="h-10 w-full rounded-xl bg-surface-1 dark:bg-surface-2/30 flex items-center justify-center p-2 border border-border/40"
        >
          <div class="flex items-center gap-3">
            <!-- Left side seats -->
            <div class="flex gap-1">
              <div
                v-for="s in tpl.leftSeats"
                :key="s"
                class="w-2.5 h-4 rounded-xs"
                :class="
                  selectedId === tpl.id
                    ? 'bg-emerald-700 dark:bg-emerald-500'
                    : 'bg-text-muted/40'
                "
              />
            </div>
            <!-- Aisle -->
            <div class="w-2 border-b border-dashed border-text-muted/40" />
            <!-- Right side seats -->
            <div class="flex gap-1">
              <div
                v-for="s in tpl.rightSeats"
                :key="s"
                class="w-2.5 h-4 rounded-xs"
                :class="
                  selectedId === tpl.id
                    ? 'bg-emerald-700 dark:bg-emerald-500'
                    : 'bg-text-muted/40'
                "
              />
            </div>
          </div>
        </div>

        <!-- Bottom Stats & Amenities -->
        <div
          class="pt-2 border-t border-border/60 flex items-center justify-between text-xs"
        >
          <div>
            <span class="font-black text-text-primary text-xs font-mono">{{
              tpl.capacity
            }}</span>
            <span class="text-[10px] text-text-muted ms-1 font-medium"
              >Pax Capacity</span
            >
          </div>

          <div>
            <span
              class="font-bold text-emerald-700 dark:text-emerald-400 font-mono text-xs"
              >{{ tpl.busesAssigned }}</span
            >
            <span class="text-[10px] text-text-muted ms-1">Buses Assigned</span>
          </div>
        </div>

        <!-- Amenities Icons -->
        <div class="flex items-center gap-2 text-text-muted text-xs pt-0.5">
          <Icon
            v-for="icon in tpl.amenities"
            :key="icon"
            :name="icon"
            class="w-3.5 h-3.5 opacity-70"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LayoutTemplate } from "~/types/seat-maps/index";

const props = defineProps<{
  templates: LayoutTemplate[];
  selectedId: string;
}>();

const emit = defineEmits<{
  (e: "select", template: LayoutTemplate): void;
}>();

const carouselRef = ref<HTMLDivElement | null>(null);

const scrollLeft = () => {
  carouselRef.value?.scrollBy({ left: -260, behavior: "smooth" });
};

const scrollRight = () => {
  carouselRef.value?.scrollBy({ left: 260, behavior: "smooth" });
};
</script>