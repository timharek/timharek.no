import { defineConfig, Preset, ThemeConfig } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind@1.1.4";

export default {
  ...defineConfig({
    presets: [presetTailwind() as Preset],
    theme: {
      extend: {
        colors: {
          primary: "#70a3f3",
          // zinc-900
          bg: "rgb(24, 24, 27)",
        },
      },
    } as ThemeConfig,
  }),
  selfURL: import.meta.url,
};
