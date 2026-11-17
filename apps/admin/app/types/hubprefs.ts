export type HubPrefsSectionKey =
  | "general"
  | "hours"
  | "boarding"
  | "defaults"
  | "ticketing"
  | "display";

export type HubPrefsDayKey =
  | "sat"
  | "sun"
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri";

export type HubPrefsWeekStart = "sat" | "sun" | "mon";

export type HubPrefsDensity = "compact" | "comfortable";

export interface HubPrefsDayHours {
  open: boolean;
  /** "HH:mm" */
  from: string;
  /** "HH:mm" */
  to: string;
}

export interface HubPrefsForm {
  general: {
    name: string;
    timezone: string;
    currency: string;
    language: string;
    weekStart: HubPrefsWeekStart;
  };
  hours: Record<HubPrefsDayKey, HubPrefsDayHours>;
  boarding: {
    checkInOpensMin: number;
    gateClosesMin: number;
    luggageLimitKg: number;
    noShowGraceMin: number;
  };
  tripDefaults: {
    vehicleClass: string;
    fareRounding: string;
  };
  ticketing: {
    holdSeatMin: number;
    autoCancelUnpaid: boolean;
    autoCancelAfterMin: number;
  };
  display: {
    density: HubPrefsDensity;
    landingPage: string;
  };
}

export interface HubPrefsSection {
  key: HubPrefsSectionKey;
  label: string;
  icon: string;
}
