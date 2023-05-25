import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "https://deno.land/x/gfm@0.1.26/mod.ts";
import { extract } from "https://deno.land/std@0.188.0/front_matter/any.ts";

interface Props {
  markdown: string;
  frontMatter: {
    title: string;
  };
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;

    const pagesPath = new URL(`../content`, import.meta.url);
    const pagesDir = Deno.readDir(pagesPath);
    let pagePath: string | URL = "";
    for await (const entry of pagesDir) {
      if (entry.name == "blog") {
        continue;
      }
      const entryWithoutFileExtention = entry.name.replace(".md", "");

      if (entryWithoutFileExtention === slug) {
        if (entry.isDirectory) {
          const nestedDir = Deno.readDir(`${pagesPath.pathname}/${entry.name}`);
          for await (const nestedEntry of nestedDir) {
            if (nestedEntry.name.match("index.md|\_index.md")) {
              pagePath = new URL(
                `../content/${entry.name}/${nestedEntry.name}`,
                import.meta.url,
              );
              continue;
            }
          }
          continue;
        }
        pagePath = new URL(`../content/${entry.name}`, import.meta.url);
      }
    }
    console.log(pagePath);

    const fileContent = await Deno.readTextFile(pagePath);
    const { body, attrs } = extract(fileContent);
    const page: Props = {
      markdown: body,
      frontMatter: attrs as Props["frontMatter"] ?? {},
    };
    const resp = ctx.render(page);
    return resp;
  },
};

export default function BlogPost({ data }: PageProps<Props>) {
  const { markdown, frontMatter } = data;
  const body = render(markdown);
  const title = frontMatter.title;

  return (
    <>
      <Head>
        <title>{title} - Tim Hårek</title>
      </Head>
      <article class="max-w-screen-md mx-auto px-4">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
      </article>
    </>
  );
}
