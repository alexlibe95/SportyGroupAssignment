// SportFilter component interfaces
export interface SportFilterState {
  selectedSport: string;
  availableSports: string[];
}

export interface SportOption {
  value: string;
  label: string;
  count: number;
}
