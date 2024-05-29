import { extract } from "@std/front-matter/any";
import { CSS } from "@deno/gfm";
import { Extract } from "@std/front-matter";
import { Marked } from "npm:marked@8.0.1";
import { markedHighlight } from "npm:marked-highlight@2.0.9";
import { gfmHeadingId } from "npm:marked-gfm-heading-id@3.1.3";
import hljs from "npm:highlight.js@11.9.0";

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
      --color-accent-fg: #0098fd;
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
      font-weight: 500;
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

export const marked = new Marked(
  markedHighlight({
    async: true,
    langPrefix: "language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  gfmHeadingId(),
);
