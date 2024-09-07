import { Input, List, Number, prompt, Select } from "@cliffy/prompt";
import { book } from "@timharek/openlibrary";
import { getCurrentDate, selectKeys } from "../utils.ts";
import { Entry, RATING_MAX, RATING_MIN } from "../schemas.ts";
import { z } from "zod";

const titleAuthorSchema = z.object({
  title: z.string(),
  author: z.string(),
});

const metadataSchema = z.object({
  date: z.string().date(),
  genres: z.array(z.string()),
  rating: z.number(),
  comment: z.string().optional(),
  selectedResult: z.string(),
});

export async function logRead(): Promise<Entry> {
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

  const searchResult = await book.search(`${title} ${author}`);
  const selectOptions = searchResult.docs.map(
    (book) => {
      return {
        name: `${book.title} (${book.first_publish_year}) by ${
          typeof book.author_name === "string"
            ? book.author_name
            : book.author_name?.join(", ")
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
      name: "comment",
      message: "Comment, what did you think?",
      type: Input,
    },
    {
      name: "rating",
      message: "How many stars? (1-5)",
      type: Number,
      min: RATING_MIN,
      max: RATING_MAX,
    },
  ]);

  const { date, genres, rating, selectedResult, comment } = metadataSchema
    .parse(
      metadataPrompt,
    );

  const result = await book.get(selectedResult.split("/")[2]);
  const bookFields =
    selectOptions.filter((book) => book.value === selectedResult)[0];

  return {
    type: "book",
    title: result.title,
    date: date,
    publish_year: bookFields.publishYear ?? 0,
    author: bookFields.author ?? [],
    review: { rating, comment: comment ?? null },
    genres,
  };
}
