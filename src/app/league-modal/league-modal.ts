import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League } from '../models/league.model';

@Component({
  selector: 'app-league-modal',
  imports: [CommonModule],
  templateUrl: './league-modal.html',
  styleUrl: './league-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'close()'
  }
})
export class LeagueModal {
  // Input signals
  league = input<League>();
  badgeImageUrl = input<string>();
  badgeLoading = input<boolean>(false);

  // Output signals
  closeModal = output<void>();

  close(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: Event): void {
    // Close modal when clicking on backdrop
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  onCloseKeyDown(event: KeyboardEvent): void {
    // Handle Enter and Space keys for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.close();
    }
  }

  onBadgeImageError(): void {
    console.warn('Badge image failed to load in modal');
  }
}
