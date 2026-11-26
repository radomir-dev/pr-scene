import type { Meta, StoryObj } from "@storybook/html-vite";
import { renderScene } from "../src/index";
import type { CheckRun, SceneTheme } from "../src/index";
import { sceneWith } from "./fixtures";
import { themeFrom } from "./theme";

const meta = { title: "Components/Checks" } satisfies Meta;

export default meta;

function checks(runs: CheckRun[], theme: SceneTheme): string {
  return renderScene(sceneWith({ timeline: [{ kind: "checks" }], checks: runs }), { theme });
}

const RUNNING: CheckRun[] = [
  { name: "Lint & typecheck", status: "passed", workflow: "CI", duration: "14s" },
  { name: "Unit & integration", status: "running", workflow: "CI", duration: "32s" },
  { name: "Docker build", status: "queued", workflow: "Deploy" },
];

const FAILED: CheckRun[] = [
  { name: "Lint & typecheck", status: "passed", workflow: "CI", duration: "14s" },
  { name: "Unit & integration", status: "failed", workflow: "CI", duration: "38s" },
  { name: "Docker build", status: "passed", workflow: "Deploy", duration: "48s" },
];

export const Running: StoryObj = {
  name: "Running",
  render: (_args, context) => checks(RUNNING, themeFrom(context)),
};

export const Failed: StoryObj = {
  name: "Failed",
  render: (_args, context) => checks(FAILED, themeFrom(context)),
};

export const Skipped: StoryObj = {
  name: "Skipped",
  render: (_args, context) =>
    checks(
      [
        { name: "Preview API docs", status: "passed", workflow: "Docs", duration: "1m 4s" },
        { name: "Mutation tests", status: "skipped", workflow: "Mutation" },
        { name: "Visual regression tests", status: "skipped", workflow: "Visual" },
      ],
      themeFrom(context),
    ),
};

export const Empty: StoryObj = {
  name: "No runs reported",
  render: (_args, context) => checks([], themeFrom(context)),
};
