<template>
  <div
    class="max-w-4xl mx-auto mt-5 flex flex-wrap items-center justify-center gap-3"
  >
    <!-- Download PDF -->
    <button
      type="button"
      class="flex-1 min-w-[200px] bg-[#A1331B] hover:bg-[#8B2B16] text-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-950/10 hover:shadow-lg transition-all active:scale-98 cursor-pointer"
      @click="downloadTicket"
    >
      <Icon name="ph:download-simple-bold" class="w-4 h-4" />
      <span>Download Ticket (PDF)</span>
    </button>

    <!-- Add to Calendar -->
    <button
      type="button"
      class="flex-1 min-w-[170px] bg-surface-1 border border-border hover:bg-surface-2 text-text-primary py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
      @click="addToCalendar"
    >
      <Icon name="ph:calendar-plus-bold" class="w-4 h-4 text-orange-500" />
      <span>Add to Calendar</span>
    </button>

    <!-- Share Link -->
    <button
      type="button"
      class="flex-1 min-w-[170px] bg-surface-1 border border-border hover:bg-surface-2 text-text-primary py-3 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
      @click="shareVoucher"
    >
      <Icon name="ph:share-network-bold" class="w-4 h-4 text-emerald-500" />
      <span>Share Voucher Link</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
const downloadTicket = () => {
  alert("Downloading official Egyptian Ministry of Transport E-Ticket PDF...");
};

const addToCalendar = () => {
  alert("Trip event added to your calendar (08:30 AM Cairo to Alexandria).");
};

const shareVoucher = async () => {
  if (navigator?.share) {
    try {
      await navigator.share({
        title: "Otobisi Bus E-Ticket",
        text: "Cairo to Alexandria Trip Voucher (PNR: OTB-849204-EG)",
        url: window.location.href,
      });
    } catch {
      alert("Voucher link copied to clipboard!");
    }
  } else {
    alert("Voucher link copied to clipboard!");
  }
};
</script>