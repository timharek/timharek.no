import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { getPage } from "../../src/content.ts";
import { ServerState } from "../_middleware.ts";
import { Link } from "../../components/Link.tsx";
import { css } from "../../src/markdown.ts";
import { parse } from "xml";
import { z } from "zod";

const OPMLOutlineItem = z.object({
  "@text": z.string(),
  "@title": z.string(),
  "@description": z.string().nullable(),
  "@type": z.string(),
  "@version": z.string(),
  "@htmlUrl": z.string().nullable(),
  "@xmlUrl": z.string(),
  "#text": z.string().nullable(),
});
type OPMLOutlineItem = z.infer<typeof OPMLOutlineItem>;

const OPMLOutline = z.object({
  "@text": z.string(),
  "@title": z.string(),
  outline: z.array(OPMLOutlineItem),
});

type OPMLOutline = z.infer<typeof OPMLOutline>;

const OPML = z.object({
  xml: z.object({
    "@version": z.number(),
    "@encoding": z.literal("UTF-8"),
  }),
  opml: z.object({
    "@version": z.number(),
    head: z.object({ title: z.string() }),
    body: z.object({
      outline: z.array(OPMLOutline),
    }),
  }),
});

type FeedrollProps = {
  entries: OPMLOutline[];
  page: Page;
};

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
      const feedsObj = OPML.parse(parse(feedsRaw));
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
          <PageHeader title={page.title} updated={page.updatedAt} />
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

type ItemProps = {
  item: OPMLOutlineItem;
};

function Item({ item }: ItemProps) {
  let url = item["@htmlUrl"];
  const rss = item["@xmlUrl"];

  if (!url) {
    const tmpUrl = new URL(rss);
    url = tmpUrl.origin;
  }
  return (
    <li class="flex items-center gap-2">
      <Link href={url} label={item["@title"]} /> {" - "}
      <Link href={rss} label="RSS" />
    </li>
  );
}
