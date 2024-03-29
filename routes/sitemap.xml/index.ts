import { Handlers } from "$fresh/server.ts";
import { config } from "../../config.ts";
import { getAllPages } from "../../src/content.ts";
import { ServerState } from "../_middleware.ts";

interface SitemapProps {
  pages: Page[];
}

export const handler: Handlers<SitemapProps, ServerState> = {
  async GET(_req, _ctx) {
    const pages = await getAllPages();

    const sitemap = generateSitemap([...pages]);

    return new Response(sitemap, {
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    });
  },
};

function generateSitemap(pages: SitemapProps["pages"]): string {
  const pagesXml = pages.map((page) => {
    return `<url>
        <loc>${config.base_url}/${page.path}</loc>
        ${
      page.updatedAt ? `<lastmod>${page.updatedAt.toISOString()}</lastmod>` : ""
    }
    </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${pagesXml.join("\n")}
</urlset>`;

  return sitemap;
}
