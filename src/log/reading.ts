import { Input, List, Number, prompt, Select } from "../deps.ts";
import {
  getBook,
  searchBook,
} from "https://git.sr.ht/~timharek/deno-books/blob/main/mod.ts";
import type {
  OpenLibrary,
} from "https://git.sr.ht/~timharek/deno-books/blob/main/mod.d.ts";
import { getCurrentDate, selectKeys } from "../utils.ts";
import { Entry } from "../schemas.ts";
import { z } from "zod";

const titleAuthorSchema = z.object({
  title: z.string(),
  author: z.string(),
});

const metadataSchema = z.object({
  date: z.string().transform((value) =>
    new Date(value).toISOString().split("T")[0]
  ),
  genres: z.array(z.string()),
  rating: z.number(),
  selectedResult: z.string(),
});

export async function logBook(): Promise<Entry> {
  const currentDate = getCurrentDate();

  const titleAuthorPrompt = await prompt([
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

  const { title, author } = titleAuthorSchema.parse(titleAuthorPrompt);

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

  const metadataPrompt = await prompt([
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

  const { date, genres, rating, selectedResult } = metadataSchema.parse(
    metadataPrompt,
  );

  const book: OpenLibrary.IBook = await getBook(selectedResult.split("/")[2]);
  const bookFields =
    selectOptions.filter((book: Record<string, string>) =>
      book.value === selectedResult
    )[0];

  return {
    type: "book",
    title: book.title,
    date,
    publish_year: bookFields.publishYear,
    author: bookFields.author,
    review: { rating },
    genres,
  };
}
