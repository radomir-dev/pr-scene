import { renderScene } from "../src/index";
import type { PullRequest, Scene, SceneTheme } from "../src/index";

export const PR: PullRequest = {
  title: "feat(api): add sliding-window rate limiter middleware",
  number: 482,
  author: "alex-dev",
  base: "main",
  head: "feat/rate-limiter",
  state: "open",
};

export function sceneWith(parts: Partial<Scene>): Scene {
  return { pr: PR, ...parts };
}

export function headerOnly(scene: Scene, theme: SceneTheme): string {
  const html = renderScene(scene, { theme });
  return html.split('<div class="ps-timeline"')[0] + "</article></div>";
}
