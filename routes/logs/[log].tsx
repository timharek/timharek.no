import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Props {
  title: string;
  entries: Log.IEntry[];
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const logName = ctx.params.log;
    try {
      const logPath = new URL(
        `../../static/api/${logName}.json`,
        import.meta.url,
      );
      const logRaw = await Deno.readTextFile(logPath);
      const logs = JSON.parse(logRaw) as Log.IEntry[];
      console.log(logs);
      return ctx.render({ title: logName, entries: logs });
    } catch (error) {
      console.error(error);
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
