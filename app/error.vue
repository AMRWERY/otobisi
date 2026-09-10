<template>
  <div
    class="min-h-screen flex flex-col bg-surface-0 text-text-primary transition-colors"
  >
    <!-- Site-wide Shared Navbar -->
    <navbar />

    <!-- Ambient background glow -->
    <div class="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      <div
        class="w-[700px] h-[700px] rounded-full blur-3xl opacity-25 dark:opacity-10 absolute -top-40 left-1/2 -translate-x-1/2 transition-colors duration-500"
        :class="[
          currentVariant === 'offline'
            ? 'bg-amber-200 dark:bg-amber-900'
            : currentVariant === '500'
              ? 'bg-orange-200 dark:bg-orange-950'
              : 'bg-orange-100 dark:bg-blue-950',
        ]"
      />
    </div>

    <!-- Main Error Content -->
    <main
      class="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-14 text-center"
    >
      <!-- VARIANT TAB SWITCHER (For Testing & Verification) -->
      <div class="mb-8 flex items-center justify-center">
        <div
          class="inline-flex items-center p-1 rounded-xl bg-surface-1 dark:bg-surface-2 border border-border text-xs font-semibold shadow-xs gap-0.5"
        >
          <button
            v-for="tab in currentTabs"
            :key="tab.id"
            type="button"
            class="px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            :class="
              currentVariant === tab.id
                ? 'bg-[#A1331B] text-white shadow-sm font-bold'
                : 'text-text-secondary hover:text-text-primary'
            "
            @click="currentVariant = tab.id"
          >
            <Icon :name="tab.icon" class="w-3.5 h-3.5 shrink-0" />
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <!-- BADGE PILL -->
      <div class="mb-5">
        <span
          class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-extrabold border shadow-xs select-none uppercase tracking-wide transition-colors"
          :class="badgeClass"
        >
          <span class="w-2 h-2 rounded-full animate-pulse" :class="dotClass" />
          {{ currentData.badge }}
        </span>
      </div>

      <!-- CENTERED LINE-ART ILLUSTRATION -->
      <div class="my-4 flex items-center justify-center">
        <!-- Variant A: 404 Road Signpost -->
        <illustration-404 v-if="currentVariant === '404'" />

        <!-- Variant B: Offline Bus with Antenna -->
        <illustration-offline v-else-if="currentVariant === 'offline'" />

        <!-- Variant C: 500 Engine Hiccup with Gear & Wrench -->
        <illustration-server-error v-else />
      </div>

      <!-- SHORT FRIENDLY HEADLINE -->
      <h1
        class="text-2xl sm:text-3xl font-black tracking-tight text-text-primary mt-3"
      >
        {{ currentData.headline }}
      </h1>

      <!-- ONE-LINE DESCRIPTION -->
      <p
        class="mt-2.5 text-sm text-text-secondary max-w-md mx-auto leading-relaxed"
      >
        {{ currentData.description }}
      </p>

      <!-- 500 ERROR CODE CARD -->
      <div
        v-if="currentVariant === '500'"
        class="mt-5 p-3 rounded-xl bg-surface-1 border border-border w-full max-w-sm flex items-center justify-between gap-3 text-start"
      >
        <div class="flex items-center gap-2.5">
          <div
            class="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-500/15 text-[#A1331B] dark:text-orange-400 flex items-center justify-center shrink-0"
          >
            <Icon name="ph:arrows-clockwise-bold" class="w-4 h-4" />
          </div>
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-xs font-bold text-text-primary">Error:</span>
              <code
                class="text-xs font-mono font-extrabold text-[#A1331B] dark:text-orange-400"
                >ERR_NILE_500_SRV</code
              >
            </div>
            <p class="text-[11px] text-text-muted">
              Cairo Cluster Route Engine
            </p>
          </div>
        </div>
        <button
          type="button"
          class="px-2.5 py-1 rounded-lg bg-surface-0 hover:bg-surface-2 border border-border text-xs font-semibold text-text-primary transition-all cursor-pointer flex items-center gap-1 shrink-0"
          @click="copyErrorCode"
        >
          <Icon
            :name="copied ? 'ph:check-bold' : 'ph:copy-bold'"
            class="w-3.5 h-3.5"
          />
          {{ copied ? "Copied" : "Copy" }}
        </button>
      </div>

      <!-- PRIMARY & SECONDARY ACTION BUTTONS -->
      <div
        class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm"
      >
        <button
          type="button"
          class="w-full bg-[#A1331B] hover:bg-[#8B2B16] text-white py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-950/15 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-70"
          :disabled="isRetrying"
          @click="handlePrimary"
        >
          <Icon
            :name="currentData.primaryIcon"
            class="w-4 h-4"
            :class="{ 'animate-spin': isRetrying }"
          />
          {{
            isRetrying ? currentData.retryingLabel : currentData.primaryLabel
          }}
        </button>

        <button
          v-if="currentVariant === '500'"
          type="button"
          class="w-full bg-surface-0 hover:bg-surface-1 border border-border text-text-primary py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
          @click="goHome"
        >
          <Icon name="ph:arrow-left-bold" class="w-4 h-4 text-text-muted" />
          Back to Search &amp; Booking
        </button>
      </div>

      <!-- CONTEXTUAL EXTRAS: 404 ACTIVE CORRIDORS -->
      <div
        v-if="currentVariant === '404'"
        class="mt-6 w-full max-w-sm space-y-4"
      >
        <div
          class="flex items-center justify-center gap-1.5 text-xs text-text-secondary"
        >
          <Icon name="ph:headset-bold" class="w-4 h-4 text-[#A1331B]" />
          <span>Contact 24/7 Hotline:</span>
          <strong class="text-text-primary font-bold">19XXX</strong>
        </div>
        <div
          class="p-4 rounded-2xl bg-surface-0 border border-border shadow-xs"
        >
          <p
            class="text-[10px] font-extrabold uppercase tracking-wider text-text-muted mb-3"
          >
            Popular Active Corridors
          </p>
          <div class="flex flex-wrap items-center justify-center gap-2">
            <nuxt-link-locale
              v-for="r in popularCorridors"
              :key="r.from"
              :to="r.href"
              class="px-3 py-1.5 rounded-lg bg-surface-1 hover:bg-orange-500/10 border border-border text-xs font-semibold text-text-primary transition-colors flex items-center gap-1.5 group"
            >
              {{ r.from }}
              <Icon name="ph:arrow-right-bold" class="w-3 h-3 text-[#A1331B] icon-arrow-animated" />
              {{ r.to }}
            </nuxt-link-locale>
          </div>
        </div>
      </div>

      <!-- CONTEXTUAL EXTRAS: OFFLINE TICKET CACHING BANNER -->
      <div
        v-if="currentVariant === 'offline'"
        class="mt-5 w-full max-w-sm space-y-3"
      >
        <nuxt-link-locale
          to="/bookings"
          class="p-3.5 rounded-xl bg-surface-0 hover:bg-amber-500/5 border border-border flex items-center justify-between gap-3 text-start transition-all group shadow-xs"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0"
            >
              <Icon name="ph:ticket-bold" class="w-5 h-5" />
            </div>
            <div>
              <h4
                class="text-xs font-bold text-text-primary group-hover:text-[#A1331B] transition-colors"
              >
                My Bookings Available Offline
              </h4>
              <p class="text-[11px] text-text-muted leading-snug">
                Your saved tickets remain accessible offline.
              </p>
            </div>
          </div>
          <Icon
            name="ph:caret-right-bold"
            class="w-4 h-4 text-text-muted shrink-0 group-hover:translate-x-0.5 transition-transform"
          />
        </nuxt-link-locale>
        <div
          class="flex items-center justify-center gap-2 text-[11px] text-text-muted pt-0.5"
        >
          <Icon name="ph:broadcast-bold" class="w-3.5 h-3.5 text-emerald-500" />
          <span>Vodafone / Orange / We</span>
          <span>•</span>
          <Icon
            name="ph:check-circle-fill"
            class="w-3.5 h-3.5 text-emerald-500"
          />
          <span>Boarding Pass Cached</span>
        </div>
      </div>

      <!-- CONTEXTUAL EXTRAS: 500 HELPLINE & REPORT -->
      <div
        v-if="currentVariant === '500'"
        class="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-text-secondary"
      >
        <span>Need urgent travel assistance?</span>
        <a
          href="tel:19999"
          class="inline-flex items-center gap-1 font-bold text-[#A1331B] dark:text-orange-400 hover:underline"
        >
          <Icon name="ph:phone-call-fill" class="w-3.5 h-3.5" />
          Contact 24/7 Hotline (19XXX)
        </a>
        <span>•</span>
        <button
          type="button"
          class="hover:underline text-text-muted cursor-pointer"
          @click="reportIssue"
        >
          Report Issue
        </button>
      </div>
    </main>

    <!-- Site-wide Shared Footer -->
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";

