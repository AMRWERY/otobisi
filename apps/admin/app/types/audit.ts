export type AuditCategory = "security" | "billing" | "config" | "trips" | "team";

export type AuditSeverity = "info" | "warning" | "critical";

export type AuditResult = "success" | "failed";

export interface AuditChange {
  field: string;
  from: string;
  to: string;
}

export interface AuditEntry {
  id: string;
  /** ISO timestamp */
  at: string;
  actor: string;
  actorRole: string;
  category: AuditCategory;
  /** Short event title, e.g. "Fare rule updated" */
  action: string;
  /** What was touched, e.g. "Rule: Weekend uplift" */
  target: string;
  detail: string;
  ip: string;
  device: string;
  severity: AuditSeverity;
  result: AuditResult;
  changes: AuditChange[];
}

export interface AuditFilters {
  search: string;
  /** "all" or an AuditCategory */
  category: string;
  /** "all" or an AuditSeverity */
  severity: string;
  /** "all" or an actor name */
  actor: string;
}
