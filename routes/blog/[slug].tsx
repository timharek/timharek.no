import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "https://deno.land/x/gfm@0.1.26/mod.ts";
import { extract } from "https://deno.land/std@0.188.0/front_matter/any.ts";

interface BlogPostProps {
  markdown: string;
  frontMatter: {
    title: string;
  };
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;

    const blogPath = new URL(`../../content/blog`, import.meta.url);
    let postPath: string | URL = "";
    const blogDir = Deno.readDir(blogPath);
    for await (const entry of blogDir) {
      const YYYY_MM_DD_REGEX = new RegExp(/^\d{4}-\d{2}-\d{2}-/);
      const postWithoutDate = entry.name.replace(YYYY_MM_DD_REGEX, "").replace(
        ".md",
        "",
      );
      if (postWithoutDate === slug) {
        const isNested = entry.isDirectory;
        postPath = new URL(
          `../../content/blog/${
            isNested ? `${entry.name}/index.md` : entry.name
          }`,
          import.meta.url,
        );
      }
    }

    const fileContent = await Deno.readTextFile(postPath);
    const { body, attrs } = extract(fileContent);
    const page: BlogPostProps = {
      markdown: body,
      frontMatter: attrs as BlogPostProps["frontMatter"] ?? {},
    };
    const resp = ctx.render(page);
    return resp;
  },
};

export default function BlogPost({ data }: PageProps<BlogPostProps>) {
  const { markdown, frontMatter } = data;
  const body = render(markdown);
  const title = frontMatter.title;

  return (
    <>
      <Head>
        <title>{title} - Blog - Tim Hårek</title>
      </Head>
      <article class="max-w-screen-md mx-auto px-4 mb-4 prose">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
      </article>
    </>
  );
}
