import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "gfm/mod.ts";
import { css, getSection } from "../../src/utils.ts";
import { ServerState } from "../_middleware.ts";

interface Props {
  markdown: string;
  frontMatter: {
    title: string;
  };
}

export const handler: Handlers<Props, ServerState> = {
  async GET(_req, ctx) {
    try {
      const { body, attrs } = await getSection("about");
      const page: Props = {
        markdown: body,
        frontMatter: attrs,
      };
      ctx.state.title = `About - ${ctx.state.title}`;
      return ctx.render({ ...ctx.state, ...page });
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
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <article
        data-color-mode="dark"
        data-dark-theme="dark"
        class="max-w-screen-md mx-auto px-4 mb-4"
      >
        <h1 class="text-4xl font-semibold mb-4">{title}</h1>
        <div
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: body }}
        >
        </div>
      </article>
    </>
  );
}
