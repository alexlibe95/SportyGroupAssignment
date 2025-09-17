import { Component, inject, signal, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsService } from '../../services/sports.service';
import { League } from '../../models/league.model';
import { SearchBar } from '../search-bar/search-bar';
import { SportFilter } from '../sport-filter/sport-filter';
import { LeagueModal } from '../league-modal/league-modal';
import { SEARCH_PLACEHOLDER } from '../../config/constants';

@Component({
  selector: 'app-leagues',
  imports: [CommonModule, SearchBar, SportFilter, LeagueModal],
  templateUrl: './leagues.html',
  styleUrl: './leagues.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Leagues {
  private sportsService = inject(SportsService);

  // Constants
  searchPlaceholder = SEARCH_PLACEHOLDER;

  // Reactive signals for state management
  leagues = signal<League[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');
  selectedSport = signal('');
  selectedBadge = signal<{ leagueId: string; imageUrl: string } | null>(null);
  badgeLoading = signal(false);
  modalOpen = signal(false);

  // Computed signals for derived state
  filteredLeagues = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const sport = this.selectedSport();
    const allLeagues = this.leagues();

    let filtered = allLeagues;

    // Apply search filter
    if (term) {
      filtered = filtered.filter(league =>
        league.strLeague.toLowerCase().startsWith(term)
      );
    }

    // Apply sport filter
    if (sport) {
      filtered = filtered.filter(league =>
        league.strSport === sport
      );
    }

    return filtered;
  });

  hasLeagues = computed(() => this.filteredLeagues().length > 0);
  isEmpty = computed(() => !this.isLoading() && !this.error() && !this.hasLeagues());

  // Computed signal for selected league
  selectedLeague = computed(() => {
    const badge = this.selectedBadge();
    if (!badge) return undefined;
    return this.leagues().find(l => l.idLeague === badge.leagueId);
  });

  constructor() {
    // Load leagues on component initialization using effect
    effect(() => {
      this.loadLeagues();
    });
  }

  loadLeagues(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.sportsService.getLeagues().subscribe({
      next: (leagues) => {
        this.leagues.set(leagues);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load leagues. Please try again.');
        this.isLoading.set(false);
        console.error('Error loading leagues:', err);
      }
    });
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
  }

  onSportChange(sport: string): void {
    this.selectedSport.set(sport);
  }

  onLeagueClick(league: League): void {
    this.selectedBadge.set(null); // Clear current badge
    this.modalOpen.set(true);
    this.fetchBadgeImage(league.idLeague);
  }

  onLeagueKeyDown(event: KeyboardEvent, league: League): void {
    // Handle Enter and Space keys for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onLeagueClick(league);
    }
  }

  private fetchBadgeImage(leagueId: string): void {
    this.badgeLoading.set(true);

    this.sportsService.getLeagueBadgeImage(leagueId).subscribe({
      next: (imageUrl) => {
        this.selectedBadge.set({
          leagueId,
          imageUrl
        });
        this.badgeLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching badge image:', err);
        this.selectedBadge.set({
          leagueId,
          imageUrl: '' // Empty string for error state
        });
        this.badgeLoading.set(false);
      }
    });
  }

  onBadgeImageError(): void {
    console.warn('Badge image failed to load');
    // Could implement fallback image or error state
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }
}
