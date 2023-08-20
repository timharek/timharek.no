import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "gfm/mod.ts";
import { getGlobalStats, getPage, Stats } from "../src/content.ts";
import { ServerState } from "./_middleware.ts";
import { PageHeader } from "../components/PageHeader.tsx";
import { css } from "../src/markdown.ts";
import { Definition } from "../components/Definition.tsx";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

interface Props extends ServerState {
  page?: Page;
  stats?: Stats;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const page = await getPage({ slug: "stats" });
    const stats = await getGlobalStats();

    if (!page) {
      return ctx.renderNotFound({ ...ctx.state });
    }

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
        title: page.title,
        path: url.pathname,
        current: true,
      },
    ];

    return ctx.render({ ...ctx.state, page, stats });
  },
};

export default function Page({ data }: PageProps<Required<Props>>) {
  const { page, stats } = data;
  const body = render(page.content);

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <article
        data-color-mode="dark"
        data-dark-theme="dark"
        class="max-w-screen-md mx-auto px-4 space-y-4"
      >
        <PageHeader title={page.title} updated={page.updated} />
        <div
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <section class="space-y-4">
          <h2 class="text-3xl font-semibold">Writing</h2>
          <dl class="columns-2">
            <Definition
              title="Years of blogging"
              value={Object.keys(stats.blogByYear).length}
            />
            <Definition
              title="Posts"
              value={stats.posts}
            />
            <Definition
              title="Words"
              value={stats.words}
            />
            <Definition
              title="Tags"
              value={stats.tags}
            />
          </dl>
          <Chart
            type="bar"
            options={{
              devicePixelRatio: 1,
              scales: { y: { beginAtZero: true } },
            }}
            data={{
              labels: Object.keys(stats.blogByYear),
              datasets: [{
                label: "Posts per year",
                data: Object.keys(stats.blogByYear).map((year) =>
                  stats.blogByYear[year].length
                ),
                borderColor: ChartColors.Blue,
                backgroundColor: transparentize(ChartColors.Blue, 0.5),
                borderWidth: 1,
              }, {
                label: "Words per year (1,000s)",
                type: "line",
                data: Object.keys(stats.blogByYear).map((
                  year,
                ) => (getWordCountFromArray(
                  stats.blogByYear[year],
                  true,
                ) as number / 1000)),
                borderColor: ChartColors.Blue,
                borderWidth: 1,
              }],
            }}
          />
          <h3 class="text-2xl font-semibold">Posts / Words Per Year</h3>
          <dl class="columns-2">
            {Object.keys(stats.blogByYear).map((year) => (
              <Definition
                title={year}
                value={`${stats.blogByYear[year].length} / ${
                  getWordCountFromArray(stats.blogByYear[year])
                }`}
              />
            ))}
          </dl>
        </section>
      </article>
    </>
  );
}

function getWordCountFromArray(
  posts: Post[],
  asNumber?: boolean,
): string | number {
  const count = posts.reduce((acc, curr) => {
    return acc + curr.wordCount;
  }, 0);

  if (asNumber) {
    return count;
  }

  return new Intl.NumberFormat("en-IN").format(count);
}
