import type { SettingsForm, SettingsSectionKey } from "~/types/settings";

export function useSettings() {
  const toast = useToast();

  const form = reactive<SettingsForm>({ ...SETTINGS_DEFAULTS });
  // What is currently persisted; the form is "dirty" when it differs
  const saved = ref<SettingsForm>({ ...SETTINGS_DEFAULTS });

  const isDirty = computed(
    () => JSON.stringify({ ...form }) !== JSON.stringify(saved.value),
  );

  const activeSection = ref<SettingsSectionKey>("identity");

  function selectSection(key: SettingsSectionKey) {
    const section = SETTINGS_SECTIONS.find((s) => s.key === key);
    if (!section?.available) {
      toast.info(`${section?.label ?? "This section"} is not available yet`);
      return;
    }
    activeSection.value = key;
    if (import.meta.client) {
      document
        .getElementById(`settings-${key}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function save() {
    if (!isValidHex(form.accent)) {
      toast.error("Accent color must be a 6-digit hex value, e.g. #EA580C");
      return;
    }
    saved.value = { ...form };
    toast.success("Preferences saved");
  }

  /** Back to the last saved state */
  function discard() {
    Object.assign(form, saved.value);
  }

  return { form, isDirty, activeSection, selectSection, save, discard };
}
