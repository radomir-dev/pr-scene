import type { Preview } from "@storybook/html-vite";
import "@primer/css/dist/markdown.css";
import "../src/styles/index.css";
import "./preview.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Scene theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme === "dark" ? "dark" : "light";
      return `<div class="story-shell ps-root" data-theme="${theme}">
      ${story()}
      <span class="story-version">pr-scene v${__APP_VERSION__}</span>
    </div>`;
    },
  ],
  parameters: {
    controls: { expanded: true },
    a11y: {
      test: "error",
      config: {
        rules: [{ id: "heading-order", enabled: false }],
      },
    },
    backgrounds: { disable: true },
  },
};

export default preview;
