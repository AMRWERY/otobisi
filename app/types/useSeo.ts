export type SeoType = "website" | "article" | "product";

export interface SeoOptions {
  /** Page-specific title. Site name is appended automatically. */
  title?: string;
  /** 120-160 char plain-text description, no markup. */
  description?: string;
  /** Absolute or root-relative image URL for social previews. */
  image?: string;
  /** og:type — use 'product' for trip/result pages. */
  type?: SeoType;
  /** Path without locale prefix, e.g. '/search/cairo-alexandria'. Defaults to the current route. */
  path?: string;
  /** Set true for thin/duplicate pages (filtered results, etc). */
  noindex?: boolean;
  /** Raw JSON-LD object(s) to inject as <script type="application/ld+json">. */
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
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
