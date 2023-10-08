import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const logoPath = new URL("../../static/img/logo.svg", import.meta.url);
    try {
      const logo = await Deno.readFile(logoPath);

      return new Response(logo, {
        headers: { "content-type": `image/svg+xml` },
      });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: "No logo available." }),
        {
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );
    }
  },
};
