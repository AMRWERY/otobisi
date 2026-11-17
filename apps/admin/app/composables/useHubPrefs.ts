import type { HubPrefsForm, HubPrefsSectionKey } from "~/types/hubprefs";

export function useHubPrefs() {
  const toast = useToast();

  const form = reactive<HubPrefsForm>(hubprefsClone(HUBPREFS_DEFAULTS));
  // What is currently persisted; the form is "dirty" when it differs
  const saved = ref<HubPrefsForm>(hubprefsClone(HUBPREFS_DEFAULTS));

  const isDirty = computed(
    () => JSON.stringify(form) !== JSON.stringify(saved.value),
  );

  // ── Section navigation ──────────────────────────────────
  const activeSection = ref<HubPrefsSectionKey>("general");

  // While a click-triggered smooth scroll runs, the scroll-spy must not
  // flip the highlight through every section it passes
  let lockedUntil = 0;

  function selectSection(key: HubPrefsSectionKey) {
    activeSection.value = key;
    lockedUntil = Date.now() + 900;
    document
      .getElementById(`hubprefs-${key}`)
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
            "hubprefs-",
            "",
          ) as HubPrefsSectionKey;
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    for (const section of HUBPREFS_SECTIONS) {
      const el = document.getElementById(`hubprefs-${section.key}`);
      if (el) observer.observe(el);
    }
    onBeforeUnmount(() => observer.disconnect());
  });

  // ── Save / discard ──────────────────────────────────────
  function validate(): string | null {
    if (!form.general.name.trim()) return "Give the hub a name";
    const b = form.boarding;
    if (b.gateClosesMin >= b.checkInOpensMin)
      return "Gate must close after check-in opens (check-in minutes must be larger)";
    if (b.luggageLimitKg <= 0) return "Luggage limit must be above 0 kg";
    if (form.ticketing.holdSeatMin < 1) return "Seat hold must be at least 1 minute";
    if (!Object.values(form.hours).some((d) => d.open))
      return "Keep at least one day open";
    return null;
  }

  function save() {
    const problem = validate();
    if (problem) {
      toast.error(problem);
      return;
    }
    saved.value = hubprefsClone(form);
    toast.success("Hub preferences saved");
  }

  /** Back to the last saved state */
  function discard() {
    Object.assign(form, hubprefsClone(saved.value));
  }

  /** Opening days, for the header summary */
  const openDays = computed(
    () => Object.values(form.hours).filter((d) => d.open).length,
  );

  return {
    form,
    isDirty,
    activeSection,
    selectSection,
    save,
    discard,
    openDays,
  };
}
