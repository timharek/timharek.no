import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "https://deno.land/x/gfm@0.1.26/mod.ts";
import { extract } from "https://deno.land/std@0.188.0/front_matter/any.ts";
import { exists } from "https://deno.land/std@0.189.0/fs/exists.ts";

interface Props {
  markdown: string;
  frontMatter: {
    title: string;
  };
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const page = ctx.params.page;

    const commonPath = `../content/${page}`;
    let pagePath = new URL(commonPath, import.meta.url);
    const dirOrFile = await exists(pagePath);
    if (!dirOrFile) {
      pagePath = new URL(`${commonPath}.md`, import.meta.url);
    } else {
      pagePath = new URL(`${commonPath}/index.md`, import.meta.url);
    }

    try {
      const fileContent = await Deno.readTextFile(pagePath);
      const { body, attrs } = extract(fileContent);
      const page: Props = {
        markdown: body,
        frontMatter: attrs as Props["frontMatter"] ?? {},
      };
      return ctx.render(page);
    } catch (error) {
      console.error(error);
      return ctx.renderNotFound();
    }
  },
};

export default function BlogPost({ data }: PageProps<Props>) {
  const { markdown, frontMatter } = data;
  const body = render(markdown);
  const title = frontMatter.title;

  return (
    <>
      <Head>
        <title>{title} - Tim Hårek</title>
      </Head>
      <article class="max-w-screen-md mx-auto px-4">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
      </article>
    </>
  );
}
