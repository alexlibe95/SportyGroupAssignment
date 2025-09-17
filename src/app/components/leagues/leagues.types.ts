import { League } from "../../models/league.model";

// Leagues component interfaces
export interface LeaguesState {
  leagues: League[];
  filteredLeagues: League[];
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
  leagues: League[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedSport: string;
  filteredLeagues: League[];
  selectedBadge: BadgeData | null;
  badgeLoading: boolean;
}
