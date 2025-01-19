import { Handlers, PageProps, STATUS_CODE } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { getPage } from "../../src/content.ts";
import { ServerState } from "../_middleware.ts";
import { groupBy } from "../../src/group_by.ts";
import { ComponentChildren } from "preact";
import { css } from "../../src/markdown.ts";
import {
  BookEntry,
  Entry,
  GameEntry,
  Log,
  MovieEntry,
  RATING_MAX,
} from "../../src/schemas.ts";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { jsonResponse } from "../../src/utils.ts";

const slugSchema = z.enum(["watched", "reading", "games", "travel"]);
type AvailableLogs = Record<z.infer<typeof slugSchema>, string[]>;

const availableLogs: AvailableLogs = {
  watched: ["movies.json", "tv_shows.json"],
  reading: ["books.json"],
  games: ["games.json"],
  travel: ["travel.json"],
} as const;

const searchParamsSchema = zfd.formData({
  type: z.string().optional(),
  rating: z.coerce.number().optional(),
});

type LogProps = {
  entries: Entry[];
  page: Page;
};

export const handler: Handlers<LogProps, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const slugResult = slugSchema.safeParse(ctx.params.slug);
    if (!slugResult.success) {
      console.error("Invalid slug");
      console.dir(slugResult.error);
      return ctx.renderNotFound();
    }
    const slug = slugResult.data;

    const searchParams = searchParamsSchema.safeParse(url.searchParams);
    if (!searchParams.success) {
      console.error("Invalid searchParams");
      console.dir(searchParams.error);
      throw new Error("Invalid searchParams");
    }
    const { type, rating } = searchParams.data;

    const page = await getPage({ slug: `logs/${slug}` });

    if (!page) {
      return ctx.renderNotFound();
    }

    const files = availableLogs[slug].map((file) => `../../static/api/${file}`);

    ctx.state.title = `${page.title} - ${ctx.state.title}`;
    if (page.description) {
      ctx.state.description = page.description;
    }
    ctx.state.breadcrumbs = [
      { title: "Home", path: "/" },
      { title: "Logs", path: "/logs" },
      { title: page.title, path: url.pathname },
    ];

    const headers = req.headers.get("accept");
    const isRequestionJSON = headers?.includes("application/json");

    try {
      let logs = [];
      for (const file of files) {
        const logPath = new URL(file, import.meta.url);
        const logRaw = JSON.parse(await Deno.readTextFile(logPath));
        const log = z.array(Log.Entry).parse(logRaw);
        logs.push(...log);
      }
      logs.sort((a, b) => b.date.localeCompare(a.date));

      if (isRequestionJSON) {
        return jsonResponse(logs);
      }

      if (type) {
        logs = logs.filter((entry) => entry.type === type);
      }
      if (rating && hasReview(logs[0])) {
        logs = logs.filter((entry) =>
          hasReview(entry) && entry.review.rating === Number(rating)
        );
      }

      return ctx.render({ page, entries: logs });
    } catch (error) {
      console.error(error);
      if (isRequestionJSON) {
        return jsonResponse(
          { message: "error" },
          STATUS_CODE.InternalServerError,
        );
      }
      return ctx.renderNotFound();
    }
  },
};

