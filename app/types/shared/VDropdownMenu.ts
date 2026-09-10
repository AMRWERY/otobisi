export interface DropdownItem {
  type: "link" | "button" | "divider";
  label?: string;
  to?: string;
  icon?: string;
  iconClass?: string;
  badge?: string | number;
  class?: string;
  danger?: boolean;
  onClick?: () => void;
}
