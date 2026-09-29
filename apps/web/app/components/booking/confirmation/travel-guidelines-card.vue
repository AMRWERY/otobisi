<template>
  <div class="max-w-4xl mx-auto mt-8 text-start">
    <h3 class="text-base sm:text-lg font-black text-text-primary mb-4">
      Essential Egyptian Travel Information
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- 1. Bring Official ID -->
      <div
        class="p-4 sm:p-5 rounded-2xl bg-surface-1 border border-border shadow-xs flex flex-col justify-between"
      >
        <div>
          <div
            class="w-10 h-10 rounded-xl bg-orange-500/10 text-[#A1331B] dark:text-orange-400 flex items-center justify-center mb-3"
          >
            <Icon name="ph:identification-card-bold" class="w-5 h-5" />
          </div>

          <h4 class="font-bold text-sm text-text-primary mb-1.5">
            1. Bring Official ID
          </h4>

          <p class="text-xs text-text-secondary leading-relaxed">
            Ministry of Transport Inspectors require Egyptian National ID or
            original valid Passport matching passenger names at boarding gates.
          </p>
        </div>
      </div>

      <!-- 2. Mobile QR or Print -->
      <div
        class="p-4 sm:p-5 rounded-2xl bg-surface-1 border border-border shadow-xs flex flex-col justify-between"
      >
        <div>
          <div
            class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3"
          >
            <Icon name="ph:qr-code-bold" class="w-5 h-5" />
          </div>

          <h4 class="font-bold text-sm text-text-primary mb-1.5">
            2. Mobile QR or Print
          </h4>

          <p class="text-xs text-text-secondary leading-relaxed">
            No paper printout is necessary. Present this screen, the WhatsApp
            PDF attachment, or SMS link directly to the coach attendant.
          </p>
        </div>
      </div>

      <!-- 3. Free Rescheduling -->
      <div
        class="p-4 sm:p-5 rounded-2xl bg-surface-1 border border-border shadow-xs flex flex-col justify-between"
      >
        <div>
          <div
            class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3"
          >
            <Icon name="ph:arrow-counter-clockwise-bold" class="w-5 h-5" />
          </div>

          <h4 class="font-bold text-sm text-text-primary mb-1.5">
            3. Free Rescheduling
          </h4>

          <p class="text-xs text-text-secondary leading-relaxed">
            Free seat cancellation or schedule change available until 05:30 AM
            on Thu 24 Oct (up to 3 hours before departure time).
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>