import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { getPage } from "../../src/content.ts";
import { ServerState } from "../_middleware.ts";
import { Link } from "../../components/Link.tsx";
import { css } from "../../src/markdown.ts";
import { parse } from "https://deno.land/x/xml@2.1.3/mod.ts";

interface OPMLOutlineItem {
  "@text": string;
  "@title": string;
  "@description": string | null;
  "@type": string;
  "@version": string;
  "@htmlUrl": string;
  "@xmlUrl": string;
  "#text": string | null;
}
interface OPMLOutline {
  "@text": string;
  "@title": string;
  "@nnw_externalID": string;
  outline: OPMLOutlineItem[];
}
interface OPML {
  xml: {
    "@version": number;
    "@encoding": "UTF-8";
  };
  opml: {
    "@version": number;
    head: { title: "iCloud" };
    body: {
      outline: OPMLOutline[];
    };
  };
}
interface FeedrollProps {
  entries: OPMLOutline[];
  page: Page;
}

export const handler: Handlers<FeedrollProps, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const page = await getPage({ slug: "logs/feedroll" });

    if (!page) {
      return ctx.renderNotFound();
    }

    const feedsFilePath = new URL(
      "../../static/api/feeds.opml",
      import.meta.url,
    );

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
      },
    ];

    const headers = req.headers.get("accept");
    const isRequestingHtml = headers?.includes("text/html");
    try {
      const feedsRaw = await Deno.readTextFile(feedsFilePath);
      const feedsObj = parse(feedsRaw) as unknown as OPML;
      const feeds = feedsObj.opml.body.outline;
      if (!isRequestingHtml) {
        return new Response(JSON.stringify(feeds, null, 2));
      }
      return ctx.render({ page, entries: feeds });
    } catch (error) {
      console.error(error);
      if (!isRequestingHtml) {
        return new Response(JSON.stringify({ message: "error" }, null, 2));
      }
      return ctx.renderNotFound();
    }
  },
};

export default function Page({ data }: PageProps<FeedrollProps>) {
  const { entries, page } = data;

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
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </article>
        {entries.map((type) => (
          <section class="space-y-4">
            <h2 class="text-3xl font-semibold">{type["@title"]}</h2>
            <ul class="space-y-2 list-disc md:columns-2">
              {type.outline.sort((a, b) =>
                a["@title"].localeCompare(b["@title"])
              ).map(
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
  item: OPMLOutlineItem;
}

function Item({ item }: ItemProps) {
  return (
    <li class={`flex items-center gap-2`}>
      <Link href={item["@htmlUrl"]} label={item["@title"]} /> {" - "}
      <Link href={item["@xmlUrl"]} label="RSS" />
    </li>
  );
}
