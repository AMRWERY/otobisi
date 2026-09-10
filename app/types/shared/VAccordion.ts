export interface AccordionItem {
  /** Unique identifier for the accordion item */
  id: string | number;
  /** Title / Header text */
  title: string;
  /** Optional content text if not using template slots */
  content?: string;
  /** Optional icon displayed before the title */
  icon?: string;
  /** Optional badge text displayed next to the title */
  badge?: string;
  /** Optional active/highlight flag */
  active?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
}

export type AccordionVariant = "default" | "bordered" | "separated" | "card";