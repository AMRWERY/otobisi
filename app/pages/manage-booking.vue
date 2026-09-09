<script lang="ts" setup>
const localePath = useLocalePath();
await navigateTo(localePath("/bookings"), { replace: true });
</script>
