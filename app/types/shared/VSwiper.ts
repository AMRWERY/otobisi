export interface SwiperProps<T = any> {
  items?: T[];
  itemClass?: string;
  gapClass?: string;
  snap?: boolean;
  showControls?: boolean;
  speed?: number;
}
