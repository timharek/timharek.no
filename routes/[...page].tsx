import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "gfm/mod.ts";
import { css, getPage } from "../src/markdown.ts";
import { ServerState } from "./_middleware.ts";
import { PageHeader } from "../components/PageHeader.tsx";

interface Props {
  page: Page;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const pageSlug = ctx.params.page;
    const page = await getPage({ slug: pageSlug });

    if (!page) {
      return ctx.renderNotFound({ ...ctx.state });
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

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <article
        data-color-mode="dark"
        data-dark-theme="dark"
        class="max-w-screen-md mx-auto px-4 mb-4"
      >
        <PageHeader title={page.title} updated={page.updated} />
        <div
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: body }}
        >
        </div>
      </article>
    </>
  );
}
