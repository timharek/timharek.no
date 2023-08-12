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
      date: Date;
    }
    & (
      | MovieEntry
      | TVEntry
      | GameEntry
      | BookEntry
      | TravelEntry
      | LifeEventEntry
    );

  interface IEntry {
    title: string;
    type: "movie" | "tv" | "game" | "book" | "travel" | "life";
    date: IDate[];
  }

  interface IDate {
    day: string;
    month: string;
    year: string;
    string: string;
  }

  interface IWatchedEntry extends IEntry {
    details: {
      release_year: number;
      my_rating: number;
      genres: string[];
      director?: string[];
      creator?: string[];
    };
  }

  interface IGameEntry extends IEntry {
    details: {
      release_year: number;
      my_rating: number;
      genres: string[];
      platform: string[];
    };
  }

  interface IBookEntry extends IEntry {
    details: {
      publish_year: number;
      author: string[];
      my_rating: number;
      genres: string[];
    };
  }

  interface ITravelEntry extends IEntry {
    details: {
      occasion: "business" | "pleasure";
      location: {
        country: {
          name: string;
          emoji: string;
        };
        cities: string[];
      };
    };
  }

  interface ILifeEventEntry extends IEntry {
    description: string;
    details?: {
      custom_prefix: string | null;
    };
  }
}
