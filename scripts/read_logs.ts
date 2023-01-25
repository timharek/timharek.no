// @deno-types="./mod.d.ts"

import { Confirm, logPath, Select } from './deps.ts';

async function readFile() {
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

  const titles = file.map((item) => {
    return { name: `${item.title}`, value: `${item.title}` };
  });

  const selectedTitle: string = await Select.prompt({
    message: 'Which title do you to view in more detail?',
    options: titles,
    search: true,
  });

  console.log(selectedTitle);

  const details: unknown = file.find((item) => item.title === selectedTitle);

  console.log(details);

  const continueOnward: boolean = await Confirm.prompt('Look through more?');
  if (continueOnward) {
    await readFile();
  }
}

await readFile();
