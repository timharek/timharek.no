declare namespace Log {
  interface IEntry {
    title: string;
    type: 'movie' | 'tv' | 'game' | 'book' | 'travel' | 'life';
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
      occasion: 'business' | 'pleasure';
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
