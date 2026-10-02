<template>
  <div class="space-y-4">
    <!-- ─── Editor Toolbar ─── -->
    <div
      class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs"
    >
      <!-- Left: Grid Dimensions & Order -->
      <div class="flex items-center gap-2 flex-wrap">
        <!-- Rows Stepper -->
        <div
          class="flex items-center gap-1.5 bg-surface-1 dark:bg-surface-2/40 px-2 py-1 rounded-xl border border-border/70 text-xs"
        >
          <span class="text-[10px] font-bold uppercase text-text-muted"
            >ROWS:</span
          >
          <button
            type="button"
            class="w-5 h-5 rounded-md flex items-center justify-center hover:bg-surface-2 text-text-primary disabled:opacity-30 cursor-pointer font-bold"
            :disabled="rowsCount <= 4"
            @click="decrementRows"
          >
            -
          </button>
          <span class="font-mono font-black text-text-primary px-1">{{
            rowsCount
          }}</span>
          <button
            type="button"
            class="w-5 h-5 rounded-md flex items-center justify-center hover:bg-surface-2 text-text-primary disabled:opacity-30 cursor-pointer font-bold"
            :disabled="rowsCount >= 18"
            @click="incrementRows"
          >
            +
          </button>
        </div>

        <!-- Cols Stepper -->
        <div
          class="flex items-center gap-1.5 bg-surface-1 dark:bg-surface-2/40 px-2 py-1 rounded-xl border border-border/70 text-xs"
        >
          <span class="text-[10px] font-bold uppercase text-text-muted"
            >COLS:</span
          >
          <button
            type="button"
            class="w-5 h-5 rounded-md flex items-center justify-center hover:bg-surface-2 text-text-primary disabled:opacity-30 cursor-pointer font-bold"
            :disabled="colsCount <= 3"
            @click="decrementCols"
          >
            -
          </button>
          <span class="font-mono font-black text-text-primary px-1">{{
            colsCount
          }}</span>
          <button
            type="button"
            class="w-5 h-5 rounded-md flex items-center justify-center hover:bg-surface-2 text-text-primary disabled:opacity-30 cursor-pointer font-bold"
            :disabled="colsCount >= 6"
            @click="incrementCols"
          >
            +
          </button>
        </div>

        <!-- Ordering dropdown -->
        <LazyVDropdownMenu :items="orderOptions" align="start">
          <template #trigger>
            <LazyVButton
              variant="surface"
              size="xs"
              rounded="xl"
              icon-right="ph:caret-down-bold"
            >
              ORDER: {{ selectedOrder }}
            </LazyVButton>
          </template>
        </LazyVDropdownMenu>

        <!-- Utility Buttons -->
        <div class="flex items-center gap-1 border-s border-border/60 ps-2">
          <LazyVButton
            variant="ghost"
            size="xs"
            rounded="lg"
            icon="ph:hash-bold"
            @click="autoNumberSeats"
          >
            Auto-Number
          </LazyVButton>

          <LazyVButton
            variant="ghost"
            size="xs"
            rounded="lg"
            icon="ph:arrows-left-right-bold"
            @click="mirrorLayout"
          >
            Mirror
          </LazyVButton>

          <LazyVButton
            variant="ghost"
            size="xs"
            rounded="lg"
            icon="ph:arrow-counter-clockwise-bold"
            @click="resetLayout"
          >
            Reset
          </LazyVButton>
        </div>
      </div>

      <!-- Right: Active Tool Palettes -->
      <div class="flex items-center gap-2 flex-wrap">
        <span
          class="text-[10px] font-bold uppercase text-text-muted tracking-wider"
        >
          ACTIVE TOOL:
        </span>

        <div
          class="flex items-center gap-1 bg-surface-1 dark:bg-surface-2/40 p-0.5 rounded-xl border border-border/70"
        >
          <button
            v-for="tool in tools"
            :key="tool.id"
            type="button"
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
            :class="[
              activeTool === tool.id
                ? 'bg-[#0F5A47] text-white shadow-xs'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-2/50',
            ]"
            @click="activeTool = tool.id"
          >
            <Icon :name="tool.icon" class="w-3.5 h-3.5" />
            <span>{{ tool.label }}</span>
          </button>
        </div>

        <span class="text-[11px] text-text-muted hidden xl:inline-block">
          👆 Click cell to stamp
        </span>
      </div>
    </div>

    <!-- ─── Coach Blueprint Canvas ─── -->
    <div
      class="bg-surface-0 dark:bg-[#111927] border-2 border-border/80 rounded-3xl p-6 shadow-sm relative overflow-hidden"
    >
      <!-- Coach Exterior Frame Container -->
      <div
        class="max-w-xl mx-auto border-2 border-border rounded-[36px] bg-surface-1/30 dark:bg-[#0E1420] p-4 sm:p-6 shadow-inner relative"
      >
        <!-- Front Windshield Arch -->
        <div class="w-24 h-1.5 rounded-full bg-border mx-auto mb-4" />

        <!-- ─── Front Cabin & Direction Section ─── -->
        <div
          class="grid grid-cols-3 items-center gap-2 pb-4 mb-4 border-b border-border/70"
        >
          <!-- Driver Cabin -->
          <div
            class="flex items-center gap-2 p-2 rounded-xl bg-surface-1 dark:bg-surface-2/40 border border-border/70"
          >
            <div
              class="w-7 h-7 rounded-lg bg-surface-2 dark:bg-surface-3 flex items-center justify-center text-text-primary"
            >
              <Icon name="ph:steering-wheel-bold" class="w-4 h-4" />
            </div>
            <div class="leading-tight min-w-0">
              <div
                class="text-[10px] font-black uppercase text-text-primary truncate"
              >
                Driver Cabin
              </div>
              <div class="text-[9px] text-text-muted truncate">
                Master Control Console
              </div>
            </div>
          </div>

          <!-- Direction of Travel Arrow -->
          <div class="flex flex-col items-center justify-center text-center">
            <span
              class="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-1"
            >
              <Icon
                name="ph:caret-up-bold"
                class="w-3 h-3 text-emerald-600 animate-bounce"
              />
              FRONT WINDSHIELD
            </span>
            <span class="text-[9px] text-text-muted font-mono tracking-wider">
              • DIRECTION OF TRAVEL
            </span>
          </div>

          <!-- Primary Door Exit -->
          <div class="flex items-center justify-end">
            <div
              class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-400"
            >
              <div class="text-end leading-tight">
                <div class="text-[10px] font-black uppercase">DOOR 01</div>
                <div class="text-[9px]">Primary Boarding</div>
              </div>
              <Icon
                name="ph:door-bold"
                class="w-4 h-4 text-amber-600 dark:text-amber-400"
              />
            </div>
          </div>
        </div>

        <!-- Guide / Crew Sub-Row -->
        <div
          class="flex items-center justify-between text-xs pb-3 mb-3 border-b border-dashed border-border/60 px-2"
        >
          <div
            class="flex items-center gap-1.5 text-text-secondary font-semibold text-[11px]"
          >
            <Icon name="ph:armchair-duotone" class="w-4 h-4 text-teal-600" />
            <span>Guide Seat (Crew #1)</span>
          </div>
          <span class="text-[10px] text-text-muted font-medium">
            Main Cabin Sound System & Mic
          </span>
        </div>

        <!-- ─── Seat Grid Columns Header ─── -->
        <div
          class="grid grid-cols-5 text-center text-[10px] font-black uppercase text-text-muted tracking-wider pb-2 px-1"
        >
          <span>ROW</span>
          <span>COL A</span>
          <span>COL B</span>
          <span class="flex items-center justify-center gap-0.5">
            AISLE <Icon name="ph:arrow-up" class="w-2.5 h-2.5" />
          </span>
          <span>COL C (VIP)</span>
        </div>

        <!-- ─── Interactive Seat Rows ─── -->
        <div class="space-y-2">
          <div
            v-for="(row, rIndex) in gridRows"
            :key="rIndex"
            class="grid grid-cols-5 items-center gap-2"
          >
            <!-- Row Label -->
            <div
              class="text-center font-mono text-[11px] font-bold text-text-muted"
            >
              R{{ String(rIndex + 1).padStart(2, "0") }}
            </div>

            <!-- Seat Col A -->
            <div
              class="h-11 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none group"
              :class="cellClass(row[0])"
              @click="stampCell(rIndex, 0)"
            >
              <div class="flex items-center gap-1">
                <span class="font-mono text-xs font-black">{{
                  row[0].label
                }}</span>
                <span
                  v-if="row[0].type !== 'empty'"
                  class="w-1 h-1 rounded-full bg-current opacity-70"
                />
              </div>
              <span
                class="text-[9px] uppercase font-bold tracking-tight opacity-80"
                >{{ row[0].sub }}</span
              >
            </div>

            <!-- Seat Col B -->
            <div
              class="h-11 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none group"
              :class="cellClass(row[1])"
              @click="stampCell(rIndex, 1)"
            >
              <div class="flex items-center gap-1">
                <span class="font-mono text-xs font-black">{{
                  row[1].label
                }}</span>
                <span
                  v-if="row[1].type !== 'empty'"
                  class="w-1 h-1 rounded-full bg-current opacity-70"
                />
              </div>
              <span
                class="text-[9px] uppercase font-bold tracking-tight opacity-80"
                >{{ row[1].sub }}</span
              >
            </div>

            <!-- Central Aisle Indicator -->
            <div
              class="h-11 flex items-center justify-center cursor-pointer hover:bg-surface-2/40 rounded-lg text-text-muted/60 transition-colors"
              title="Aisle Corridor"
              @click="stampCell(rIndex, 2)"
            >
              <span
                v-if="row[2].type === 'aisle'"
                class="text-text-muted/40 font-mono text-xs"
                >↑</span
              >
              <div
                v-else
                :class="cellClass(row[2])"
                class="w-full h-full rounded-xl flex items-center justify-center"
              >
                <span class="text-[9px] font-bold">{{ row[2].label }}</span>
              </div>
            </div>

            <!-- Seat Col C (VIP / Lavatory on last row) -->
            <div
              v-if="row[3].type === 'wc'"
              class="h-11 rounded-xl border flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-150 select-none bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300"
              @click="stampCell(rIndex, 3)"
            >
              <Icon name="ph:toilet-bold" class="w-4 h-4 shrink-0" />
              <div class="leading-tight text-start">
                <div class="text-[9px] font-black uppercase">WC LAVATORY</div>
                <div class="text-[8px] opacity-75">Chemical Unit</div>
              </div>
            </div>
            <div
              v-else
              class="h-11 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none group"
              :class="cellClass(row[3])"
              @click="stampCell(rIndex, 3)"
            >
              <div class="flex items-center gap-1">
                <span class="font-mono text-xs font-black">{{
                  row[3].label
                }}</span>
                <span
                  v-if="row[3].type !== 'empty'"
                  class="w-1 h-1 rounded-full bg-current opacity-70"
                />
              </div>
              <span
                class="text-[9px] uppercase font-bold tracking-tight opacity-80"
                >{{ row[3].sub }}</span
              >
            </div>
          </div>
        </div>

        <!-- ─── Rear Cabin & Engine Section ─── -->
        <div
          class="mt-6 pt-4 border-t border-border/70 flex items-center justify-between text-xs"
        >
          <div
            class="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-[11px]"
          >
            <Icon name="ph:warning-circle-bold" class="w-3.5 h-3.5" />
            <span>Emergency Rear Hatch</span>
          </div>

          <div class="w-20 h-1.5 rounded-full bg-border" />

          <div
            class="text-[10px] font-black uppercase tracking-wider text-text-muted font-mono"
          >
            REAR AXLE / ENGINE BAY
          </div>
        </div>
      </div>

      <!-- ─── Legend Bar Below Blueprint ─── -->
      <div
        class="flex items-center justify-center gap-4 text-xs font-medium text-text-secondary pt-5 flex-wrap"
      >
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-md bg-[#0F5A47]" />
          <span>VIP Seat ({{ countByType("vip") }})</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-md bg-[#096652]" />
          <span>Single VIP ({{ countByType("single-vip") }})</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span
            class="w-3 h-3 rounded-md bg-indigo-100 dark:bg-indigo-950 border border-indigo-400"
          />
          <span>Accessible ({{ countByType("accessible") }})</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span
            class="w-3 h-3 rounded-md bg-purple-200 dark:bg-purple-900 border border-purple-400"
          />
          <span>Restroom ({{ countByType("wc") }})</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-md bg-amber-400" />
          <span>Doors (2)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "@otobisi/ui/types/shared/VDropdownMenu";
import type { SeatCell } from "~/types/seat-maps";

const rowsCount = ref(11);
const colsCount = ref(4);

const selectedOrder = ref("LTR: Front to Back (Standard)");
const orderOptions: DropdownItem[] = [
  {
    type: "button",
    label: "LTR: Front to Back (Standard)",
    onClick: () => {
      selectedOrder.value = "LTR: Front to Back (Standard)";
      autoNumberSeats();
    },
  },
  {
    type: "button",
    label: "RTL: Front to Back",
    onClick: () => {
      selectedOrder.value = "RTL: Front to Back";
      autoNumberSeats();
    },
  },
  {
    type: "button",
    label: "Back to Front",
    onClick: () => {
      selectedOrder.value = "Back to Front";
      autoNumberSeats();
    },
  },
];

const activeTool = ref<
  "vip" | "single-vip" | "accessible" | "aisle" | "crew" | "wc" | "door"
>("vip");
const tools = [
  { id: "vip", label: "VIP Seat", icon: "ph:armchair-bold" },
  { id: "aisle", label: "Aisle Corridor", icon: "ph:arrows-down-up-bold" },
  { id: "crew", label: "Guide / Crew", icon: "ph:user-bold" },
  { id: "wc", label: "Restroom (WC)", icon: "ph:toilet-bold" },
  { id: "door", label: "Door Exit", icon: "ph:door-bold" },
] as const;

// Initial Grid Data Generation
const generateInitialGrid = (): SeatCell[][] => {
  const result: SeatCell[][] = [];
  for (let r = 1; r <= 11; r++) {
    const rPad = String(r).padStart(2, "0");
    if (r === 3) {
      // Accessible row
      result.push([
        { type: "accessible", label: `${rPad}A`, sub: "♿ Accessible" },
        { type: "accessible", label: `${rPad}B`, sub: "♿ Accessible" },
        { type: "aisle", label: "", sub: "" },
        { type: "single-vip", label: `${rPad}C`, sub: "Single VIP" },
      ]);
    } else if (r === 11) {
      // Last row with Lavatory in col C
      result.push([
        { type: "vip", label: `${rPad}A`, sub: "VIP" },
        { type: "vip", label: `${rPad}B`, sub: "VIP" },
        { type: "aisle", label: "", sub: "" },
        { type: "wc", label: "WC", sub: "Lavatory" },
      ]);
    } else {
      result.push([
        { type: "vip", label: `${rPad}A`, sub: "VIP" },
        { type: "vip", label: `${rPad}B`, sub: "VIP" },
        { type: "aisle", label: "", sub: "" },
        { type: "single-vip", label: `${rPad}C`, sub: "Single VIP" },
      ]);
    }
  }
  return result;
};

const gridRows = ref<SeatCell[][]>(generateInitialGrid());

const cellClass = (cell: SeatCell) => {
  switch (cell.type) {
    case "vip":
      return "bg-[#0F5A47] hover:bg-[#0c4939] text-white border-[#0A3D30] shadow-xs";
    case "single-vip":
      return "bg-[#0F5A47] hover:bg-[#0c4939] text-white border-[#0A3D30] shadow-xs";
    case "accessible":
      return "bg-indigo-100 dark:bg-indigo-950/60 hover:bg-indigo-200 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800";
    case "crew":
      return "bg-teal-100 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 border-teal-300";
    case "wc":
      return "bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border-purple-300";
    case "door":
      return "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-amber-300";
    default:
      return "bg-surface-1 dark:bg-surface-2/40 text-text-muted border-border/70 border-dashed";
  }
};

const stampCell = (rIndex: number, cIndex: number) => {
  const rPad = String(rIndex + 1).padStart(2, "0");
  const colLetters = ["A", "B", "Aisle", "C"];
  const colLetter = colLetters[cIndex] || "X";

  if (activeTool.value === "vip") {
    gridRows.value[rIndex][cIndex] = {
      type: cIndex === 3 ? "single-vip" : "vip",
      label: `${rPad}${colLetter}`,
      sub: cIndex === 3 ? "Single VIP" : "VIP",
    };
  } else if (activeTool.value === "accessible") {
    gridRows.value[rIndex][cIndex] = {
      type: "accessible",
      label: `${rPad}${colLetter}`,
      sub: "♿ Accessible",
    };
  } else if (activeTool.value === "wc") {
    gridRows.value[rIndex][cIndex] = {
      type: "wc",
      label: "WC",
      sub: "Lavatory",
    };
  } else if (activeTool.value === "aisle") {
    gridRows.value[rIndex][cIndex] = {
      type: "aisle",
      label: "",
      sub: "",
    };
  } else if (activeTool.value === "crew") {
    gridRows.value[rIndex][cIndex] = {
      type: "crew",
      label: `${rPad}${colLetter}`,
      sub: "Crew",
    };
  } else if (activeTool.value === "door") {
    gridRows.value[rIndex][cIndex] = {
      type: "door",
      label: "EXIT",
      sub: "Door",
    };
  }
};

const autoNumberSeats = () => {
  gridRows.value.forEach((row, r) => {
    const rPad = String(r + 1).padStart(2, "0");
    if (row[0].type !== "aisle" && row[0].type !== "wc")
      row[0].label = `${rPad}A`;
    if (row[1].type !== "aisle" && row[1].type !== "wc")
      row[1].label = `${rPad}B`;
    if (row[3].type !== "aisle" && row[3].type !== "wc")
      row[3].label = `${rPad}C`;
  });
};

const mirrorLayout = () => {
  gridRows.value.forEach((row) => {
    const temp = { ...row[0] };
    row[0] = { ...row[3] };
    row[3] = temp;
  });
  autoNumberSeats();
};

const resetLayout = () => {
  gridRows.value = generateInitialGrid();
  rowsCount.value = 11;
  colsCount.value = 4;
};

const incrementRows = () => {
  rowsCount.value++;
  const rPad = String(rowsCount.value).padStart(2, "0");
  gridRows.value.push([
    { type: "vip", label: `${rPad}A`, sub: "VIP" },
    { type: "vip", label: `${rPad}B`, sub: "VIP" },
    { type: "aisle", label: "", sub: "" },
    { type: "single-vip", label: `${rPad}C`, sub: "Single VIP" },
  ]);
};

const decrementRows = () => {
  if (rowsCount.value > 4) {
    rowsCount.value--;
    gridRows.value.pop();
  }
};

const incrementCols = () => {
  if (colsCount.value < 6) colsCount.value++;
};

const decrementCols = () => {
  if (colsCount.value > 3) colsCount.value--;
};

const countByType = (type: string) => {
  let count = 0;
  gridRows.value.forEach((row) => {
    row.forEach((cell) => {
      if (cell.type === type) count++;
    });
  });
  return count;
};
</script>