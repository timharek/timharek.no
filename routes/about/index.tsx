import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "gfm/mod.ts";
import { css, getSection } from "../../src/utils.ts";
import { ServerState } from "../_middleware.ts";
import { PageHeader } from "../../components/PageHeader.tsx";

interface Props {
  page: Section;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(_req, ctx) {
    try {
      const page = await getSection("about");
      ctx.state.title = `About - ${ctx.state.title}`;
      if (page.description) {
        ctx.state.description = page.description;
      }
      return ctx.render({ ...ctx.state, page });
    } catch (error) {
      console.error(error);
      return ctx.renderNotFound();
    }
  },
};

export default function BlogPost({ data }: PageProps<Props>) {
  const { page } = data;
  const body = render(page.content);
  const title = page.title;
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
        <PageHeader title={title} updated={page.extra?.updated} />
        <div
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: body }}
        >
        </div>
      </article>
    </>
  );
}
