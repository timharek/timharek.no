import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "gfm/mod.ts";
import { getAllPages } from "../src/utils.ts";
import { ServerState } from "./_middleware.ts";

interface Props {
  page: Page;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const pageSlug = ctx.params.page;
    const allPages = await getAllPages();

    const page = allPages.find((item) => item.slug === pageSlug);

    if (!page) {
      return ctx.renderNotFound();
    }

    ctx.state.title = `${page.title} - ${ctx.state.title}`;
    if (page.description) {
      ctx.state.description = page.description;
    }
    ctx.state.breadcrumbs = [
      {
        title: "Index",
        path: "/",
      },
      {
        title: page.title,
        path: url.pathname,
        current: true,
      },
    ];

    return ctx.render({ ...ctx.state, page });
  },
};

export default function Page({ data }: PageProps<Props>) {
  const { page } = data;
  const body = render(page.content);
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
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <article
        data-color-mode="dark"
        data-dark-theme="dark"
        class="max-w-screen-md mx-auto px-4 mb-4 markdown-body"
      >
        <h1>{page.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: body }}
        >
        </div>
      </article>
    </>
  );
}
