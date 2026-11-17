import type { AuditEntry, AuditFilters } from "~/types/audit";

type Template = Omit<AuditEntry, "id" | "at" | "actor" | "actorRole" | "ip" | "device">;

const ACTORS = [
  { name: "Amr Mohamed", role: "Owner", ip: "197.55.12.40", device: "Chrome 130 • Windows" },
  { name: "Tarek Mansour", role: "Manager", ip: "197.55.31.8", device: "Safari 17 • macOS" },
  { name: "Hesham Zaki", role: "Manager", ip: "41.33.90.114", device: "Chrome 130 • Android" },
  { name: "Salma Radwan", role: "Station Counter", ip: "156.203.4.77", device: "Edge 130 • Windows" },
  { name: "System", role: "Automation", ip: "10.0.0.1", device: "Scheduler" },
];

const TEMPLATES: Template[] = [
  {
    category: "security",
    action: "Signed in",
    target: "Session",
    detail: "Successful sign-in with two-factor verification.",
    severity: "info",
    result: "success",
    changes: [],
  },
  {
    category: "security",
    action: "Failed sign-in",
    target: "Session",
    detail: "Wrong password entered 3 times in a row.",
    severity: "warning",
    result: "failed",
    changes: [],
  },
  {
    category: "security",
    action: "Two-factor disabled",
    target: "Account security",
    detail: "Authenticator app was removed from the account.",
    severity: "critical",
    result: "success",
    changes: [{ field: "2FA", from: "Enabled", to: "Disabled" }],
  },
  {
    category: "config",
    action: "Fare rule updated",
    target: "Rule: Weekend uplift",
    detail: "Adjustment raised for Cairo ⇄ Alexandria corridor.",
    severity: "info",
    result: "success",
    changes: [
      { field: "Adjustment", from: "+8%", to: "+12%" },
      { field: "Priority", from: "3", to: "2" },
    ],
  },
  {
    category: "config",
    action: "Brand accent changed",
    target: "Operator settings",
    detail: "Public ticket accent colour was updated.",
    severity: "info",
    result: "success",
    changes: [{ field: "Accent", from: "#EA580C", to: "#0F5A47" }],
  },
  {
    category: "billing",
    action: "Settlement reconciled",
    target: "Batch: STL-FAW-2410",
    detail: "Fawry batch matched against the bank statement.",
    severity: "info",
    result: "success",
    changes: [{ field: "Status", from: "Processing", to: "Reconciled" }],
  },
  {
    category: "billing",
    action: "Payout failed",
    target: "Batch: STL-MZA-2409",
    detail: "Meeza payout rejected by the receiving bank.",
    severity: "critical",
    result: "failed",
    changes: [{ field: "Status", from: "Processing", to: "Failed" }],
  },
  {
    category: "trips",
    action: "Trip cancelled",
    target: "Trip: NB-402",
    detail: "Departure cancelled; 41 passengers queued for refund.",
    severity: "warning",
    result: "success",
    changes: [{ field: "Status", from: "Scheduled", to: "Cancelled" }],
  },
  {
    category: "trips",
    action: "Vehicle assigned",
    target: "Coach: DX-8821",
    detail: "MCV 600 VIP assigned to the 14:45 Almaza departure.",
    severity: "info",
    result: "success",
    changes: [{ field: "Vehicle", from: "—", to: "DX-8821" }],
  },
  {
    category: "team",
    action: "Member invited",
    target: "omar.farouk@nilebus.eg",
    detail: "Invitation sent with the Manager role.",
    severity: "info",
    result: "success",
    changes: [{ field: "Role", from: "—", to: "Manager" }],
  },
  {
    category: "team",
    action: "Role changed",
    target: "Hany Gabr",
    detail: "Permissions raised from Dispatcher to Manager.",
    severity: "warning",
    result: "success",
    changes: [{ field: "Role", from: "Dispatcher", to: "Manager" }],
  },
  {
    category: "team",
    action: "Member removed",
    target: "Reem Badr",
    detail: "Access revoked and active sessions ended.",
    severity: "critical",
    result: "success",
    changes: [{ field: "Status", from: "Active", to: "Removed" }],
  },
];

