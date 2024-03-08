import { Token, Tokens, TokensList } from "npm:marked@8.0.1";
import { parse } from "https://esm.sh/tldts@6.0.14";
import { getAllPages } from "./content.ts";
import { groupBy } from "./group_by.ts";
import { marked } from "./markdown.ts";

export type ExternalLink = {
  domain: string;
  count: number;
  links: {
    sourceUrl: string[];
    targetUrl: string;
  }[];
};

export type InternalLink = {
  pathname: string;
  count: number;
};

type Links = {
  count: number;
  internal?: InternalLink[];
  external?: ExternalLink[];
};
export async function getAllLinks(
  prefix = "../content",
): Promise<Links | null> {
  const allPages = await getAllPages(prefix);

  const externalAnchors = allPages.filter((page) =>
    page.links && page.links.external && page.links.external?.length > 0
  ).flatMap((page) => page.links?.external) as string[];

  const internalAnchors = allPages.filter((page) =>
    page.links && page.links.internal && page.links.internal?.length > 0
  ).flatMap((page) => page.links?.internal) as string[];

  const externalGroup = groupBy(
    externalAnchors,
    (link) => parse(new URL(link).host).domain,
  );
  const external: ExternalLink[] = Object.keys(externalGroup).map((domain) => {
    return {
      domain,
      count: externalGroup[domain].length,
      links: externalGroup[domain].map((link) => {
        return {
          targetUrl: link.toString(),
          sourceUrl: allPages.filter((page) =>
            page.links?.external?.includes(link.toString())
          ).flatMap((page) => `/${page.path}`) as string[],
        };
      }),
    };
  }).sort((a, b) => b.count - a.count);

  const internalGroup = groupBy(internalAnchors, (link) => link);

  const internal = Object.keys(internalGroup).map((pathname) => {
    return { pathname, count: internalGroup[pathname].length };
  }).sort((a, b) => b.count - a.count);

  return {
    count: internal.length + external.length,
    internal,
    external,
  };
}

export function getLinks(body: string) {
  const tokens = marked.lexer(body);
  const links = getLinksFromTokens(tokens);
  links.push(...Object.values(tokens.links) as Tokens.Link[]);

  const internal = new Set<string>();
  const external = new Set<string>();

  for (const link of links) {
    if ((link.href as string).includes("mailto:")) {
      continue;
    }
    if ((link.href as string).startsWith("#")) {
      continue;
    }
    if ((link.href as string).startsWith("/")) {
      internal.add(link.href);
      continue;
    }
    external.add(link.href);
  }

  return {
    internal: Array.from(internal),
    external: Array.from(external),
  };
}

function getLinksFromTokens(tokens: TokensList | Token[]) {
  const links: (Tokens.Link | Tokens.Generic)[] = [];

  for (const token of tokens) {
    if (token.type === "link") {
      links.push(token);
    }

    if ("items" in token) {
      links.push(...getLinksFromTokens(token.items as Token[]));
    }

    if ("tokens" in token) {
      links.push(...getLinksFromTokens(token.tokens as Token[]));
    }
  }

  return links;
}
