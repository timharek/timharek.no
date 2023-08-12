import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { css, getPage } from "../../src/utils.ts";
import { ServerState } from "../_middleware.ts";
import { render } from "gfm/mod.ts";

interface Props {
  entries: Log.IEntry[];
  page: Page;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const page = await getPage("logs/travel.md");

    if (!page) {
      return ctx.renderNotFound({ ...ctx.state });
    }

    const files = ["../../static/api/travel.json"];

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
      const logs: Log.IEntry[] = [];
      for (const file of files) {
        const logPath = new URL(file, import.meta.url);
        const logRaw = await Deno.readTextFile(logPath);
        const log = JSON.parse(logRaw) as Log.IEntry[];
        log.sort((a, b) => b.date[0].string.localeCompare(a.date[0].string));
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
  item: Log.IEntry;
}

function Item({ item }: ItemProps) {
  return (
    <li class="py-4 grid grid-cols-4 gap-4">
      <h3 class="col-span-2">{item.title}</h3>
      <div aria-label="Stars">{item.details.location.country.name}</div>
      <time class="font-mono" datetime={item.date[0].string}>
        {item.date[0].string}
      </time>
    </li>
  );
}
