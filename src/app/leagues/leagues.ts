import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsService } from '../services/sports.service';
import { League } from '../models/league.model';

@Component({
  selector: 'app-leagues',
  imports: [CommonModule],
  templateUrl: './leagues.html',
  styleUrl: './leagues.scss'
})
export class Leagues {
  private sportsService = inject(SportsService);

  // Reactive signals for state management
  leagues = signal<League[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // Computed signals for derived state
  hasLeagues = computed(() => this.leagues().length > 0);
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
}
