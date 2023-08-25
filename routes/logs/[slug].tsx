import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { getPage } from "../../src/content.ts";
import { ServerState } from "../_middleware.ts";
import { groupBy } from "../../src/group_by.ts";
import { ComponentChildren } from "preact";
import { css } from "../../src/markdown.ts";

interface AvailableLogs {
  [key: string]: string[];
}
const availableLogs: AvailableLogs = {
  watched: ["movies.json", "tv_shows.json"],
  reading: ["books.json"],
  games: ["games.json"],
  travel: ["travel.json"],
};

interface LogProps extends ServerState {
  entries?: Log.Entry[];
  page?: Page;
}

export const handler: Handlers<LogProps, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const slug = ctx.params.slug;
    const type = url.searchParams.get("type");
    const rating = url.searchParams.get("rating");

    if (!Object.keys(availableLogs).includes(slug)) {
      return ctx.renderNotFound({ ...ctx.state });
    }

    const page = await getPage({ slug: `logs/${slug}` });

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
      let logs: Log.Entry[] = [];
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

      if (type) {
        logs = logs.filter((entry) => entry.type === type);
      }
      if (rating && hasReview(logs[0])) {
        logs = logs.filter((entry) =>
          hasReview(entry) && entry.review.rating === Number(rating)
        );
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

export default function Page({ data }: PageProps<Required<LogProps>>) {
  const { entries, page } = data;

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
            dangerouslySetInnerHTML={{ __html: page.html }}
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
      <ItemWrapper>
        <h3 class="md:col-span-2">{item.title}</h3>
        <div>
          <span aria-label="Country">
            {item.location.country.emoji} {item.location.country.name}:{" "}
          </span>
          <span
            aria-label={item.location.cities.length > 1 ? "Cities" : "City"}
          >
            {item.location.cities.join(", ")}
          </span>
        </div>
        <div class="md:justify-self-end">
          <DateT dateString={item.date} />
          {item.to_date != item.date &&
            (
              <>
                {" - "}
                <DateT dateString={item.to_date} />
              </>
            )}
        </div>
      </ItemWrapper>
    );
  }
  if (item.type === "game") {
    return (
      <ItemWrapper>
        <h3 class="md:col-span-2">{item.title} ({item.platform})</h3>
        <Stars rating={item.review.rating} />
        <div class="md:justify-self-end">
          <DateT dateString={item.date} />
        </div>
      </ItemWrapper>
    );
  }
  if (item.type === "book") {
    return (
      <ItemWrapper>
        <h3 class="md:col-span-2">{item.title}</h3>
        <Stars rating={item.review.rating} />
        <div class="md:justify-self-end">
          <DateT dateString={item.date} />
        </div>
      </ItemWrapper>
    );
  }
  if (item.type === "movie" || item.type === "tv") {
    return (
      <ItemWrapper>
        <h3 class="md:col-span-2">
          {item.title}
          {item.type === "tv" && ` S${item.season}`}
          {item.type === "movie" && ` (${item.release_year})`}
        </h3>
        <Stars rating={item.review.rating} />
        <div class="md:justify-self-end">
          <DateT dateString={item.date} />
        </div>
      </ItemWrapper>
    );
  }
  return <></>;
}

function ItemWrapper(
  { children }: {
    children?: ComponentChildren;
  },
) {
  return (
    <li class="py-4 grid md:grid-cols-4 grid-cols-1 gap-4">
      {children}
    </li>
  );
}

function DateT({ dateString }: { dateString: string }) {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(date);
  return (
    <time dateTime={date.toISOString()} title={date.toISOString()}>
      {formattedDate}
    </time>
  );
}

function Stars({ rating }: { rating: number }) {
  const string = `${rating} out of 5 stars`;
  return <div aria-label={string} title={string}>{getStars(rating)}</div>;
}

function getStars(rating: number) {
  const MAX_STARS = 5;

  const stars = [];

  const ratingArray = Array(rating);
  for (const _i of ratingArray) {
    stars.push("★");
  }
  const nonStarsArray = Array(MAX_STARS - rating);
  for (const _i of nonStarsArray) {
    stars.push("☆");
  }

  return stars.join("");
}

function hasReview(
  entry: unknown,
): entry is Log.BookEntry | Log.GameEntry | Log.MovieEntry {
  return "review" in (entry as never);
}
