import "$std/dotenv/load.ts";
import { Marked } from "npm:marked@8.0.1";
import { markedHighlight } from "npm:marked-highlight@2.0.9";
import hljs from "npm:highlight.js@11.9.0";
import { groupBy } from "./group_by.ts";
import { getMarkdownFile } from "./markdown.ts";
import { getReadingTime, getWordCount, slugify } from "./utils.ts";
import { z } from "zod";
import {
  ExternalLink,
  getAllLinks,
  getLinks,
  InternalLink,
} from "./content_links.ts";

const YYYY_MM_DD_REGEX = new RegExp(/^\d{4}-\d{2}-\d{2}/);

const SHOW_DRAFTS = Deno.env.get("SHOW_DRAFTS") === "true" ? true : false;

export const marked = new Marked(
  markedHighlight({
    async: true,
    langPrefix: "language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

const Attrs = z.object({
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().default(false),
  updated: z.date().optional(),
  language: z.enum(["en", "no"]).default("en"),
});

type Attrs = z.infer<typeof Attrs>;

const PostAttrProps = z.object({
  tags: z.array(z.string()).optional(),
});
const PostAttrs = z.intersection(
  Attrs,
  PostAttrProps,
);

type PostAttrs = z.infer<typeof PostAttrs>;

export async function getPage(
  { slug, prefix = "../content", section }: {
    slug: string;
    baseUrl?: string;
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
  const { attrs: attrsRaw, body } = await getMarkdownFile<Attrs>(fullPath);
  const attrs = Attrs.parse(attrsRaw);

  const path = section ? `${section}/${slug}` : slug;
  const page = await getProps<Page>({
    kind: "page",
    attrs,
    body,
    path,
    slug,
    section: section ?? "",
  });

  return page;
}

type PropsPage = {
  kind: "page";
  section: string;
};
type PropsPost = {
  kind: "post";
  date: Date;
  section: string;
};
type PropsSection = {
  kind: "section";
  pages: (Page | Post)[];
  subSections: Section[] | null;
};
type Props = {
  attrs: Attrs;
  body: string;
  slug: string;
  path: string;
} & (PropsPage | PropsPost | PropsSection);

async function getProps<T extends Page | Post | Section>(
  props: Props,
): Promise<T> {
  const { attrs, body, slug, path } = props;
  const html = await marked.parse(body, { gfm: true });
  const links = getLinks(body);
  const initial: Omit<Page, "section"> = {
    ...attrs,
    slug,
    path,
    readingTime: getReadingTime(body),
    wordCount: getWordCount(body),
    html,
    ...(links && { links }),
  };

  switch (props.kind) {
    case "page":
      return {
        ...initial,
        section: props.section,
      } satisfies Page as T;
    case "post":
      return {
        ...initial,
        section: props.section,
        createdAt: props.date,
        tags: parseTags(attrs),
      } satisfies Post as T;
    case "section":
      return {
        ...initial,
        pages: props.pages,
        ...(props.subSections && { subSections: props.subSections }),
      } satisfies Section as T;
    default:
      throw new Error("Unknown page kind, not possible.");
  }
}

export async function getSection(
  sectionName: string,
  prefix = "../content",
): Promise<Section> {
  const sectionPath = new URL(
    `${prefix}/${sectionName}/_index.md`,
    import.meta.url,
  );
  let pages = await getPagesFromSection(sectionName, prefix);
  const subSections = await getSubSections(sectionName, prefix);

  if (!SHOW_DRAFTS) {
    pages = pages.filter((page) => !page.draft);
  }

  const { attrs: attrsRaw, body } = await getMarkdownFile<Attrs>(sectionPath);
  const attrs = Attrs.parse(attrsRaw);
  const path = sectionName.includes("/") ? sectionName : "";

  const section = await getProps<Section>({
    kind: "section",
    attrs,
    body,
    path,
    slug: sectionName,
    pages,
    subSections,
  });
  return section;
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

  if (!SHOW_DRAFTS && post?.draft) {
    return null;
  }

  return post ? post : null;
}

export async function getPostsByTag(
  tagSlug: string,
  blogSlug = "blog",
  prefix = "../content",
): Promise<Post[] | null> {
  const allPosts = (await getSection(blogSlug, prefix)).pages as Post[];

  const postsByTag = allPosts.filter((post) =>
    post && post.tags.find((tag) => tag.slug === tagSlug)
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
    if (post && post.tags.length > 0) {
      return post.tags;
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

      const { attrs: attrsRaw, body } = await getMarkdownFile<PostAttrs>(
        postPath,
      );
      const attrs = PostAttrs.parse(attrsRaw);
      const path = `${sectionSlug}/${slug}`;

      const post = await getProps<Post>({
        kind: "post",
        attrs,
        body,
        slug,
        path,
        date: new Date(postDate),
        section: sectionSlug,
      });

      pages.push(post);
      // TODO: This shouldn't be here. It runs every time for every loop.
      pages.sort((a, b) =>
        (b as Post).createdAt.toISOString().localeCompare(
          (a as Post).createdAt.toISOString(),
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

export type Stats = {
  blogByYear: Record<string, Post[]>;
  posts: number;
  words: string;
  tags: number;
  links: {
    internal?: InternalLink[];
    external?: ExternalLink[];
  };
};

function parseTags(attrs: PostAttrs): Tag[] {
  if (!attrs.tags) {
    return [];
  }
  return attrs.tags.map((tag: string) => {
    const slug = slugify(tag);
    return {
      title: tag,
      slug,
      path: `tags/${slug}`,
    };
  });
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
    (post: Post) => post.createdAt.getFullYear().toString(),
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
