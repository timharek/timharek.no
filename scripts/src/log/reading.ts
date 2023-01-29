// @deno-types="../../mod.d.ts"

import { Input, List, Number, prompt, Select } from '../../deps.ts';
import {
  getBook,
  searchBook,
} from 'https://git.sr.ht/~timharek/deno-books/blob/main/mod.ts';
import {
  OpenLibrary,
} from 'https://git.sr.ht/~timharek/deno-books/blob/main/mod.d.ts';
import { getCurrentDate, getEntryDate, selectKeys } from '../util.ts';

export async function logBook(type: 'book') {
  const currentDate = getCurrentDate();

  const { title, author } = await prompt([
    {
      name: 'title',
      message: 'What did you read?',
      type: Input,
    },
    {
      name: 'author',
      message: 'Who authored the title?',
      type: Input,
    },
  ]);

  const searchResult: OpenLibrary.ISearch = await searchBook(
    `${title} ${author}`,
  );
  const selectOptions = searchResult.docs.map((book) => {
    return {
      name: `${book.title} (${book.first_publish_year}) by ${
        book.author_name.join(', ')
      }`,
      publishYear: book.first_publish_year,
      author: book.author_name,
      value: book.key,
    };
  });

  const { date, rating, genres, selectedResult } = await prompt([
    {
      name: 'selectedResult',
      message: 'Which book is correct?',
      type: Select,
      options: selectOptions,
      ...(selectOptions.length > 10 && { search: true }),
      keys: selectKeys,
    },
    {
      name: 'genres',
      message: 'Which genre(s)?',
      type: List,
    },
    {
      name: 'date',
      message: 'When did you read it? (YYYY-MM-DD)',
      type: Input,
      suggestions: [currentDate],
    },
    {
      name: 'rating',
      message: 'How many stars? (1-5)',
      type: Number,
    },
  ]);

  const book: OpenLibrary.IBook = await getBook(selectedResult.split('/')[2]);
  const bookFields =
    selectOptions.filter((book: unknown) => book.value === selectedResult)[0];

  const bookEntry: Log.IBookEntry = {
    title: book.title,
    type: type,
    date: [getEntryDate(date)],
    details: {
      publish_year: bookFields.publishYear,
      author: bookFields.author,
      my_rating: rating,
      genres,
    },
  };

  return bookEntry;
}
