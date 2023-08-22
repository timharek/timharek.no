import { render } from "gfm/mod.ts";
import { groupBy } from "./group_by.ts";
import { getMarkdownFile } from "./markdown.ts";
import { getReadingTime, getWordCount, slugify } from "./utils.ts";
import {
  DOMParser,
} from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { config } from "../config.ts";

const YYYY_MM_DD_REGEX = new RegExp(/^\d{4}-\d{2}-\d{2}/);

export async function getPage(
  { slug, prefix = "../content", section }: {
    slug: string;
    prefix?: string;
    section?: SectionProp;
  },
): Promise<Page> {
  const fullPath = new URL(
    `${prefix}/${section ? `${section}/` : ""}${
      slug === "" ? "_index" : slug
    }.md`,
    import.meta.url,
  );
  const { attrs, body } = await getMarkdownFile<PageAttrs>(fullPath);

  return {
    title: attrs.title,
    path: section ? `${section}/${slug}` : slug,
    slug,
    readingTime: getReadingTime(body),
    wordCount: getWordCount(body),
    content: body,
    section: section ? section : "main",
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
  const pages = await getPagesFromSection(sectionName, prefix);
  const subSections = await getSubSections(sectionName, prefix);

  const { attrs, body } = await getMarkdownFile<PageAttrs>(sectionPath);

  return {
    title: attrs.title,
    path: sectionName.includes("/") ? sectionName : "",
    slug: sectionName,
    readingTime: getReadingTime(body),
    wordCount: getWordCount(body),
    content: body,
    ...(pages && { pages }),
    ...(subSections && { subSections }),
    ...(attrs.description && { description: attrs.description }),
    ...(attrs.updated && { updated: new Date(attrs.updated) }),
    ...(attrs.draft && { draft: attrs.draft }),
  };
}

async function getSubSections(
  sectionParentSlug: string,
  prefix = "../content",
): Promise<Section[] | null> {
  const sections: Section[] = [];
  const path = `${prefix}/${sectionParentSlug}`;
  const sectionPath = new URL(path, import.meta.url);
  const sectionDir = Deno.readDir(sectionPath);

  for await (const item of sectionDir) {
    const isPost = item.name.match(YYYY_MM_DD_REGEX);
    if (item.isDirectory && !isPost) {
      const subSectionSlug = `${sectionParentSlug}/${item.name}`;
      const section = await getSection(subSectionSlug, prefix);
      sections.push(section);
      continue;
    }
  }

  if (sections.length === 0) {
    return null;
  }
  return sections;
}

export async function getPost(
  slug: string,
  blogSlug = "blog",
  prefix = "../content",
): Promise<Post | null> {
  const blogSection = await getSection(blogSlug, prefix);
  const posts = blogSection.pages as Post[];

  const post = posts.find((post) => post.slug === slug);

  return post ? post : null;
}

export async function getPostsByTag(
  tagSlug: string,
  blogSlug = "blog",
  prefix = "../content",
): Promise<Post[] | null> {
  const allPosts = (await getSection(blogSlug, prefix)).pages as Post[];

  const postsByTag = allPosts.filter((post) =>
    post.taxonomies && post.taxonomies.tags.find((tag) => tag.slug === tagSlug)
  );

  return postsByTag.length > 0 ? postsByTag : null;
}

export async function getAllPages(
  prefix = "../content",
): Promise<(Page | Post)[]> {
  const pages: (Page | Post)[] = [];
  const contentPath = new URL(prefix, import.meta.url);
  const contentDir = Deno.readDir(contentPath);

  for await (const item of contentDir) {
    if (item.name === ".DS_Store") {
      continue;
    }
    if (item.isDirectory) {
      const section = await getSection(item.name, prefix);
      const subSectionsPages = section.subSections?.flatMap((subSection) =>
        subSection.pages
      );
      const subSectionIndices = section.subSections?.flatMap((subSection) => {
        return {
          title: subSection.title,
          slug: subSection.slug,
          content: subSection.content,
          path: subSection.slug,
        };
      });
      if (subSectionsPages) {
        pages.push(...subSectionsPages);
      }
      if (subSectionIndices) {
        pages.push(...(subSectionIndices as Page[]));
      }
      pages.push(
        ...section.pages,
        {
          title: section.title,
          slug: section.slug,
          content: section.content,
          path: section.slug,
        } as Page,
      );
      continue;
    }
    let slug = item.name.replace(".md", "");
    if (item.name === "_index.md") {
      slug = "";
    }
    const page = await getPage({ slug, prefix });

    pages.push(page);
  }

  return pages.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getAllTags(
  blogSlug = "blog",
  prefix = "../content",
): Promise<Tag[]> {
  const posts = (await getSection(blogSlug, prefix)).pages as Post[];
  const tagsNotUnique = posts.flatMap((post) => {
    if (post.taxonomies && post.taxonomies?.tags.length > 0) {
      return post.taxonomies.tags;
    }
    return [];
  });
  const tagsStringArray = tagsNotUnique.map((str) => JSON.stringify(str));
  const uniqueArray = [...new Set(tagsStringArray)];
  const tags = uniqueArray.map((str) => JSON.parse(str) as Tag);

  return tags.sort((a, b) => a?.title.localeCompare(b?.title));
}

export async function getTag(slug: string): Promise<Tag | null> {
  const tags = await getAllTags();

  const tag = tags.find((tag) => tag.slug === slug);

  return tag ? tag : null;
}

async function getPagesFromSection(
  sectionSlug: SectionProp,
  prefix = "../content",
): Promise<Page[] | Post[]> {
  const pages: (Page | Post)[] = [];
  const commonPath = `${prefix}/${sectionSlug}`;
  const contentPath = new URL(commonPath, import.meta.url);
  const contentDir = Deno.readDir(contentPath);

  for await (const item of contentDir) {
    if (item.name.match(".DS_Store|_index.md|_index.no.md")) {
      continue;
    }
    const isPost = item.name.match(YYYY_MM_DD_REGEX);

    let slug = item.name.replace(".md", "");

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
        path: `${sectionSlug}/${slug}`,
        content: body,
        wordCount: getWordCount(body),
        readingTime: getReadingTime(body),
        section: sectionSlug,
        ...(attrs.taxonomies &&
          {
            taxonomies: {
              tags: attrs.taxonomies.tags.map((tag: string) => {
                const slug = slugify(tag);
                return {
                  title: tag,
                  slug,
                  path: `tags/${slug}`,
                };
              }),
            },
          }),
        ...(attrs.description && { description: attrs.description }),
        ...(attrs.updated && { updated: new Date(attrs.updated) }),
        ...(attrs.draft && { draft: attrs.draft }),
      });
      pages.sort((a, b) =>
        (b as Post).date.toISOString().localeCompare(
          (a as Post).date.toISOString(),
        )
      );
      continue;
    }

    if (item.isDirectory) {
      continue;
    }
    const page = await getPage({ slug, section: sectionSlug, prefix });

    pages.push(page);
  }

  return pages;
}

