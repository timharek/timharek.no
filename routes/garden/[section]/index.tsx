import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "gfm/mod.ts";
import { ServerState } from "../../_middleware.ts";
import { css, getGardenSection } from "../../../src/utils.ts";
import { PageHeader } from "../../../components/PageHeader.tsx";

interface Props {
  section: Section;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const sectionSlug = ctx.params.section;
    const section = await getGardenSection(sectionSlug);
    console.log("allPages", section);

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

export default function GardenSection({ data }: PageProps<Props>) {
  const { section } = data;
  const body = render(section.content);

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
          dangerouslySetInnerHTML={{ __html: body }}
        >
        </div>
        {section.pages &&
          (
            <ul class="list-disc pl-4">
              {section.pages.map((page) => (
                <li class="">
                  <a class="text-primary hover:underline" href={page.path}>
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
      </article>
    </>
  );
}
