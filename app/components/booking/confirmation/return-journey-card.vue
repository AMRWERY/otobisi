<template>
  <div
    class="max-w-4xl mx-auto mt-8 p-5 sm:p-7 rounded-2xl bg-surface-1 border border-border shadow-md text-start"
  >
    <!-- Header -->
    <div
      class="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-border mb-5"
    >
      <div>
        <div
          class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 mb-2"
        >
          <Icon
            name="ph:arrows-left-right-bold"
            class="w-3 h-3 text-orange-500"
          />
          <span>Round-Trip Special • Save 10% on Alexandria → Cairo</span>
        </div>

        <h3 class="text-base sm:text-lg font-extrabold text-text-primary">
          Plan Your Return: Alexandria → Cairo
        </h3>
        <p class="text-xs text-text-secondary mt-0.5">
          Recommended return buses matching your schedule for Sunday, 27 October
          2024.
        </p>
      </div>

      <button
        type="button"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border text-xs font-bold text-text-primary transition-colors cursor-pointer"
        @click="changeDate"
      >
        <Icon
          name="ph:calendar-blank-bold"
          class="w-3.5 h-3.5 text-orange-500"
        />
        <span>Change Date</span>
      </button>
    </div>

    <!-- Return Bus Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Return Option 1: Go Bus Elite Plus -->
      <div
        class="p-4 rounded-xl bg-surface-2 border border-border hover:border-orange-500/40 transition-all flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="font-bold text-xs text-text-primary">
              Go Bus Elite Plus
            </span>
            <span
              class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
            >
              -10% Applied
            </span>
          </div>

          <!-- Schedule Row -->
          <div class="flex items-center justify-between text-xs mb-2">
            <div>
              <span class="font-black text-sm text-text-primary block"
                >05:30 PM</span
              >
              <span class="text-[11px] text-text-secondary"
                >Sidi Gaber, Alexandria</span
              >
            </div>

            <Icon
              name="ph:arrow-right-bold"
              class="w-4 h-4 text-text-muted shrink-0 rtl:rotate-180"
            />

            <div class="text-end">
              <span class="font-black text-sm text-text-primary block"
                >08:15 PM</span
              >
              <span class="text-[11px] text-text-secondary">Almaza, Cairo</span>
            </div>
          </div>

          <div
            class="text-[10px] text-text-muted font-medium flex items-center gap-2 mb-4"
          >
            <span>Direct 2h 45m</span>
            <span>•</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-bold"
              >14 seats available</span
            >
          </div>
        </div>

        <!-- Price & CTA -->
        <div
          class="pt-3 border-t border-border flex items-center justify-between gap-2"
        >
          <div>
            <span class="text-[10px] text-text-muted line-through block"
              >145 EGP</span
            >
            <span
              class="text-base font-black text-[#A1331B] dark:text-orange-400"
              >130.50
              <span class="text-xs font-bold text-text-secondary"
                >EGP</span
              ></span
            >
          </div>

          <button
            type="button"
            class="px-4 py-2 rounded-xl bg-[#A1331B] hover:bg-[#8B2B16] text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            @click="selectReturnTrip('gb-return-01')"
          >
            Select Seat →
          </button>
        </div>
      </div>

      <!-- Return Option 2: Super Jet VIP Express -->
      <div
        class="p-4 rounded-xl bg-surface-2 border border-border hover:border-orange-500/40 transition-all flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="font-bold text-xs text-text-primary">
              Super Jet VIP Express
            </span>
            <span
              class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
            >
              -10% Applied
            </span>
          </div>

          <!-- Schedule Row -->
          <div class="flex items-center justify-between text-xs mb-2">
            <div>
              <span class="font-black text-sm text-text-primary block"
                >08:00 PM</span
              >
              <span class="text-[11px] text-text-secondary"
                >Sidi Gaber, Alexandria</span
              >
            </div>

            <Icon
              name="ph:arrow-right-bold"
              class="w-4 h-4 text-text-muted shrink-0 rtl:rotate-180"
            />

            <div class="text-end">
              <span class="font-black text-sm text-text-primary block"
                >10:45 PM</span
              >
              <span class="text-[11px] text-text-secondary"
                >Giza & Tahrir, Cairo</span
              >
            </div>
          </div>

          <div
            class="text-[10px] text-text-muted font-medium flex items-center gap-2 mb-4"
          >
            <span>Direct 2h 45m</span>
            <span>•</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-bold"
              >8 seats available</span
            >
          </div>
        </div>

        <!-- Price & CTA -->
        <div
          class="pt-3 border-t border-border flex items-center justify-between gap-2"
        >
          <div>
            <span class="text-[10px] text-text-muted line-through block"
              >140 EGP</span
            >
            <span
              class="text-base font-black text-[#A1331B] dark:text-orange-400"
              >126.00
              <span class="text-xs font-bold text-text-secondary"
                >EGP</span
              ></span
            >
          </div>

          <button
            type="button"
            class="px-4 py-2 rounded-xl bg-[#A1331B] hover:bg-[#8B2B16] text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            @click="selectReturnTrip('sj-return-01')"
          >
            Select Seat →
          </button>
        </div>
      </div>
    </div>

    <!-- Footer link -->
    <div class="mt-4 pt-3 border-t border-border text-center">
      <nuxt-link-locale
        to="/search"
        class="inline-flex items-center gap-1 text-xs font-bold text-[#A1331B] dark:text-orange-400 hover:underline"
      >
        <Icon name="ph:magnifying-glass-bold" class="w-3.5 h-3.5" />
        <span>Choose another date, station, or return time</span>
      </nuxt-link-locale>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const localePath = useLocalePath();

const changeDate = () => {
  router.push(localePath("/search"));
};

const selectReturnTrip = (tripId: string) => {
  router.push(
    localePath({
      path: `/trip/${tripId}`,
      query: {
        date: "2024-10-27",
      },
    }),
  );
};
</script>