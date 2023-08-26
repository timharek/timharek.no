import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "../../_middleware.ts";
import { getPage, getSection } from "../../../src/content.ts";
import { PageHeader } from "../../../components/PageHeader.tsx";
import { css } from "../../../src/markdown.ts";

interface Props {
  page: Page;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const sectionSlug = ctx.params.section;
    const pageSlug = ctx.params.slug;
    const sectionAndPage = `garden/${sectionSlug}/${pageSlug}`;
    const section = await getSection(`garden/${sectionSlug}`);
    const page = await getPage({ slug: sectionAndPage });

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
        title: "Garden",
        path: "/garden",
      },
      {
        title: section.title,
        path: `/${section.path}`,
      },
      {
        title: page.title,
        path: url.pathname,
        current: true,
      },
    ];

    return ctx.render({ page });
  },
};

export default function GardenPage({ data }: PageProps<Props>) {
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
        <PageHeader title={page.title} updated={page.updated} />
        <div
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: page.html }}
        >
        </div>
      </article>
    </>
  );
}
