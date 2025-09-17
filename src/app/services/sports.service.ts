import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { League, LeaguesResponse, SeasonsResponse } from '../models/league.model';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class SportsService {
  // In-memory cache for league badge images (leagueId -> badgeUrl)
  private cachedBadgeImages = new Map<string, string>();

  private http = inject(HttpClient);

  /**
   * Fetches all leagues from the API.
   *
   * @returns Observable<League[]> - Stream of leagues data
   */
  getLeagues(): Observable<League[]> {
    return this.http.get<LeaguesResponse>(ApiConfig.ALL_LEAGUES_ENDPOINT).pipe(
      // Extract the leagues array from the response
      map(response => response.leagues || []),

      catchError(error => {
        console.error('Error fetching leagues:', error);
        return of([]);
      })
    );
  }

  /**
   * Fetches the badge image URL for a specific league with in-memory caching.
   * Returns the first season's badge image from the response.
   *
   * Caching logic:
   * - If badge image for the league is already cached in memory, returns it immediately as an Observable
   * - If not cached, fetches from API, stores in cache, then returns the badge URL
   * - This prevents unnecessary API calls and improves performance for subsequent requests of the same league
   *
   * @param leagueId - The league ID to fetch badge image for
   * @returns Observable<string> - Stream containing the season badge image URL
   */
  getLeagueBadgeImage(leagueId: string): Observable<string> {
    // If we have cached badge image for this league, return it immediately as an Observable
    const cachedBadge = this.cachedBadgeImages.get(leagueId);
    if (cachedBadge !== undefined) {
      return of(cachedBadge);
    }

    // If not cached, fetch from API and cache the result
    const params = {
      badge: '1',
      id: leagueId
    };

    return this.http.get<SeasonsResponse>(ApiConfig.LEAGUE_SEASONS_ENDPOINT, { params }).pipe(
      // Extract the first season's badge URL or return empty string if no seasons
      map(response => response.seasons && response.seasons.length > 0 ? response.seasons[0].strBadge : ''),

      // Cache the fetched badge URL for future requests
      tap(badgeUrl => {
        this.cachedBadgeImages.set(leagueId, badgeUrl);
      }),

      catchError(error => {
        console.error('Error fetching league seasons:', error);
        return of('');
      })
    );
  }
}
