import type { StoryContext } from "@storybook/html-vite";
import type { SceneTheme } from "../src/index";

export function themeFrom(context: StoryContext): SceneTheme {
  return context.globals.theme === "dark" ? "dark" : "light";
}
