<template>
  <div
    class="bg-surface-1 dark:bg-[#111927] border border-border/70 rounded-xl p-5 flex flex-col gap-4"
  >
    <!-- Header -->
    <div class="flex items-start justify-between flex-wrap gap-3">
      <div>
        <h2 class="text-sm font-black text-text-primary tracking-tight">
          Recent Bookings & Ticket Transactions
        </h2>
        <p class="text-[11px] text-text-muted mt-0.5">
          Showing verified reservations across mobile apps, web portal, and
          station-ticket windows.
        </p>
      </div>

      <!-- Filters -->
      <div class="flex items-center gap-2 flex-wrap">
        <!-- Search -->
        <div class="relative">
          <Icon
            name="ph:magnifying-glass"
            class="absolute start-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none"
          />
          <input
            v-model="search"
            type="text"
            placeholder="Filter by passenger, PNR..."
            class="ps-8 pe-3 py-1.5 text-[11px] rounded-lg bg-surface-0 dark:bg-surface-2/40 border border-border/70 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all w-52"
          />
        </div>
        <!-- Status filter -->
        <div
          class="flex items-center gap-1 bg-surface-0 dark:bg-surface-2/50 rounded-lg px-2 py-1.5 border border-border/60 text-[11px] text-text-secondary cursor-pointer hover:border-accent-500 transition-colors select-none"
        >
          <span>Status: All</span>
          <Icon name="ph:caret-down-bold" class="w-3 h-3 text-text-muted" />
        </div>
        <!-- Payment filter -->
        <div
          class="flex items-center gap-1 bg-surface-0 dark:bg-surface-2/50 rounded-lg px-2 py-1.5 border border-border/60 text-[11px] text-text-secondary cursor-pointer hover:border-accent-500 transition-colors select-none"
        >
          <span>Payment: Fawry/Meeza</span>
          <Icon name="ph:x-bold" class="w-3 h-3 text-text-muted" />
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto -mx-1">
      <table class="w-full text-xs min-w-[640px]">
        <!-- Head -->
        <thead>
          <tr class="border-b border-border/70">
            <th
              v-for="col in columns"
              :key="col.key"
              class="py-2 px-3 text-start text-[10px] font-bold uppercase tracking-wider text-text-muted whitespace-nowrap"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="divide-y divide-border/40">
          <tr
            v-for="tx in filteredTransactions"
            :key="tx.pnr"
            class="hover:bg-surface-0 dark:hover:bg-surface-2/20 transition-colors group"
          >
            <!-- PNR & Passenger -->
            <td class="py-2.5 px-3">
              <span
                class="font-mono text-accent-700 dark:text-accent-400 font-bold text-[11px] hover:underline cursor-pointer"
              >
                #{{ tx.pnr }}
              </span>
              <div
                class="font-semibold text-text-primary truncate max-w-[110px]"
              >
                {{ tx.name }}
              </div>
            </td>

            <!-- Route & Carrier -->
            <td class="py-2.5 px-3">
              <div
                class="font-semibold text-text-primary truncate max-w-[160px]"
              >
                {{ tx.route }}
              </div>
              <div class="text-[11px] text-text-muted truncate max-w-[160px]">
                {{ tx.carrier }}
              </div>
            </td>

            <!-- Seats & Class -->
            <td
              class="py-2.5 px-3 text-text-secondary font-medium whitespace-nowrap"
            >
              <div>{{ tx.seats }}</div>
              <div class="text-[10px] text-text-muted font-mono">
                {{ tx.seatNums }}
              </div>
            </td>

            <!-- Amount -->
            <td
              class="py-2.5 px-3 font-black text-text-primary tabular-nums whitespace-nowrap"
            >
              {{ tx.amount.toFixed(2) }}
            </td>

            <!-- Payment -->
            <td class="py-2.5 px-3">
              <div class="flex items-center gap-1.5">
                <Icon
                  :name="tx.paymentIcon"
                  class="w-3.5 h-3.5 text-text-muted"
                />
                <span class="text-[11px] text-text-secondary font-medium">{{
                  tx.payment
                }}</span>
              </div>
            </td>

            <!-- Status -->
            <td class="py-2.5 px-3">
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap"
                :class="statusClass(tx.status)"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="dotClass(tx.status)"
                />
                {{ tx.status }}
              </span>
            </td>

            <!-- Booking time -->
            <td
              class="py-2.5 px-3 text-[11px] text-text-muted whitespace-nowrap"
            >
              {{ tx.time }}
            </td>

            <!-- Action -->
            <td class="py-2.5 px-3">
              <button
                type="button"
                class="p-1.5 rounded-lg hover:bg-surface-0 dark:hover:bg-surface-2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                <Icon name="ph:dots-three-bold" class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-text-muted flex-wrap gap-2"
    >
      <span>Showing 1–8 of 1,428 bookings</span>
      <div class="flex items-center gap-1">
        <button
          type="button"
          class="px-2.5 py-1 rounded-lg border border-border/70 text-text-muted hover:text-text-primary hover:border-accent-500 transition-colors cursor-pointer disabled:opacity-40"
          disabled
        >
          ← Previous
        </button>
        <button
          v-for="p in [1, 2, 3, '...', 179]"
          :key="p"
          type="button"
          class="px-2.5 py-1 rounded-lg border transition-colors cursor-pointer text-[11px] font-semibold"
          :class="
            p === 1
              ? 'bg-accent-600 border-accent-600 text-white'
              : 'border-border/70 text-text-muted hover:text-text-primary hover:border-accent-500'
          "
        >
          {{ p }}
        </button>
        <button
          type="button"
          class="px-2.5 py-1 rounded-lg border border-border/70 text-text-muted hover:text-text-primary hover:border-accent-500 transition-colors cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const search = ref("");

