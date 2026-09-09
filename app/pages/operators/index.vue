<template>
  <div class="min-h-screen bg-surface-0 dark:bg-surface-1">
    <!-- Header with Operators title -->
    <div class="bg-gradient-to-r from-orange-600 to-orange-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 class="text-3xl font-bold text-white">Operators</h1>
        <p class="text-orange-100 mt-2">Discover and compare coach operators</p>
      </div>
    </div>

    <!-- Main content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Placeholder for operator list -->
      <div class="bg-surface-1 dark:bg-surface-2 rounded-xl p-8">
        <p class="text-text-secondary text-center">
          Operator listings will appear here
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Set page metadata
useSeoMeta({
  title: "Operators - Otobisi",
  description: "Browse and compare intercity coach operators in Egypt",
});
</script>