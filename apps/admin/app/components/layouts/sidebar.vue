<template>
  <aside
    class="flex flex-col shrink-0 bg-white dark:bg-[#0B0F17] border-e border-slate-200 dark:border-[#1E293B] h-screen z-50"
    :class="[
      // Desktop: sticky sidebar, 240px expanded / 68px collapsed
      'lg:sticky lg:top-0 lg:transition-[width] lg:duration-300',
      isCollapsed ? 'lg:w-[68px]' : 'lg:w-60',
      // Mobile: fixed sliding drawer, always full width
      'fixed top-0 inset-y-0 w-72',
      'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
      // Off-screen transforms are scoped to < lg. `rtl:` has higher specificity
      // than `lg:translate-x-0`, so in Arabic it would hide the desktop sidebar.
      isMobileOpen
        ? 'translate-x-0'
        : 'max-lg:-translate-x-full max-lg:rtl:translate-x-full',
    ]"
  >
    <!-- ─── Brand header ─── -->
    <div
      class="h-16 shrink-0 px-3 flex items-center border-b border-slate-200 dark:border-[#1E293B]"
      :class="compact ? 'justify-center' : 'justify-between'"
    >
      <!-- Collapsed: the logo tile expands the sidebar -->
      <button
        v-if="compact"
        type="button"
        :class="logoTileClass"
        title="Expand sidebar"
        aria-label="Expand sidebar"
        @click="toggleCollapse"
      >
        <Icon name="ph:arrows-left-right-bold" class="w-4 h-4" />
      </button>

      <template v-else>
        <div class="flex items-center gap-2.5 min-w-0">
          <div :class="logoTileClass">
            <Icon name="ph:arrows-left-right-bold" class="w-4 h-4" />
          </div>
          <div class="leading-tight min-w-0">
            <div class="flex items-center gap-1.5">
              <span
                class="font-extrabold text-sm text-slate-900 dark:text-slate-100 truncate"
              >
                NileBus
              </span>
              <span
                class="text-[9px] font-mono font-bold px-1 rounded bg-teal-600/10 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300"
              >
                OPS
              </span>
            </div>
            <div
              class="font-mono text-[10px] text-slate-400 dark:text-slate-500 truncate"
            >
              Almaza Hub #402
            </div>
          </div>
        </div>

        <!-- Mobile: close drawer -->
        <button
          type="button"
          class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
          title="Close sidebar"
          @click="closeMobile"
        >
          <Icon name="ph:x-bold" class="w-4 h-4" />
        </button>

        <!-- Desktop: collapse -->
        <button
          type="button"
          class="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
          title="Collapse sidebar"
          aria-label="Collapse sidebar"
          @click="toggleCollapse"
        >
          <Icon name="ph:caret-double-left" class="w-4 h-4 rtl:rotate-180" />
        </button>
      </template>
    </div>

    <!-- ─── Navigation ─── -->
    <nav
      class="flex-1 min-h-0 overflow-y-auto custom-scrollbar py-3 space-y-4"
      :class="compact ? 'px-3' : 'px-2.5'"
      @scroll.passive="tip = null"
    >
      <div
        v-for="(group, index) in navGroups"
        :key="group.title"
        class="space-y-0.5"
      >
        <div
          v-if="!compact"
          class="px-3 pb-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500"
        >
          {{ group.title }}
        </div>
        <div
          v-else-if="index > 0"
          class="mx-2 mb-2 border-t border-slate-200 dark:border-[#1E293B]"
        />

        <nuxt-link-locale
          v-for="item in group.items"
          :key="item.label"
          :to="item.to"
          :aria-label="compact ? item.label : undefined"
          :aria-current="isItemActive(item.to) ? 'page' : undefined"
          :class="[
            'group relative flex items-center rounded-lg border-s-[3px] text-xs transition-colors duration-150 ease-in-out cursor-pointer',
            compact ? 'justify-center h-10' : 'gap-3 px-3 py-2',
            isItemActive(item.to)
              ? 'border-teal-600 dark:border-teal-500 bg-teal-600/[0.08] dark:bg-teal-500/10 text-teal-800 dark:text-teal-300 font-semibold'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40',
          ]"
          @click="closeMobile"
          @mouseenter="showTip($event, item)"
          @focus="showTip($event, item)"
          @mouseleave="tip = null"
          @blur="tip = null"
        >
          <Icon
            :name="item.icon"
            :class="[
              'w-4 h-4 shrink-0 transition-colors duration-150',
              isItemActive(item.to)
                ? 'text-teal-600 dark:text-teal-300'
                : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300',
            ]"
          />
          <template v-if="!compact">
            <span class="truncate flex-1">{{ item.label }}</span>
            <span
              v-if="item.badge"
              :class="[
                'text-[10px] px-1.5 rounded font-mono',
                isItemActive(item.to)
                  ? 'bg-teal-100 text-teal-800 dark:bg-teal-500/20 dark:text-teal-300 font-semibold'
                  : 'text-slate-400 dark:text-slate-500',
              ]"
            >
              {{ item.badge }}
            </span>
          </template>
        </nuxt-link-locale>
      </div>
    </nav>

    <!-- ─── Pinned profile ─── -->
    <div
      class="shrink-0 border-t border-slate-200 dark:border-[#1E293B] p-3"
      :class="
        compact
          ? 'flex flex-col items-center gap-2'
          : 'flex items-center gap-2.5'
      "
    >
      <div class="relative">
        <div
          class="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-600 to-accent-400 text-white flex items-center justify-center font-bold text-xs shadow-xs"
        >
          AM
        </div>
        <span
          class="absolute bottom-0 end-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-0 dark:ring-[#0E131F]"
        />
      </div>

      <div v-if="!compact" class="min-w-0 flex-1 leading-tight">
        <div class="hidden sm:flex flex-col leading-tight">
          <span class="text-xs font-bold text-text-primary">Amr Mohamed</span>
          <span class="text-[10px] text-text-muted font-medium"
            >Fleet Ops Lead</span
          >
        </div>
      </div>
    </div>
  </aside>

  <!-- Collapsed-mode tooltip: fixed beside the 68px rail (72px from the edge), above everything -->
  <Teleport to="body">
    <div
      v-if="tip && compact"
      role="tooltip"
      class="fixed start-[72px] z-[60] -translate-y-1/2 pointer-events-none flex items-center gap-2 px-2.5 py-1.5 rounded-md shadow-lg bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold border border-slate-700 whitespace-nowrap"
      :style="{ top: `${tip.top}px` }"
    >
      {{ tip.label }}
      <span
        v-if="tip.badge"
        class="text-[10px] font-mono px-1.5 rounded bg-teal-500/25 text-teal-200"
      >
        {{ tip.badge }}
      </span>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
