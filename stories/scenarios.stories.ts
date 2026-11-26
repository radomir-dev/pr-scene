import type { Meta, StoryObj } from "@storybook/html-vite";
import { renderScene } from "../src/index";
import type { SceneTheme } from "../src/index";
import { scenarioById } from "../demo/scenarios";
import { expectScene } from "./assert";
import { themeFrom } from "./theme";

const meta = { title: "Scenarios" } satisfies Meta;

export default meta;

function render(id: string, theme: SceneTheme): string {
  return renderScene(scenarioById(id).scenario.scene, { theme });
}

const play = ({ canvasElement }: { canvasElement: HTMLElement }): void => {
  expectScene(canvasElement);
};

export const ActionsRunning: StoryObj = {
  name: "Actions · running",
  render: (_args, context) => render("actions-running", themeFrom(context)),
  play,
};

export const ActionsPassed: StoryObj = {
  name: "Actions · passed",
  render: (_args, context) => render("actions-passed", themeFrom(context)),
  play,
};

export const ActionsFailed: StoryObj = {
  name: "Actions · failed",
  render: (_args, context) => render("actions-failed", themeFrom(context)),
  play,
};

export const ActionsMerged: StoryObj = {
  name: "Actions · merged",
  render: (_args, context) => render("actions-merged", themeFrom(context)),
  play,
};

export const ReleaseChecklist: StoryObj = {
  name: "Release checklist",
  render: (_args, context) => render("release-checklist", themeFrom(context)),
  play,
};
