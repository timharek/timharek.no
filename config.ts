import "$std/dotenv/load.ts";

const HOSTNAME = Deno.env.get("HOSTNAME");
const PORT = Deno.env.get("PORT");

export const config = {
  title: "Tim Hårek",
  description:
    "Technologist from Norway that cares about creating solutions that respects people in terms of privacy, security and user experience.",
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
        title: "More",
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
  ],
};
