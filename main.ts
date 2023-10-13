/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

Deno.env.set("HOSTNAME", Deno.env.get("HOSTNAME") ?? "localhost");
Deno.env.set("PORT", Deno.env.get("PORT") ?? "8000");

export const hostname = Deno.env.get("HOSTNAME");
export const port = Deno.env.get("PORT");

await start(manifest, {
  hostname,
  port: Number(port),
  plugins: [twindPlugin(twindConfig)],
});
