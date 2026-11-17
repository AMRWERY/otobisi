import type { SettlementBatch } from "~/types/settlements";

export function useSettlements() {
  const toast = useToast();

  const batches = ref<SettlementBatch[]>(settlementsSeedBatches());

  /** "all" or a SettlementRail */
  const railTab = ref<string>(SETTLEMENTS_ALL);

  const railTabs = computed(() => [
    { key: SETTLEMENTS_ALL, label: `All ${batches.value.length}` },
    ...SETTLEMENTS_RAIL_KEYS.map((rail) => ({
      key: rail,
      label: `${SETTLEMENTS_RAILS[rail].label} ${
        batches.value.filter((b) => b.rail === rail).length
      }`,
    })),
  ]);

  const filteredBatches = computed(() =>
    batches.value.filter(
      (b) => railTab.value === SETTLEMENTS_ALL || b.rail === railTab.value,
    ),
  );

  // ── Stats (over every batch, regardless of the active tab) ──
  const stats = computed(() => {
    const sum = (list: SettlementBatch[], pick: (b: SettlementBatch) => number) =>
      list.reduce((total, b) => total + pick(b), 0);

    const awaiting = batches.value.filter(
      (b) => b.status === "pending" || b.status === "processing",
    );
    const paid = batches.value.filter((b) => b.status === "paid");

    // "This month" = the month of the most recent payout
    const latestPaid = paid.map((b) => b.paidAt ?? "").sort().at(-1) ?? "";
    const month = latestPaid.slice(0, 7);
    const paidThisMonth = paid.filter((b) => b.paidAt?.startsWith(month));

    const disputedBatches = batches.value.filter((b) => b.disputedCount > 0);

    return {
      pendingPayout: sum(awaiting, (b) => b.net),
      pendingCount: awaiting.length,
      settledThisMonth: sum(paidThisMonth, (b) => b.net),
      settledCount: paidThisMonth.length,
      feesThisMonth: sum(paidThisMonth, (b) => b.fees + b.vat),
      effectiveFeeRate: sum(paidThisMonth, (b) => b.gross)
        ? Math.round(
            (sum(paidThisMonth, (b) => b.fees + b.vat) /
              sum(paidThisMonth, (b) => b.gross)) *
              10000,
          ) / 100
        : 0,
      disputed: sum(disputedBatches, (b) => b.disputed),
      disputedTx: sum(disputedBatches, (b) => b.disputedCount),
      failedCount: batches.value.filter((b) => b.status === "failed").length,
      // Paid out but not yet confirmed against the bank statement
      unreconciled: paid.filter((b) => !b.reconciled).length,
    };
  });

  // ── Bulk selection (VTable owns the checkboxes; ids persist across pages) ──
  const selectedIds = ref<(string | number)[]>([]);

  // Drop selections that a tab change has hidden
  watch(filteredBatches, (list) => {
    const visible = new Set(list.map((b) => b.id));
    selectedIds.value = selectedIds.value.filter((id) => visible.has(id));
  });

  // ── Detail slide-over ───────────────────────────────────
  const activeId = ref<string | null>(null);
  const activeBatch = computed(
    () => batches.value.find((b) => b.id === activeId.value) ?? null,
  );

  // ── Actions ─────────────────────────────────────────────
  function markReconciled(ids: (string | number)[]) {
    const targets = batches.value.filter((b) => ids.includes(b.id));
    const eligible = targets.filter((b) => b.status === "paid" && !b.reconciled);
    for (const b of eligible) b.reconciled = true;

    const skipped = targets.length - eligible.length;
    if (!eligible.length) {
      toast.info("Only paid, unreconciled batches can be marked reconciled");
    } else {
      toast.success(
        `${eligible.length} batch${eligible.length === 1 ? "" : "es"} marked reconciled${
          skipped ? ` • ${skipped} skipped` : ""
        }`,
      );
    }
    selectedIds.value = [];
  }

  function syncGateways() {
    toast.info("Gateway sync is not available yet");
  }

  function downloadStatement(batch: SettlementBatch) {
    toast.info(`Statement for ${batch.id} is not available yet`);
  }

  function exportCsv(onlySelected = false) {
    const source = onlySelected
      ? filteredBatches.value.filter((b) => selectedIds.value.includes(b.id))
      : filteredBatches.value;

    const headers = [
      "Batch",
      "Rail",
      "Period",
      "Gross (EGP)",
      "Fees (EGP)",
      "VAT (EGP)",
      "Net (EGP)",
      "Status",
      "Paid at (UTC)",
      "Reconciled",
    ];
    // Quote every cell: periods contain dashes and commas
    const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = source.map((b) => [
      b.id,
      SETTLEMENTS_RAILS[b.rail].label,
      settlementsPeriod(b),
      b.gross,
      b.fees,
      b.vat,
      b.net,
      SETTLEMENTS_STATUS_LABELS[b.status],
      b.paidAt ?? "",
      b.reconciled ? "Yes" : "No",
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.map(cell).join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute(
      "download",
      `settlements_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${source.length} settlement batches exported`);
  }

  return {
    batches,
    railTab,
    railTabs,
    filteredBatches,
    stats,
    selectedIds,
    activeId,
    activeBatch,
    markReconciled,
    syncGateways,
    downloadStatement,
    exportCsv,
  };
}
