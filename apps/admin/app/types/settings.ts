export type SettingsSectionKey =
  | "identity"
  | "branding"
  | "payments"
  | "notifications"
  | "team"
  | "api";

export type FleetTierKey = "vip" | "royal" | "classic";

export interface SettingsForm {
  legalNameEn: string;
  legalNameAr: string;
  brandName: string;
  dispatchEmail: string;
  dispatchPhone: string;
  /** Hex string, e.g. "#EA580C" */
  accent: string;
  tagline: string;
  tier: FleetTierKey;
}

export interface SettingsSection {
  key: SettingsSectionKey;
  label: string;
  icon: string;
  badge?: string;
  badgeClass?: string;
  /** Sections without a panel yet are shown but disabled */
  available: boolean;
}

export interface FleetTier {
  label: string;
  /** Tailwind classes for the badge on the passenger ticket preview */
  badgeClass: string;
}

export interface OperatorRail {
  initial: string;
  name: string;
  note: string;
  cardClass: string;
  initialClass: string;
}
