// Overlay stays up for this long in total (matches VLocaleOverlay's `duration` default)
const SWITCH_DURATION_MS = 2000;
const OVERLAY_FADE_IN_MS = 200;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useLocaleSwitch() {
  const { locale, locales, setLocale } = useI18n();
  const switchLocalePath = useSwitchLocalePath();
  // <VLocaleOverlay /> (ui layer) renders this state; each app mounts it in app.vue
  const overlay = useLocaleOverlay();

  async function switchLocale(code: string) {
    if (code === locale.value || overlay.visible.value) return;

    const applyLocale = async () => {
      await setLocale(code);
      const path = switchLocalePath(code);
      if (path) await navigateTo(path);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      await applyLocale();
      return;
    }

    // Cover the screen first so the dir/lang flip and re-render are never seen
    const startedAt = Date.now();
    overlay.show(code);
    try {
      await wait(OVERLAY_FADE_IN_MS);
      await applyLocale();
      await nextTick();
      await wait(SWITCH_DURATION_MS - (Date.now() - startedAt));
    } finally {
      overlay.hide();
    }
  }

  return { locale, locales, switchLocale };
}
