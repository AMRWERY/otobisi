import type {
  SeoType,
  SeoOptions,
  TripSchemaInput,
  BreadcrumbInput,
} from "~/types/useSeo";

export function useSeo(options: SeoOptions = {}) {
  const config = useRuntimeConfig().public;
  const { locale, locales } = useI18n();
  const route = useRoute();

  const siteUrl = String(config.siteUrl || "https://otobisi.com").replace(/\/$/, "");
  const siteName = String(config.siteName || "Otobisi");

  // On home page or when title is Otobisi / empty, display only Otobisi without suffix
  const isHomePage =
    route.path === "/" ||
    route.path === `/${locale.value}` ||
    route.path === `/${locale.value}/`;

  const isBrandOnlyTitle =
    !options.title ||
    options.title.trim().toLowerCase() === siteName.toLowerCase() ||
    isHomePage;

  const fullTitle = isBrandOnlyTitle
    ? siteName
    : `${options.title} | ${siteName}`;

  const description = options.description ?? "";
  const isPrivate = Boolean(options.private);
  const robots = isPrivate ? "noindex, nofollow" : "index, follow";
  const image = absoluteUrl(String(config.defaultOgImage || "/og-default.jpg"), siteUrl);
  const path = route.path;

  // Canonical always points at the current locale's URL
  const canonicalUrl = `${siteUrl}/${locale.value}${normalizePath(path)}`;

  useSeoMeta({
    title: fullTitle,
    description,
    robots,

    ogTitle: fullTitle,
    ogDescription: description,
    ogType: "website",
    ogUrl: canonicalUrl,
    ogImage: image,
    ogSiteName: siteName,
    ogLocale: toOgLocale(locale.value),

    twitterCard: "summary_large_image",
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: image,
    twitterSite: config.twitterHandle as string,
  });

  // hreflang alternates + canonical
  const availableLocales = Array.isArray(locales.value) ? locales.value : [];

  useHead({
    link: [
      { rel: "canonical", href: canonicalUrl },
      ...availableLocales.map((l) => {
        const code = typeof l === "string" ? l : l.code;
        return {
          rel: "alternate",
          hreflang: code,
          href: `${siteUrl}/${code}${normalizePath(path)}`,
        };
      }),
      {
        rel: "alternate",
        hreflang: "x-default",
        href: `${siteUrl}${normalizePath(path)}`,
      },
    ],
  });
}

// ---------------------------------------------------------------------
// Structured data helpers — call these to build the objects you pass
// into `structuredData` above. Keeping them here means every page
// produces schema.org markup in the same shape.
// ---------------------------------------------------------------------

/** BusTrip + Offer schema for a trip details / booking page. */
export function buildTripSchema(trip: TripSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BusTrip",
    provider: {
      "@type": "Organization",
      name: trip.companyName,
    },
    departureBusStop: { "@type": "BusStop", name: trip.originName },
    arrivalBusStop: { "@type": "BusStop", name: trip.destinationName },
    departureTime: trip.departureTime,
    arrivalTime: trip.arrivalTime,
    offers: {
      "@type": "Offer",
      price: trip.price,
      priceCurrency: trip.currency ?? "EGP",
      availability: "https://schema.org/InStock",
      url: trip.url,
    },
  };
}

/** BreadcrumbList schema — pass the trail from home down to the current page. */
export function buildBreadcrumbSchema(items: BreadcrumbInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Organization schema — use once, on the home page only. */
export function buildOrganizationSchema(
  siteUrl: string,
  siteName: string,
  logoPath: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl(logoPath, siteUrl),
  };
}

// ---------------------------------------------------------------------
// Internal utilities
// ---------------------------------------------------------------------

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function absoluteUrl(pathOrUrl: string, siteUrl: string) {
  return /^https?:\/\//.test(pathOrUrl)
    ? pathOrUrl
    : `${siteUrl}${normalizePath(pathOrUrl)}`;
}

function toOgLocale(locale: string) {
  const map: Record<string, string> = { ar: "ar_EG", en: "en_US" };
  return map[locale] ?? locale;
}

function buildStructuredDataTags(
  data?: Record<string, unknown> | Record<string, unknown>[],
) {
  if (!data) return [];
  const items = Array.isArray(data) ? data : [data];
  return items.map((item) => ({
    type: "application/ld+json",
    innerHTML: JSON.stringify(item),
  }));
}