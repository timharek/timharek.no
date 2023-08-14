import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { css, getPage } from "../../src/utils.ts";
import { ServerState } from "../_middleware.ts";
import { render } from "gfm/mod.ts";
import { groupBy } from "../../src/group_by.ts";

interface AvailableLogs {
  [key: string]: string[];
}
const availableLogs: AvailableLogs = {
  watched: ["movies.json", "tv_shows.json"],
  reading: ["books.json"],
  games: ["games.json"],
  travel: ["travel.json"],
};

interface LogProps {
  entries: Log.Entry[];
  page: Page;
}

export const handler: Handlers<LogProps, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const slug = ctx.params.slug;

    if (!Object.keys(availableLogs).includes(slug)) {
      return ctx.renderNotFound({ ...ctx.state });
    }

    const page = await getPage(`logs/${slug}.md`);

    if (!page) {
      return ctx.renderNotFound({ ...ctx.state });
    }

    const files = availableLogs[slug].map((file) => `../../static/api/${file}`);

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
      const logs: Log.Entry[] = [];
      for (const file of files) {
        const logPath = new URL(file, import.meta.url);
        const logRaw = await Deno.readTextFile(logPath);
        const log = JSON.parse(logRaw) as Log.Entry[];
        logs.push(...log);
      }
      logs.sort((a, b) => b.date.localeCompare(a.date));
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

export default function Page({ data }: PageProps<LogProps & ServerState>) {
  const { entries, page } = data;
  const body = render(page.content);
  const groupedEntries = groupBy(
    entries,
    (entry) => new Date(entry.date).getFullYear(),
  );

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
        <div>
          {Object.keys(groupedEntries).sort((a, b) => b.localeCompare(a)).map((
            year,
          ) => (
            <div class="">
              <div class="flex items-center gap-2 sticky top-0 bg-bg">
                <h3 class="text-2xl font-semibold my-4">{year}</h3>
                <p class="">({groupedEntries[year].length} entries)</p>
              </div>
              <ul class="divide-gray-700 divide-y-2">
                {groupedEntries[year].map((item, index) => (
                  <Item key={index} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

interface ItemProps {
  item: Log.Entry;
}

function Item({ item }: ItemProps) {
  if (item.type === "travel") {
    return (
      <li class="py-4 grid grid-cols-4 gap-4">
        <h3 class="col-span-2">{item.title}</h3>
        <div aria-label="Country">{item.location.country.name}</div>
        <time class="font-mono" dateTime={item.date}>
          {item.date}
        </time>
      </li>
    );
  }
  if (item.type === "game") {
    return (
      <li class="py-4 grid grid-cols-4 gap-4">
        <h3 class="col-span-2">{item.title} ({item.platform})</h3>
        <div aria-label="Stars">{item.review.rating}</div>
        <time class="font-mono" dateTime={item.date}>
          {item.date}
        </time>
      </li>
    );
  }
  if (item.type === "book") {
    return (
      <li class="py-4 grid grid-cols-4 gap-4">
        <h3 class="col-span-2">{item.title}</h3>
        <div aria-label="Stars">{item.review.rating}</div>
        <time class="font-mono" dateTime={item.date}>
          {item.date}
        </time>
      </li>
    );
  }
  if (item.type === "movie" || item.type === "tv") {
    return (
      <li class="py-4 grid grid-cols-4 gap-4">
        <h3 class="col-span-2">
          {item.title}
          {item.type === "tv" && ` S${item.season}`}
        </h3>
        <div aria-label="Stars">{item.review.rating}</div>
        <time class="font-mono" dateTime={item.date}>
          {item.date}
        </time>
      </li>
    );
  }
  return <></>;
}
