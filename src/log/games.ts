import { Input, Number, prompt } from "../deps.ts";
import { Entry } from "../schemas.ts";
import { getCurrentDate } from "../utils.ts";

export async function logGame(): Promise<Entry> {
  const currentDate = getCurrentDate();

  const result = await prompt([{
    name: "title",
    message: "What did you play?",
    type: Input,
  }, {
    name: "platform",
    message: "Which platform did you play it on?",
    type: Input,
  }, {
    name: "releaseYear",
    message: "Which year did the game release?",
    type: Number,
  }, {
    name: "date",
    message: "When did you play it? (YYYY-MM-DD)",
    type: Input,
    suggestions: [currentDate],
  }, {
    name: "rating",
    message: "How many stars? (1-5)",
    type: Number,
    min: 1,
    max: 5,
  }]);

  const { title, date, releaseYear, rating, platform } = result;

  if (!title || !date || !releaseYear || !rating || !platform) {
    throw new Error("Missing some fields");
  }

  return {
    title: title,
    type: "game",
    date: date,
    release_year: releaseYear,
    review: { rating },
    genres: [], // TODO: Might need to use an API to get neccessary data
    platform: platform,
  };
}
