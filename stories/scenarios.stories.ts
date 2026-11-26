import type { Meta, StoryObj } from "@storybook/html-vite";
import { renderScene } from "../src/index";
import { scenarioById } from "../demo/scenarios";

const meta = { title: "Scenarios" } satisfies Meta;

export default meta;

function render(id: string, theme: "light" | "dark" = "light"): string {
  return renderScene(scenarioById(id).scenario.scene, { theme });
}

export const ActionsRunning: StoryObj = {
  name: "Actions · running",
  render: () => render("actions-running"),
};

export const ActionsPassed: StoryObj = {
  name: "Actions · passed",
  render: () => render("actions-passed"),
};

export const ActionsFailed: StoryObj = {
  name: "Actions · failed",
  render: () => render("actions-failed"),
};

export const ActionsMerged: StoryObj = {
  name: "Actions · merged",
  render: () => render("actions-merged"),
};

export const ReleaseChecklist: StoryObj = {
  name: "Release checklist",
  render: () => render("release-checklist"),
};

export const DarkTheme: StoryObj = {
  name: "Actions · dark",
  render: () => render("actions-passed", "dark"),
};
