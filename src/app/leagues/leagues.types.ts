// Leagues component interfaces
export interface LeaguesState {
  leagues: any[];
  filteredLeagues: any[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedSport: string;
}

export interface BadgeData {
  leagueId: string;
  imageUrl: string;
}

export interface LeaguesViewModel {
  leagues: any[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedSport: string;
  filteredLeagues: any[];
  selectedBadge: BadgeData | null;
  badgeLoading: boolean;
}
