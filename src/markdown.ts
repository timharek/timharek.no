import { extract } from "@std/front-matter/any";
import { CSS } from "@deno/gfm";
import { Extract } from "@std/front-matter";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { gfmHeadingId } from "marked-gfm-heading";
import hljs from "highlight.js";

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
      --color-canvas-default: hsl(var(--color-bg) / var(--tw-bg-opacity)) !important; 
      --color-fg-default: var(--color-text) !important;
      --color-accent-fg: var(--color-primary);
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
      color: var(--color-bg);
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
