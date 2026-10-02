<template>
  <aside
    class="flex flex-col justify-between shrink-0 bg-surface-0 dark:bg-[#0E131F] border-e border-border h-screen z-50"
    :class="[
      // Desktop: sticky sidebar, supports icon-only collapse
      'lg:sticky lg:top-0 lg:transition-[width] lg:duration-300',
      isCollapsed ? 'lg:w-20' : 'lg:w-64',
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
    <!-- ─── Top Brand Header ─── -->
    <div>
      <div
        class="h-16 px-4 flex items-center justify-between border-b border-border/70"
      >
        <div
          v-if="!isCollapsed"
          class="flex items-center gap-3 overflow-hidden"
        >
          <div
            class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#EA580C] to-[#C2410C] flex items-center justify-center text-white shadow-sm shadow-orange-950/20"
          >
            <Icon name="ph:bus-duotone" class="w-5 h-5 text-white" />
          </div>
          <div class="flex flex-col leading-tight min-w-0">
            <span class="font-extrabold text-sm text-text-primary truncate"
              >NileBus Fleet</span
            >
            <span
              class="font-mono text-[10px] tracking-wider text-text-muted uppercase"
              >OPERATOR HUB #402</span
            >
          </div>
        </div>

        <div v-else class="mx-auto">
          <div
            class="w-9 h-9 rounded-lg bg-accent-600 flex items-center justify-center text-white shadow-sm"
          >
            <Icon name="ph:bus-duotone" class="w-5 h-5 text-white" />
          </div>
        </div>

        <!-- Mobile: close drawer button -->
        <button
          type="button"
          class="lg:hidden p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-1 dark:hover:bg-surface-2 transition-colors cursor-pointer"
          title="Close Sidebar"
          @click="closeMobile"
        >
          <Icon name="ph:x-bold" class="w-4 h-4" />
        </button>

        <!-- Desktop: collapse toggle button -->
        <button
          type="button"
          class="hidden lg:flex p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-1 dark:hover:bg-surface-2 transition-colors cursor-pointer"
          :title="isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
          @click="toggleCollapse"
        >
          <Icon
            :name="
              isCollapsed ? 'ph:caret-double-right' : 'ph:caret-double-left'
            "
            class="w-4 h-4 rtl:rotate-180"
          />
        </button>
      </div>

      <!-- ─── Network Status ─── -->
      <div
        v-if="!isCollapsed"
        class="px-5 pt-3 pb-1 flex items-center justify-between"
      >
        <span
          class="text-[10px] font-bold tracking-widest text-text-muted uppercase"
          >NETWORK STATUS</span
        >
        <div class="flex items-center gap-1.5">
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            />
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
            />
          </span>
          <span
            class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400"
            >ONLINE (EGP)</span
          >
        </div>
      </div>

      <!-- ─── Nav Links by Group ─── -->
      <nav
        class="px-3 py-2 space-y-4 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar"
      >
        <div v-for="group in navGroups" :key="group.title" class="space-y-1">
          <div
            v-if="!isCollapsed || isMobileOpen"
            class="px-2 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-text-muted"
          >
            {{ group.title }}
          </div>

          <div class="space-y-0.5">
            <nuxt-link-locale
              v-for="item in group.items"
              :key="item.label"
              :to="item.to"
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 group cursor-pointer text-start"
              :class="[
                isItemActive(item.to)
                  ? 'bg-accent-700 text-white shadow-sm shadow-accent-950/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-1 dark:hover:bg-surface-2/60',
              ]"
              :title="isCollapsed && !isMobileOpen ? item.label : undefined"
              @click="closeMobile"
            >
              <Icon
                :name="item.icon"
                class="w-4 h-4 shrink-0 transition-transform group-hover:scale-110"
                :class="
                  isItemActive(item.to)
                    ? 'text-white'
                    : 'text-text-secondary group-hover:text-text-primary'
                "
              />
              <span
                v-if="!isCollapsed || isMobileOpen"
                class="truncate flex-1"
                >{{ item.label }}</span
              >
              <span
                v-if="(!isCollapsed || isMobileOpen) && item.badge"
                class="text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium"
                :class="item.badgeClass || 'bg-surface-2 text-text-muted'"
              >
                {{ item.badge }}
              </span>
            </nuxt-link-locale>
          </div>
        </div>
      </nav>
    </div>

    <!-- ─── Bottom Terminal Info ─── -->
    <div
      class="p-3 border-t border-border/70 bg-surface-1/40 dark:bg-surface-2/20"
    >
      <div
        v-if="!isCollapsed || isMobileOpen"
        class="flex items-center gap-2.5"
      >
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
        <div class="min-w-0 flex-1">
          <div class="text-xs font-bold text-text-primary truncate">
            Cairo Almaza Hub
          </div>
          <div class="text-[11px] text-text-muted truncate">
            Live Sync • 22ms latency
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex justify-center"
        title="Cairo Almaza Hub (Live Sync • 22ms latency)"
      >
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500" />
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const route = useRoute();
const localePath = useLocalePath();
const { isMobileOpen, isCollapsed, closeMobile, toggleCollapse } =
  useAdminSidebar();

const isItemActive = (to: string) => {
  const target = localePath(to);
  if (to === '/') {
    return route.path === target || route.path === '/' || route.path === '/ar' || route.path === '/en';
  }
  return route.path.startsWith(target);
};

const navGroups = [
  {
    title: "CORE OPERATIONS",
    items: [
      { label: "Dashboard", icon: "ph:squares-four-bold", to: "/" },
      {
        label: "Trips & Schedules",
        icon: "ph:calendar-blank-bold",
        to: "/trips-schedules",
      },
      {
        label: "Live Dispatch Map",
        icon: "ph:map-trifold-bold",
        to: "/dispatch",
      },
      { label: "Bookings & Tickets", icon: "ph:ticket-bold", to: "/bookings" },
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
      { label: "Audit Logs", icon: "ph:clipboard-text-bold", to: "/audit-logs" },
    ],
  },
];
</script>