import type { Meta, StoryObj } from "@storybook/html-vite";
import { renderScene } from "../src/index";
import type { Review, SceneTheme } from "../src/index";
import { sceneWith } from "./fixtures";
import { themeFrom } from "./theme";

const meta = { title: "Components/Review" } satisfies Meta;

export default meta;

const NOW = Date.parse("2026-11-26T12:00:00Z");

function review(review: Review, theme: SceneTheme): string {
  return renderScene(sceneWith({ timeline: [{ kind: "review", review }] }), { theme, now: NOW });
}

export const Approved: StoryObj = {
  name: "Approved",
  render: (_args, context) =>
    review(
      {
        author: "mira-chen",
        state: "approved",
        at: "2026-11-26T11:52:00Z",
        body: "The sliding window reads well and the boundary tests cover the off-by-one.",
      },
      themeFrom(context),
    ),
};

export const ChangesRequested: StoryObj = {
  name: "Changes requested",
  render: (_args, context) =>
    review(
      {
        author: "sam-ito",
        state: "changes-requested",
        at: "2026-11-26T11:48:00Z",
        body: "Limit should be configurable per route, not global.",
      },
      themeFrom(context),
    ),
};

export const Commented: StoryObj = {
  name: "Commented",
  render: (_args, context) =>
    review(
      { author: "alex-dev", state: "commented", at: "2026-11-26T11:55:00Z" },
      themeFrom(context),
    ),
};
