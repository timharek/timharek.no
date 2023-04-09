import { Input, List, prompt } from './deps.ts';
import { getCurrentDate, slugify } from './src/util.ts';

const { title, description, slug, date, tags } = await prompt([
  {
    name: 'title',
    message: 'Post title',
    type: Input,
  },
  {
    name: 'slug',
    message: 'Slug',
    type: Input,
  },
  {
    name: 'description',
    message: 'Description',
    type: Input,
  },
  {
    name: 'date',
    message: 'Date',
    suggestions: [getCurrentDate()],
    type: Input,
  },
  {
    name: 'tags',
    message: 'Tags',
    type: List,
  },
]);

const file = `
+++
title = ${title}
description = ${description}
[taxonomies]
tags = [${tags && tags.map((tag) => `"${tag}"`).join(', ')}]
+++
`;

const slugifiedSlug = slugify(slug ? slug : title as string);
const filename = `${date}-${slugifiedSlug}.md`;

await Deno.writeTextFile(`../content/blog/${filename}`, file);
