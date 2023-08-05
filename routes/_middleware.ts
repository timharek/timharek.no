import { MiddlewareHandlerContext, Status } from "$fresh/server.ts";
import { Breadcrumbs } from "../components/Breadcrumbs.tsx";
import { config } from "../config.ts";

export interface ServerState {
  title: string;
  description: string;
  breadcrumbs: Breadcrumbs[];
}

export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext<ServerState>,
) {
  const url = new URL(_req.url);
  const redirects: Redirect = JSON.parse(
    await Deno.readTextFile(new URL("../redirects.json", import.meta.url)),
  );

  const redirect = redirects[url.pathname];
  if (redirect) {
    return new Response(null, {
      status: Status.SeeOther,
      headers: {
        Location: redirect,
      },
    });
  }

  ctx.state.title = config.title;
  ctx.state.description = config.description;

  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}
