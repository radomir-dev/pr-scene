import { escapeHtml } from "../escape";
import type { Scene, SceneTheme } from "../scene";
import { renderHeader } from "./header";
import { renderTimeline } from "./timeline";

export interface RenderOptions {
  theme?: SceneTheme;
  now?: number;
}

export function renderScene(scene: Scene, options: RenderOptions = {}): string {
  const theme = escapeHtml(options.theme ?? "light");
  return `<div class="ps-root" data-theme="${theme}">
  <article class="ps-page">
    ${renderHeader(scene.pr)}
    ${renderTimeline(scene, { now: options.now })}
  </article>
</div>`;
}
