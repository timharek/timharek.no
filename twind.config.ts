import { defineConfig } from "@twind/core@1.1.3";
import presetTailwind from "@twind/preset-tailwind@1.1.4";
import presetTypography from "@twind/preset-typography@1.0.7";

export default {
  ...defineConfig({
    presets: [
      presetTailwind(),
      presetTypography({ defaultColor: "white" }),
    ],
  }),
  selfURL: import.meta.url,
};