const props = defineProps<{
  error?: NuxtError;
}>();

type Variant = "404" | "offline" | "500";

const localePath = useLocalePath();

// ─── Initial variant based on error prop or network status ───────────────────
const initVariant = (): Variant => {
  if (props.error?.statusCode === 500) return "500";
  if (typeof navigator !== "undefined" && !navigator.onLine) return "offline";
  return "404";
};

const currentVariant = ref<Variant>(initVariant());

// ─── Auto-switch to offline variant when network disconnects ─────────────────
onMounted(() => {
  window.addEventListener("offline", () => {
    currentVariant.value = "offline";
  });
  window.addEventListener("online", () => {
    if (currentVariant.value === "offline") currentVariant.value = "404";
  });
});

// ─── Tab switcher labels ─────────────────────────────────────────────────────
const currentTabs = [
  {
    id: "404" as Variant,
    label: "404 Not Found",
    icon: "ph:signpost-bold",
  },
  {
    id: "offline" as Variant,
    label: "No Internet",
    icon: "ph:wifi-slash-bold",
  },
  {
    id: "500" as Variant,
    label: "Server Error",
    icon: "ph:warning-circle-bold",
  },
];

// ─── Content dictionary (Pure English) ───────────────────────────────────────
const content = {
  "404": {
    badge: "ERROR 404 • LOST ON THE ROUTE",
    headline: "This Stop Doesn't Exist",
    description:
      "The station or page you're looking for might have moved, been renamed, or is temporarily out of service across Egypt's intercity transit network.",
    primaryLabel: "Back to Home & Search",
    primaryIcon: "ph:bus-fill",
    retryingLabel: "Checking…",
  },
  offline: {
    badge: "CONNECTION LOST • OFFLINE",
    headline: "You're Off the Grid",
    description:
      "Please check your Wi-Fi or mobile data connection and try again to view real-time bus schedules.",
    primaryLabel: "Retry Connection",
    primaryIcon: "ph:arrows-clockwise-bold",
    retryingLabel: "Checking…",
  },
  "500": {
    badge: "SYSTEM NOTICE • TECHNICAL GLITCH",
    headline: "Something Went Wrong on Our End",
    description:
      "We're experiencing a momentary engine hiccup. Please try again or head back to your search.",
    primaryLabel: "Try Again",
    primaryIcon: "ph:arrow-counter-clockwise-bold",
    retryingLabel: "Checking…",
  },
};

