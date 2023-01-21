// @deno-types="./mod.d.ts"

import {
  Input,
  Select,
} from 'https://deno.land/x/cliffy@v0.25.6/prompt/mod.ts';

export async function logTrip(type: 'travel') {
  const currentDate = new Date().toISOString().split('T')[0];

  const country: string = await Input.prompt(
    'Which country did you travel to?',
  );
  const countryEmoji: string = await Input.prompt(
    `What is the flag-emoji for ${country}`,
  );
  const cities: string = await Input.prompt(
    'Which cities did you visit? (comma seperated values)',
  );
  const departure: string = await Input.prompt(
    {
      message: 'When did you departure? (YYYY-MM-DD)',
      suggestions: [currentDate],
    },
  ) ?? currentDate;
  const arrival: string = await Input.prompt(
    {
      message: 'When did you arrive home? (YYYY-MM-DD)',
      suggestions: [currentDate],
    },
  ) ?? currentDate;
  const occasion: 'business' | 'pleasure' = await Select.prompt({
    message: 'What was the occasion?',
    options: [
      { name: 'Business', value: 'business' },
      { name: 'Pleasure', value: 'pleasure' },
    ],
  });

  const title: string = await Input.prompt(`What would you call your trip`);

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

function getEntryDate(date: string) {
  return {
    day: date.split('-')[2],
    month: date.split('-')[1],
    year: date.split('-')[0],
    string: date,
  };
}

function getCities(cities: string) {
  const citiesNoWhitespace = cities.replace(' ', '');
  const citiesArray = citiesNoWhitespace.split(',');
  return citiesArray;
}
