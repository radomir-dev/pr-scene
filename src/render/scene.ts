import { escapeHtml } from "../escape";
import { renderChecks } from "./checks";
import { renderHeader } from "./header";
import type { Scene, SceneTheme } from "../scene";

export interface RenderOptions {
  theme?: SceneTheme;
}

export function renderScene(scene: Scene, options: RenderOptions = {}): string {
  const { pr } = scene;
  const theme = escapeHtml(options.theme ?? "light");
  return `<div class="ps-root" data-theme="${theme}">
  <article class="ps-page">
    ${renderHeader({ ...pr, commits: pr.commits })}
    ${renderChecks(scene.checks ?? [], scene.mergeable, pr.state === "merged")}
    <div class="ps-timeline" data-slot="timeline"></div>
  </article>
</div>`;
}
