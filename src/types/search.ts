import type { SORT_BY_ID } from 'constants/search';

export interface SearchForm {
  searchKeyword: string;
}

export type SortByType = keyof typeof SORT_BY_ID;

export interface SortByOption {
  id: SortByType;
  title: string;
  selected: boolean;
}
