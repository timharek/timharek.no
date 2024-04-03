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

const blogPrompt = async (titleInput?: string) => {
  return await prompt([
    {
      name: "title",
      message: "Post title",
      type: Input,
      before: async (result, next) => {
        if (titleInput) {
          result.title = titleInput;
          await next("slug");
        } else {
          await next();
        }
      },
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
};

if (import.meta.main) {
  const titleInput = Deno.args[0];
  const { title, description, slug, date, tags } = blogSchema.parse(
    await blogPrompt(titleInput),
  );

  const file = `+++
title = "${title}"
description = "${description}"
draft = true
tags = [${tags && tags.map((tag) => `"${tag}"`).join(", ")}]
+++
`;

  const slugifiedSlug = slugify(slug ? slug : title);
  const filename = `${date}-${slugifiedSlug}.md`;

  const path = new URL(`../content/blog/${filename}`, import.meta.url);
  await Deno.writeTextFile(path, file);
}
