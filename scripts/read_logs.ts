// @deno-types="./mod.d.ts"

import { logPath, Select } from './deps.ts';

const type: 'movie' | 'tv' | 'game' | 'book' | 'life' = await Select.prompt({
  message: 'What do you want to log?',
  options: [
    { name: 'Movie', value: 'movie' },
    { name: 'TV Show', value: 'tv' },
    { name: 'Game', value: 'game' },
    { name: 'Book', value: 'book' },
    { name: 'Travel', value: 'travel' },
    { name: 'Life event', value: 'life' },
  ],
  search: true,
});

const fileToRead = logPath[type];

const file: Log.IEntry[] = JSON.parse(await Deno.readTextFile(fileToRead));

const parsedFile = file.map((item) => `${item.title}`);

console.log(parsedFile);
