export function useTheme() {
  const isDark = useDark({
    selector: "html",
    attribute: "class",
    valueDark: "dark",
    valueLight: "",
    storageKey: "color-mode",
  });

  // Cross-fade colors over 200ms via CSS custom properties + transition on root
  function toggleDark() {
    isDark.value = !isDark.value;
  }

  return { isDark, toggleDark };
}