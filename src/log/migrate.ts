export function migrateMovie(movie: Log.IWatchedEntry): Log.Entry {
  return {
    type: "movie",
    title: movie.title,
    release_year: movie.details.release_year,
    date: new Date(movie.date[0].string),
    review: {
      rating: movie.details.my_rating,
    },
    genres: movie.details.genres,
    ...(movie.details.director && { director: movie.details.director }),
  };
}

export function migrateTVShow(tvShow: Log.IWatchedEntry): Log.Entry {
  return {
    type: "tv",
    title: removeSeasonFromTitle(tvShow.title),
    release_year: tvShow.details.release_year,
    date: new Date(tvShow.date[0].string),
    review: {
      rating: tvShow.details.my_rating,
    },
    genres: tvShow.details.genres,
    season: getSeasonFromTitle(tvShow.title),
    ...(tvShow.details.creator && { creator: tvShow.details.creator }),
  };
}

export function migrateBook(book: Log.IBookEntry): Log.Entry {
  return {
    type: "book",
    title: book.title,
    ...(book.details.author && { author: book.details.author }),
    publish_year: book.details.publish_year,
    date: new Date(book.date[0].string),
    review: {
      rating: book.details.my_rating,
    },
    genres: book.details.genres,
  };
}

export function migrateGame(game: Log.IGameEntry): Log.Entry {
  return {
    type: "game",
    title: game.title,
    platform: game.details.platform[0],
    release_year: game.details.release_year,
    date: new Date(game.date[0].string),
    review: {
      rating: game.details.my_rating,
    },
    genres: game.details.genres,
  };
}

function getSeasonFromTitle(title: string): number {
  const match = title.match(/\d+/);

  if (!match) {
    throw new Error("No number found in the string");
  }
  const season = parseInt(match[0], 10);
  return season;
}

function removeSeasonFromTitle(title: string): string {
  const modifiedTitle = title.replace(/\sS\d+$/, "");

  return modifiedTitle;
}
