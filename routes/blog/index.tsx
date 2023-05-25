import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import extract from "https://deno.land/std@0.188.0/front_matter/any.ts";
import { config } from "../../config.ts";

interface Post {
  title: string;
  date: Date;
  path: string;
}
interface BlogProps {
  posts: Post[];
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const blogPath = new URL(`../../content/blog`, import.meta.url);
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
        `../../content/blog/${
          isNested ? `${entry.name}/index.md` : entry.name
        }`,
        import.meta.url,
      );
      const fileContent = await Deno.readTextFile(postPath);
      const { attrs } = extract(fileContent);
      posts.push({
        title: attrs.title as string,
        date: new Date(postDate),
        path: `/blog/${postWithoutDate}`,
      });
    }

    const resp = ctx.render(
      {
        posts: posts.sort((a, b) => b.date.getTime() - a.date.getTime()),
      } as BlogProps,
    );
    return resp;
  },
};

export default function BlogIndex({ data }: PageProps<BlogProps>) {
  const { posts } = data;
  return (
    <>
      <Head>
        <title>Blog - {config.title}</title>
      </Head>
      <article class="max-w-screen-md mx-auto px-4">
        <h1>Blog</h1>
        <ul class="">
          {posts.map((post) => (
            <li class="">
              <a href={post.path}>{post.title}</a>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
