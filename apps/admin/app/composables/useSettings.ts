import type { SettingsForm, SettingsSectionKey } from "~/types/settings";

export function useSettings() {
  const toast = useToast();

  const form = reactive<SettingsForm>(cloneSettings(SETTINGS_DEFAULTS));
  // What is currently persisted; the form is "dirty" when it differs
  const saved = ref<SettingsForm>(cloneSettings(SETTINGS_DEFAULTS));

  const isDirty = computed(
    () => JSON.stringify(form) !== JSON.stringify(saved.value),
  );

  // ── Section navigation ──────────────────────────────────
  const activeSection = ref<SettingsSectionKey>("identity");

  // While a click-triggered smooth scroll runs, the scroll-spy must not
  // flip the highlight through every section it passes
  let lockedUntil = 0;

  function selectSection(key: SettingsSectionKey) {
    activeSection.value = key;
    lockedUntil = Date.now() + 900;
    document
      .getElementById(`settings-${key}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Highlight the section that is currently under the top of the viewport
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockedUntil) return;
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          activeSection.value = visible.target.id.replace(
            "settings-",
            "",
          ) as SettingsSectionKey;
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    for (const section of SETTINGS_SECTIONS) {
      const el = document.getElementById(`settings-${section.key}`);
      if (el) observer.observe(el);
    }
    onBeforeUnmount(() => observer.disconnect());
  });

  // ── Save / discard ──────────────────────────────────────
  function save() {
    if (!isValidHex(form.accent)) {
      toast.error("Accent color must be a 6-digit hex value, e.g. #EA580C");
      return;
    }
    saved.value = cloneSettings(form);
    toast.success("Preferences saved");
  }

  /** Back to the last saved state */
  function discard() {
    Object.assign(form, cloneSettings(saved.value));
  }

  return { form, isDirty, activeSection, selectSection, save, discard };
}
