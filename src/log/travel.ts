import { Input, List, prompt, Select } from "cliffy";
import { Entry, Log } from "../schemas.ts";
import { getCurrentDate, selectKeys } from "../utils.ts";

export async function logTrip(): Promise<Entry> {
  const currentDate = getCurrentDate();

  const { title, departure, arrival, occasion, country, countryEmoji, cities } =
    await prompt([
      {
        name: "country",
        message: "Which country did you travel to?",
        type: Input,
      },
      {
        name: "countryEmoji",
        message: "What is the flag-emoji?",
        type: Input,
      },
      {
        name: "cities",
        message: "Which cities did you visit? (comma separated)",
        type: List,
      },
      {
        name: "departure",
        message: "When did you departure? (YYYY-MM-DD)",
        type: Input,
        suggestions: [currentDate],
      },
      {
        name: "arrival",
        message: "When did you arrive home? (YYYY-MM-DD)",
        type: Input,
        suggestions: [currentDate],
      },
      {
        name: "occasion",
        message: "What was the occasion?",
        type: Select,
        options: [
          { name: "Business", value: "business" },
          { name: "Pleasure", value: "pleasure" },
        ],
        keys: selectKeys,
      },
      {
        name: "title",
        message: "What would you call your trip",
        type: Input,
      },
    ]);

  if (
    !title || !departure || !arrival || !occasion || !country ||
    !countryEmoji || !cities
  ) {
    throw new Error("Missing some fields");
  }

  return {
    type: "travel",
    title: title,
    date: departure,
    to_date: arrival,
    occasion: Log.Occassion.parse(occasion),
    location: {
      country: { name: country, emoji: countryEmoji },
      cities: cities,
    },
  };
}
