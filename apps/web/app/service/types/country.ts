/** Raw entry shape of `assets/countries-callingCodes-flags.json` */
export interface RawCountry {
  country: string;
  /** Missing for a few territories (e.g. Guadeloupe) */
  calling_code?: number;
  cities: string[];
  /** `data:image/svg+xml;base64,...` URI */
  flag_base64: string;
}

/** Normalized country used across the app */
export interface Country {
  name: string;
  callingCode: number;
  /** Display-ready dial code, e.g. "+20" */
  dialCode: string;
  cities: string[];
  /** Data URI usable directly as an `<img src>` */
  flag: string;
}
