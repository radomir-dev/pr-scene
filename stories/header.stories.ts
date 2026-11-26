import type { Meta, StoryObj } from "@storybook/html-vite";
import type { PrState } from "../src/index";
import { PR, headerOnly, sceneWith } from "./fixtures";
import { themeFrom } from "./theme";

const meta = { title: "Components/Header" } satisfies Meta;

export default meta;

function header(state: PrState, theme: ReturnType<typeof themeFrom>): string {
  return headerOnly(sceneWith({ pr: { ...PR, state, commits: 3 } }), theme);
}

export const Open: StoryObj = {
  name: "Open",
  render: (_args, context) => header("open", themeFrom(context)),
};

export const Merged: StoryObj = {
  name: "Merged",
  render: (_args, context) => header("merged", themeFrom(context)),
};

export const Closed: StoryObj = {
  name: "Closed",
  render: (_args, context) => header("closed", themeFrom(context)),
};
