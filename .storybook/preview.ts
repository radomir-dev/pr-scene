import type { Preview } from "@storybook/html-vite";
import "@primer/css/dist/markdown.css";
import "../src/styles/tokens.css";
import "../src/styles/app.css";
import "../src/styles/icons.css";
import "../src/styles/markdown.css";
import "../src/styles/header.css";
import "../src/styles/comment.css";
import "../src/styles/checks.css";
import "../src/styles/merge.css";
import "../src/styles/timeline.css";
import "./preview.css";

const preview: Preview = {
  decorators: [
    (story) => `<div class="story-shell">
      ${story()}
      <span class="story-version">pr-scene v${__APP_VERSION__}</span>
    </div>`,
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
