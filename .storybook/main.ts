import { readFileSync } from "node:fs";
import type { StorybookConfig } from "@storybook/html-vite";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
  version: string;
};
const appVersion = process.env.APP_VERSION ?? pkg.version;

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.ts"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  framework: { name: "@storybook/html-vite", options: {} },
  core: { disableTelemetry: true },
  viteFinal: (vite) => ({
    ...vite,
    define: { ...vite.define, __APP_VERSION__: JSON.stringify(appVersion) },
  }),
};

export default config;
