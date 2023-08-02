import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "gfm/mod.ts";
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
  const css = `
    ${CSS}
    .markdown-body {
      background-color: rgba(24,24,27,var(--tw-bg-opacity)); // bg-zinc-900
    }
    .markdown-body ul {
      list-style: disc;
    }
  `;

  return (
    <>
      <Head>
        <title>{title} - Tim Hårek</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <article
        data-color-mode="dark"
        data-dark-theme="dark"
        class="max-w-screen-md mx-auto px-4 mb-4 markdown-body"
      >
        <h1>{title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: body }}
        >
        </div>
      </article>
    </>
  );
}
