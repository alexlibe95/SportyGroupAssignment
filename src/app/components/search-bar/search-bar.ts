import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar {
  // Input signals
  placeholder = input<string>('Search...');
  initialValue = input<string>('');

  // Output signals
  searchChange = output<string>();

  // Internal signals
  searchTerm = signal('');

  private searchSubject = new Subject<string>();

  constructor() {
    // Debounce search input to avoid too many emissions
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchChange.emit(term);
    });

    // Set initial value if provided
    const initial = this.initialValue();
    if (initial) {
      this.searchTerm.set(initial);
    }
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.searchTerm.set(value);
    this.searchSubject.next(value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.searchSubject.next('');
  }
}
