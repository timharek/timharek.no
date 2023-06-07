import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "https://deno.land/x/gfm@0.1.26/mod.ts";
import { getSection } from "../../src/utils.ts";

interface Props {
  markdown: string;
  frontMatter: {
    title: string;
  };
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      const { body, attrs } = await getSection("about");
      const page: Props = {
        markdown: body,
        frontMatter: attrs,
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
      <article class="max-w-screen-md mx-auto px-4 mb-4 prose">
        <h1>{title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: body }}
        >
        </div>
      </article>
    </>
  );
}
