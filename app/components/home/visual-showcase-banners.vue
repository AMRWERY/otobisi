<template>
  <div>
    <section class="relative">
      <LazyVSwiper
        :items="banners"
        item-class="w-[85%] sm:w-[60%] md:w-[48%] lg:w-[calc((100%-1.5rem)/2.15)]"
        gap-class="gap-4 sm:gap-6"
      >
        <template #item="{ item: banner }">
          <div
            class="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group h-64 sm:h-72 flex flex-col justify-end p-6 select-none shrink-0 transition-transform"
          >
            <!-- Background Image -->
            <img
              :src="banner.image"
              :alt="banner.title"
              draggable="false"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
            />

            <!-- Dark Gradient Overlay matching screenshot -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#0F1422] via-[#0F1422]/70 to-transparent pointer-events-none"
            ></div>

            <!-- Content -->
            <div class="relative z-10 pointer-events-none">
              <span
                :class="banner.badgeColor"
                class="inline-block text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md mb-2 shadow-xs"
              >
                {{ banner.badge }}
              </span>
              <h4
                class="text-lg sm:text-xl font-bold text-white mb-1.5 leading-snug"
              >
                {{ banner.title }}
              </h4>
              <p class="text-xs text-gray-300/90 line-clamp-2 leading-relaxed">
                {{ banner.description }}
              </p>
            </div>
          </div>
        </template>
      </LazyVSwiper>
    </section>
  </div>
</template>

<script lang="ts" setup>
const banners = [
  {
    badge: "Daily Red Sea Express",
    badgeColor: "bg-[#F26A36]",
    title: "Cairo to Hurghada & El Gouna Coastal Lines",
    description:
      "Scheduled VIP overnight and morning departures with reclining seats, USB charging, and direct hotel drop-offs.",
    image: "/img/img-01.jpg",
  },
  {
    badge: "Premium Comfort",
    badgeColor: "bg-[#007A55]",
    title: "MCV 600 Travego Class",
    description:
      "Experience spacious legroom and quiet cabins across Nile Valley routes.",
    image: "/img/img-02.jpg",
  },
  {
    badge: "Mediterranean Shuttle",
    badgeColor: "bg-blue-600",
    title: "Cairo to Alexandria & Sahel Express",
    description:
      "High-frequency daily express routes connecting Downtown Cairo to Sidi Gaber & Mediterranean beaches.",
    image: "/img/img-03.jpg",
  },
  {
    badge: "Nile Valley Sleeper",
    badgeColor: "bg-purple-700",
    title: "Luxor & Aswan Royal Sleeper",
    description:
      "Full flat-bed sleeper buses with personal entertainment screens and complimentary refreshments.",
    image: "/img/img-04.jpg",
  },
];
</script>
