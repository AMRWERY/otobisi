export function useAdminSidebar() {
  // Mobile: drawer open/closed (< lg)
  const isMobileOpen = useState("admin:sidebar:mobile", () => false);
  // Desktop: icon-only collapsed (≥ lg)
  const isCollapsed = useState("admin:sidebar:collapsed", () => false);

  function toggleMobile() {
    isMobileOpen.value = !isMobileOpen.value;
  }

  function closeMobile() {
    isMobileOpen.value = false;
  }

  function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value;
  }

  return { isMobileOpen, isCollapsed, toggleMobile, closeMobile, toggleCollapse };
}