const columns = [
  { key: "pnr", label: "PNR & Passenger" },
  { key: "route", label: "Route & Carrier" },
  { key: "seats", label: "Seats & Class" },
  { key: "amount", label: "Amount (EGP)" },
  { key: "payment", label: "Payment Method" },
  { key: "status", label: "Status" },
  { key: "time", label: "Booking Time" },
  { key: "action", label: "Action" },
];

const transactions = [
  {
    pnr: "OT-98421",
    name: "Ahmed Mansour",
    route: "Cairo Almaza → Alex Sidi Gaber",
    carrier: "Gobus VIP Express",
    seats: "2 Seats",
    seatNums: "(12A, 12B)",
    amount: 350,
    payment: "Fawry Pay",
    paymentIcon: "ph:money-wavy-bold",
    status: "Confirmed",
    time: "2 mins ago",
  },
  {
    pnr: "OT-98428",
    name: "Nour El-Din Mahmoud",
    route: "Cairo Tahrir → Hurghada",
    carrier: "MAN Lion's Luxury",
    seats: "1 Seat",
    seatNums: "(06A)",
    amount: 260,
    payment: "Visa/MC",
    paymentIcon: "ph:credit-card-bold",
    status: "Confirmed",
    time: "9 mins ago",
  },
  {
    pnr: "OT-98429",
    name: "Mariam Youssef",
    route: "Cairo Almaza → Sharm El Sheikh",
    carrier: "Mercedes Travego VIP",
    seats: "3 Seats",
    seatNums: "(15A, 15B, 15C)",
    amount: 780,
    payment: "Meeza Card",
    paymentIcon: "ph:bank-bold",
    status: "Confirmed",
    time: "11 mins ago",
  },
  {
    pnr: "OT-98418",
    name: "Tarek Zaki",
    route: "Alexandria → Cairo Almaza",
    carrier: "MCV 400 Eco",
    seats: "1 Seat",
    seatNums: "(08C)",
    amount: 175,
    payment: "Vodafone Cash",
    paymentIcon: "ph:device-mobile-bold",
    status: "Confirmed",
    time: "14 mins ago",
  },
  {
    pnr: "OT-98417",
    name: "Salma Abdel-Rahman",
    route: "Cairo → Dahab Express",
    carrier: "Super Jet Business",
    seats: "2 Seats",
    seatNums: "(02A, 02B)",
    amount: 640,
    payment: "Station Cash POS",
    paymentIcon: "ph:storefront-bold",
    status: "Confirmed",
    time: "19 mins ago",
  },
  {
    pnr: "OT-98416",
    name: "Omar El-Ghadban",
    route: "Cairo → Alex",
    carrier: "Gobus VIP Express",
    seats: "1 Seat",
    seatNums: "(199)",
    amount: 175,
    payment: "Fawry Pay",
    paymentIcon: "ph:money-wavy-bold",
    status: "Pending Payment",
    time: "22 mins ago",
  },
  {
    pnr: "OT-98415",
    name: "Khaled Badr",
    route: "Cairo → Hurghada VIP",
    carrier: "MAN Lion's Luxury",
    seats: "4 Seats",
    seatNums: "(Family Booth)",
    amount: 1040,
    payment: "Mastercard",
    paymentIcon: "ph:credit-card-bold",
    status: "Confirmed",
    time: "28 mins ago",
  },
  {
    pnr: "OT-98414",
    name: "Hany Mostafa",
    route: "Cairo Almaza → Alex",
    carrier: "MCV 400 Eco",
    seats: "1 Seat",
    seatNums: "(07K)",
    amount: 175,
    payment: "Vodafone Cash",
    paymentIcon: "ph:device-mobile-bold",
    status: "Refunded",
    time: "34 mins ago",
  },
];

const filteredTransactions = computed(() => {
  if (!search.value.trim()) return transactions;
  const q = search.value.toLowerCase();
  return transactions.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.pnr.toLowerCase().includes(q) ||
      t.route.toLowerCase().includes(q)
  );
});

function statusClass(status: string) {
  const map: Record<string, string> = {
    Confirmed:
      "bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400",
    "Pending Payment":
      "bg-amber-100/70 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400",
    Refunded:
      "bg-rose-100/70 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400",
  };
  return map[status] ?? "bg-surface-0 text-text-muted";
}

function dotClass(status: string) {
  const map: Record<string, string> = {
    Confirmed: "bg-emerald-500",
    "Pending Payment": "bg-amber-500",
    Refunded: "bg-rose-500",
  };
  return map[status] ?? "bg-text-muted";
}
</script>