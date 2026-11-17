export type CoachStatus = "in-service" | "scheduled" | "standby" | "maintenance";

export type CoachTemplateKey = "vip" | "standard" | "sleeper" | "shuttle";

export interface CoachRecord {
  id: number;
  model: string;
  /** Display code, e.g. "#DX-8821" */
  code: string;
  /** Fleet internal ID, e.g. "BUS-EG-882" */
  internalId: string;
  chassis: string;
  year: number;
  vin: string;
  plateArabic: string;
  plateLatin: string;
  depot: string;
  template: CoachTemplateKey;
  status: CoachStatus;
}

export interface FleetFilters {
  search: string;
  /** "all" or a CoachStatus */
  status: string;
  /** "all" or a CoachTemplateKey */
  template: string;
}

export interface NewCoachForm {
  model: string;
  internalId: string;
  plateArabic: string;
  plateLatin: string;
  chassis: string;
  year: number;
  vin: string;
  template: CoachTemplateKey;
  status: CoachStatus;
  depot: string;
  driver: string;
  odometer: string;
  firstService: string;
}
