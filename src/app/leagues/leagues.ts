import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsService } from '../services/sports.service';
import { League } from '../models/league.model';
import { SearchBar } from '../search-bar/search-bar';
import { SportFilter } from '../sport-filter/sport-filter';
import { SEARCH_PLACEHOLDER } from '../config/constants';

@Component({
  selector: 'app-leagues',
  imports: [CommonModule, SearchBar, SportFilter],
  templateUrl: './leagues.html',
  styleUrl: './leagues.scss'
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
}