export interface Stats {
  blogByYear: {
    [key: string]: Post[];
  };
  posts: number;
  words: string;
  tags: number;
  links: {
    internal?: URL[];
    external?: URL[];
  };
}

export async function getGlobalStats(
  blogSlug = "blog",
  prefix = "../content",
): Promise<Stats> {
  const allPages = await getAllPages(prefix);
  const blog = await getSection(blogSlug, prefix);
  const tags = await getAllTags(blogSlug, prefix);

  const words = (allPages as Page[]).reduce((acc, item) => {
    return acc + (item.wordCount ?? 0);
  }, 0);

  const blogByYear = groupBy<string, Post>(
    blog.pages as Post[],
    (post: Post) => post.date.getFullYear().toString(),
  );

  const links = await getAllLinks(prefix);

  return {
    blogByYear,
    posts: blog.pages.length,
    words: new Intl.NumberFormat("en-IN").format(words),
    tags: tags.length,
    links: {
      internal: links?.internal,
      external: links?.external,
    },
  };
}

interface Links {
  count: number;
  internal?: URL[];
  external?: URL[];
}
export async function getAllLinks(
  prefix = "../content",
  baseUrl = config.base_url,
): Promise<Links | null> {
  const allPages = await getAllPages(prefix);

  console.log("baseUrl", baseUrl);
  const allContent = allPages.flatMap((page) =>
    render(page.content, { baseUrl })
  ).join(
    "\n",
  );

  const dom = new DOMParser().parseFromString(allContent, "text/html");
  const anchors = dom?.getElementsByTagName("a");

  if (anchors) {
    const internal = anchors.filter((link) => {
      const href = link.getAttribute("href") as string;
      const isInternalAnchor = href.indexOf("#") > -1;
      const isHeadingAnchor = link.className.includes("anchor");

      return href.includes(baseUrl) && !isInternalAnchor && !isHeadingAnchor;
    }).map((link) => new URL(link.getAttribute("href") as string));
    const external = anchors.filter((link) => {
      const href = link.getAttribute("href") as string;
      const isInternalAnchor = href.indexOf("#") > -1;
      const isHeadingAnchor = link.className.includes("anchor");

      return !href.includes(baseUrl) && !isInternalAnchor && !isHeadingAnchor;
    }).map((link) => new URL(link.getAttribute("href") as string));

    return {
      count: internal.length + external.length,
      internal,
      external,
    };
  }

  return null;
}
