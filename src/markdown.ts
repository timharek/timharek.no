import { extract } from "$std/front_matter/any.ts";
import { CSS } from "gfm/mod.ts";
import { Extract } from "$std/front_matter/mod.ts";

const highlight = await (await fetch(
  "https://esm.sh/highlight.js@11.9.0/styles/atom-one-dark.min.css",
)).text();

export async function getMarkdownFile<T>(path: URL): Promise<Extract<T>> {
  const fileContent = await Deno.readTextFile(path);
  const markdownFile = extract<T>(fileContent);

  return markdownFile;
}

export const css = `
    ${CSS}

    ${highlight}

    .markdown-body {
      /* bg-zinc-900 */
      --color-canvas-default: rgba(24,24,27,var(--tw-bg-opacity)) !important; 
      --color-fg-default: white !important;
    }
    .markdown-body ul {
      list-style: disc;
    }
    .markdown-body ol {
      list-style: decimal;
    }
    .markdown-body figure {
      margin-block: 1rem;
    }
    .markdown-body a {
      text-decoration: underline;
    }
    .markdown-body a:hover {
      text-decoration: underline;
      text-decoration-color: var(--color-accent-fg);
      background-color: var(--color-accent-fg);
      color: black;
    }
    .markdown-body table {
      border: none;
    }
    .markdown-body table tr,
    .markdown-body table th,
    .markdown-body table td {
      border: none;
      background: none !important;
    }
    .markdown-body table th:empty,
    .markdown-body table td:empty {
      margin: 0;
      padding: 0;
    }
  `;
