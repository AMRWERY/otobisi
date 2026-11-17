// Constants + pure helpers for the settlements page (auto-imported)
import type {
  SettlementBatch,
  SettlementCheck,
  SettlementRail,
  SettlementRailInfo,
  SettlementStatus,
} from "~/types/settlements";

export const SETTLEMENTS_PER_PAGE_OPTIONS = [8, 16, 32];

export const SETTLEMENTS_ALL = "all";

/** Egyptian VAT is charged on gateway fees */
export const SETTLEMENTS_VAT_RATE = 0.14;

export const SETTLEMENTS_RAILS: Record<SettlementRail, SettlementRailInfo> = {
  fawry: { label: "Fawry", icon: "ph:receipt-bold", feeRate: 0.015, code: "FWR" },
  meeza: { label: "Meeza", icon: "ph:credit-card-bold", feeRate: 0.005, code: "MZA" },
  wallet: { label: "Wallets", icon: "ph:device-mobile-bold", feeRate: 0.012, code: "WLT" },
  cash: { label: "Station Cash", icon: "ph:storefront-bold", feeRate: 0, code: "CSH" },
};

export const SETTLEMENTS_RAIL_KEYS = Object.keys(
  SETTLEMENTS_RAILS,
) as SettlementRail[];

export const SETTLEMENTS_STATUS_LABELS: Record<SettlementStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  paid: "Paid",
  failed: "Failed",
};

// Same semantic palette as the booking and coach status pills
export const SETTLEMENTS_STATUS_TONES: Record<
  SettlementStatus,
  { pill: string; dot: string }
> = {
  pending: {
    pill: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/25",
    dot: "bg-amber-500",
  },
  processing: {
    pill: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/15 dark:text-sky-400 dark:border-sky-500/25",
    dot: "bg-sky-500 animate-pulse",
  },
  paid: {
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/25",
    dot: "bg-emerald-500",
  },
  failed: {
    pill: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/25",
    dot: "bg-rose-500",
  },
};

export const SETTLEMENTS_CHECK_ICONS = {
  ok: { icon: "ph:check-circle-fill", class: "text-emerald-600 dark:text-emerald-400" },
  pending: { icon: "ph:clock-fill", class: "text-amber-600 dark:text-amber-400" },
  fail: { icon: "ph:x-circle-fill", class: "text-rose-600 dark:text-rose-400" },
} as const;

/** Whole pounds with thousands separators, for headline figures */
export const settlementsMoney = (value: number) =>
  Math.round(value).toLocaleString("en-US");

/** "2024-10-21" → "Oct 21" (UTC, so the day never shifts with the viewer's timezone) */
export function settlementsDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}

export function settlementsPeriod(b: Pick<SettlementBatch, "periodFrom" | "periodTo">) {
  return `${settlementsDate(b.periodFrom)} – ${settlementsDate(b.periodTo)}`;
}

/** "2024-10-23T11:20:00Z" → "Oct 23, 11:20" */
export function settlementsPaidAt(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
}

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Mock ledger: 8 weekly batches per rail, newest first, so tabs and pagination have data */
export function settlementsSeedBatches(): SettlementBatch[] {
  const newestPeriodEnd = "2024-10-27";
  const grossBase: Record<SettlementRail, number> = {
    fawry: 410_000,
    meeza: 240_000,
    wallet: 160_000,
    cash: 80_000,
  };

  const batches: SettlementBatch[] = [];

  SETTLEMENTS_RAIL_KEYS.forEach((rail, railIndex) => {
    const info = SETTLEMENTS_RAILS[rail];

    for (let k = 0; k < 8; k++) {
      const periodTo = addDays(newestPeriodEnd, -7 * k - railIndex);
      const periodFrom = addDays(periodTo, -6);
      const gross = round2(grossBase[rail] * (0.85 + ((k * 37 + railIndex * 11) % 30) / 100));
      const fees = round2(gross * info.feeRate);
      const vat = round2(fees * SETTLEMENTS_VAT_RATE);

      let status: SettlementStatus = "paid";
      if (k === 0) status = "pending";
      else if (k === 1 && (rail === "meeza" || rail === "fawry")) status = "processing";
      else if ((rail === "fawry" && k === 4) || (rail === "wallet" && k === 5))
        status = "failed";

      const disputedCount = k % 3 === 2 ? 2 + railIndex : 0;
      const txCount = Math.round(gross / 218.4);

      batches.push({
        id: `STL-${info.code}-2410-${String(8 - k).padStart(2, "0")}`,
        rail,
        periodFrom,
        periodTo,
        gross,
        fees,
        vat,
        net: round2(gross - fees - vat),
        status,
        paidAt: status === "paid" ? `${addDays(periodTo, 2)}T11:20:00Z` : null,
        txCount,
        refundCount: Math.round(txCount * 0.018),
        disputed: disputedCount ? round2(disputedCount * 218.4) : 0,
        disputedCount,
        reconciled: status === "paid" && k > 2,
        gatewayRef: `${info.code}-TX-${99000 + railIndex * 1000 + k * 37}`,
      });
    }
  });

  return batches.sort((a, b) => b.periodTo.localeCompare(a.periodTo));
}

/** What finance still has to verify for one batch */
export function settlementsChecks(b: SettlementBatch): SettlementCheck[] {
  const info = SETTLEMENTS_RAILS[b.rail];
  const failed = b.status === "failed";
  const paid = b.status === "paid";
  const settling = b.status === "processing";

  return [
    {
      label: "Gateway report matches ledger",
      detail: `${b.txCount.toLocaleString("en-US")} transactions on both sides`,
      state: failed ? "fail" : b.status === "pending" ? "pending" : "ok",
    },
    {
      label: "ETA e-receipts issued",
      detail: "One e-receipt per paid ticket, sent to the Tax Authority",
      state: paid || settling ? "ok" : "pending",
    },
    {
      label: "Fee rate matches contract",
      detail: `${(info.feeRate * 100).toFixed(1)}% + ${SETTLEMENTS_VAT_RATE * 100}% VAT`,
      state: "ok",
    },
    {
      label: "Bank credit received",
      detail: paid
        ? `Credited ${settlementsPaidAt(b.paidAt)} UTC`
        : failed
          ? "Gateway returned the payout"
          : "Awaiting the payout from the gateway",
      state: paid ? "ok" : failed ? "fail" : "pending",
    },
  ];
}
