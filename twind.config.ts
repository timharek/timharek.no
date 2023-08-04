import { defineConfig } from "@twind/core@1.1.3";
import presetTailwind from "@twind/preset-tailwind@1.1.4";

export default {
  ...defineConfig({
    presets: [
      presetTailwind(),
    ],
    theme: {
      extend: {
        colors: { primary: "#70a3f3" },
      },
    },
  }),
  selfURL: import.meta.url,
};
