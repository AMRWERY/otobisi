// Constants + pure helpers for the operator profile page (auto-imported)
import type {
  ProfileForm,
  ProfilePasswordStrength,
  ProfileSession,
  ProfileToggleInfo,
} from "~/types/profile";

export const PROFILE_DEFAULTS: ProfileForm = {
  nameEn: "Amr Mohamed",
  nameAr: "عمرو محمد",
  email: "amr.m@nilebus.eg",
  phone: "+20 100 123 4567",
  language: "en",
  timezone: "Africa/Cairo",
  notifications: {
    bookings: true,
    tripDelays: true,
    security: true,
    weeklyDigest: false,
  },
};

/** Read-only facts about the signed-in operator */
export const PROFILE_FACTS = {
  role: "Fleet Ops Lead",
  hub: "Cairo Almaza Hub #402",
  lastSignIn: "Today, 09:12 CLT",
  memberSince: "Mar 2022",
};

export const PROFILE_LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية (Arabic)" },
];

export const PROFILE_TIMEZONE_OPTIONS = [
  { value: "Africa/Cairo", label: "Cairo (UTC+3)" },
  { value: "Europe/London", label: "London (UTC+0)" },
  { value: "Asia/Riyadh", label: "Riyadh (UTC+3)" },
  { value: "Asia/Dubai", label: "Dubai (UTC+4)" },
];

export const PROFILE_TOGGLES: ProfileToggleInfo[] = [
  {
    key: "bookings",
    label: "New bookings on my hub",
    description: "A passenger reserves a seat on one of your trips",
    icon: "ph:ticket-bold",
  },
  {
    key: "tripDelays",
    label: "Trip delays",
    description: "A departure slips past its scheduled window",
    icon: "ph:clock-countdown-bold",
  },
  {
    key: "security",
    label: "Security alerts",
    description: "New sign-ins and failed verification attempts",
    icon: "ph:shield-warning-bold",
  },
  {
    key: "weeklyDigest",
    label: "Weekly performance digest",
    description: "Revenue and occupancy summary every Sunday",
    icon: "ph:newspaper-clipping-bold",
  },
];

export const PROFILE_SESSIONS: ProfileSession[] = [
  {
    id: "s1",
    device: "Chrome on Windows",
    icon: "ph:desktop-bold",
    location: "Cairo, EG",
    ip: "41.33.12.208",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "s2",
    device: "Safari on iPhone",
    icon: "ph:device-mobile-bold",
    location: "Cairo, EG",
    ip: "197.55.4.71",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "s3",
    device: "Edge on Windows",
    icon: "ph:desktop-bold",
    location: "Alexandria, EG",
    ip: "156.200.9.14",
    lastActive: "Yesterday, 21:40",
    current: false,
  },
];

export const PROFILE_MIN_PASSWORD_LENGTH = 10;

/** Scores length, mixed case, digits and symbols; deliberately simple and client-side only */
export function profilePasswordStrength(password: string): ProfilePasswordStrength {
  if (!password) return { score: 0, label: "—", barClass: "bg-surface-2" };

  let score = 0;
  if (password.length >= PROFILE_MIN_PASSWORD_LENGTH) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels: ProfilePasswordStrength[] = [
    { score: 1, label: "Weak", barClass: "bg-rose-500" },
    { score: 1, label: "Weak", barClass: "bg-rose-500" },
    { score: 2, label: "Fair", barClass: "bg-amber-500" },
    { score: 3, label: "Good", barClass: "bg-teal-500" },
    { score: 4, label: "Strong", barClass: "bg-emerald-500" },
  ];
  return levels[score]!;
}

/** Deep copy, so the saved snapshot never shares nested objects with the live form */
export const profileClone = (f: ProfileForm): ProfileForm =>
  JSON.parse(JSON.stringify(f));

/** "Amr Mohamed" → "KS" */
export function profileInitials(name: string): string {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
