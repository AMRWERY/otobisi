export interface LocaleOverlayProps {
  /** Website name shown next to the logo mark */
  brandName?: string;
  /** Message per locale code, shown in the target language. Merged over the defaults. */
  messages?: Record<string, string>;
  /** Locale codes that render right-to-left. Defaults to `["ar"]`. */
  rtlLocales?: string[];
  /** Duration of the progress bar in ms; keep in sync with the switch duration */
  duration?: number;
  /** Extra classes for the full-screen backdrop */
  backdropClass?: string;
}
