import { Component, input, output, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SPORTS_FILTER } from '../config/constants';

export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

@Component({
  selector: 'app-sport-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './sport-filter.html',
  styleUrl: './sport-filter.scss'
})
export class SportFilter {
  // Input signals
  leagues = input<League[]>([]);

  // Output signals
  sportChange = output<string>();

  // Internal signals
  selectedSport = signal<string>('');

  // Computed signals
  availableSports = computed(() => {
    const sports = this.leagues()
      .map(league => league.strSport)
      .filter((sport, index, arr) => arr.indexOf(sport) === index)
      .sort();
    return [SPORTS_FILTER.ALL_SPORTS, ...sports];
  });

  onSportChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const sport = target.value;
    this.selectedSport.set(sport);
    // Emit empty string for "All Sports" option, otherwise emit the sport name
    const emitValue = sport === SPORTS_FILTER.ALL_SPORTS ? '' : sport;
    this.sportChange.emit(emitValue);
  }

  getSelectedSport(): string {
    return this.selectedSport();
  }
}
