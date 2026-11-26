import { escapeHtml } from "../escape";
import { assertScene } from "../validate";
import type { Scene, SceneTheme } from "../scene";
import { renderHeader } from "./header";
import { renderTimeline } from "./timeline";

export interface RenderOptions {
  theme?: SceneTheme;
  now?: number;
}

export function renderScene(scene: Scene, options: RenderOptions = {}): string {
  assertScene(scene);
  const theme = escapeHtml(options.theme ?? scene.view?.theme ?? "light");
  return `<div class="ps-root" data-theme="${theme}">
  <article class="ps-page">
    ${renderHeader(scene.pr)}
    ${renderTimeline(scene, { now: options.now })}
  </article>
</div>`;
}
