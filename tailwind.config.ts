import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0098fd",
        // zinc-900
        bg: "rgb(24, 24, 27)",
      },
    },
  },
} satisfies Config;
