<template>
  <div
    class="max-w-4xl mx-auto mt-5 flex flex-wrap items-center justify-center gap-3"
  >
    <!-- Download PDF -->
    <v-button
      variant="unstyled"
      class="flex-1 min-w-[200px] bg-[#A1331B] hover:bg-[#8B2B16] text-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-950/10 hover:shadow-lg transition-all active:scale-98 cursor-pointer"
      icon="ph:download-simple-bold"
      @click="downloadTicket"
    >
      <span>Download Ticket (PDF)</span>
    </v-button>

    <!-- Add to Calendar -->
    <v-button
      variant="unstyled"
      class="flex-1 min-w-[170px] bg-surface-1 border border-border hover:bg-surface-2 text-text-primary py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
      icon="ph:calendar-plus-bold"
      icon-class="text-orange-500"
      @click="addToCalendar"
    >
      <span>Add to Calendar</span>
    </v-button>

    <!-- Share Link -->
    <v-button
      variant="unstyled"
      class="flex-1 min-w-[170px] bg-surface-1 border border-border hover:bg-surface-2 text-text-primary py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
      icon="ph:share-network-bold"
      icon-class="text-emerald-500"
      @click="shareVoucher"
    >
      <span>Share Voucher Link</span>
    </v-button>

    <!-- View in My Bookings -->
    <nuxt-link-locale
      to="/bookings"
      class="flex-1 min-w-[170px] bg-surface-1 border border-border hover:bg-surface-2 text-text-primary py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
    >
      <Icon name="ph:ticket-bold" class="w-4 h-4 text-orange-500" />
      <span>My Bookings</span>
    </nuxt-link-locale>
  </div>
</template>

<script lang="ts" setup>
const toast = useToast();

const downloadTicket = () => {
  toast.info("Downloading E-Ticket", {
    description:
      "Your official Egyptian Ministry of Transport E-Ticket PDF is being prepared.",
  });
};

const addToCalendar = () => {
  toast.success("Added to calendar", {
    description: "08:30 AM Cairo to Alexandria trip was added to your calendar.",
  });
};

const copyVoucherLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied", {
      description: "Voucher link copied to clipboard.",
    });
  } catch {
    toast.error("Couldn't copy link", {
      description: "Please copy the page URL manually.",
    });
  }
};

const shareVoucher = async () => {
  if (!navigator?.share) return copyVoucherLink();
  try {
    await navigator.share({
      title: "Otobisi Bus E-Ticket",
      text: "Cairo to Alexandria Trip Voucher (PNR: OTB-849204-EG)",
      url: window.location.href,
    });
  } catch (err) {
    // User closed the share sheet — nothing to report
    if (err instanceof DOMException && err.name === "AbortError") return;
    await copyVoucherLink();
  }
};
</script>