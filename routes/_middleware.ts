import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { config } from "../config.ts";

export interface ServerState {
  title: string;
  description: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<ServerState>,
) {
  ctx.state.title = config.title;
  ctx.state.description = config.description;
  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}
