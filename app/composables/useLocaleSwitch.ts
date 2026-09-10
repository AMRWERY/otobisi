export function useLocaleSwitch() {
  const { locale, locales, setLocale } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  async function switchLocale(code: string) {
    if (code === locale.value) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const supportsViewTransitions = "startViewTransition" in document;

    const applyLocale = async () => {
      await setLocale(code);
      const path = switchLocalePath(code);
      if (path) await navigateTo(path);
    };

    if (!supportsViewTransitions || prefersReducedMotion) {
      await applyLocale();
      return;
    }

    // @ts-expect-error — startViewTransition isn't in TS's DOM lib yet
    document.startViewTransition(applyLocale);
  }

  return { locale, locales, switchLocale };
}
