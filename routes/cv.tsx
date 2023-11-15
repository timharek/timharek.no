import { Handlers, PageProps } from "$fresh/server.ts";
import { Link } from "../components/Link.tsx";
import { PageHeader } from "../components/PageHeader.tsx";
import { ServerState } from "./_middleware.ts";
import { z } from "zod";

const WorkExp = z.object({
  name: z.string(),
  position: z.string(),
  url: z.string().optional().nullable(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  highlights: z.array(z.string()),
});

const Edu = z.object({
  insitution: z.string(),
  url: z.string(),
  area: z.string(),
  studyType: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  logo: z.string(),
  courses: z.array(z.string()),
  summary: z.string(),
});
const Certificate = z.object({
  name: z.string(),
  date: z.string(),
  issuer: z.object({
    company: z.string(),
    person: z.string(),
  }),
  url: z.string().optional().nullable(),
});
const SkillItem = z.object({
  name: z.string(),
  level: z.string().nullable(),
  keywords: z.array(z.string()),
});
const Language = z.object({
  language: z.string(),
  fluency: z.enum(["Native speaker", "Fluent", "Beginner"]),
});
const Interest = z.object({
  name: z.string(),
  keywords: z.array(z.string()),
});
const Project = z.object({
  name: z.string(),
  client: z.string().optional(),
  roles: z.array(z.string()).optional(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  keywords: z.array(z.string()),
  url: z.string().optional(),
  sources: z.array(z.string()).optional(),
});
export type Project = z.infer<typeof Project>;
export const CVSchema = z.object({
  last_update: z.string(),
  basics: z.object({
    name: z.string(),
    label: z.string(),
    image: z.string(),
    email: z.string(),
    phone: z.string(),
    url: z.string(),
    summary: z.string(),
    location: z.object({
      city: z.string(),
      countryCode: z.string(),
    }),
    profiles: z.array(z.object({
      network: z.string(),
      username: z.string(),
      url: z.string(),
    })),
  }),
  work: z.array(WorkExp),
  volunteer: z.array(WorkExp),
  education: z.array(Edu),
  awards: z.array(z.unknown()),
  certificates: z.array(Certificate),
  publications: z.array(z.unknown()),
  skills: z.array(SkillItem),
  languages: z.array(Language),
  interests: z.array(Interest),
  projects: z.array(Project),
});

interface CVProps {
  cv: z.infer<typeof CVSchema>;
}

export const handler: Handlers<CVProps, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const headers = req.headers.get("accept");
    const isRequestingHtml = headers?.includes("text/html");
    try {
      const cvPath = new URL("../static/api/cv.json", import.meta.url);
      const cvRaw = await Deno.readTextFile(cvPath);
      const cv = CVSchema.parse(JSON.parse(cvRaw));
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
        },
      ];
      return ctx.render({ cv });
    } catch (error) {
      console.error(error);
      if (!isRequestingHtml) {
        return new Response(JSON.stringify({ message: "error" }, null, 2));
      }
      return ctx.renderNotFound();
    }
  },
};

export default function CVPage({ data }: PageProps<CVProps>) {
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

function Work({ work }: { work: z.infer<typeof WorkExp> }) {
  return (
    <div class="space-y-2">
      <header class="flex flex-wrap gap-4 items-center justify-between">
        <div class="flex flex-wrap gap-4 items-center">
          <h3 class="text-xl font-semibold">{work.position}</h3>
          {work.url ? <Link href={work.url} label={work.name} /> : work.name}
        </div>
        <div class="text-gray-400">
          <Dates start={work.startDate} end={work.endDate} />
        </div>
      </header>
      <Keywords keywords={work.highlights} />
    </div>
  );
}

function Education({ edu }: { edu: z.infer<typeof Edu> }) {
  return (
    <div class="space-y-2">
      <header class="flex flex-wrap gap-4 items-center justify-between">
        <div class="flex flex-wrap gap-4 items-center">
          <h3 class="text-xl font-semibold">{edu.studyType} in {edu.area}</h3>
          <Link href={edu.url} label={edu.insitution} />
        </div>
        <div class="text-gray-400">
          <Dates start={edu.startDate} end={edu.endDate} />
        </div>
      </header>
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

function Skill({ skill }: { skill: z.infer<typeof SkillItem> }) {
  return (
    <div class="md:flex justify-between gap-4">
      <h4 class="md:w-1/2 text-lg font-semibold">{skill.name}</h4>
      <p class="md:w-1/2">
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
