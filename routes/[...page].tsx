import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPage } from "../src/content.ts";
import { ServerState } from "./_middleware.ts";
import { PageHeader } from "../components/PageHeader.tsx";
import { css } from "../src/markdown.ts";
import { jsonResponse } from "../src/utils.ts";

interface Props {
  page: Page;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const pageSlug = ctx.params.page;
    try {
      const page = await getPage({ slug: pageSlug });

      if (!page) {
        return ctx.renderNotFound();
      }
      const headers = req.headers.get("accept");
      const isRequestionJSON = headers?.includes("application/json");

      if (isRequestionJSON) {
        return jsonResponse(page);
      }

      ctx.state.title = `${page.title} - ${ctx.state.title}`;
      if (page.description) {
        ctx.state.description = page.description;
      }
      ctx.state.breadcrumbs = [
        {
          title: "Home",
          path: "/",
        },
        {
          title: page.title,
          path: url.pathname,
        },
      ];
      if (page.language) {
        ctx.state.language = page.language;
      }

      return ctx.render({ page });
    } catch (error) {
      console.error(error);
      return ctx.renderNotFound();
    }
  },
};

export default function Page({ data }: PageProps<Props>) {
  const { page } = data;

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
        <PageHeader title={page.title} updated={page.updatedAt} />
        <div
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: page.html }}
        >
        </div>
      </article>
    </>
  );
}
