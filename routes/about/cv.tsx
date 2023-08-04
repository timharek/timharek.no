import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "../_middleware.ts";

interface CVProps {
  last_update: string;
  basics: {
    summary: string;
  };
}

export const handler: Handlers<CVProps, ServerState> = {
  async GET(req, ctx) {
    const headers = req.headers.get("accept");
    const isRequestingHtml = headers?.includes("text/html");
    try {
      const cvPath = new URL("../../static/api/cv.json", import.meta.url);
      const cvRaw = await Deno.readTextFile(cvPath);
      const cv = JSON.parse(cvRaw);
      if (!isRequestingHtml) {
        return new Response(JSON.stringify(cv, null, 2));
      }
      ctx.state.title = `CV - ${ctx.state.title}`;
      return ctx.render({ ...ctx.state, ...cv });
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
  return (
    <div class="max-w-screen-md mx-auto px-4 mb-4 prose">
      <h1>{data.title}</h1>
      {data.basics.summary}
    </div>
  );
}
