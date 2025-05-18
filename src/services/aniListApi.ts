
// AniList API integration
const ANILIST_API_ENDPOINT = 'https://graphql.anilist.co';

interface AniListMedia {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  description: string;
  coverImage: {
    large: string;
    medium: string;
  };
  bannerImage: string;
  episodes: number;
  status: string;
  genres: string[];
  meanScore: number;
  popularity: number;
  season: string;
  seasonYear: number;
}

interface AniListResponse {
  data: {
    Media: AniListMedia;
  };
}

/**
 * Fetch anime details from AniList API
 * @param id The AniList anime ID
 */
export const fetchAnimeById = async (id: number): Promise<AniListMedia> => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
        }
        description
        coverImage {
          large
          medium
        }
        bannerImage
        episodes
        status
        genres
        meanScore
        popularity
        season
        seasonYear
      }
    }
  `;

  const variables = {
    id: id
  };

  try {
    const response = await fetch(ANILIST_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    const json = await response.json();
    return json.data.Media;
  } catch (error) {
    console.error('Error fetching anime from AniList:', error);
    throw error;
  }
};

/**
 * Search for anime on AniList
 * @param searchTerm The search term
 */
export const searchAnime = async (searchTerm: string): Promise<AniListMedia[]> => {
  const query = `
    query ($search: String) {
      Page(page: 1, perPage: 10) {
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
          }
          description
          coverImage {
            large
            medium
          }
          bannerImage
          episodes
          status
          genres
          meanScore
          popularity
          season
          seasonYear
        }
      }
    }
  `;

  const variables = {
    search: searchTerm
  };

  try {
    const response = await fetch(ANILIST_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    const json = await response.json();
    return json.data.Page.media;
  } catch (error) {
    console.error('Error searching anime on AniList:', error);
    throw error;
  }
};

export type { AniListMedia };
