import { Input, List, Number, prompt, Select } from "../deps.ts";
import {
  getBook,
  searchBook,
} from "https://git.sr.ht/~timharek/deno-books/blob/main/mod.ts";
import type {
  OpenLibrary,
} from "https://git.sr.ht/~timharek/deno-books/blob/main/mod.d.ts";
import { getCurrentDate, selectKeys } from "./util.ts";

export async function logBook(): Promise<Log.Entry> {
  const currentDate = getCurrentDate();

  const { title, author } = await prompt([
    {
      name: "title",
      message: "What did you read?",
      type: Input,
    },
    {
      name: "author",
      message: "Who authored the title?",
      type: Input,
    },
  ]);

  const searchResult: OpenLibrary.ISearch = await searchBook(
    `${title} ${author}`,
  );
  const selectOptions = searchResult.docs.map(
    (book: Record<string, string | string[]>) => {
      return {
        name: `${book.title} (${book.first_publish_year}) by ${
          typeof book.author_name === "string"
            ? book.author_name
            : book.author_name.join(", ")
        }`,
        publishYear: book.first_publish_year,
        author: book.author_name,
        value: book.key,
      };
    },
  );

  const { date, rating, genres, selectedResult } = await prompt([
    {
      name: "selectedResult",
      message: "Which book is correct?",
      type: Select,
      options: selectOptions,
      ...(selectOptions.length > 10 && { search: true }),
      keys: selectKeys,
    },
    {
      name: "genres",
      message: "Which genre(s)?",
      type: List,
    },
    {
      name: "date",
      message: "When did you read it? (YYYY-MM-DD)",
      type: Input,
      suggestions: [currentDate],
    },
    {
      name: "rating",
      message: "How many stars? (1-5)",
      type: Number,
    },
  ]);

  const book: OpenLibrary.IBook = await getBook(
    (selectedResult as string).split("/")[2],
  );
  const bookFields =
    selectOptions.filter((book: Record<string, string>) =>
      book.value === selectedResult
    )[0];

  return {
    type: "book",
    title: book.title,
    date: date as string,
    publish_year: bookFields.publishYear,
    author: bookFields.author,
    review: { rating: rating as number },
    genres: genres as string[],
  };
}
