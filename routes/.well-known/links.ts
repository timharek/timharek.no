import { Handlers } from "$fresh/server.ts";
import { getAllLinks } from "../../src/content_links.ts";
import { jsonResponse } from "../../src/utils.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    const searchParams = new URL(req.url).searchParams;
    const domain = searchParams.get("domain");
    let externalLinks = (await getAllLinks())?.external;

    if (!externalLinks) {
      return jsonResponse({ message: "No external links available." });
    }

    if (domain) {
      externalLinks = externalLinks.filter((link) => link.domain === domain);
    }

    return jsonResponse(externalLinks);
  },
};
