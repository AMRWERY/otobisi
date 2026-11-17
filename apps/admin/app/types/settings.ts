export type SettingsSectionKey =
  | "identity"
  | "branding"
  | "payments"
  | "notifications";

export type FleetTierKey = "vip" | "royal" | "classic";

export type NotificationChannel = "email" | "sms" | "whatsapp" | "push";

export type NotificationEventKey =
  | "newBooking"
  | "cancellation"
  | "tripDelay"
  | "lowOccupancy"
  | "settlement"
  | "security";

export type DigestFrequency = "off" | "daily" | "weekly";

/** Which channels deliver each event */
export type NotificationMatrix = Record<
  NotificationEventKey,
  Record<NotificationChannel, boolean>
>;

export interface QuietHours {
  enabled: boolean;
  /** "HH:mm" */
  from: string;
  /** "HH:mm" */
  to: string;
}

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
  notifications: NotificationMatrix;
  quietHours: QuietHours;
  digest: DigestFrequency;
}

export interface SettingsSection {
  key: SettingsSectionKey;
  label: string;
  icon: string;
  badge?: string;
  badgeClass?: string;
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

export interface NotificationEvent {
  key: NotificationEventKey;
  label: string;
  description: string;
  icon: string;
  /** Tailwind classes for the icon tile */
  iconClass: string;
  /** Critical events ignore quiet hours */
  critical?: boolean;
}

export interface NotificationChannelInfo {
  key: NotificationChannel;
  label: string;
  icon: string;
}
