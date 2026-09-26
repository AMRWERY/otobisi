<template>
  <form novalidate class="flex flex-col gap-3" @submit="onSubmit">
    <div v-if="isRegister" class="grid grid-cols-2 gap-3">
      <LazyVInput
        v-model="firstName"
        v-bind="firstNameAttrs"
        label="First name"
        autocomplete="given-name"
        :error="errors.firstName"
      />
      <LazyVInput
        v-model="lastName"
        v-bind="lastNameAttrs"
        label="Last name"
        autocomplete="family-name"
        :error="errors.lastName"
      />
    </div>

    <LazyVInput
      v-model="identifier"
      v-bind="identifierAttrs"
      :label="isRegister ? 'Email' : 'Email or username'"
      :type="isRegister ? 'email' : 'text'"
      :autocomplete="isRegister ? 'email' : 'username'"
      icon="ph:envelope-simple"
      :error="errors.identifier"
    />

    <LazyVInput
      v-model="password"
      v-bind="passwordAttrs"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      :autocomplete="isRegister ? 'new-password' : 'current-password'"
      icon="ph:lock-simple"
      :error="errors.password"
    >
      <template #trailing>
        <LazyVButton
          variant="unstyled"
          class="shrink-0 text-text-muted hover:text-text-primary cursor-pointer"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          @click="showPassword = !showPassword"
        >
          <Icon
            :name="showPassword ? 'ph:eye-slash' : 'ph:eye'"
            class="w-4 h-4"
          />
        </LazyVButton>
      </template>
    </LazyVInput>

    <LazyVInput
      v-if="isRegister"
      v-model="confirmPassword"
      v-bind="confirmPasswordAttrs"
      label="Confirm password"
      :type="showPassword ? 'text' : 'password'"
      autocomplete="new-password"
      icon="ph:lock-simple"
      :error="errors.confirmPassword"
    />

    <LazyVButton
      type="submit"
      variant="unstyled"
      class="mt-1 w-full bg-[#A1331B] hover:bg-[#8d2a13] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-950/15 transition-all active:scale-[0.99] cursor-pointer group disabled:opacity-60 disabled:cursor-wait"
      :disabled="isSubmitting"
      content-class="inline-flex items-center gap-2"
    >
      <span>{{ isRegister ? "Create Account" : "Log In" }}</span>
      <Icon name="ph:arrow-right-bold" class="w-4 h-4 icon-arrow-animated" />
    </LazyVButton>

    <LazyVButton
      variant="unstyled"
      icon="ph:device-mobile-fill"
      icon-class="w-4 h-4"
      class="inline-flex items-center justify-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold cursor-pointer transition-colors"
      @click="$emit('back')"
    >
      Use mobile number instead
    </LazyVButton>
  </form>
</template>

<script lang="ts" setup>
import type { LoginInput, RegisterInput } from "~/service/types/user";

const props = defineProps<{
  mode: "login" | "register";
}>();

const emit = defineEmits<{
  (e: "login", val: LoginInput): void;
  (e: "register", val: RegisterInput): void;
  (e: "back"): void;
}>();

const isRegister = computed(() => props.mode === "register");
const showPassword = ref(false);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const required = (label: string) => (v: unknown) =>
  (typeof v === "string" && v.trim().length > 0) || `${label} is required`;

// Register-only fields pass automatically in login mode
const registerOnly =
  (rule: (v: unknown, ctx: { form: Record<string, unknown> }) => true | string) =>
  (v: unknown, ctx: { form: Record<string, unknown> }) =>
    !isRegister.value || rule(v, ctx);

const { defineField, errors, values, handleSubmit, isSubmitting, resetForm } =
  useForm({
  validationSchema: {
    firstName: registerOnly(required("First name")),
    lastName: registerOnly(required("Last name")),
    identifier: (v: unknown) => {
      const label = isRegister.value ? "Email" : "Email or username";
      const present = required(label)(v);
      if (present !== true) return present;
      return (
        !isRegister.value ||
        EMAIL_RE.test(String(v).trim()) ||
        "Enter a valid email address"
      );
    },
    password: (v: unknown) => {
      const present = required("Password")(v);
      if (present !== true || !isRegister.value) return present;
      const value = String(v);
      if (value.length < 8) return "Password must be at least 8 characters";
      return (
        (/[a-z]/i.test(value) && /\d/.test(value)) ||
        "Password must contain a letter and a number"
      );
    },
    confirmPassword: registerOnly(
      (v, ctx) => v === ctx.form.password || "Passwords do not match",
    ),
  },
  initialValues: {
    firstName: "",
    lastName: "",
    identifier: "",
    password: "",
    confirmPassword: "",
  },
});

const [firstName, firstNameAttrs] = defineField("firstName");
const [lastName, lastNameAttrs] = defineField("lastName");
const [identifier, identifierAttrs] = defineField("identifier");
const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");

// Keep what the user typed, but drop stale errors when switching tabs
watch(
  () => props.mode,
  () => resetForm({ values: { ...values } }),
);

const onSubmit = handleSubmit((values) => {
  if (isRegister.value) {
    emit("register", {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.identifier,
      password: values.password,
    });
  } else {
    emit("login", { identifier: values.identifier, password: values.password });
  }
});
</script>
