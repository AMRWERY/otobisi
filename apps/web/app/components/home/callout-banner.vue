<template>
  <div>
    <section>
      <div
        class="bg-gradient-to-br from-surface-1 to-orange-50/40 border border-orange-200/70 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <div
            class="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-2"
          >
            <Icon name="ph:shield-check-bold" class="w-4 h-4" />
            <span>Official Government Transit Registry</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-text-primary">
            Book with zero station queue stress
          </h3>
          <p class="text-xs text-text-secondary max-w-xl mt-2 leading-relaxed">
            All tickets issued through Otobisi feature official QR boarding
            passes accepted at Torgoman, Ramses, Moharam Bek, and El Qousar
            terminals. Present your mobile screen or SMS code directly at the
            bus door.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <LazyVButton
            variant="surface"
            size="sm"
            icon="ph:question-bold"
            custom-class="w-full sm:w-auto"
          >
            How Boarding Works
          </LazyVButton>

          <LazyVButton
            variant="primary"
            size="sm"
            icon="ph:download-simple-bold"
            custom-class="w-full sm:w-auto"
          >
            Download Otobisi App
          </LazyVButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>

</script>