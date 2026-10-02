<template>
  <header
    class="h-16 px-6 bg-surface-0/95 dark:bg-[#0E131F]/95 backdrop-blur-md border-b border-border/80 flex items-center justify-between gap-4 sticky top-0 z-30 transition-colors"
  >
    <!-- ─── Left Section: Brand & Global Search ─── -->
    <div class="flex items-center gap-4 flex-1 max-w-2xl">
      <!-- Mobile hamburger (hidden on desktop) -->
      <button
        type="button"
        class="lg:hidden p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-1 dark:hover:bg-surface-2 transition-colors cursor-pointer shrink-0"
        title="Open Sidebar"
        @click="toggleMobile"
      >
        <Icon name="ph:list-bold" class="w-5 h-5" />
      </button>
    </div>

    <!-- ─── Right Section: Status, Notifications & User ─── -->
    <div class="flex items-center gap-3 shrink-0">
      <!-- EGP Payment Gateway Status -->
      <div
        class="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold"
      >
        <Icon
          name="ph:credit-card-bold"
          class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"
        />
        <span>EGP Gateway Active</span>
      </div>

      <!-- Notification Bell -->
      <div class="relative">
        <button
          type="button"
          class="relative p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-1 dark:hover:bg-surface-2 transition-colors cursor-pointer"
          title="Notifications"
          @click="showNotifications = !showNotifications"
        >
          <Icon name="ph:bell-bold" class="w-4 h-4" />
          <span
            class="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-surface-0 dark:ring-[#0E131F]"
          />
        </button>

        <!-- Dropdown Notifications Menu -->
        <div
          v-if="showNotifications"
          class="absolute end-0 mt-2 w-80 rounded-2xl bg-surface-0 dark:bg-[#131B2E] border border-border shadow-xl p-3 z-50 animate-fade-in"
        >
          <div
            class="flex items-center justify-between pb-2 border-b border-border/70"
          >
            <span class="text-xs font-bold text-text-primary"
              >Dispatch Alerts</span
            >
            <span
              class="text-[10px] text-accent-600 font-semibold cursor-pointer hover:underline"
              >Mark all read</span
            >
          </div>
          <div class="divide-y divide-border/40 py-1">
            <div class="py-2 text-xs">
              <p class="font-semibold text-text-primary">
                MCV 600 VIP Boarding (Cairo-Alex)
              </p>
              <p class="text-[11px] text-text-muted mt-0.5">
                Gate 4 opened • 46/48 seats checked in
              </p>
              <span class="text-[10px] text-text-muted">2 mins ago</span>
            </div>
            <div class="py-2 text-xs">
              <p class="font-semibold text-text-primary">
                Settlement Batch Generated
              </p>
              <p class="text-[11px] text-text-muted mt-0.5">
                Fawry / Meeza payout batch #482 reconciled
              </p>
              <span class="text-[10px] text-text-muted">18 mins ago</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Theme & Locale toggles from @otobisi/ui -->
      <div class="flex items-center gap-1">
        <LazyVToggleLocale />

        <LazyVToggleTheme />
      </div>

      <div class="h-6 w-px bg-border/80 mx-0.5" />

      <!-- User Profile Badge / Menu -->
      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-2.5 p-1 rounded-xl hover:bg-surface-1 dark:hover:bg-surface-2 transition-colors cursor-pointer text-start"
          @click="showUserMenu = !showUserMenu"
        >
          <div class="relative">
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-600 to-accent-400 text-white flex items-center justify-center font-bold text-xs shadow-xs"
            >
              KS
            </div>
            <span
              class="absolute bottom-0 end-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-0 dark:ring-[#0E131F]"
            />
          </div>
          <div class="hidden sm:flex flex-col leading-tight">
            <span class="text-xs font-bold text-text-primary"
              >Amr Mohamed</span
            >
            <span class="text-[10px] text-text-muted font-medium"
              >Fleet Ops Lead</span
            >
          </div>
          <Icon
            name="ph:caret-down-bold"
            class="w-3 h-3 text-text-muted hidden sm:block"
          />
        </button>

        <!-- User Dropdown Menu -->
        <div
          v-if="showUserMenu"
          class="absolute end-0 mt-2 w-52 rounded-2xl bg-surface-0 dark:bg-[#131B2E] border border-border shadow-xl p-2 z-50 animate-fade-in"
        >
          <div class="px-3 py-2 border-b border-border/70 mb-1">
            <p class="text-xs font-bold text-text-primary">Amr Mohamed</p>
            <p class="text-[11px] text-text-muted truncate">
              amr.mohamed@nilebus.eg
            </p>
          </div>
          <button
            type="button"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-1 dark:hover:bg-surface-2 transition-colors"
          >
            <Icon name="ph:user-circle-bold" class="w-4 h-4 text-text-muted" />
            Operator Profile
          </button>
          <button
            type="button"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-1 dark:hover:bg-surface-2 transition-colors"
          >
            <Icon name="ph:sliders-bold" class="w-4 h-4 text-text-muted" />
            Hub Preferences
          </button>
          <div class="my-1 border-t border-border/70" />
          <button
            type="button"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <Icon name="ph:sign-out-bold" class="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { toggleMobile } = useAdminSidebar();

const showNotifications = ref(false);
const showUserMenu = ref(false);

onMounted(() => {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".relative")) {
      showNotifications.value = false;
      showUserMenu.value = false;
    }
  };
  window.addEventListener("click", handleClickOutside);
  onUnmounted(() => {
    window.removeEventListener("click", handleClickOutside);
  });
});
</script>