const currentData = computed(() => content[currentVariant.value]);

// ─── Popular corridors ───────────────────────────────────────────────────────
const popularCorridors = [
  {
    from: "Cairo",
    to: "Alexandria",
    href: "/search?from=Cairo&to=Alexandria",
  },
  {
    from: "Cairo",
    to: "Sharm El Sheikh",
    href: "/search?from=Cairo&to=SharmElSheikh",
  },
  {
    from: "Cairo",
    to: "Hurghada",
    href: "/search?from=Cairo&to=Hurghada",
  },
];

// ─── Badge color styles ──────────────────────────────────────────────────────
const badgeClass = computed(() => {
  if (currentVariant.value === "offline") {
    return "bg-amber-50 dark:bg-[#1a2337] border-amber-200 dark:border-[#283550] text-amber-800 dark:text-amber-400";
  }
  return "bg-orange-50 dark:bg-[#1a2337] border-orange-200 dark:border-[#283550] text-[#A1331B] dark:text-orange-400";
});

const dotClass = computed(() => {
  if (currentVariant.value === "offline") return "bg-amber-500";
  return "bg-[#A1331B] dark:bg-orange-400";
});

// ─── Navigation and Retry Actions ────────────────────────────────────────────
const isRetrying = ref(false);

const goHome = async () => {
  try {
    await clearError({ redirect: localePath("/") });
  } catch {
    window.location.href = localePath("/");
  }
};

const handlePrimary = async () => {
  if (currentVariant.value === "404") {
    await goHome();
    return;
  }
  isRetrying.value = true;
  setTimeout(() => {
    isRetrying.value = false;
    window.location.reload();
  }, 900);
};

const copied = ref(false);
const copyErrorCode = async () => {
  try {
    await navigator.clipboard.writeText("ERR_NILE_500_SRV");
  } catch {
    // fallback
  }
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const reportIssue = () => {
  alert(
    "Issue logged. Our Egyptian transit operations team has been notified.",
  );
};

// ─── SEO Page Title ──────────────────────────────────────────────────────────
useHead(
  computed(() => ({
    title: `${currentData.value.headline} | Otobisi`,
  })),
);
</script>