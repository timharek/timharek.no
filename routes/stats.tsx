import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getGlobalStats, getPage, Stats } from "../src/content.ts";
import { ServerState } from "./_middleware.ts";
import { PageHeader } from "../components/PageHeader.tsx";
import { css } from "../src/markdown.ts";
import { Definition } from "../components/Definition.tsx";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

interface Props {
  page: Page;
  stats: Stats;
}

export const handler: Handlers<Props, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const page = await getPage({ slug: "stats" });
    const stats = await getGlobalStats();

    if (!page) {
      return ctx.renderNotFound();
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
      },
    ];

    return ctx.render({ page, stats });
  },
};

export default function Page({ data }: PageProps<Props>) {
  const { page, stats } = data;

  const TOP_LINKS_COUNT = 10;
  const external = stats.links.external?.slice(0, TOP_LINKS_COUNT);
  const internal = stats.links.internal?.slice(0, TOP_LINKS_COUNT);

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
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
        <section class="space-y-4">
          <h2 class="text-3xl font-semibold">Writing</h2>
          <dl class="columns-2 space-y-2">
            <Definition
              title="Years of blogging"
              value={Object.keys(stats.blogByYear).length}
              showBullet
            />
            <Definition
              title="Posts"
              value={stats.posts}
              showBullet
            />
            <Definition
              title="Words"
              value={stats.words}
              showBullet
            />
            <Definition
              title="Tags"
              value={stats.tags}
              showBullet
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
          <dl class="columns-2 space-y-2">
            {Object.keys(stats.blogByYear).map((year) => (
              <Definition
                title={year}
                value={`${stats.blogByYear[year].length} / ${
                  getWordCountFromArray(stats.blogByYear[year])
                }`}
                showBullet
              />
            ))}
          </dl>
          {external &&
            (
              <>
                <h3 class="text-2xl font-semibold">Top external links</h3>
                <ol class="list-decima pl-6 columns-2 space-y-2">
                  {external.map((link) => (
                    <li class="">{link.domain}: {link.count}</li>
                  ))}
                </ol>
              </>
            )}
          {internal &&
            (
              <>
                <h3 class="text-2xl font-semibold">Top internal links</h3>
                <ol class="list-decima pl-6 columns-2 space-y-2">
                  {internal.map((link) => (
                    <li class="">{link.pathname}: {link.count}</li>
                  ))}
                </ol>
              </>
            )}
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
