// Constants + pure helpers for the team page (auto-imported)
import type {
  InviteForm,
  TeamHubKey,
  TeamRoleInfo,
  TeamRoleKey,
  TeamTerminal,
} from "~/types/team";

export const ALL_TEAM = "all";

export const TEAM_PER_PAGE_OPTIONS = [8, 12, 24];

/** Invitations are only accepted for the operator's own mail domain */
export const TEAM_EMAIL_DOMAIN = "@nilebus.eg";

export const TEAM_ROLES: Record<TeamRoleKey, TeamRoleInfo> = {
  owner: {
    label: "Owner",
    icon: "ph:crown-simple-fill",
    badgeClass:
      "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/25",
    description:
      "Full administrative, legal concession authority, and bank settlement access.",
    tag: "ROOT",
    tagClass: "bg-surface-2 text-text-secondary",
  },
  manager: {
    label: "Manager",
    icon: "ph:briefcase-fill",
    badgeClass:
      "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/25",
    description:
      "Can manage trips, fleet schedules, dynamic pricing rules, and staff accounts.",
    tag: "RECOMMENDED",
    tagClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  },
  dispatcher: {
    label: "Staff / Dispatcher",
    icon: "ph:headset-fill",
    badgeClass:
      "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/25",
    description:
      "Can view manifests, board passengers, check in luggage, and handle gate scanners.",
  },
  counter: {
    label: "Station Counter",
    icon: "ph:receipt-fill",
    badgeClass:
      "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/25",
    description:
      "Sells tickets, handles cash and POS, and looks up PNRs at the station desk.",
  },
};

export const TEAM_ROLE_KEYS = Object.keys(TEAM_ROLES) as TeamRoleKey[];

export const TEAM_HUBS: Record<TeamHubKey, { label: string; short: string }> = {
  almaza: { label: "Cairo Central Terminal (Almaza #402)", short: "Cairo Almaza Hub #402" },
  moharam: { label: "Alexandria Moharam Bek (#03)", short: "Alexandria Moharam Bek" },
  hurghada: { label: "Hurghada Marine Hub (#09)", short: "Hurghada Marine Hub" },
  asyut: { label: "Asyut Southern Hub (#05)", short: "Asyut Southern Hub #05" },
  giza: { label: "Giza El-Doki Station Bay", short: "Giza El-Doki Station Bay" },
};

export const TEAM_HUB_KEYS = Object.keys(TEAM_HUBS) as TeamHubKey[];

export const TEAM_TERMINALS: TeamTerminal[] = [
  {
    hub: "almaza",
    name: "Cairo Almaza Terminal (#402)",
    tag: "Primary HQ",
    tagClass:
      "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/25",
    detail: "Gates A1–A4 • 24/7 Ops Desk",
  },
  {
    hub: "moharam",
    name: "Alexandria Moharam Bek (#03)",
    tag: "Support Hub",
    tagClass: "bg-surface-1 text-text-secondary border-border",
    detail: "Ticket Bays 1–3 • Express Check-in",
  },
  {
    hub: "hurghada",
    name: "Red Sea Hurghada Marine (#09)",
    tag: "Satellite Depot",
    tagClass: "bg-surface-1 text-text-secondary border-border",
    detail: "Tourist Express Gate • Luggage Bay",
  },
];

export const emptyInviteForm = (): InviteForm => ({
  name: "",
  email: "",
  hub: "almaza",
  role: "manager",
  require2FA: true,
});

/** "Omar Farouk" → "OF" */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
