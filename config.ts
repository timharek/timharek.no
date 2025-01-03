import "@std/dotenv/load";

const HOSTNAME = Deno.env.get("HOSTNAME");
const PORT = Deno.env.get("PORT");

export const config = {
  title: "Tim Hårek",
  description:
    "A technologist from Norway that cares about creating solutions that respects people's privacy, security and user experience.",
  base_url: HOSTNAME != "localhost"
    ? "https://timharek.no"
    : `http://localhost:${PORT}`,
  author: {
    name: "Tim Hårek Andreassen",
    avatar: "/.well-known/avatar?size=250&quality=90",
    email: "tim@harek.no",
  },
  logo: "img/logo.svg",
  cover: "img/cover.png",
  navigation: {
    header: [
      {
        title: "Blog",
        path: "/blog",
      },
      {
        title: "About",
        path: "/about",
      },
      {
        title: "More…",
        path: "/more",
      },
    ],
    footer: [
      {
        title: "Stats",
        path: "/stats",
      },
      {
        title: "Privacy",
        path: "/privacy",
      },
      {
        title: "Connect",
        path: "/connect",
      },
      {
        title: "Subscribe",
        path: "/subscribe",
      },
    ],
  },
  "rel=me": [
    "https://github.com/timharek",
    "https://sr.ht/~timharek",
    "mailto:tim@harek.no",
    "/public-key.asc",
    "https://www.printables.com/@timharek",
    "https://www.openstreetmap.org/user/timharek",
    "https://codeberg.org/timharek",
  ],
} as const;
