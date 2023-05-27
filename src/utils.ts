import extract from "$std/front_matter/any.ts";

export async function getAllBlogPosts(): Promise<Post[]> {
  const blogPath = new URL(`../content/blog`, import.meta.url);
  const blogDir = Deno.readDir(blogPath);
  const posts: Post[] = [];
  for await (const entry of blogDir) {
    if (entry.name === "_index.md") {
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
    const fileContent = await Deno.readTextFile(postPath);
    const { attrs } = extract(fileContent);
    if (!attrs.draft) {
      posts.push({
        title: attrs.title as string,
        date: new Date(postDate),
        path: `/blog/${postWithoutDate}`,
      });
    }
  }
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}
