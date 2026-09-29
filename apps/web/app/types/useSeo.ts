export interface SeoOptions {
  /** Page title. On home page or if title is site name, only 'Otobisi' is displayed */
  title?: string;
  /** Plain text description */
  description?: string;
  /** If true, sets robots to 'noindex, nofollow', otherwise 'index, follow' */
  private?: boolean;
}

export interface TripSchemaInput {
  companyName: string;
  originName: string;
  destinationName: string;
  departureTime: string; // ISO 8601
  arrivalTime: string; // ISO 8601
  price: number;
  currency?: string;
  url: string;
}

export interface BreadcrumbInput {
  name: string;
  url: string;
}
