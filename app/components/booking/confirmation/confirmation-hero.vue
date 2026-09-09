<template>
  <div class="text-center max-w-3xl mx-auto mb-8">
    <!-- Success Badge Icon -->
    <div
      class="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/25 mx-auto mb-3 transition-transform hover:scale-105"
    >
      <Icon name="ph:check-bold" class="w-7 h-7" />
    </div>

    <!-- Official Badge -->
    <span
      class="text-[11px] font-extrabold tracking-wider text-[#A1331B] dark:text-orange-400 uppercase block mb-1.5"
    >
      Official E-Ticket Issuance
    </span>

    <!-- Headline -->
    <h1
      class="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-text-primary mb-3 leading-tight"
    >
      Payment Successful & Booking Confirmed!
    </h1>

    <!-- Description -->
    <p
      class="text-xs sm:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed mb-6"
    >
      Your travel reservation is confirmed by the
      <strong>Ministry of Transport clearance system</strong>. Boarding vouchers
      have been dispatched to <strong>ahmed.mostafa@example.eg</strong> and
      registered WhatsApp (<strong>+20 10 1234 5678</strong>).
    </p>

    <!-- Booking Reference (PNR) Card -->
    <div
      class="inline-flex flex-wrap items-center justify-between gap-4 bg-surface-1 border border-border p-3.5 sm:px-6 sm:py-3 rounded-2xl shadow-xs text-start"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-orange-500/10 text-[#A1331B] dark:text-orange-400 flex items-center justify-center shrink-0"
        >
          <Icon name="ph:ticket-bold" class="w-5 h-5" />
        </div>
        <div>
          <span
            class="text-[10px] font-bold text-text-muted uppercase tracking-wider block"
          >
            Booking Reference (PNR)
          </span>
          <span
            class="text-base sm:text-lg font-black font-mono text-[#A1331B] dark:text-orange-400 tracking-wide"
          >
            {{ pnrCode }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3 ms-auto sm:ms-0">
        <span class="text-xs text-text-muted hidden sm:inline">
          {{ formattedDate }} • 08:32 AM
        </span>

        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border text-xs font-bold text-text-primary transition-colors cursor-pointer shadow-2xs active:scale-95"
          @click="copyPnr"
        >
          <Icon
            :name="copied ? 'ph:check-bold' : 'ph:copy-bold'"
            class="w-3.5 h-3.5"
            :class="copied ? 'text-emerald-500' : 'text-text-muted'"
          />
          <span>{{ copied ? "Copied!" : "Copy Code" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    pnrCode?: string;
    formattedDate?: string;
  }>(),
  {
    pnrCode: "OTB-849204-EG",
    formattedDate: "24 Oct",
  },
);

const copied = ref(false);

const copyPnr = async () => {
  try {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(props.pnrCode);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    }
  } catch {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
};
</script>