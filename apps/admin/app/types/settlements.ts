export type SettlementRail = "fawry" | "meeza" | "wallet" | "cash";

export type SettlementStatus = "pending" | "processing" | "paid" | "failed";

export interface SettlementBatch {
  /** e.g. "STL-FWR-2410-03" */
  id: string;
  rail: SettlementRail;
  /** ISO dates (UTC), inclusive */
  periodFrom: string;
  periodTo: string;
  /** Money in EGP */
  gross: number;
  /** Gateway processing fees, before VAT */
  fees: number;
  /** 14% VAT charged on the fees */
  vat: number;
  /** gross − fees − vat */
  net: number;
  status: SettlementStatus;
  /** ISO timestamp, or null until the batch is paid */
  paidAt: string | null;
  txCount: number;
  refundCount: number;
  /** EGP held back because of disputed transactions */
  disputed: number;
  disputedCount: number;
  /** Finance has confirmed the payout against the bank statement */
  reconciled: boolean;
  /** Gateway-side reference */
  gatewayRef: string;
}

export type SettlementCheckState = "ok" | "pending" | "fail";

export interface SettlementCheck {
  label: string;
  detail: string;
  state: SettlementCheckState;
}

export interface SettlementRailInfo {
  label: string;
  icon: string;
  /** Contracted processing fee as a fraction of gross */
  feeRate: number;
  /** Short code used in batch ids */
  code: string;
}

export interface SettlementReconItem {
  label: string;
  value: string;
  icon: string;
  state: SettlementCheckState;
}
