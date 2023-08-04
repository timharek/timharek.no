import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "gfm/mod.ts";
import { getAllPages, getMarkdownFile } from "../src/utils.ts";
import { ServerState } from "./_middleware.ts";

interface Props {
  markdown: string;
  frontMatter: Page;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(_req, ctx) {
    const page = ctx.params.page;
    const allPages = await getAllPages();

    const pageQuery = allPages.find((item) => item.name === page);

    if (!pageQuery) {
      return ctx.renderNotFound();
    }

    try {
      const { body, attrs } = await getMarkdownFile<Page>(
        new URL(pageQuery.path),
      );
      const page: Props = {
        markdown: body,
        frontMatter: attrs,
      };
      ctx.state.title = `${page.frontMatter.title} - ${ctx.state.title}`;
      ctx.state.description = page.frontMatter.description ??
        ctx.state.description;

      return ctx.render({ ...ctx.state, ...page });
    } catch (error) {
      console.error(error);
      return ctx.renderNotFound();
    }
  },
};

export default function Page({ data }: PageProps<Props>) {
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
