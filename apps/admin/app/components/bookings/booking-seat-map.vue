<template>
  <div>
    <div class="flex items-center justify-between gap-3 mb-2">
      <h3
        class="text-[10px] font-bold uppercase tracking-wider text-text-muted font-mono"
      >
        Coach seat layout ({{ vehicleClass }})
      </h3>
      <div class="flex items-center gap-3 text-[10px] text-text-muted">
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-sm bg-accent-600" /> This Pax
        </span>
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-sm bg-border-strong" /> Taken
        </span>
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-sm border border-border-strong" /> Free
        </span>
      </div>
    </div>

    <div
      class="rounded-lg border border-border/80 bg-surface-1/60 dark:bg-surface-2/10 p-3 space-y-1.5"
    >
      <div
        class="flex items-center justify-center gap-1.5 pb-1.5 mb-1 border-b border-dashed border-border text-[10px] font-mono uppercase tracking-wider text-text-muted"
      >
        <Icon name="ph:steering-wheel-bold" class="w-3 h-3" />
        Front · Windshield & Driver Cab
      </div>

      <template v-for="item in visibleRows" :key="item.key">
        <div
          v-if="item.type === 'gap'"
          class="py-1 text-center text-[10px] font-mono text-text-muted"
        >
          ··· rows {{ item.from }} to {{ item.to }} occupied / available ···
        </div>

        <div v-else class="flex items-center gap-2">
          <span class="w-6 shrink-0 font-mono text-[10px] text-text-muted">
            R{{ item.row }}
          </span>
          <div class="flex-1 flex items-center justify-between gap-1">
            <template v-for="(group, gi) in groups" :key="gi">
              <div class="flex items-center gap-1">
                <span
                  v-for="col in group"
                  :key="col"
                  :class="seatClass(item.row, col)"
                  :title="seatTitle(item.row, col)"
                >
                  {{ seatCode(item.row, col) }}
                </span>
              </div>
              <span
                v-if="gi < groups.length - 1"
                class="text-[9px] font-mono uppercase tracking-widest text-text-muted/70"
              >
                aisle
              </span>
            </template>
          </div>
        </div>
      </template>

      <div
        class="pt-1.5 mt-1 border-t border-dashed border-border text-center text-[10px] font-mono uppercase tracking-wider text-text-muted"
      >
        Rear · Emergency exit
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  /** Seats booked on this reservation, e.g. ["14A", "14B"] */
  seats: string[];
  vehicleClass: string;
}>();

const TOTAL_ROWS = 15;

/** Seat columns per row, grouped by the aisle; sleepers fall back to a berth list */
const groups = computed<string[][]>(() => {
  if (props.vehicleClass.includes("2+1")) return [["A", "B"], ["C"]];
  return [
    ["A", "B"],
    ["C", "D"],
  ];
});

const pad = (n: number) => String(n).padStart(2, "0");
const seatCode = (row: number, col: string) => `${pad(row)}${col}`;

const mine = computed(() => new Set(props.seats.map((s) => s.toUpperCase())));

/** Deterministic "taken" pattern — real occupancy will come from the trip API */
function isTaken(row: number, col: string) {
  const colIndex = col.charCodeAt(0) - 65;
  return (row * 7 + colIndex * 3) % 4 === 0;
}

function seatState(row: number, col: string) {
  if (mine.value.has(seatCode(row, col))) return "mine";
  return isTaken(row, col) ? "taken" : "free";
}

const seatTitle = (row: number, col: string) =>
  `${seatCode(row, col)} — ${{ mine: "This passenger", taken: "Taken", free: "Free" }[seatState(row, col)]}`;

const seatClass = (row: number, col: string) => [
  "w-7 h-6 inline-flex items-center justify-center rounded font-mono text-[10px] font-semibold",
  {
    mine: "bg-accent-600 text-white shadow-xs",
    taken: "bg-border-strong/50 text-text-muted",
    free: "border border-border-strong text-text-secondary",
  }[seatState(row, col)],
];

type RowItem =
  | { type: "row"; key: string; row: number }
  | { type: "gap"; key: string; from: number; to: number };

/** First two rows, plus each booked row and the one behind it; skipped stretches collapse into a divider */
const visibleRows = computed<RowItem[]>(() => {
  const rows = new Set<number>([1, 2]);
  for (const seat of props.seats) {
    const { row } = parseSeat(seat);
    if (row < 1 || row > TOTAL_ROWS) continue;
    rows.add(row);
    if (row < TOTAL_ROWS) rows.add(row + 1);
  }

  const sorted = [...rows].sort((a, b) => a - b);
  const items: RowItem[] = [];
  sorted.forEach((row, i) => {
    const prev = sorted[i - 1];
    if (prev !== undefined && row - prev > 1) {
      items.push({
        type: "gap",
        key: `gap-${prev}`,
        from: prev + 1,
        to: row - 1,
      });
    }
    items.push({ type: "row", key: `row-${row}`, row });
  });
  return items;
});
</script>
