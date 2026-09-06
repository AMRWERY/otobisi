export function useTheme() {
  const isDark = useDark({
    selector: "html",
    attribute: "class",
    valueDark: "dark",
    valueLight: "",
    storageKey: "color-mode",
  });

  // Note: takes the click MouseEvent (not just useToggle(isDark)) so it can
  // animate a circular reveal expanding from the click point — see the
  // ::view-transition-new(root) rules in main.css.
  async function toggleDark(event?: MouseEvent) {
    const next = !isDark.value;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const supportsViewTransitions = "startViewTransition" in document;

    if (!supportsViewTransitions || prefersReducedMotion || !event) {
      isDark.value = next;
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // @ts-expect-error — startViewTransition isn't in TS's DOM lib yet
    const transition = document.startViewTransition(() => {
      isDark.value = next;
    });

    await transition.ready;
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 400,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }

  return { isDark, toggleDark };
}