// @deno-types="./mod.d.ts"

import { Input, List, prompt, Select } from "../deps.ts";
import { getCurrentDate, getEntryDate, selectKeys } from "./util.ts";

export async function logTrip(type: "travel") {
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

  const travelEntry: Log.ITravelEntry = {
    title: title,
    type: type,
    date: [getEntryDate(departure), getEntryDate(arrival)],
    details: {
      occasion: occasion,
      location: {
        country: { name: country, emoji: countryEmoji },
        cities: cities,
      },
    },
  };

  return travelEntry;
}
