declare interface IEntry {
  title: string;
  type: 'movie' | 'tv' | 'game' | 'book' | 'travel' | 'life';
  date: IDate[];
}

declare interface IDate {
  day: string;
  month: string;
  year: string;
  string: string;
}

declare interface IWatchedEntry extends IEntry {
  details: {
    release_year: number;
    my_rating: number;
    genres: string[];
    director?: string[];
    creator?: string[];
  };
}

declare interface IGameEntry extends IEntry {
  details: {
    release_year: number;
    my_rating: number;
    genres: string[];
    platform: string[];
  };
}

declare interface IBookEntry extends IEntry {
  details: {
    publish_year: number;
    author: string[];
    my_rating: number;
    genres: string[];
  };
}

declare interface ITravelEntry extends IEntry {
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

declare interface ILifeEventEntry extends IEntry {
  description: string;
  details?: {
    custom_prefix: string | null;
  };
}
