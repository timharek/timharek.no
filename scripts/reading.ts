import {
  Input,
  Number,
} from 'https://deno.land/x/cliffy@v0.25.6/prompt/mod.ts';

export async function logBook(type: 'book') {
  const currentDate = new Date().toISOString().split('T')[0];

  const title: string = await Input.prompt('What did you read?');
  const publishYear: number = await Number.prompt(
    'Which year did the book publish?',
  );
  const date: string = await Input.prompt(
    {
      message: 'When did you read it? (YYYY-MM-DD)',
      suggestions: [currentDate],
    },
  ) ?? currentDate;
  const rating: number = await Number.prompt({
    message: `How many stars for ${title}? (1-5)`,
    min: 1,
    max: 5,
  });

  const bookEntry: IBookEntry = {
    title: title,
    type: type,
    date: [{
      day: date.split('-')[2],
      month: date.split('-')[1],
      year: date.split('-')[0],
      string: date,
    }],
    details: {
      publish_year: publishYear,
      my_rating: rating,
      genres: [], // TODO: Might need to use an API to get neccessary data
    },
  };

  return bookEntry;
}
