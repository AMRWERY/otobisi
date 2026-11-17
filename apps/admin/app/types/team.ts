export type TeamRoleKey = "owner" | "manager" | "dispatcher" | "counter";

export type TeamHubKey = "almaza" | "moharam" | "hurghada" | "asyut" | "giza";

export type TeamMemberStatus = "active" | "pending";

export interface TeamMember {
  id: number;
  name: string;
  arabicName: string;
  initials: string;
  title: string;
  email: string;
  phone: string;
  role: TeamRoleKey;
  hub: TeamHubKey;
  /** Desk or duty inside the hub, e.g. "Luggage Pier Bay" */
  stationRole: string;
  status: TeamMemberStatus;
  isOnline: boolean;
  /** "Active now (Web Ops)", "Invited (Pending)" … */
  lastSeen: string;
  twoFactor: boolean;
}

export interface TeamFilters {
  /** "all" or a TeamRoleKey */
  role: string;
  /** "all" or a TeamHubKey */
  hub: string;
}

export interface InviteForm {
  /** "English name / Arabic name" */
  name: string;
  email: string;
  hub: TeamHubKey;
  role: TeamRoleKey;
  require2FA: boolean;
}

export interface TeamRoleInfo {
  label: string;
  icon: string;
  /** Tailwind classes for the role badge */
  badgeClass: string;
  description: string;
  /** Small tag on the invite card, e.g. "ROOT" */
  tag?: string;
  tagClass?: string;
}

export interface TeamTerminal {
  hub: TeamHubKey;
  name: string;
  tag: string;
  tagClass: string;
  detail: string;
}
