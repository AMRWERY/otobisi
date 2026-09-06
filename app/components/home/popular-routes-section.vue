<template>
  <div>
    <section id="routes">
      <div class="flex items-end justify-between mb-4">
        <div>
          <span
            class="text-[11px] font-bold tracking-wider text-amber-600 uppercase"
            >Egyptian Express Corridors</span
          >
          <h2 class="text-xl sm:text-2xl font-bold text-text-primary">
            Popular routes today
          </h2>
        </div>
        <nuxt-link-locale
          to="#"
          class="text-xs font-semibold text-amber-600 hover:underline flex items-center gap-1"
        >
          <span>View all 120+ active routes</span>
          <icon name="ph:arrow-right-bold" class="w-3 h-3" />
        </nuxt-link-locale>
      </div>

      <!-- 6 Route Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <div
          v-for="route in popularRoutes"
          :key="route.id"
          class="bg-surface-1 border border-border rounded-xl p-3.5 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div class="flex items-start justify-between">
            <div>
              <div
                class="flex items-center gap-1.5 font-bold text-sm text-amber-600 group-hover:text-[#A1331B] transition-colors"
              >
                <span>{{ route.from }}</span>
                <icon
                  name="ph:arrow-right-bold"
                  class="w-3 h-3 text-text-muted group-hover:translate-x-0.5 transition-transform"
                />
                <span>{{ route.to }}</span>
              </div>
              <div
                class="flex items-center gap-1.5 text-[11px] text-text-secondary mt-1"
              >
                <icon name="ph:clock" class="w-3 h-3" />
                <span>{{ route.duration }}</span>
                <span>•</span>
                <span>{{ route.trips }}</span>
              </div>
            </div>
            <div class="text-end">
              <span class="text-[10px] text-text-muted block font-medium"
                >From</span
              >
              <span class="text-base font-extrabold text-amber-700">{{
                route.price
              }}</span>
              <span class="text-[10px] font-bold text-text-secondary ms-0.5"
                >EGP</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
interface PopularRoute {
  id: number;
  from: string;
  to: string;
  duration: string;
  trips: string;
  price: number;
}

const popularRoutes = ref<PopularRoute[]>([
  {
    id: 1,
    from: "Cairo",
    to: "Alexandria",
    duration: "2h 45m",
    trips: "48 daily trips",
    price: 110,
  },
  {
    id: 2,
    from: "Cairo",
    to: "Hurghada",
    duration: "5h 30m",
    trips: "24 daily trips",
    price: 280,
  },
  {
    id: 3,
    from: "Cairo",
    to: "Sharm El Sheikh",
    duration: "6h 00m",
    trips: "18 daily trips",
    price: 310,
  },
  {
    id: 4,
    from: "Alexandria",
    to: "Dahab",
    duration: "8h 15m",
    trips: "8 daily trips",
    price: 420,
  },
  {
    id: 5,
    from: "Cairo",
    to: "Luxor",
    duration: "9h 00m",
    trips: "14 daily trips",
    price: 350,
  },
  {
    id: 6,
    from: "Cairo",
    to: "Marsa Matrouh",
    duration: "4h 30m",
    trips: "16 daily trips",
    price: 220,
  },
]);
</script>