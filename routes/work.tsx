import { Handlers, PageProps } from "$fresh/server.ts";
import { PageHeader } from "../components/PageHeader.tsx";
import { getPage } from "../src/content.ts";
import { ServerState } from "./_middleware.ts";
import { CV, Project } from "./cv.tsx";
import { Head } from "$fresh/runtime.ts";
import { Link } from "../components/Link.tsx";
import { css } from "../src/markdown.ts";

interface WorkProps {
  page: Page;
  projects: Project[];
  filter: {
    year: string | null;
    tag: string | null;
  };
}

export const handler: Handlers<WorkProps, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const filter = {
      year: url.searchParams.get("year"),
      tag: url.searchParams.get("tag"),
    };

    const headers = req.headers.get("accept");
    const isRequestingHtml = headers?.includes("text/html");

    try {
      const cvPath = new URL("../static/api/cv.json", import.meta.url);
      const cvRaw = await Deno.readTextFile(cvPath);
      const cv = JSON.parse(cvRaw) as CV;
      if (!isRequestingHtml) {
        return new Response(JSON.stringify(cv, null, 2));
      }
      const page = await getPage({ slug: "work" });
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
      let projects = cv.projects.sort((a, b) =>
        b.endDate.localeCompare(a.endDate)
      );

      if (filter.year) {
        projects = projects.filter((project) =>
          new Date(project.endDate).getFullYear().toString() === filter.year
        );
      }

      if (filter.tag) {
        const tag = filter.tag;
        projects = projects.filter((project) =>
          project.keywords.some((keyword) =>
            keyword.toLowerCase() === tag.toLowerCase()
          )
        );
      }

      return ctx.render({ ...ctx.state, projects, page, filter });
    } catch (error) {
      console.error(error);
      if (!isRequestingHtml) {
        return new Response(JSON.stringify({ message: "error" }, null, 2));
      }
      return ctx.renderNotFound();
    }
  },
};

export default function CV({ data }: PageProps<WorkProps & ServerState>) {
  const { projects, page, filter } = data;

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <div class="max-w-screen-md mx-auto px-4 mb-4 space-y-4">
        <PageHeader title="Work" />
        <div
          data-color-mode="dark"
          data-dark-theme="dark"
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
        {(filter.year || filter.tag) &&
          (
            <p class="">
              Showing {projects.length} results:
            </p>
          )}
        <ul class="space-y-4">
          {projects.map((project) => (
            <li>
              <Project project={project} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Project({ project }: { project: Project }) {
  return (
    <div class="space-y-4 bg-slate-800 rounded-lg p-4">
      <h2 class="text-xl">
        {project.url
          ? <Link href={project.url} label={project.name} target="_blank" />
          : project.name}
      </h2>
      <p class="">{project.description}</p>
      {project.sources && (
        <Link href={project.sources[0]} label="Source code" target="_blank" />
      )}
      <ul class="flex gap-2">
        {project.keywords.map((keyword) => (
          <li class="">#{keyword.toLowerCase().replaceAll(" ", "-")}</li>
        ))}
      </ul>
    </div>
  );
}
