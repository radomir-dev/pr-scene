import { escapeHtml } from "../escape";
import { renderIcon } from "../icons";
import type { IconName } from "../icons";
import type { PullRequest } from "../scene";

const STATE_LABEL = {
  open: "Open",
  merged: "Merged",
  closed: "Closed",
} as const;

const STATE_ICON: Record<PullRequest["state"], IconName> = {
  open: "git-pull-request",
  merged: "git-merge",
  closed: "git-pull-request-closed",
};

export function renderHeader(pr: PullRequest): string {
  const commits = pr.commits === undefined ? "" : `${escapeHtml(commitLabel(pr.commits))} `;
  return `<header class="ps-header">
    <div class="ps-header-title">
      <h1 class="ps-title">${escapeHtml(pr.title)} <span class="ps-number">#${escapeHtml(String(pr.number))}</span></h1>
      <span class="ps-state ps-state--${escapeHtml(pr.state)}">${renderIcon(STATE_ICON[pr.state])}<span>${escapeHtml(STATE_LABEL[pr.state])}</span></span>
    </div>
    <p class="ps-meta">
      <span><strong>${escapeHtml(pr.author)}</strong> wants to merge ${commits}into <code>${escapeHtml(pr.base)}</code> from <code>${escapeHtml(pr.head)}</code></span>
    </p>
  </header>`;
}

function commitLabel(commits: number): string {
  return `${commits} ${commits === 1 ? "commit" : "commits"}`;
}
