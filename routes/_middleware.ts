import { FreshContext, STATUS_CODE } from "$fresh/server.ts";
import { Breadcrumbs } from "../components/Breadcrumbs.tsx";
import { config } from "../config.ts";
import { redirects } from "../redirects.ts";

export interface ServerState {
  language: string;
  title: string;
  description: string;
  breadcrumbs: Breadcrumbs[];
  lastDeploy: string;
}

export async function handler(req: Request, ctx: FreshContext<ServerState>) {
  if (ctx.destination !== "route") {
    return await ctx.next();
  }

  const url = new URL(req.url);

  try {
    const lastDeployString = await Deno.readTextFile(
      new URL("../last_deploy", import.meta.url),
    );
    ctx.state.lastDeploy =
      new Date(lastDeployString).toISOString().split("T")[0];
  } catch (_error) {
    ctx.state.lastDeploy = "missing";
  }

  const redirect = redirects[url.pathname];
  if (redirect) {
    return new Response(null, {
      status: STATUS_CODE.SeeOther,
      headers: {
        Location: redirect,
      },
    });
  }

  ctx.state.language = "en";
  ctx.state.title = config.title;
  ctx.state.description = config.description;

  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}
