import type { Bookmark } from "@timharek/linkding";
import { Input, List, prompt } from "@cliffy/prompt";
import { bookmarks } from "@timharek/linkding";
import { getAllTags } from "./content.ts";
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
      suggestions: titleInput ? [slugify(titleInput)] : [],
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
      list: true,
      info: true,
      suggestions: (await getAllTags()).map((tag) => tag.title),
    },
  ]);
};

async function getRecentBookmarks() {
  const today = new Date();
  const todaysYearAndMonth = `${today.getFullYear()}-${
    new Intl.DateTimeFormat("en-US", { month: "2-digit" }).format(today)
  }`;
  const recentBookmarks = await bookmarks({ limit: 150 });
  const recentBookmarksFromThisMonth = recentBookmarks.results.filter((
    bookmark: Bookmark,
  ) =>
    bookmark.date_modified.includes(todaysYearAndMonth) &&
    bookmark.unread === false && bookmark.notes
  );

  return recentBookmarksFromThisMonth;
}

function makeBookmarksIntoLinkList(bookmarks: Bookmark[]) {
  const markdownList = bookmarks.map((bookmark) =>
    `- [${bookmark.website_title}] – ${bookmark.notes}`
  );
  const footerLinks = bookmarks.map((bookmark) =>
    `[${bookmark.website_title}]: ${bookmark.url}`
  );

  return `## 🌐 Links

${markdownList.join("\n")}

${footerLinks.join("\n")}`;
}

async function recentlyPost() {
  const bookmarks = await getRecentBookmarks();

  return `
<!-- TODO: Add brief intro -->

## 🍀 Life

<!-- TODO: What has been going on -->

## 💪 Health

<!-- TODO: Have you been keeping active? -->

## 🧑‍💻 Development

<!-- TODO: What have you programming as of late? -->

## 🎬 Entertainment

<!-- TODO: What have you been watching this past month -->

${makeBookmarksIntoLinkList(bookmarks)}`;
}

if (import.meta.main) {
  const titleInput = Deno.args[0];
  const { title, description, slug, date, tags } = blogSchema.parse(
    await blogPrompt(titleInput),
  );

  const isRecentlyPost = tags.includes("Recently");
  const file = `+++
title = "${title}"
description = "${description}"
draft = true
tags = [${tags && tags.map((tag) => `"${tag}"`).join(", ")}]
+++
${isRecentlyPost ? await recentlyPost() : ""}
`;

  const slugifiedSlug = slugify(slug ? slug : title);
  const filename = `${date}-${slugifiedSlug}.md`;

  const path = new URL(`../content/blog/${filename}`, import.meta.url);
  await Deno.writeTextFile(path, file);
}
