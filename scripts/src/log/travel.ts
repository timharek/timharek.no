// @deno-types="./mod.d.ts"

import { Input, prompt, Select } from '../../deps.ts';
import { getCurrentDate, getEntryDate } from '../util.ts';

export async function logTrip(type: 'travel') {
  const currentDate = getCurrentDate();

  const result = await prompt([
    {
      name: 'country',
      message: 'Which country did you travel to?',
      type: Input,
    },
    {
      name: 'countryEmoji',
      message: 'What is the flag-emoji?',
      type: Input,
    },
    {
      name: 'cities',
      message: 'Which cities did you visit? (comma seperated values)',
      type: Input,
    },
    {
      name: 'departure',
      message: 'When did you departure? (YYYY-MM-DD)',
      type: Input,
      suggestions: [currentDate],
    },
    {
      name: 'arrival',
      message: 'When did you arrive home? (YYYY-MM-DD)',
      type: Input,
      suggestions: [currentDate],
    },
    {
      name: 'occasion',
      message: 'What was the occasion?',
      type: Select,
      options: [
        { name: 'Business', value: 'business' },
        { name: 'Pleasure', value: 'pleasure' },
      ],
    },
    {
      name: 'title',
      message: 'What would you call your trip',
      type: Input,
    },
  ]);

  const { title, departure, arrival, occasion, country, countryEmoji, cities } =
    result;
  const travelEntry: Log.ITravelEntry = {
    title: title,
    type: type,
    date: [getEntryDate(departure), getEntryDate(arrival)],
    details: {
      occasion: occasion,
      location: {
        country: { name: country, emoji: countryEmoji },
        cities: getCities(cities),
      },
    },
  };

  return travelEntry;
}

function getCities(cities: string) {
  const citiesNoWhitespace = cities.replace(' ', '');
  const citiesArray = citiesNoWhitespace.split(',');
  return citiesArray;
}
