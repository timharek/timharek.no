import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { css, getPage } from "../../src/utils.ts";
import { ServerState } from "../_middleware.ts";
import { render } from "gfm/mod.ts";
import { Link } from "../../components/Link.tsx";

interface Props {
  entries: Record<string, string>[];
  page: Page;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const page = await getPage("logs/feedroll.md");

    if (!page) {
      return ctx.renderNotFound({ ...ctx.state });
    }

    const files = ["../../static/api/blogroll.json"];

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
        title: "Logs",
        path: "/logs",
      },
      {
        title: page.title,
        path: url.pathname,
        current: true,
      },
    ];

    const headers = req.headers.get("accept");
    const isRequestingHtml = headers?.includes("text/html");
    try {
      const logs = [];
      for (const file of files) {
        const logPath = new URL(file, import.meta.url);
        const logRaw = await Deno.readTextFile(logPath);
        const log = JSON.parse(logRaw) as Record<string, string>[];
        logs.push(...log);
      }
      if (!isRequestingHtml) {
        return new Response(JSON.stringify(logs, null, 2));
      }
      return ctx.render({ ...ctx.state, page, entries: logs });
    } catch (error) {
      console.error(error);
      if (!isRequestingHtml) {
        return new Response(JSON.stringify({ message: "error" }, null, 2));
      }
      return ctx.renderNotFound({ ...ctx.state });
    }
  },
};

export default function Page({ data }: PageProps<Props & ServerState>) {
  const { entries, page } = data;
  const body = render(page.content);

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <div class="max-w-screen-md mx-auto px-4 mb-4">
        <article
          data-color-mode="dark"
          data-dark-theme="dark"
        >
          <PageHeader title={page.title} updated={page.updated} />
          <div
            class="markdown-body mb-4"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </article>
        <section>
          <ul class="divide-gray-700 divide-y-2">
            {entries.map((item, index) => <Item key={index} item={item} />)}
          </ul>
        </section>
      </div>
    </>
  );
}

interface ItemProps {
  item: Record<string, string>;
}

function Item({ item }: ItemProps) {
  return (
    <li class="">
      <Link href={item.url} label={item.name} />
    </li>
  );
}
