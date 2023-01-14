declare interface IEntry {
  title: string;
  type: 'movie' | 'tv' | 'game' | 'book';
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
    my_rating: number;
    genres: string[];
  };
}