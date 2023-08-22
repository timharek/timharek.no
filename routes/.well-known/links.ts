import { Handlers } from "$fresh/server.ts";
import { getAllLinks } from "../../src/content.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    const searchParams = new URL(req.url).searchParams;
    const domain = searchParams.get("domain");
    let externalLinks = (await getAllLinks())?.external;

    if (!externalLinks) {
      return new Response(
        JSON.stringify({ message: "No external links available." }),
        {
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );
    }

    if (domain) {
      externalLinks = externalLinks.filter((link) => link.domain === domain);
    }

    return new Response(JSON.stringify(externalLinks, null, 2), {
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  },
};
