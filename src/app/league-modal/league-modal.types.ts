import { League } from "../models/league.model";

// LeagueModal component interfaces
export interface ModalState {
  isOpen: boolean;
  league: League;
  badgeImageUrl: string;
  badgeLoading: boolean;
}

export interface LeagueModalConfig {
  showCloseButton: boolean;
  allowBackdropClose: boolean;
  allowEscapeClose: boolean;
  size: 'sm' | 'md' | 'lg' | 'xl';
}
