<template>
  <svg
    :viewBox="`0 0 ${WIDTH} ${HEIGHT}`"
    class="w-full overflow-visible text-teal-600 dark:text-teal-400"
    preserveAspectRatio="none"
    fill="none"
    dir="ltr"
    role="img"
    :aria-label="ariaLabel"
    :style="{ height: `${height}px` }"
  >
    <defs>
      <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="currentColor" stop-opacity="0.22" />
        <stop offset="100%" stop-color="currentColor" stop-opacity="0" />
      </linearGradient>
    </defs>

    <template v-if="points.length > 1">
      <path
        :d="`${line} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`"
        :fill="`url(#${gradientId})`"
      />
      <path
        :d="line"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      />
    </template>
  </svg>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    values: number[];
    /** Rendered height in px */
    height?: number;
    ariaLabel?: string;
  }>(),
  { height: 56, ariaLabel: "Trend" },
);

const WIDTH = 400;
const HEIGHT = 100;
const PAD = 8;

const gradientId = `spark-${useId()}`;

const points = computed(() => {
  const v = props.values;
  if (v.length < 2) return [];
  const min = Math.min(...v);
  const range = Math.max(...v) - min || 1;
  return v.map((value, i) => ({
    x: (i / (v.length - 1)) * WIDTH,
    y: PAD + (1 - (value - min) / range) * (HEIGHT - PAD * 2),
  }));
});

// Catmull-Rom → cubic Bézier, so the line flows through every point without kinks
const line = computed(() => {
  const p = points.value;
  if (!p.length) return "";
  let d = `M ${p[0]!.x} ${p[0]!.y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i]!;
    const p1 = p[i]!;
    const p2 = p[i + 1]!;
    const p3 = p[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
  }
  return d;
});
</script>
