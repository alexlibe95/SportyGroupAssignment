import { League, Season } from './league.model';

// API response interfaces
export interface LeaguesResponse {
  leagues: League[];
}

export interface SeasonsResponse {
  seasons: Season[];
}
