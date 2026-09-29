<template>
  <div>
    <!-- Redirect handled in setup -->
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
// Register shares the same UI — redirect to login with register tab active
await navigateTo(localePath('/auth/login') + '?tab=register', { replace: true });
</script>