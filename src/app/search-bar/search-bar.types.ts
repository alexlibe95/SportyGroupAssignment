// SearchBar component interfaces
export interface SearchBarState {
  searchTerm: string;
  isSearching: boolean;
}

export interface SearchBarConfig {
  placeholder: string;
  debounceTime: number;
  minSearchLength: number;
}
