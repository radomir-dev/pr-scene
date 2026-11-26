import { escapeHtml } from "../escape";
import type { PrState, Scene, SceneTheme } from "../scene";

const STATE_LABEL: Record<PrState, string> = {
  open: "Open",
  merged: "Merged",
  closed: "Closed",
};

export interface RenderOptions {
  theme?: SceneTheme;
}

export function renderScene(scene: Scene, options: RenderOptions = {}): string {
  const { pr } = scene;
  const theme = options.theme ?? "light";
  return `<div class="ps-root" data-theme="${theme}">
  <article class="ps-page">
    <header class="ps-header">
      <h1 class="ps-title">${escapeHtml(pr.title)} <span class="ps-number">#${pr.number}</span></h1>
      <p class="ps-meta">
        <span class="ps-state ps-state--${pr.state}">${STATE_LABEL[pr.state]}</span>
        <span><strong>${escapeHtml(pr.author)}</strong> wants to merge into <code>${escapeHtml(pr.base)}</code> from <code>${escapeHtml(pr.head)}</code></span>
      </p>
    </header>
    <div class="ps-timeline" data-slot="timeline"></div>
  </article>
</div>`;
}
