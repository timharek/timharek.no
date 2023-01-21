// @deno-types="./mod.d.ts"

import {
  Input,
  Select,
} from 'https://deno.land/x/cliffy@v0.25.6/prompt/mod.ts';

export async function logLifeEvent(type: 'life') {
  const currentDate = new Date().toISOString().split('T')[0];

  const title: string = await Input.prompt(
    'Which life event do you want to log?',
  );
  const description: string = await Input.prompt(
    'Add a description',
  );
  const date: string = await Input.prompt(
    {
      message: 'When did this occur? (YYYY-MM-DD)',
      suggestions: [currentDate],
    },
  ) ?? currentDate;
  const customPrefix: string = await Select.prompt(
    {
      message: 'Do you want to add a custom prefix?',
      options: [
        { name: 'Health', value: '💪 Health' },
        { name: 'Hobby', value: '🖲️ Hobby' },
        { name: 'Milestone', value: '🪨 Milestone' },
        { name: 'Writing', value: '✍️ Writing' },
        { name: 'Career', value: '💼 Career' },
        { name: 'Custom', value: 'custom' },
        { name: 'None', value: false },
      ],
    },
  );

  const lifeEntry: Log.ILifeEventEntry = {
    title,
    description,
    type,
    date: [getEntryDate(date)],
    ...(customPrefix && {
      details: {
        custom_prefix: customPrefix,
      },
    }),
  };

  return lifeEntry;
}

function getEntryDate(date: string) {
  return {
    day: date.split('-')[2],
    month: date.split('-')[1],
    year: date.split('-')[0],
    string: date,
  };
}
