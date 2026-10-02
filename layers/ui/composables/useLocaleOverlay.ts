// Shared state for <VLocaleOverlay />. `useState` keeps it a single instance per app.
export function useLocaleOverlay() {
  const visible = useState("ui:locale-overlay:visible", () => false);
  // Locale being switched TO — drives the overlay's text and direction
  const locale = useState<string>("ui:locale-overlay:locale", () => "en");

  function show(target: string) {
    locale.value = target;
    visible.value = true;
  }

  function hide() {
    visible.value = false;
  }

  return { visible, locale, show, hide };
}
