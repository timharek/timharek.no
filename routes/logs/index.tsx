import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getSection } from "../../src/content.ts";
import { ServerState } from "../_middleware.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { Link } from "../../components/Link.tsx";
import { css } from "../../src/markdown.ts";

interface Props {
  section: Section;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const section = await getSection("logs");

    if (!section) {
      return ctx.renderNotFound();
    }

    ctx.state.title = `${section.title} - ${ctx.state.title}`;
    if (section.description) {
      ctx.state.description = section.description;
    }
    ctx.state.breadcrumbs = [
      {
        title: "Home",
        path: "/",
      },
      {
        title: section.title,
        path: url.pathname,
      },
    ];

    return ctx.render({ section });
  },
};

export default function Page({ data }: PageProps<Props>) {
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
        <PageHeader title={section.title} updated={section.updatedAt} />
        <div
          class="markdown-body mb-4"
          dangerouslySetInnerHTML={{ __html: section.html }}
        >
        </div>
        {section.pages &&
          (
            <ul class="list-disc pl-4">
              {section.pages.map((page) => (
                <li class="">
                  <Link href={`logs/${page.slug}`} label={page.title} />
                </li>
              ))}
            </ul>
          )}
      </article>
    </>
  );
}
