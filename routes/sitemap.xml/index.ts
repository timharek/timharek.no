import { Handlers } from "$fresh/server.ts";
import { config } from "../../config.ts";
import { getAllPages } from "../../src/content.ts";
import { stringify } from "@libs/xml";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const pages = await getAllPages();

    const sitemap = generateSitemapXML([...pages]);

    return new Response(sitemap, {
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    });
  },
};

function generateSitemapXML(pages: Page[]): string {
  const sitemapXML = stringify({
    urlset: {
      "@xmlns": "https://www.sitemaps.org/schemas/sitemap/0.9",
      url: pages.map((page) => ({
        loc: `${config.base_url}/${page.path}`,
        ...(page.updatedAt && { lastmod: page.updatedAt.toISOString() }),
      })),
    },
  });

  return sitemapXML;
}
