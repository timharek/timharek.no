// @deno-types="./types.d.ts"

import extract from "$std/front_matter/any.ts";
import { CSS } from "gfm/mod.ts";
import { Extract } from "$std/front_matter/mod.ts";
import { getReadingTime, getWordCount, slugify } from "./utils.ts";

const YYYY_MM_DD_REGEX = new RegExp(/^\d{4}-\d{2}-\d{2}/);

export async function getMarkdownFile<T>(path: URL): Promise<Extract<T>> {
  const fileContent = await Deno.readTextFile(path);
  const markdownFile = extract<T>(fileContent);

  return markdownFile;
}

export async function getPage(
  path: string,
  prefix = "../content",
): Promise<Page> {
  const fullPath = new URL(`${prefix}/${path}`, import.meta.url);
  const { attrs, body } = await getMarkdownFile<PageAttrs>(fullPath);

  return {
    title: attrs.title,
    path: path.replace(".md", ""),
    slug: path.replace(".md", ""),
    readingTime: getReadingTime(body),
    wordCount: getWordCount(body),
    content: body,
    ...(attrs.description && { description: attrs.description }),
    ...(attrs.updated && { updated: new Date(attrs.updated) }),
    ...(attrs.draft && { draft: attrs.draft }),
  };
}

export async function getSection(
  sectionName: string,
  prefix = "../content",
): Promise<Section> {
  const sectionPath = new URL(
    `${prefix}/${sectionName}/_index.md`,
    import.meta.url,
  );
  const { attrs, body } = await getMarkdownFile<PageAttrs>(sectionPath);

  const pages = await getPagesFromSection(sectionName, prefix);

  return {
    title: attrs.title,
    path: "",
    slug: sectionName,
    readingTime: getReadingTime(body),
    wordCount: getWordCount(body),
    content: body,
    ...(pages && { pages }),
    ...(attrs.description && { description: attrs.description }),
    ...(attrs.updated && { updated: new Date(attrs.updated) }),
    ...(attrs.draft && { draft: attrs.draft }),
  };
}

export async function getBlogPost(
  slug: string,
  blogSlug = "blog",
  prefix = "../content",
): Promise<Post | null> {
  const blogSection = await getSection(blogSlug, prefix);
  const posts = blogSection.pages as Post[];

  const post = posts.find((post) => post.slug === slug);

  return post ? post : null;
}

export async function getBlogPostsByTag(
  tag: string,
  blogSlug = "blog",
): Promise<Post[] | null> {
  const allPosts = (await getSection(blogSlug)).pages as Post[];

  const postsByTag = allPosts.filter((post) =>
    post.taxonomies && post.taxonomies.tags.includes(tag)
  );

  return postsByTag.length > 0 ? postsByTag : null;
}

export async function getAllPages(): Promise<Page[]> {
  const pages: Page[] = [];
  const commonPath = "../content";
  const contentPath = new URL(commonPath, import.meta.url);
  const contentDir = Deno.readDir(contentPath);

  for await (const item of contentDir) {
    if (item.isDirectory) {
      const subPath = new URL(`${contentPath}/${item.name}`);
      const subDir = Deno.readDir(subPath);
      for await (const subItem of subDir) {
        if (subItem.isDirectory) {
          continue;
        }
        if (isSection(subItem.name)) {
          continue;
        }
        if (subItem.name.match("index.md")) {
          const path = `${item.name}/${subItem.name}`;
          const filePath = new URL(
            `${contentPath}/${item.name}/${subItem.name}`,
          );
          const { attrs, body } = await getMarkdownFile<PageAttrs>(filePath);
          pages.push({
            title: attrs.title,
            slug: subItem.name.replace(".md", ""),
            path,
            content: body,
            wordCount: getWordCount(body),
            readingTime: getReadingTime(body),
            ...(attrs.description && { description: attrs.description }),
            ...(attrs.updated && { updated: new Date(attrs.updated) }),
            ...(attrs.draft && { draft: attrs.draft }),
          });
        }
      }
      continue;
    }
    if (isSection(item.name)) {
      continue;
    }
    if (item.name === ".DS_Store") {
      continue;
    }
    const path = item.name;
    const filePath = new URL(`${contentPath}/${item.name}`);
    const { attrs, body } = await getMarkdownFile<Page>(filePath);

    pages.push({
      title: attrs.title,
      slug: item.name.replace(".md", ""),
      path,
      content: body,
      wordCount: getWordCount(body),
      readingTime: getReadingTime(body),
      ...(attrs.description && { description: attrs.description }),
      ...(attrs.updated && { updated: new Date(attrs.updated) }),
      ...(attrs.draft && { draft: attrs.draft }),
    });
  }

  return pages;
}

function isSection(path: string) {
  return path.match("_index.md|_index.no.md");
}

export async function getAllTags(): Promise<Tag[]> {
  const posts = (await getSection("blog")).pages as Post[];
  const tagsNotUnique = posts.flatMap((post) => {
    if (post.taxonomies && post.taxonomies?.tags.length > 0) {
      return post.taxonomies.tags;
    }
  });
  const tagsUnique = new Set(tagsNotUnique.filter(Boolean));
  const tags = Array.from(tagsUnique).map((tag) => {
    if (tag) {
      const slug = slugify(tag);
      return {
        title: tag,
        path: `/tags/${slug}`,
        slug,
      };
    }
  });

  return (tags as Tag[]).sort((a, b) => a?.title.localeCompare(b?.title));
}

