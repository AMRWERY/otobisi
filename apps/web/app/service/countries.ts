import type { Country, RawCountry } from "~/service/types/country";

export const DEFAULT_COUNTRY_NAME = "Egypt";

let countriesPromise: Promise<Country[]> | null = null;

const normalize = (raw: RawCountry[]): Country[] =>
  raw
    .filter((c): c is RawCountry & { calling_code: number } =>
      typeof c.calling_code === "number",
    )
    .map((c) => ({
      name: c.country,
      callingCode: c.calling_code,
      dialCode: `+${c.calling_code}`,
      cities: c.cities,
      flag: c.flag_base64,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

/**
 * Loads the countries list. The source JSON is ~5MB (base64 flags), so it is
 * dynamically imported into its own chunk and cached after the first call.
 */
export const loadCountries = (): Promise<Country[]> => {
  countriesPromise ??= import("~/assets/countries-callingCodes-flags.json")
    .then((mod) => normalize(mod.default as RawCountry[]))
    .catch((err) => {
      countriesPromise = null;
      throw err;
    });
  return countriesPromise;
};

export const findCountryByName = (countries: Country[], name: string) =>
  countries.find((c) => c.name.toLowerCase() === name.toLowerCase());

export const findCountryByCallingCode = (countries: Country[], code: number) =>
  countries.find((c) => c.callingCode === code);

export const searchCountries = (countries: Country[], query: string) => {
  const q = query.trim().toLowerCase().replace(/^\+/, "");
  if (!q) return countries;
  return countries.filter(
    (c) => c.name.toLowerCase().includes(q) || String(c.callingCode).startsWith(q),
  );
};
