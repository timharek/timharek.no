import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Props {
  title: string;
  entries: Log.IEntry[];
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const logName = ctx.params.log;
    const logPath = new URL(
      `../../static/api/${logName}.json`,
      import.meta.url,
    );

    const headers = req.headers.get("accept");
    const isRequestingHtml = headers?.includes("text/html");
    try {
      const logRaw = await Deno.readTextFile(logPath);
      const logs = JSON.parse(logRaw) as Log.IEntry[];
      if (!isRequestingHtml) {
        return new Response(JSON.stringify(logs, null, 2));
      }
      return ctx.render({ title: logName, entries: logs });
    } catch (error) {
      console.error(error);
      if (!isRequestingHtml) {
        return new Response(JSON.stringify({ message: "error" }, null, 2));
      }
      return ctx.renderNotFound();
    }
  },
};

export default function Page({ data }: PageProps<Props>) {
  const { title, entries } = data;

  return (
    <>
      <Head>
        <title>{title} - Tim Hårek</title>
      </Head>
      <article class="max-w-screen-md mx-auto px-4 mb-4 prose">
        <h1>{title}</h1>
        <ul>
          {entries.map((item) => <li>{item.title}</li>)}
        </ul>
      </article>
    </>
  );
}