export async function getTag(slug: string): Promise<Tag | null> {
  const tags = await getAllTags();

  const tag = tags.find((tag) => tag.slug === slug);

  return tag ? tag : null;
}

export const css = `
    ${CSS}
    .markdown-body {
      /* bg-zinc-900 */
      --color-canvas-default: rgba(24,24,27,var(--tw-bg-opacity)) !important; 
      --color-fg-default: white !important;
    }
    .markdown-body ul {
      list-style: disc;
    }
    .markdown-body ol {
      list-style: decimal;
    }
    .markdown-body figure {
      margin-block: 1rem;
    }
  `;

async function getPagesFromSection(
  section: string,
  prefix = "../content",
): Promise<Page[] | Post[]> {
  const pages: (Page | Post)[] = [];
  const commonPath = `${prefix}/${section}`;
  const contentPath = new URL(commonPath, import.meta.url);
  const contentDir = Deno.readDir(contentPath);

  for await (const item of contentDir) {
    if (item.name.match(".DS_Store|_index.md|_index.no.md")) {
      continue;
    }
    let slug = item.name.replace(".md", "");
    const filePath = new URL(`${contentPath}/${item.name}`);

    const isPost = item.name.match(YYYY_MM_DD_REGEX);
    if (isPost) {
      slug = slug.replace(YYYY_MM_DD_REGEX, "").replace("-", "");
      const postDate = isPost ? isPost[0] : "";

      const isNested = item.isDirectory;
      const postPath = new URL(
        `${commonPath}/${isNested ? `${item.name}/index.md` : item.name}`,
        import.meta.url,
      );

      const { attrs, body } = await getMarkdownFile<PostAttrs>(postPath);

      pages.push({
        title: attrs.title,
        date: new Date(postDate),
        slug,
        path: `${section}/${slug}`,
        content: body,
        wordCount: getWordCount(body),
        readingTime: getReadingTime(body),
        ...(attrs.taxonomies && { taxonomies: attrs.taxonomies }),
        ...(attrs.description && { description: attrs.description }),
        ...(attrs.updated && { updated: new Date(attrs.updated) }),
        ...(attrs.draft && { draft: attrs.draft }),
      });
      continue;
    }

    if (item.isDirectory) {
      continue;
    }
    const { attrs, body } = await getMarkdownFile<PageAttrs>(filePath);

    pages.push({
      title: attrs.title,
      slug,
      path: `${section}/${slug}`,
      content: body,
      wordCount: getWordCount(body),
      readingTime: getReadingTime(body),
      ...(attrs.description && { description: attrs.description }),
      ...(attrs.updated && { updated: new Date(attrs.updated) }),
      ...(attrs.draft && { draft: attrs.draft }),
    });
  }

  return pages;
}

export async function getGarden(): Promise<Section | null> {
  const sectionPath = new URL(`../content/garden/_index.md`, import.meta.url);
  try {
    const { attrs, body } = await getMarkdownFile<PageAttrs>(sectionPath);
    const sections = await getGardenSections();

    if (!sections) {
      return null;
    }

    return {
      title: attrs.title,
      slug: "garden",
      path: "/garden",
      wordCount: getWordCount(body),
      readingTime: getReadingTime(body),
      content: body,
      pages: sections,
      ...(attrs.description && { description: attrs.description }),
      ...(attrs.updated && { updated: new Date(attrs.updated) }),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getGardenSections(): Promise<Page[] | null> {
  const gardenPath = new URL(`../content/garden`, import.meta.url);
  const gardenDir = Deno.readDir(gardenPath);
  const sections: Page[] = [];
  for await (const entry of gardenDir) {
    if (entry.name.match("_index.md|_index.no.md")) {
      continue;
    }
    const sectionpath = new URL(
      `../content/garden/${entry.name}/_index.md`,
      import.meta.url,
    );
    const { attrs, body } = await getMarkdownFile<PageAttrs>(sectionpath);
    const section = await getGardenSection(entry.name);
    sections.push({
      title: attrs.title,
      slug: entry.name,
      path: `/garden/${entry.name}`,
      content: body,
      wordCount: getWordCount(body),
      readingTime: getReadingTime(body),
      ...(section && section.pages.length > 0 && { pages: section.pages }),
      ...(attrs.draft && { draft: attrs.draft }),
    });
  }

  if (sections.length === 0) {
    return null;
  }
  return sections;
}

export async function getGardenSection(
  sectionSlug: string,
): Promise<Section | null> {
  const sectionPath = new URL(
    `../content/garden/${sectionSlug}/_index.md`,
    import.meta.url,
  );
  try {
    const { attrs, body } = await getMarkdownFile<PageAttrs>(sectionPath);

    return {
      title: attrs.title,
      slug: sectionSlug,
      path: `/garden/${sectionSlug}`,
      wordCount: getWordCount(body),
      readingTime: getReadingTime(body),
      content: body,
      pages: await getPagesFromSection(`garden/${sectionSlug}`),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getGardenPage(
  sectionSlug: string,
  pageSlug: string,
): Promise<Page | null> {
  const section = await getGardenSection(sectionSlug);

  if (!section) {
    return null;
  }

  const page = section.pages.find((page) => page.slug === pageSlug);

  if (!page) {
    return null;
  }

  return {
    ...page,
    section: section.title,
  };
}
