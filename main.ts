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

import "$std/dotenv/load.ts";

const hostname = Deno.env.get("HOSTNAME") ?? "localhost";
const port = Deno.env.get("PORT") ?? 8000;

await start(manifest, {
  hostname,
  port: Number(port),
  plugins: [twindPlugin(twindConfig)],
});