interface NavItem {
  label: string;
  icon: string;
  to: string;
  badge?: string;
}

const route = useRoute();
const localePath = useLocalePath();
const toast = useToast();
const { isMobileOpen, isCollapsed, closeMobile, toggleCollapse } =
  useAdminSidebar();

// Icon-only rail (desktop). The mobile drawer is always full width.
const compact = computed(() => isCollapsed.value && !isMobileOpen.value);

const logoTileClass =
  "w-8 h-8 shrink-0 rounded-lg flex items-center justify-center bg-teal-600/10 dark:bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-300 cursor-pointer";

const isItemActive = (to: string) => {
  const target = localePath(to);
  if (to === "/") {
    return (
      route.path === target ||
      route.path === "/" ||
      route.path === "/ar" ||
      route.path === "/en"
    );
  }
  return route.path.startsWith(target);
};

// ── Collapsed-mode tooltip ──────────────────────────────
const tip = ref<{ label: string; badge?: string; top: number } | null>(null);

function showTip(event: Event, item: NavItem) {
  if (!compact.value) return;
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  tip.value = {
    label: item.label,
    badge: item.badge,
    top: rect.top + rect.height / 2,
  };
}

// Expanding or opening the drawer makes the tooltip meaningless
watch(compact, () => (tip.value = null));

// Badges are placeholders until live counts exist
const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "CORE OPERATIONS",
    items: [
      { label: "Dashboard", icon: "ph:squares-four-bold", to: "/" },
      {
        label: "Trips & Schedules",
        icon: "ph:calendar-blank-bold",
        to: "/trips-schedules",
        badge: "42",
      },
      {
        label: "Live Dispatch Map",
        icon: "ph:map-trifold-bold",
        to: "/dispatch",
      },
      {
        label: "Bookings & Tickets",
        icon: "ph:ticket-bold",
        to: "/bookings",
        badge: "1.4k",
      },
    ],
  },
  {
    title: "COMMERCIAL & FLEET",
    items: [
      { label: "Dynamic Pricing", icon: "ph:trend-up-bold", to: "/pricing" },
      {
        label: "Passenger Manifest",
        icon: "ph:users-three-bold",
        to: "/manifest",
      },
      { label: "Fleet & Vehicles", icon: "ph:bus-bold", to: "/fleet" },
      {
        label: "Bus Seat Map Configuration",
        icon: "ph:armchair-bold",
        to: "/seat-maps",
      },
    ],
  },
  {
    title: "ANALYTICS & SETTLEMENT",
    items: [
      {
        label: "Revenue & Occupancy",
        icon: "ph:chart-bar-bold",
        to: "/revenue",
      },
      {
        label: "Reports & Analytics",
        icon: "ph:chart-line-up-bold",
        to: "/reports",
      },
      {
        label: "Settlements (Fawry/Meeza)",
        icon: "ph:credit-card-bold",
        to: "/settlements",
      },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "Operator Settings", icon: "ph:gear-bold", to: "/settings" },
      { label: "Team & Roles", icon: "ph:users-three-bold", to: "/team" },
      {
        label: "Audit Logs",
        icon: "ph:clipboard-text-bold",
        to: "/audit-logs",
      },
    ],
  },
];
</script>