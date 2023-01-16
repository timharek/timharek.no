import {
  Input,
  List,
  Number,
  Select,
} from 'https://deno.land/x/cliffy@v0.25.6/prompt/mod.ts';
import {
  getBook,
  searchBook,
} from 'https://git.sr.ht/~timharek/deno-books/blob/main/mod.ts';
import {
  OpenLibrary,
} from 'https://git.sr.ht/~timharek/deno-books/blob/main/mod.d.ts';

export async function logBook(type: 'book') {
  const currentDate = new Date().toISOString().split('T')[0];

  const title: string = await Input.prompt('What did you read?');
  const author: string = await Input.prompt(`Who authored ${title}?`);

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
  const selectedResult: string = await Select.prompt({
    message: 'Which book is correct?',
    options: selectOptions,
    ...(selectOptions.length > 10 && { search: true }),
  });

  const book: OpenLibrary.IBook = await getBook(selectedResult.split('/')[2]);
  const bookFields =
    selectOptions.filter((book: unknown) => book.value === selectedResult)[0];

  const genres: string[] = await List.prompt('Which genre(s)?');

  const date: string = await Input.prompt(
    {
      message: 'When did you read it? (YYYY-MM-DD)',
      suggestions: [currentDate],
    },
  ) ?? currentDate;
  const rating: number = await Number.prompt({
    message: `How many stars for ${title}? (1-5)`,
    min: 1,
    max: 5,
  });

  const bookEntry: IBookEntry = {
    title: book.title,
    type: type,
    date: [{
      day: date.split('-')[2],
      month: date.split('-')[1],
      year: date.split('-')[0],
      string: date,
    }],
    details: {
      publish_year: bookFields.publishYear,
      author: bookFields.author,
      my_rating: rating,
      genres,
    },
  };

  return bookEntry;
}
