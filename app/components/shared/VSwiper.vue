<template>
  <div class="relative w-full group/swiper">
    <!-- Header Controls Slot (Optional) -->
    <slot
      name="header"
      :prev="scrollToPrev"
      :next="scrollToNext"
      :can-prev="canScrollPrev"
      :can-next="canScrollNext"
    />

    <!-- Swiper Main Scroll Container -->
    <div
      ref="scrollContainer"
      @mousedown="onMouseDown"
      @mouseleave="onMouseLeave"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
      @scroll="onScroll"
      :class="[
        'flex overflow-x-auto select-none cursor-grab active:cursor-grabbing',
        '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
        snap ? 'snap-x snap-mandatory scroll-smooth' : '',
        gapClass,
      ]"
    >
      <!-- Mode 1: If items prop is provided -->
      <template v-if="items && items.length > 0">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="[
            'flex-none shrink-0 transition-transform',
            snap ? 'snap-start' : '',
            itemClass,
          ]"
        >
          <slot
            name="item"
            :item="item"
            :index="index"
            :is-dragging="isDragging"
          />
        </div>
      </template>

      <!-- Mode 2: If custom children are slotted directly -->
      <template v-else>
        <slot :is-dragging="isDragging" />
      </template>
    </div>

    <!-- Optional Navigation Arrows -->
    <template v-if="showControls">
      <button
        v-if="canScrollPrev"
        @click="scrollToPrev"
        type="button"
        aria-label="Previous slide"
        class="absolute start-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-surface-1/90 backdrop-blur-md border border-border shadow-md flex items-center justify-center text-text-primary hover:bg-surface-2 transition-all opacity-0 group-hover/swiper:opacity-100 focus:opacity-100 active:scale-95"
      >
        <icon name="ph:caret-left-bold" class="w-4 h-4 rtl:rotate-180" />
      </button>

      <button
        v-if="canScrollNext"
        @click="scrollToNext"
        type="button"
        aria-label="Next slide"
        class="absolute end-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-surface-1/90 backdrop-blur-md border border-border shadow-md flex items-center justify-center text-text-primary hover:bg-surface-2 transition-all opacity-0 group-hover/swiper:opacity-100 focus:opacity-100 active:scale-95"
      >
        <icon name="ph:caret-right-bold" class="w-4 h-4 rtl:rotate-180" />
      </button>
    </template>
  </div>
</template>

<script lang="ts" setup generic="T">
import type { SwiperProps } from "~/types/shared/VSwiper";

const props = withDefaults(defineProps<SwiperProps<T>>(), {
  items: () => [],
  itemClass: "w-[85%] sm:w-[60%] md:w-[48%] lg:w-[calc((100%-1.5rem)/2.15)]",
  gapClass: "gap-4 sm:gap-6",
  snap: false,
  showControls: false,
  speed: 1.5,
});

const emit = defineEmits<{
  (e: "scroll", scrollLeft: number): void;
  (e: "drag-start"): void;
  (e: "drag-end"): void;
}>();

const scrollContainer = ref<HTMLElement | null>(null);
const canScrollPrev = ref(false);
const canScrollNext = ref(false);
const isDragging = ref(false);

let isDown = false;
let startX = 0;
let scrollLeftVal = 0;

const updateScrollButtons = () => {
  if (!scrollContainer.value) return;
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
  canScrollPrev.value = Math.abs(scrollLeft) > 10;
  canScrollNext.value = Math.abs(scrollLeft) + clientWidth < scrollWidth - 10;
};

const onScroll = () => {
  if (!scrollContainer.value) return;
  emit("scroll", scrollContainer.value.scrollLeft);
  updateScrollButtons();
};

const onMouseDown = (e: MouseEvent) => {
  if (!scrollContainer.value) return;
  isDown = true;
  isDragging.value = false;
  startX = e.pageX - scrollContainer.value.offsetLeft;
  scrollLeftVal = scrollContainer.value.scrollLeft;
  emit("drag-start");
};

const onMouseLeave = () => {
  if (isDown) {
    isDown = false;
    emit("drag-end");
  }
};

const onMouseUp = () => {
  if (isDown) {
    isDown = false;
    setTimeout(() => {
      isDragging.value = false;
    }, 50);
    emit("drag-end");
  }
};

const onMouseMove = (e: MouseEvent) => {
  if (!isDown || !scrollContainer.value) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = (x - startX) * props.speed;
  if (Math.abs(x - startX) > 5) {
    isDragging.value = true;
  }
  scrollContainer.value.scrollLeft = scrollLeftVal - walk;
};

const scrollToPrev = () => {
  if (!scrollContainer.value) return;
  const offset = scrollContainer.value.clientWidth * 0.75;
  scrollContainer.value.scrollBy({ left: -offset, behavior: "smooth" });
};

const scrollToNext = () => {
  if (!scrollContainer.value) return;
  const offset = scrollContainer.value.clientWidth * 0.75;
  scrollContainer.value.scrollBy({ left: offset, behavior: "smooth" });
};

const scrollToIndex = (index: number) => {
  if (!scrollContainer.value) return;
  const children = scrollContainer.value.children;
  if (children[index]) {
    (children[index] as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }
};

onMounted(() => {
  nextTick(() => {
    updateScrollButtons();
  });
});

defineExpose({
  container: scrollContainer,
  scrollToPrev,
  scrollToNext,
  scrollToIndex,
  isDragging,
});
</script>