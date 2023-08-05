import extract from "$std/front_matter/any.ts";

export function slugify(text: string): string {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\./g, "-") // Replace spaces with -
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export async function getMarkdownFile<T>(path: URL) {
  const fileContent = await Deno.readTextFile(path);
  const markdownFile = extract<T>(fileContent);

  return markdownFile;
}

export async function getSection(sectionName: string) {
  const sectionPath = new URL(
    `../content/${sectionName}/_index.md`,
    import.meta.url,
  );
  const section = await getMarkdownFile<Section>(sectionPath);

  return section;
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
    const postWithoutDate = entry.name.replace(YYYY_MM_DD_REGEX, "").replace(
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
        date: new Date(postDate),
        path: `/blog/${postWithoutDate}`,
        taxonomies: attrs.taxonomies,
        content: body,
      });
    }
  }
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getBlogPostsByTag(tag: string): Promise<Post[] | null> {
  const allPosts = await getAllBlogPosts();

  const postsByTag = allPosts.filter((post) =>
    post.taxonomies && post.taxonomies.tags.includes(tag)
  );

  return postsByTag.length > 0 ? postsByTag : null;
}

interface PageQuery {
  name: string;
  path: string;
}
export async function getAllPages(): Promise<PageQuery[]> {
  const pages: PageQuery[] = [];
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
          pages.push({
            name: item.name.replace(".md", ""),
            path: `${contentPath}/${item.name}/${subItem.name}`,
          });
        }
      }
      continue;
    }
    if (isSection(item.name)) {
      continue;
    }
    pages.push({
      name: item.name.replace(".md", ""),
      path: `${contentPath}/${item.name}`,
    });
  }

  return pages;
}

function isSection(path: string) {
  return path.match("_index.md|_index.no.md");
}

export async function getAllTags(): Promise<Tag[]> {
  const posts = await getAllBlogPosts();
  const tagsUnique = new Set(
    posts.flatMap((post) => {
      if (post.taxonomies && post.taxonomies?.tags.length > 0) {
        return post.taxonomies.tags;
      }
    }).filter((tag) => tag !== undefined),
  );
  const tags: Tag[] = Array.from(tagsUnique).map((tag) => {
    if (tag) {
      const slug = slugify(tag);
      return {
        title: tag,
        path: `/tags/${slug}`,
        slug,
      };
    }
  });

  return tags.sort((a, b) => a?.title.localeCompare(b?.title));
}

export async function getTag(slug: string): Promise<Tag | null> {
  const tags = await getAllTags();

  const tag = tags.find((tag) => tag.slug === slug);

  return tag ? tag : null;
}
