import { assertEquals } from "$std/testing/asserts.ts";
import { getPage, getSection } from "./markdown.ts";

Deno.test("Get page", async () => {
  const prefixPath = "./testdata/markdown/content";
  const path = "page.md";

  const page = await getPage(path, prefixPath);

  assertEquals(page, {
    title: "Page",
    content: "This is page.\n",
    path: "page",
    readingTime: 1,
    slug: "page",
    wordCount: 3,
  });
});

Deno.test("Get page with more fields", async () => {
  const prefixPath = "./testdata/markdown/content";
  const path = "page-2.md";

  const page = await getPage(path, prefixPath);

  assertEquals(page, {
    title: "Page 2",
    content: "This is page 2.\n",
    path: "page-2",
    readingTime: 1,
    slug: "page-2",
    wordCount: 4,
    description: "Hello world",
    updated: new Date("2023-08-18T00:00:00.000Z"),
  });
});

Deno.test("Get section with a blog-ish", async () => {
  const prefixPath = "./testdata/markdown/content";
  const sectionSlug = "blog";

  const section = await getSection(sectionSlug, prefixPath);

  assertEquals(section, {
    title: "Blog index",
    content: "This is the blog index.\n",
    path: "",
    readingTime: 1,
    slug: "blog",
    wordCount: 5,
    pages: [
      {
        title: "Test post 3 in a dir",
        slug: "test-post3-in-dir",
        path: "blog/test-post3-in-dir",
        description: "This post is within a dir.",
        date: new Date("2023-08-18"),
        content: "Lorem ipsum.\n",
        readingTime: 1,
        wordCount: 2,
      },
      {
        title: "Test post",
        slug: "test-post",
        path: "blog/test-post",
        description: "This is a test post.",
        date: new Date("2023-08-17"),
        content: "Lorem ipsum.\n",
        readingTime: 1,
        wordCount: 2,
        taxonomies: {
          tags: ["Tag 1", "Tag 2"],
        },
      },
      {
        title: "Test post 1",
        slug: "test-post1",
        path: "blog/test-post1",
        description: "This is a test post.",
        draft: true,
        date: new Date("2023-08-16"),
        content: "Lorem ipsum.\n",
        readingTime: 1,
        wordCount: 2,
      },
    ],
  });
});

Deno.test("Get section 2", async () => {
  const prefixPath = "./testdata/markdown/content";
  const sectionSlug = "section";

  const section = await getSection(sectionSlug, prefixPath);

  assertEquals(section, {
    title: "Section index",
    content: "This is section index.\n",
    path: "",
    readingTime: 1,
    slug: "section",
    wordCount: 4,
    pages: [
      {
        content: "This is section page.\n",
        path: "section/page",
        readingTime: 1,
        slug: "page",
        title: "Section page",
        wordCount: 4,
      },
    ],
  });
});
