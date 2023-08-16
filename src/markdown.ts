// @deno-types="./types.d.ts"

import extract from "$std/front_matter/any.ts";
import { CSS } from "gfm/mod.ts";
import { Extract } from "$std/front_matter/mod.ts";
import { getReadingTime, getWordCount, slugify } from "./utils.ts";

export async function getMarkdownFile<T>(path: URL): Promise<Extract<T>> {
  const fileContent = await Deno.readTextFile(path);
  const markdownFile = extract<T>(fileContent);

  return markdownFile;
}

export async function getPage(path: string): Promise<Page> {
  const fullPath = new URL(`../content/${path}`, import.meta.url);
  const { attrs, body } = await getMarkdownFile<Page>(fullPath);

  return {
    ...attrs,
    content: body,
  };
}

export async function getSection(sectionName: string): Promise<Section> {
  const sectionPath = new URL(
    `../content/${sectionName}/_index.md`,
    import.meta.url,
  );
  const { attrs, body } = await getMarkdownFile<Section>(sectionPath);

  const pages = await getPagesFromSection(sectionName);

  return {
    ...attrs,
    content: body,
    ...(pages && { pages }),
  };
}

export async function getAllBlogPosts(): Promise<Post[]> {
  const blogPath = new URL(`../content/blog`, import.meta.url);
  const blogDir = Deno.readDir(blogPath);
  const posts: Post[] = [];
  for await (const entry of blogDir) {
    if (entry.name === "_index.md" || entry.name === "_index.no.md") {
      continue;
    }
    const YYYY_MM_DD_REGEX = new RegExp(/^\d{4}-\d{2}-\d{2}/);
    const postDateMatch = entry.name.match(YYYY_MM_DD_REGEX);
    const postDate = postDateMatch ? postDateMatch[0] : "";
    const postSlugWithoutDate = entry.name.replace(YYYY_MM_DD_REGEX, "")
      .replace(
        "-",
        "",
      ).replace(
        ".md",
        "",
      );
    const isNested = entry.isDirectory;
    const postPath = new URL(
      `../content/blog/${isNested ? `${entry.name}/index.md` : entry.name}`,
      import.meta.url,
    );
    const { attrs, body } = await getMarkdownFile<Post>(postPath);
    if (!attrs.draft) {
      posts.push({
        title: attrs.title,
        description: attrs.description,
        slug: postSlugWithoutDate,
        date: new Date(postDate),
        path: `/blog/${postSlugWithoutDate}`,
        taxonomies: attrs.taxonomies,
        content: body,
        wordCount: getWordCount(body),
        readingTime: getReadingTime(body),
        ...(attrs.updated && { updated: attrs.updated }),
      });
    }
  }
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getBlogPost(slug: string): Promise<Post | null> {
  const posts = await getAllBlogPosts();
  const post = posts.find((post) => post.slug === slug);

  return post ? post : null;
}

export async function getBlogPostsByTag(tag: string): Promise<Post[] | null> {
  const allPosts = await getAllBlogPosts();

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
          const { attrs, body } = await getMarkdownFile<Page>(filePath);
          if (!attrs.draft) {
            pages.push({
              title: attrs.title,
              description: attrs.description,
              slug: subItem.name.replace(".md", ""),
              path,
              content: body,
              wordCount: getWordCount(body),
              readingTime: getReadingTime(body),
              ...(attrs.updated && { updated: attrs.updated }),
            });
          }
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
    if (!attrs.draft) {
      pages.push({
        title: attrs.title,
        description: attrs.description,
        slug: item.name.replace(".md", ""),
        path,
        content: body,
        wordCount: getWordCount(body),
        readingTime: getReadingTime(body),
        ...(attrs.updated && { updated: attrs.updated }),
      });
    }
  }

  return pages;
}

function isSection(path: string) {
  return path.match("_index.md|_index.no.md");
}

export async function getAllTags(): Promise<Tag[]> {
  const posts = await getAllBlogPosts();
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

async function getPagesFromSection(section: string): Promise<Page[]> {
  const pages: Page[] = [];
  const commonPath = `../content/${section}`;
  const contentPath = new URL(commonPath, import.meta.url);
  const contentDir = Deno.readDir(contentPath);

  for await (const item of contentDir) {
    if (item.name.match(".DS_Store|_index.md|_index.no.md")) {
      continue;
    }
    const path = item.name;
    const filePath = new URL(`${contentPath}/${item.name}`);
    const { attrs, body } = await getMarkdownFile<Page>(filePath);
    if (!attrs.draft) {
      pages.push({
        title: attrs.title,
        slug: item.name.replace(".md", ""),
        path,
        content: body,
        wordCount: getWordCount(body),
        readingTime: getReadingTime(body),
        ...(attrs.updated && { updated: attrs.updated }),
        ...(attrs.extra && { extra: attrs.extra }),
      });
    }
  }

  return pages;
}

export async function getGarden(): Promise<Section | null> {
  const sectionPath = new URL(`../content/garden/_index.md`, import.meta.url);
  try {
    const { attrs, body } = await getMarkdownFile<Section>(sectionPath);
    const sections = await getGardenSections();

    if (!sections) {
      return null;
    }

    return {
      ...attrs,
      slug: "garden",
      content: body,
      pages: sections,
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
    const { attrs, body } = await getMarkdownFile<Section>(sectionpath);
    if (!attrs.draft) {
      const section = await getGardenSection(entry.name);
      sections.push({
        title: attrs.title,
        slug: entry.name,
        path: `/garden/${entry.name}`,
        content: body,
        wordCount: getWordCount(body),
        readingTime: getReadingTime(body),
        ...(section && section.pages.length > 0 && { pages: section.pages }),
      });
    }
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
    const { attrs, body } = await getMarkdownFile<Section>(sectionPath);

    return {
      ...attrs,
      slug: sectionSlug,
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
