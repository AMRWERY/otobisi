<template>
  <div class="space-y-2">
    <VInput
      v-model="model"
      :label="label"
      :type="visible ? 'text' : 'password'"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :error="error"
      :disabled="disabled"
      icon="ph:lock-key-bold"
      size="md"
      rounded="xl"
      required
      input-class="font-mono"
    >
      <template #trailing>
        <button
          type="button"
          class="shrink-0 p-0.5 rounded text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          :aria-label="visible ? 'Hide password' : 'Show password'"
          :aria-pressed="visible"
          @click="visible = !visible"
        >
          <Icon :name="visible ? 'ph:eye-slash-bold' : 'ph:eye-bold'" class="w-4 h-4" />
        </button>
      </template>
    </VInput>

    <!-- Strength meter + rule checklist (set / reset flows only) -->
    <div v-if="showStrength" class="space-y-2.5">
      <div class="flex items-center gap-2">
        <div class="flex-1 grid grid-cols-4 gap-1" aria-hidden="true">
          <span
            v-for="n in 4"
            :key="n"
            :class="[
              'h-1 rounded-full transition-colors duration-200',
              n <= score ? AUTH_STRENGTH_TONES[score] : 'bg-surface-2',
            ]"
          />
        </div>
        <span class="w-14 text-end font-mono text-[10px] uppercase tracking-wider text-text-muted">
          {{ model ? AUTH_STRENGTH_LABELS[score] : "" }}
        </span>
      </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1">
        <li
          v-for="rule in AUTH_PASSWORD_RULES"
          :key="rule.key"
          :class="[
            'flex items-center gap-1.5 text-[11px] transition-colors',
            rule.test(model)
              ? 'text-emerald-700 dark:text-emerald-400'
              : 'text-text-muted',
          ]"
        >
          <Icon
            :name="rule.test(model) ? 'ph:check-circle-fill' : 'ph:circle'"
            class="w-3.5 h-3.5 shrink-0"
          />
          {{ rule.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    autocomplete?: string;
    /** Show the strength meter and rules checklist */
    showStrength?: boolean;
  }>(),
  {
    label: "Password",
    placeholder: "••••••••",
    error: undefined,
    autocomplete: "current-password",
  },
);

const model = defineModel<string>({ default: "" });

const visible = ref(false);
const score = computed(() => authPasswordScore(model.value));
</script>
