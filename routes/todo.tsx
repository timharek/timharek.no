import { Handlers } from "$fresh/server.ts";
import { ServerState } from "./_middleware.ts";

export const handler: Handlers<unknown, ServerState> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    ctx.state.breadcrumbs = [
      {
        path: "/",
        title: "Index",
      },
      {
        path: url.pathname,
        title: "TODOs",
        current: true,
      },
    ];
    return ctx.render({ ...ctx.state });
  },
};
export default function Home() {
  const todo = [
    "Add sitemap (not xml)",
    "Add tests",
    "Git integration?",
    "Swap shortcodes with proper Markdown",
    "Check all links in Markdown",
    "Move CV",
    "Move Uses",
    "Move Work",
    "Move About",
    "Clean up front matter in all Markdown files",
    "Clean up `utils.ts`",
    "Add route for all outgoing links (.well-known)",
    "Change layout",
    "Add groupBy() function",
    "Add support for Plausible",
  ];
  return (
    <div class="p-4 mx-auto max-w-screen-md space-y-4 md:space-y-8">
      <section class="space-y-4 md:space-y-4">
        <h1 class="text-4xl font-semibold">TODOs</h1>
        <ul class="list-disc pl-4">
          {todo.map((todo) => <li>{todo}</li>)}
        </ul>
      </section>
    </div>
  );
}
