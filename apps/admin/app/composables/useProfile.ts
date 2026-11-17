import type { ProfileForm, ProfilePasswordForm } from "~/types/profile";

export function useProfile() {
  const toast = useToast();

  // ── Profile details (dirty-tracked) ─────────────────────
  const form = reactive<ProfileForm>(profileClone(PROFILE_DEFAULTS));
  const saved = ref<ProfileForm>(profileClone(PROFILE_DEFAULTS));

  const isDirty = computed(
    () => JSON.stringify(form) !== JSON.stringify(saved.value),
  );

  const initials = computed(() => profileInitials(form.nameEn));

  function save() {
    if (!form.nameEn.trim()) {
      toast.error("Enter your name in English");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Enter a valid work email address");
      return;
    }
    saved.value = profileClone(form);
    toast.success("Profile updated");
  }

  /** Back to the last saved state */
  function discard() {
    Object.assign(form, profileClone(saved.value));
  }

  // ── Password (never part of the dirty snapshot) ─────────
  const password = reactive<ProfilePasswordForm>({
    current: "",
    next: "",
    confirm: "",
  });

  const strength = computed(() => profilePasswordStrength(password.next));

  const passwordError = computed(() => {
    if (!password.next) return undefined;
    if (password.next.length < PROFILE_MIN_PASSWORD_LENGTH)
      return `Use at least ${PROFILE_MIN_PASSWORD_LENGTH} characters`;
    if (password.confirm && password.confirm !== password.next)
      return "Passwords do not match";
    return undefined;
  });

  function changePassword() {
    if (!password.current) {
      toast.error("Enter your current password");
      return;
    }
    if (passwordError.value || !password.next || password.confirm !== password.next) {
      toast.error(passwordError.value ?? "Confirm the new password");
      return;
    }
    Object.assign(password, { current: "", next: "", confirm: "" });
    toast.success("Password changed");
  }

  // ── Two-factor ──────────────────────────────────────────
  const twoFactor = ref(true);

  watch(twoFactor, (on, was) => {
    if (on === was) return;
    toast[on ? "success" : "warning"](
      on
        ? "Two-factor authentication enabled"
        : "Two-factor authentication disabled — your account is less protected",
    );
  });

  // ── Sessions ────────────────────────────────────────────
  const sessions = ref(PROFILE_SESSIONS.map((s) => ({ ...s })));

  function revokeSession(id: string) {
    const session = sessions.value.find((s) => s.id === id);
    if (!session || session.current) return;
    sessions.value = sessions.value.filter((s) => s.id !== id);
    toast.info(`${session.device} signed out`);
  }

  function signOutEverywhere() {
    const others = sessions.value.filter((s) => !s.current).length;
    sessions.value = sessions.value.filter((s) => s.current);
    toast.success(
      others
        ? `${others} other session${others > 1 ? "s" : ""} signed out`
        : "No other sessions were active",
    );
  }

  return {
    form,
    isDirty,
    initials,
    save,
    discard,
    password,
    strength,
    passwordError,
    changePassword,
    twoFactor,
    sessions,
    revokeSession,
    signOutEverywhere,
  };
}
