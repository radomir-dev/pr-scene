import { escapeHtml } from "../escape";
import type { Scene, SceneTheme } from "../scene";
import { renderChecks } from "./checks";
import { renderComment } from "./comment";
import { renderHeader } from "./header";

export interface RenderOptions {
  theme?: SceneTheme;
  now?: number;
}

export function renderScene(scene: Scene, options: RenderOptions = {}): string {
  const { pr } = scene;
  const theme = escapeHtml(options.theme ?? "light");
  const comments = (scene.comments ?? [])
    .map((comment) => renderComment(comment, { now: options.now }))
    .join("");
  return `<div class="ps-root" data-theme="${theme}">
  <article class="ps-page">
    ${renderHeader(pr)}
    ${renderChecks(scene.checks ?? [], scene.mergeable, pr.state === "merged")}
    <div class="ps-timeline" data-slot="timeline">${comments}</div>
  </article>
</div>`;
}
