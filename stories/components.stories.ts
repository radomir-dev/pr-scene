import type { Meta, StoryObj } from "@storybook/html-vite";
import { renderComment } from "../src/index";
import type { Comment } from "../src/scene";
import { actionsScene } from "../demo/scenes";
import { renderScene } from "../src/index";
import { themeFrom } from "./theme";

const meta = { title: "Components" } satisfies Meta;

export default meta;

export const Comment: StoryObj<{ comment: Comment }> = {
  name: "Comment card",
  args: {
    comment: {
      author: "github-actions",
      bot: true,
      createdAt: "2026-11-26T11:58:00Z",
      body: "### CI summary\n\n| Check | Status |\n| :--- | :---: |\n| **Lint** | ✅ Passed |\n| **Tests** | 🟡 Running |\n\n- [x] OpenAPI validated\n- [ ] E2E smoke completed",
    },
  },
  render: ({ comment }) => renderComment(comment, { now: Date.parse("2026-11-26T12:00:00Z") }),
};

export const Timeline: StoryObj = {
  name: "Timeline",
  render: (_args, context) => renderScene(actionsScene("merged"), { theme: themeFrom(context) }),
};
