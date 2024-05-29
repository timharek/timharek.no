import { assert, assertEquals } from "@std/assert";
import {
  getAllPages,
  getAllTags,
  getGlobalStats,
  getPage,
  getPost,
  getPostsByTag,
  getSection,
} from "./content.ts";

Deno.test("Get page", async () => {
  const prefix = "./testdata/markdown/content";
  const slug = "page";

  const page = await getPage({ slug, prefix });

  assertEquals(page.title, "Page");
  assertEquals(page.slug, "page");
  assertEquals(page.path, "page");
  assertEquals(page.readingTime, 1);
  assertEquals(page.wordCount, 13);
});

Deno.test("Get page with more fields", async () => {
  const prefix = "./testdata/markdown/content";
  const slug = "page-2";

  const page = await getPage({ slug, prefix });

  assertEquals(page.title, "Page 2");
  assertEquals(page.slug, "page-2");
  assertEquals(page.path, "page-2");
  assertEquals(page.readingTime, 1);
  assertEquals(page.wordCount, 4);
});

Deno.test("Get section with a blog-ish", async () => {
  const prefixPath = "./testdata/markdown/content";
  const sectionSlug = "blog";

  const section = await getSection(sectionSlug, prefixPath);

  assertEquals(section.title, "Blog index");
  assertEquals(section.pages.length, 2);
  assert(section.pages.some((page) => page.title === "Test post 3 in a dir"));
});

Deno.test("Get section", async () => {
  const prefixPath = "./testdata/markdown/content";
  const sectionSlug = "section";

  const section = await getSection(sectionSlug, prefixPath);

  assertEquals(section.title, "Section index");
  assertEquals(section.pages.length, 1);
  assert(section.pages.some((page) => page.title === "Section page"));
  assert(section.subSections);
  assertEquals(section.subSections.length, 1);
  assert(
    section.subSections.some((page) => page.title === "Sub section index"),
  );
});

Deno.test("Get page from section", async () => {
  const prefix = "./testdata/markdown/content";
  const slug = "page";
  const section = "section";

  const page = await getPage({ slug, prefix, section });

  assertEquals(page.title, "Section page");
});

Deno.test("Get post from blog", async () => {
  const prefix = "./testdata/markdown/content";
  const slug = "test-post";
  const section = "blog";

  const post = await getPost(slug, section, prefix);

  assert(post);
  assertEquals(post.title, "Test post");
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

  assert(posts);
  assertEquals(posts.length, 1);
});

Deno.test("Get all pages", async () => {
  const prefix = "./testdata/markdown/content";

  const pages = await getAllPages(prefix);

  assertEquals(pages.map((page) => page.title), [
    "Blog index",
    "Index page",
    "Page",
    "Page 2",
    "Section index",
    "Section page",
    "Sub section index",
    "Sub section page",
    "Test post",
    "Test post 3 in a dir",
  ]);
});

Deno.test("Get stats", async () => {
  const prefix = "./testdata/markdown/content";
  const blogSlug = "blog";

  const stats = await getGlobalStats(blogSlug, prefix);

  assertEquals(stats.posts, 2);
  assertEquals(stats.tags, 2);
  assertEquals(stats.words, "35");
  assertEquals(Object.keys(stats.blogByYear).length, 1);
});
