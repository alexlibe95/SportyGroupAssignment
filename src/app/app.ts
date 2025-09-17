import { Component, signal } from '@angular/core';
import { Leagues } from './leagues/leagues';

@Component({
  selector: 'app-root',
  imports: [Leagues],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Sporty Group Assignment');
}
