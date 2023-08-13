import { Handlers, PageProps } from "$fresh/server.ts";
import { PageHeader } from "../components/PageHeader.tsx";
import { ServerState } from "./_middleware.ts";

interface Work {
  name: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}
interface Education {
  insitution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate?: string;
  logo: string;
  courses: string[];
  summary: string;
}
interface Certificate {
  name: string;
  date: string;
  issuer: {
    company: string;
    person: string;
  };
  url?: string;
}
interface Skill {
  name: string;
  level: string | null;
  keywords: string[];
}
interface Language {
  language: string;
  fluency: "Native speaker" | "Fluent" | "Beginner";
}
interface Interest {
  name: string;
  keywords: string[];
}
interface Project {
  name: string;
  client: string;
  roles: string[];
  description: string;
  endDate: string;
  keywords: string[];
  url: string;
}
interface CVProps {
  cv: {
    last_update: string;
    basics: {
      name: string;
      label: string;
      image: string;
      email: string;
      phone: string;
      url: string;
      summary: string;
      location: {
        city: string;
        countryCode: string;
      };
      profiles: {
        network: string;
        username: string;
        url: string;
      }[];
    };
    work: Work[];
    volunteer: Work[];
    education: Education[];
    awards: [];
    certificates: Certificate[];
    publications: [];
    skills: Skill[];
    language: Language[];
    interest: Interest[];
    projects: Project[];
  };
}

export const handler: Handlers<CVProps, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const headers = req.headers.get("accept");
    const isRequestingHtml = headers?.includes("text/html");
    try {
      const cvPath = new URL("../static/api/cv.json", import.meta.url);
      const cvRaw = await Deno.readTextFile(cvPath);
      const cv = JSON.parse(cvRaw);
      if (!isRequestingHtml) {
        return new Response(JSON.stringify(cv, null, 2));
      }
      ctx.state.title = `CV - ${ctx.state.title}`;
      ctx.state.description = "Tim Hårek's CV.";
      ctx.state.breadcrumbs = [
        {
          title: "Index",
          path: "/",
        },
        {
          title: "CV",
          path: url.pathname,
          current: true,
        },
      ];
      return ctx.render({ ...ctx.state, cv });
    } catch (error) {
      console.error(error);
      if (!isRequestingHtml) {
        return new Response(JSON.stringify({ message: "error" }, null, 2));
      }
      return ctx.renderNotFound();
    }
  },
};

export default function CV({ data }: PageProps<CVProps & ServerState>) {
  const { cv } = data;
  return (
    <div class="max-w-screen-md mx-auto px-4 mb-4 prose">
      <PageHeader title={cv.basics.name} updated={new Date(cv.last_update)} />
      <div class="space-y-4">
        <section class="space-y-4">
          <h2 class="text-3xl font-semibold">TL;DR</h2>
          <p>
            {cv.basics.summary}
          </p>
        </section>
        <section class="space-y-4">
          <h2 class="text-3xl font-semibold">Work</h2>
          <ul class="space-y-6">
            {cv.work.map((work) => (
              <li>
                <Work work={work} />
              </li>
            ))}
          </ul>
        </section>
        <section class="space-y-4">
          <h2 class="text-3xl font-semibold">Voluntary</h2>
          <ul class="space-y-6">
            {cv.volunteer.map((work) => (
              <li>
                <Work work={work} />
              </li>
            ))}
          </ul>
        </section>
        <section class="space-y-4">
          <h2 class="text-3xl font-semibold">Education</h2>
          <ul class="space-y-6">
            {cv.education.map((edu) => (
              <li>
                <Education edu={edu} />
              </li>
            ))}
          </ul>
        </section>
        <section class="space-y-4">
          <h2 class="text-3xl font-semibold">Skills</h2>
          <ul class="space-y-6">
            {cv.skills.map((skill) => (
              <li>
                <Skill skill={skill} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Work({ work }: { work: Work }) {
  return (
    <div class="space-y-2">
      <div class="flex gap-4 items-center justify-between">
        <div class="flex gap-4 items-center">
          <h3 class="text-xl font-semibold">{work.position}</h3>
          {work.url
            ? (
              <a class="text-primary hover:underline" href={work.url}>
                {work.name}
              </a>
            )
            : work.name}
        </div>
        <div class="text-gray-400">
          <Dates start={work.startDate} end={work.endDate} />
        </div>
      </div>
      <Keywords keywords={work.highlights} />
    </div>
  );
}

function Education({ edu }: { edu: Education }) {
  return (
    <div class="space-y-2">
      <div class="flex gap-4 items-center justify-between">
        <div class="flex gap-4 items-center">
          <h3 class="text-xl font-semibold">{edu.studyType} in {edu.area}</h3>
          <a class="text-primary hover:underline" href={edu.url}>
            {edu.insitution}
          </a>
        </div>
        <div class="text-gray-400">
          <Dates start={edu.startDate} end={edu.endDate} />
        </div>
      </div>
      <Keywords keywords={[edu.summary]} />
    </div>
  );
}

function Dates({ start, end }: { start: string; end?: string }) {
  return (
    <>
      <time title={start} dateTime={start}>{formatDate(start)}</time> - {end
        ? <time title={end} dateTime={end}>{formatDate(end)}</time>
        : "present"}
    </>
  );
}

function Skill({ skill }: { skill: Skill }) {
  return (
    <div class="md:flex justify-between gap-4">
      <h4 class="w-1/2 text-lg font-semibold">{skill.name}</h4>
      <p class="w-1/2">
        {skill.keywords.sort((a, b) => a.localeCompare(b)).join(", ")}
      </p>
    </div>
  );
}

function Keywords({ keywords }: { keywords: string[] }) {
  if (keywords.length > 1) {
    return (
      <ul class="list-disc pl-4 space-y-2">
        {keywords.map((keyword) => <li>{keyword}</li>)}
      </ul>
    );
  }
  return <p>{keywords[0]}</p>;
}

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" })
      .format(date);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