export default function Page({ data, url }: PageProps<LogProps>) {
  const { rating: hasRatingParam } = searchParamsSchema.parse(url.searchParams);
  const { entries, page } = data;

  const groupedEntries = groupBy(
    entries,
    (entry) => new Date(entry.date).getFullYear(),
  );

  const isWatched = entries.some((entry) =>
    entry.type === "movie" || entry.type === "tv"
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
          <PageHeader title={page.title} updated={page.updatedAt} />
          {(isWatched && !hasRatingParam) && <WatchedStats entries={entries} />}
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
                  <LogEntry key={index} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function WatchedStats({ entries }: { entries: Entry[] }) {
  const isWatched = entries.some((entry) =>
    entry.type === "movie" || entry.type === "tv"
  );
  if (!isWatched) return <></>;
  const averageRatingMovie = averageRating(entries, "movie");
  const averageRatingTV = averageRating(entries, "tv");
  return (
    <div class="flex flex-wrap gap-4 justify-between py-4">
      <RatingInfo rating={averageRatingMovie} text="Average movie rating" />
      <RatingInfo rating={averageRatingTV} text="Average TV rating" />
    </div>
  );
}

function averageRating(entries: Entry[], type: "movie" | "tv"): number {
  const scoreRaw = entries.filter((entry) => entry.type === type)
    .reduce((accumulator, entry, index, array) => {
      if (entry.type !== "movie" && entry.type !== "tv") {
        return accumulator;
      }
      accumulator += entry.review.rating;
      if (index === array.length - 1) {
        return accumulator / array.length;
      }
      return accumulator;
    }, 0);

  return Number(scoreRaw.toPrecision(2));
}

function RatingInfo({ rating, text }: { rating: number; text: string }) {
  const percentage = (rating / RATING_MAX) * 100;

  return (
    <div class="flex items-center gap-4">
      <div
        class="flex w-full max-w-32 h-full items-center justify-center aspect-square rounded-full p-2 bg-primary"
        style={`background-image: conic-gradient(transparent, transparent ${percentage}%, #e7e8e8 ${percentage}%)`}
      >
        <span class="rounded-full w-full h-full bg-bg text-text flex justify-center items-center text-center text-3xl font-bold">
          {rating} / {RATING_MAX}
        </span>
      </div>
      <div class="text-2xl font-semibold">{text}</div>
    </div>
  );
}

interface ItemProps {
  item: Entry;
}

function LogEntry({ item }: ItemProps) {
  if (item.type === "travel") {
    return (
      <LogEntryListItem>
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
          <DateT date={item.date} />
          {item.to_date != item.date &&
            (
              <>
                {" - "}
                <DateT date={item.to_date} />
              </>
            )}
        </div>
      </LogEntryListItem>
    );
  }
  if (item.type === "game") {
    return (
      <LogEntryListItem comment={item.review.comment}>
        <h3 class="md:col-span-2">{item.title} ({item.platform})</h3>
        <Stars rating={item.review.rating} />
        <div class="md:justify-self-end">
          <DateT date={item.date} />
        </div>
      </LogEntryListItem>
    );
  }
  if (item.type === "book") {
    return (
      <LogEntryListItem comment={item.review.comment}>
        <h3 class="md:col-span-2">{item.title}</h3>
        <Stars rating={item.review.rating} />
        <div class="md:justify-self-end">
          <DateT date={item.date} />
        </div>
      </LogEntryListItem>
    );
  }
  if (item.type === "movie" || item.type === "tv") {
    return (
      <LogEntryListItem comment={item.review.comment}>
        <h3 class="md:col-span-2">
          {item.title}
          {item.type === "tv" && ` S${item.season}`}
          {item.type === "movie" && ` (${item.release_year})`}
        </h3>
        <Stars rating={item.review.rating} />
        <div class="md:justify-self-end">
          <DateT date={item.date} />
        </div>
      </LogEntryListItem>
    );
  }
  return <></>;
}

const ITEM_WRAPPER_CLASS =
  "py-4 grid md:grid-cols-4 grid-cols-1 gap-4 hover:bg-zinc-800";

function LogEntryListItem(
  { children, comment }: {
    children?: ComponentChildren;
    comment?: string | null;
  },
) {
  if (comment) {
    return (
      <li>
        <details>
          <summary
            class={ITEM_WRAPPER_CLASS +
              " cursor-pointer list-none [&::-webkit-details-marker]:hidden"}
          >
            {children}
          </summary>
          <p className="py-2 pl-4">
            {comment}
          </p>
        </details>
      </li>
    );
  }
  return (
    <li class={ITEM_WRAPPER_CLASS}>
      {children}
    </li>
  );
}

function DateT({ date }: { date: string }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));
  return (
    <time dateTime={date} title={date}>
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
): entry is BookEntry | GameEntry | MovieEntry {
  return "review" in (entry as never);
}
