import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { config } from "../config.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <Head>
        <meta
          name="description"
          content={config.description}
        />
      </Head>
      <body class="bg-zinc-900 text-white">
        <Header />
        <main id="main">
          <Component />
        </main>
        <Footer />
      </body>
    </html>
  );
}
