import "@std/dotenv/load";
import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

Deno.env.set("HOSTNAME", Deno.env.get("HOSTNAME") ?? "localhost");
Deno.env.set("PORT", Deno.env.get("PORT") ?? "8000");
export const hostname = Deno.env.get("HOSTNAME");
export const port = Deno.env.get("PORT");

export default defineConfig({
  hostname,
  port: Number(port),
  plugins: [twindPlugin(twindConfig)],
});
