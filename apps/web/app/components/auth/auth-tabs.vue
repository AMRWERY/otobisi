<template>
  <!-- Light: soft pill tabs -->
  <div class="dark:hidden bg-[#f1f3f6] p-1 rounded-xl flex gap-1 mb-5">
    <LazyVButton
      variant="unstyled"
      class="flex-1 py-2 text-xs rounded-lg cursor-pointer text-center transition-all"
      :class="
        activeTab === 'login'
          ? 'bg-white text-[#A1331B] font-bold shadow-xs'
          : 'text-gray-500 hover:text-gray-800 font-medium'
      "
      @click="$emit('update:activeTab', 'login')"
    >
      Log in
    </LazyVButton>
    <LazyVButton
      variant="unstyled"
      class="flex-1 py-2 text-xs rounded-lg cursor-pointer text-center transition-all"
      :class="
        activeTab === 'register'
          ? 'bg-white text-[#A1331B] font-bold shadow-xs'
          : 'text-gray-500 hover:text-gray-800 font-medium'
      "
      @click="$emit('update:activeTab', 'register')"
    >
      Create account
    </LazyVButton>
  </div>

  <!-- Dark: orange filled pill tabs with icons -->
  <div
    class="hidden dark:flex bg-[#0b101c] p-1 rounded-xl gap-1.5 mb-5 border border-[#1b2438]"
  >
    <LazyVButton
      variant="unstyled"
      icon="ph:sign-in-bold"
      icon-class="w-3.5 h-3.5"
      class="flex-1 py-2 px-3 text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all"
      :class="
        activeTab === 'login'
          ? 'bg-[#A1331B] text-white font-bold shadow-md'
          : 'text-gray-400 hover:text-white font-medium'
      "
      @click="$emit('update:activeTab', 'login')"
    >
      <span>Log In</span>
    </LazyVButton>
    <LazyVButton
      variant="unstyled"
      icon="ph:user-plus-bold"
      icon-class="w-3.5 h-3.5"
      class="flex-1 py-2 px-3 text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all"
      :class="
        activeTab === 'register'
          ? 'bg-[#A1331B] text-white font-bold shadow-md'
          : 'text-gray-400 hover:text-white font-medium'
      "
      @click="$emit('update:activeTab', 'register')"
    >
      <span>Create Account</span>
    </LazyVButton>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  activeTab: "login" | "register";
}>();

defineEmits<{
  (e: "update:activeTab", val: "login" | "register"): void;
}>();
</script>