import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { css, getPage } from "../../src/markdown.ts";
import { ServerState } from "../_middleware.ts";
import { render } from "gfm/mod.ts";
import { Link } from "../../components/Link.tsx";
import { groupBy } from "../../src/group_by.ts";
import { capitalize } from "../../src/utils.ts";

interface Feed {
  name: string;
  description: string;
  tags: string[];
  type: "blog" | "podcast";
  url: string;
  feed: string;
  color?: {
    bg: string;
    text: string;
  };
}
interface FeedrollProps {
  entries: Feed[];
  page: Page;
}

export const handler: Handlers<FeedrollProps, ServerState> = {
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

export default function Page({ data }: PageProps<FeedrollProps & ServerState>) {
  const { entries, page } = data;
  const body = render(page.content);

  const groupedBy = groupBy(entries, (feed) => feed.type);

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <div class="max-w-screen-md mx-auto px-4 space-y-4">
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
        {Object.keys(groupedBy).map((type) => (
          <section class="space-y-4">
            <h2 class="text-3xl font-semibold">{capitalize(type)}s</h2>
            <ul class="space-y-2 md:columns-2">
              {groupedBy[type].sort((a, b) => a.name.localeCompare(b.name)).map(
                (
                  item,
                  index,
                ) => <Item key={index} item={item} />,
              )}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

interface ItemProps {
  item: Feed;
}

function Item({ item }: ItemProps) {
  const bg = item.color && item.color.bg ? item.color.bg : "white";
  return (
    <li
      class={`before:(content-[''] bg-[${bg}] w-2 h-2 rounded-full inline-block) flex items-center gap-2`}
    >
      <Link href={item.url} label={item.name} />
    </li>
  );
}
