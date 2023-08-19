import { assertEquals } from "$std/testing/asserts.ts";
import {
  getAllPages,
  getAllTags,
  getPage,
  getPost,
  getPostsByTag,
  getSection,
} from "./markdown.ts";

Deno.test("Get page", async () => {
  const prefix = "./testdata/markdown/content";
  const slug = "page";

  const page = await getPage({ slug, prefix });

  assertEquals(page, {
    title: "Page",
    content: "This is page.\n",
    path: "page",
    readingTime: 1,
    slug: "page",
    wordCount: 3,
    section: "main",
  });
});

Deno.test("Get page with more fields", async () => {
  const prefix = "./testdata/markdown/content";
  const slug = "page-2";

  const page = await getPage({ slug, prefix });

  assertEquals(page, {
    title: "Page 2",
    content: "This is page 2.\n",
    path: "page-2",
    readingTime: 1,
    slug: "page-2",
    wordCount: 4,
    description: "Hello world",
    updated: new Date("2023-08-18T00:00:00.000Z"),
    section: "main",
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
        section: "blog",
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
          tags: [
            {
              title: "Tag 1",
              slug: "tag-1",
              path: "tags/tag-1",
            },
            {
              title: "Tag 2",
              slug: "tag-2",
              path: "tags/tag-2",
            },
          ],
        },
        section: "blog",
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
        section: "blog",
      },
    ],
  });
});

Deno.test("Get section", async () => {
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
        section: "section",
      },
    ],
  });
});

Deno.test("Get page from section", async () => {
  const prefix = "./testdata/markdown/content";
  const slug = "page";
  const section = "section";

  const page = await getPage({ slug, prefix, section });

  assertEquals(page, {
    content: "This is section page.\n",
    path: "section/page",
    readingTime: 1,
    slug: "page",
    title: "Section page",
    wordCount: 4,
    section: "section",
  });
});

Deno.test("Get post from blog", async () => {
  const prefix = "./testdata/markdown/content";
  const slug = "test-post1";
  const section = "blog";

  const post = await getPost(slug, section, prefix);

  assertEquals(post, {
    title: "Test post 1",
    slug: "test-post1",
    path: "blog/test-post1",
    description: "This is a test post.",
    draft: true,
    date: new Date("2023-08-16"),
    content: "Lorem ipsum.\n",
    readingTime: 1,
    wordCount: 2,
    section: "blog",
  });
});

Deno.test("Get tags from blog", async () => {
  const prefix = "./testdata/markdown/content";
  const blogSlug = "blog";

  const tags = await getAllTags(blogSlug, prefix);

  assertEquals(tags, [
    {
      title: "Tag 1",
      slug: "tag-1",
      path: "tags/tag-1",
    },
    {
      title: "Tag 2",
      slug: "tag-2",
      path: "tags/tag-2",
    },
  ]);
});

Deno.test("Get posts by tag from blog", async () => {
  const prefix = "./testdata/markdown/content";
  const tagSlug = "tag-1";
  const blogSlug = "blog";

  const posts = await getPostsByTag(tagSlug, blogSlug, prefix);

  assertEquals(posts, [{
    title: "Test post",
    slug: "test-post",
    path: "blog/test-post",
    description: "This is a test post.",
    date: new Date("2023-08-17"),
    content: "Lorem ipsum.\n",
    readingTime: 1,
    wordCount: 2,
    taxonomies: {
      tags: [
        {
          title: "Tag 1",
          slug: "tag-1",
          path: "tags/tag-1",
        },
        {
          title: "Tag 2",
          slug: "tag-2",
          path: "tags/tag-2",
        },
      ],
    },
    section: "blog",
  }]);
});

Deno.test("Get all pages", async () => {
  const prefix = "./testdata/markdown/content";

  const pages = await getAllPages(prefix);

  // TODO: Remember to get subsections
  // src/testdata/markdown/content
  // └── section
  //     └── subsection
  //         ├── _index.md
  //         └── page.md
  assertEquals(pages.map((page) => page.title), [
    "Blog index",
    "Index page",
    "Page",
    "Page 2",
    "Section index",
    "Section page",
    "Test post",
    "Test post 1",
    "Test post 3 in a dir",
  ]);
});
