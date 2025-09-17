export class ApiConfig {
  public static readonly SPORTS_DB_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
  public static readonly ALL_LEAGUES_ENDPOINT = `${ApiConfig.SPORTS_DB_BASE_URL}/all_leagues.php`;
  public static readonly LEAGUE_SEASONS_ENDPOINT = `${ApiConfig.SPORTS_DB_BASE_URL}/search_all_seasons.php`;
}
