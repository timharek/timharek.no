import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { ServerState } from "./_middleware.ts";
import { config } from "../config.ts";

export default function App(props: PageProps<unknown, ServerState>) {
  const Component = props.Component;
  const state = props.state;
  const currentPath = new URL(props.url).pathname;

  return (
    <html lang={state.language}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        <meta
          name="description"
          content={state.description}
        />
        {config["rel=me"].map((item) => <link rel="me" href={item} />)}
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/feed.xml"
          title="RSS feed"
        />
        <link
          rel="alternate"
          type="application/json"
          href="/feed.json"
          title="JSON feed"
        />
        <title>{state.title}</title>
      </Head>
      <body class="bg-bg text-white border-t-4 border-primary">
        <Header currentPath={currentPath} breadcrumbs={state.breadcrumbs} />
        <main id="main">
          <Component />
        </main>
        <Footer currentPath={currentPath} lastDeploy={state.lastDeploy} />
      </body>
    </html>
  );
}
