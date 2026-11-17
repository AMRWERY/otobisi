// Constants + pure helpers for the audit logs page (auto-imported)
import type { AuditCategory, AuditSeverity } from "~/types/audit";

export const ALL_AUDIT = "all";

export const AUDIT_PER_PAGE_OPTIONS = [10, 20, 50];

export const AUDIT_CATEGORIES: Record<
  AuditCategory,
  { label: string; icon: string; iconClass: string }
> = {
  security: {
    label: "Security",
    icon: "ph:shield-warning-bold",
    iconClass: "bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
  },
  billing: {
    label: "Billing & Settlements",
    icon: "ph:bank-bold",
    iconClass: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  },
  config: {
    label: "Configuration",
    icon: "ph:sliders-bold",
    iconClass: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  },
  trips: {
    label: "Trips & Fleet",
    icon: "ph:bus-bold",
    iconClass: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  team: {
    label: "Team & Access",
    icon: "ph:users-three-bold",
    iconClass: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
};

export const AUDIT_CATEGORY_KEYS = Object.keys(AUDIT_CATEGORIES) as AuditCategory[];

export const AUDIT_SEVERITIES: Record<
  AuditSeverity,
  { label: string; pill: string; dot: string }
> = {
  info: {
    label: "Info",
    pill: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-400/10 dark:text-slate-300 dark:border-slate-400/20",
    dot: "bg-slate-400",
  },
  warning: {
    label: "Warning",
    pill: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-400 dark:border-amber-400/20",
    dot: "bg-amber-500",
  },
  critical: {
    label: "Critical",
    pill: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-400/10 dark:text-rose-400 dark:border-rose-400/20",
    dot: "bg-rose-500",
  },
};

export const AUDIT_SEVERITY_KEYS = Object.keys(AUDIT_SEVERITIES) as AuditSeverity[];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const pad = (n: number) => String(n).padStart(2, "0");

/** "2024-10-24T14:32:08Z" → "24 Oct 14:32:08" (UTC, so server and client agree) */
export function auditTime(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}
