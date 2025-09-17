import { API_BASE_URL } from "./constants";

export class ApiConfig {
  public static readonly ALL_LEAGUES_ENDPOINT = `${API_BASE_URL}/all_leagues.php`;
  public static readonly LEAGUE_SEASONS_ENDPOINT = `${API_BASE_URL}/search_all_seasons.php`;
}
