import { Input, List, prompt } from "./deps.ts";
import { getCurrentDate } from "./utils.ts";
import { slugify } from "./utils.ts";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  date: z.string().transform((value) =>
    new Date(value).toISOString().split("T")[0]
  ),
  tags: z.array(z.string()),
});

const blogPrompt = await prompt([
  {
    name: "title",
    message: "Post title",
    type: Input,
  },
  {
    name: "slug",
    message: "Slug",
    type: Input,
  },
  {
    name: "description",
    message: "Description",
    type: Input,
  },
  {
    name: "date",
    message: "Date",
    suggestions: [getCurrentDate()],
    type: Input,
  },
  {
    name: "tags",
    message: "Tags",
    type: List,
  },
]);
const { title, description, slug, date, tags } = blogSchema.parse(blogPrompt);

const file = `+++
title = "${title}"
description = "${description}"
draft = true
[taxonomies]
tags = [${tags && tags.map((tag) => `"${tag}"`).join(", ")}]
+++
`;

const slugifiedSlug = slugify(slug ? slug : title);
const filename = `${date}-${slugifiedSlug}.md`;

const path = new URL(`../content/blog/${filename}`, import.meta.url);
await Deno.writeTextFile(path, file);
