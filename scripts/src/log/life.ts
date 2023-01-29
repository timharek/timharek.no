// @deno-types="../../mod.d.ts"

import { Input, prompt, Select } from '../../deps.ts';
import { getCurrentDate, getEntryDate, selectKeys } from '../util.ts';

export async function logLifeEvent(type: 'life') {
  const currentDate = getCurrentDate();

  const { title, description, date, customPrefix } = await prompt([
    {
      name: 'title',
      message: 'Which life event do you want to log?',
      type: Input,
    },
    {
      name: 'description',
      message: 'Add a description',
      type: Input,
    },
    {
      name: 'date',
      message: 'When did this occur? (YYYY-MM-DD)',
      type: Input,
      suggestions: [currentDate],
    },
    {
      name: 'customPrefix',
      message: 'Do you want to add a custom prefix?',
      type: Select,
      options: [
        { name: 'Health', value: '💪 Health' },
        { name: 'Hobby', value: '🖲️ Hobby' },
        { name: 'Milestone', value: '🪨 Milestone' },
        { name: 'Writing', value: '✍️ Writing' },
        { name: 'Career', value: '💼 Career' },
        { name: 'Custom', value: 'custom' },
        { name: 'None', value: '0' },
      ],
      search: true,
      keys: selectKeys,
    },
  ]);

  const lifeEntry: Log.ILifeEventEntry = {
    title,
    description,
    type,
    date: [getEntryDate(date)],
    ...(customPrefix && customPrefix != '0' && {
      details: {
        custom_prefix: await getCustomPrefix(customPrefix),
      },
    }),
  };

  return lifeEntry;
}

async function getCustomPrefix(prefix: string): Promise<string> {
  if (prefix === 'custom') {
    const { prefix } = await prompt([{
      name: 'prefix',
      message: 'Enter custom prefix',
      type: Input,
    }]);
    return prefix;
  }
  return prefix;
}

export const LifeTesting = {
  getCustomPrefix,
};
