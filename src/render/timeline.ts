import { escapeHtml } from "../escape";
import { renderIcon, statusIcon } from "../icons";
import type { CheckRun, Review, Scene, TimelineItem } from "../scene";
import { renderChecks } from "./checks";
import { renderAvatar } from "./avatar";
import { renderComment } from "./comment";
import { relativeTime } from "./relative-time";

export interface TimelineOptions {
  now?: number;
}

export function renderTimeline(scene: Scene, options: TimelineOptions = {}): string {
  const items = scene.timeline ?? [{ kind: "checks" as const }];
  const body = items.map((item) => renderItem(item, scene, options)).join("");
  return `<div class="ps-timeline" data-slot="timeline">${body}</div>`;
}

function renderItem(item: TimelineItem, scene: Scene, options: TimelineOptions): string {
  if (item.kind === "comment") return renderComment(item.comment, options);
  if (item.kind === "checks") return renderChecksItem(scene);
  if (item.kind === "review") return renderReviewItem(item.review, options);
  return renderMergeItem(item, scene, options);
}

function renderChecksItem(scene: Scene): string {
  const runs = scene.checks ?? [];
  const badge = `<span class="ps-event-badge ps-event-badge--checks">${statusIcon(checksStatus(runs))}</span>`;
  return `<div class="ps-timeline-item ps-timeline-item--badge">
    ${badge}
    <div class="ps-timeline-content">${renderChecks(runs, scene.mergeable, scene.pr.state === "merged")}</div>
  </div>`;
}

function checksStatus(runs: CheckRun[]): "passed" | "failed" | "running" | "queued" {
  if (runs.some((run) => run.status === "failed")) return "failed";
  if (runs.some((run) => run.status === "running" || run.status === "queued")) return "running";
  return runs.length > 0 ? "passed" : "queued";
}

function renderMergeItem(
  item: Extract<TimelineItem, { kind: "merged" }>,
  scene: Scene,
  options: TimelineOptions,
): string {
  const actor = escapeHtml(item.actor ?? scene.pr.author);
  const sha = item.sha ? ` commit <code>${escapeHtml(item.sha)}</code>` : "";
  const when = item.at
    ? ` <span class="ps-event-time">${escapeHtml(relativeTime(item.at, options.now))}</span>`
    : "";
  const base = `<code>${escapeHtml(scene.pr.base)}</code>`;
  return `<div class="ps-timeline-item ps-timeline-item--badge">
    <span class="ps-event-badge ps-event-badge--merged">${renderIcon("git-merge")}</span>
    <p class="ps-event-copy"><strong>${actor}</strong> merged${sha} into ${base}${when}</p>
  </div>`;
}

const REVIEW_COPY: Record<Review["state"], string> = {
  approved: "approved these changes",
  "changes-requested": "requested changes",
  commented: "reviewed",
};

function renderReviewItem(review: Review, options: TimelineOptions): string {
  const when = review.at
    ? ` <span class="ps-event-time">${escapeHtml(relativeTime(review.at, options.now))}</span>`
    : "";
  const body = review.body
    ? `<div class="ps-review-body ps-markdown markdown-body">${escapeHtml(review.body)}</div>`
    : "";
  return `<div class="ps-timeline-item">
    ${renderAvatar(review)}
    <article class="ps-review ps-review--${review.state}">
      <header class="ps-review-header">
        <strong>${escapeHtml(review.author)}</strong>
        <span class="ps-review-state">${REVIEW_COPY[review.state]}</span>${when}
      </header>
      ${body}
    </article>
  </div>`;
}
