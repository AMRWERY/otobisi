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
      if (!prefersReducedMotion) {
        document.documentElement.style.transition = "opacity 100ms cubic-bezier(0.4, 0, 0.2, 1)";
        document.documentElement.style.opacity = "0";
        await new Promise((r) => setTimeout(r, 100));
        await applyLocale();
        document.documentElement.style.transition = "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)";
        document.documentElement.style.opacity = "1";
        setTimeout(() => {
          document.documentElement.style.transition = "";
          document.documentElement.style.opacity = "";
        }, 150);
      } else {
        await applyLocale();
      }
      return;
    }

    // @ts-expect-error — startViewTransition isn't in TS's DOM lib yet
    document.startViewTransition(applyLocale);
  }

  return { locale, locales, switchLocale };
}
