import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsService } from '../services/sports.service';
import { League } from '../models/league.model';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-leagues',
  imports: [CommonModule, SearchBar],
  templateUrl: './leagues.html',
  styleUrl: './leagues.scss'
})
export class Leagues {
  private sportsService = inject(SportsService);

  // Reactive signals for state management
  leagues = signal<League[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');

  // Computed signals for derived state
  filteredLeagues = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const allLeagues = this.leagues();

    if (!term) {
      return allLeagues;
    }

    return allLeagues.filter(league =>
      league.strLeague.toLowerCase().startsWith(term)
    );
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
}
