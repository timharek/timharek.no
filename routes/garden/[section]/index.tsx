import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "../../_middleware.ts";
import { getSection } from "../../../src/content.ts";
import { PageHeader } from "../../../components/PageHeader.tsx";
import { Link } from "../../../components/Link.tsx";
import { css } from "../../../src/markdown.ts";

interface Props extends ServerState {
  section?: Section;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const sectionSlug = ctx.params.section;
    const section = await getSection(`garden/${sectionSlug}`);

    if (!section) {
      return ctx.renderNotFound({ ...ctx.state });
    }

    ctx.state.title = `${section.title} - ${ctx.state.title}`;
    if (section.description) {
      ctx.state.description = section.description;
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
        path: url.pathname,
        current: true,
      },
    ];

    return ctx.render({ ...ctx.state, section });
  },
};

export default function GardenSection({ data }: PageProps<Required<Props>>) {
  const { section } = data;

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
        <PageHeader title={section.title} updated={section.updated} />
        <div
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: section.html }}
        >
        </div>
        {section.pages &&
          (
            <ul class="list-disc pl-4">
              {section.pages.map((page) => (
                <li class="">
                  <Link
                    href={`/${page.path}`}
                    label={page.title}
                  />
                </li>
              ))}
            </ul>
          )}
      </article>
    </>
  );
}
