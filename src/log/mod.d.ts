declare namespace Log {
  interface Review {
    rating: number;
    comment?: string;
  }

  interface MovieEntry {
    type: "movie";
    release_year: number;
    review: Review;
    genres: string[];
    director?: string[];
  }

  interface TVEntry {
    type: "tv";
    release_year: number;
    review: Review;
    genres: string[];
    season: number;
    episode_count?: number;
    director?: string[];
    creator?: string[];
  }

  interface GameEntry {
    type: "game";
    release_year: number;
    review: Review;
    genres: string[];
    platform: string;
  }

  interface BookEntry {
    type: "book";
    publish_year: number;
    author: string[];
    review: Review;
    genres: string[];
  }

  interface TravelEntry {
    type: "travel";
    occasion: "business" | "pleasure";
    to_date: string;
    location: {
      country: {
        name: string;
        emoji: string;
      };
      cities: string[];
    };
  }

  interface LifeEventEntry {
    type: "life";
    description: string;
    category?: string;
  }

  type Entry =
    & {
      title: string;
      date: string;
    }
    & (
      | MovieEntry
      | TVEntry
      | GameEntry
      | BookEntry
      | TravelEntry
      | LifeEventEntry
    );
}