// Fixed base so server and client render the same times
const BASE = Date.UTC(2024, 9, 24, 14, 35, 0);

function buildEntries(): AuditEntry[] {
  return Array.from({ length: 60 }, (_, i) => {
    const template = TEMPLATES[(i * 5 + (i % 3)) % TEMPLATES.length]!;
    const actor = ACTORS[(i * 3 + (i % 2)) % ACTORS.length]!;
    return {
      ...template,
      id: `EVT-${48210 - i}`,
      at: new Date(BASE - i * 7 * 60_000 - (i % 5) * 13_000).toISOString(),
      actor: actor.name,
      actorRole: actor.role,
      ip: actor.ip,
      device: actor.device,
    };
  });
}

export function useAudit() {
  const toast = useToast();

  const entries = ref<AuditEntry[]>(buildEntries());

  const filters = reactive<AuditFilters>({
    search: "",
    category: ALL_AUDIT,
    severity: ALL_AUDIT,
    actor: ALL_AUDIT,
  });

  const actors = ACTORS.map((a) => a.name);

  const counts = computed(() => {
    const c: Record<string, number> = { all: entries.value.length };
    for (const e of entries.value) c[e.category] = (c[e.category] ?? 0) + 1;
    return c;
  });

  const summary = computed(() => ({
    total: entries.value.length,
    security: entries.value.filter((e) => e.category === "security").length,
    failed: entries.value.filter((e) => e.result === "failed").length,
    critical: entries.value.filter((e) => e.severity === "critical").length,
  }));

  const filteredEntries = computed(() => {
    const q = filters.search.toLowerCase().trim();
    return entries.value.filter((e) => {
      if (
        q &&
        ![e.id, e.actor, e.action, e.target, e.detail, e.ip].some((f) =>
          f.toLowerCase().includes(q),
        )
      ) {
        return false;
      }
      if (filters.category !== ALL_AUDIT && e.category !== filters.category) return false;
      if (filters.severity !== ALL_AUDIT && e.severity !== filters.severity) return false;
      if (filters.actor !== ALL_AUDIT && e.actor !== filters.actor) return false;
      return true;
    });
  });

  const hasActiveFilters = computed(
    () =>
      !!filters.search ||
      filters.category !== ALL_AUDIT ||
      filters.severity !== ALL_AUDIT ||
      filters.actor !== ALL_AUDIT,
  );

  function resetFilters() {
    filters.search = "";
    filters.category = ALL_AUDIT;
    filters.severity = ALL_AUDIT;
    filters.actor = ALL_AUDIT;
  }

  // ── Detail drawer ───────────────────────────────────────
  const activeId = ref<string | null>(null);
  const activeEntry = computed(
    () => entries.value.find((e) => e.id === activeId.value) ?? null,
  );

  function exportCsv() {
    const headers = ["Event ID", "Time (UTC)", "Actor", "Role", "Category", "Action", "Target", "Severity", "Result", "IP", "Device"];
    // Quote every cell: details and targets may contain commas
    const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = filteredEntries.value.map((e) => [
      e.id,
      e.at,
      e.actor,
      e.actorRole,
      AUDIT_CATEGORIES[e.category].label,
      e.action,
      e.target,
      AUDIT_SEVERITIES[e.severity].label,
      e.result,
      e.ip,
      e.device,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.map(cell).join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", `audit-log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${rows.length} events exported`);
  }

  return {
    filters,
    actors,
    counts,
    summary,
    filteredEntries,
    hasActiveFilters,
    resetFilters,
    activeId,
    activeEntry,
    exportCsv,
  };
}
