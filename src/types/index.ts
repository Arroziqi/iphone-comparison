export interface iPhone {
  id: string;
  name: string;
  releaseYear: number;
  price: number;
  chipset: string;
  ram: string;
  storage: string[];
  screenSize: string;
  battery: string;
  camera: string;
  image: string;
  description: string;
  category: 'standard' | 'pro' | 'plus' | 'pro-max' | 'mini';
}

export type SortField = 'name' | 'releaseYear' | 'price' | 'ram' | 'battery';
export type SortDirection = 'asc' | 'desc';

export interface AdminTableState {
  search: string;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  itemsPerPage: number;
}

export interface ComparisonHistory {
  id: string;
  iPhoneIds: string[];
  timestamp: number;
}

export interface RecentlyViewed {
  iPhoneId: string;
  timestamp: number;
}
