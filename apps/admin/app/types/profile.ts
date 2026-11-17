export type ProfileLanguage = "en" | "ar";

export type ProfileToggleKey =
  | "bookings"
  | "tripDelays"
  | "security"
  | "weeklyDigest";

export interface ProfileForm {
  nameEn: string;
  nameAr: string;
  email: string;
  phone: string;
  language: ProfileLanguage;
  timezone: string;
  /** Quick notification switches, saved with the rest of the profile */
  notifications: Record<ProfileToggleKey, boolean>;
}

export interface ProfilePasswordForm {
  current: string;
  next: string;
  confirm: string;
}

export interface ProfileSession {
  id: string;
  device: string;
  icon: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

export interface ProfileToggleInfo {
  key: ProfileToggleKey;
  label: string;
  description: string;
  icon: string;
}

export interface ProfilePasswordStrength {
  /** 0 (empty) to 4 (strong) */
  score: number;
  label: string;
  /** Tailwind bg class for the filled meter segments */
  barClass: string;
}
