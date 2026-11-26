import type { CheckRun, Comment, Scene, TimelineItem } from "../src/scene";
import { actionsCommentBody, RELEASE_CHECKLIST_BODY } from "./sticky";
import type { ActionsVariant } from "./sticky";

const PR = {
  title: "feat(api): add sliding-window rate limiter middleware",
  number: 482,
  author: "alex-dev",
  base: "main",
  head: "feat/rate-limiter",
};

const CHECKS: Record<ActionsVariant, CheckRun[]> = {
  running: [
    { name: "Lint & typecheck", status: "passed", workflow: "CI", duration: "14s" },
    { name: "Unit & integration", status: "running", workflow: "CI", duration: "32s" },
    { name: "Docker build", status: "queued", workflow: "Deploy" },
    { name: "Preview API docs", status: "running", workflow: "Docs" },
    { name: "Mutation tests", status: "skipped", workflow: "Mutation" },
    { name: "Visual regression tests", status: "skipped", workflow: "Visual" },
  ],
  passed: [
    { name: "Lint & typecheck", status: "passed", workflow: "CI", duration: "14s" },
    { name: "Unit & integration", status: "passed", workflow: "CI", duration: "1m 12s" },
    { name: "Docker build", status: "passed", workflow: "Deploy", duration: "48s" },
    { name: "Preview API docs", status: "passed", workflow: "Docs", duration: "1m 4s" },
    { name: "Mutation tests", status: "skipped", workflow: "Mutation" },
    { name: "Visual regression tests", status: "skipped", workflow: "Visual" },
  ],
  failed: [
    { name: "Lint & typecheck", status: "passed", workflow: "CI", duration: "14s" },
    { name: "Unit & integration", status: "failed", workflow: "CI", duration: "38s" },
    { name: "Docker build", status: "passed", workflow: "Deploy", duration: "48s" },
    { name: "Preview API docs", status: "failed", workflow: "Docs", duration: "24s" },
    { name: "Mutation tests", status: "skipped", workflow: "Mutation" },
    { name: "Visual regression tests", status: "skipped", workflow: "Visual" },
  ],
  merged: [
    { name: "Lint & typecheck", status: "passed", workflow: "CI", duration: "14s" },
    { name: "Unit & integration", status: "passed", workflow: "CI", duration: "1m 12s" },
    { name: "Docker build", status: "passed", workflow: "Deploy", duration: "48s" },
    { name: "Preview API docs", status: "passed", workflow: "Docs", duration: "1m 4s" },
    { name: "Mutation tests", status: "skipped", workflow: "Mutation" },
    { name: "Visual regression tests", status: "skipped", workflow: "Visual" },
  ],
};

export function actionsScene(variant: ActionsVariant): Scene {
  const merged = variant === "merged";
  return {
    pr: { ...PR, state: merged ? "merged" : "open", commits: 3 },
    timeline: buildTimeline(variant, merged),
    checks: CHECKS[variant],
    mergeable: true,
  };
}

function buildTimeline(variant: ActionsVariant, merged: boolean): TimelineItem[] {
  const items: TimelineItem[] = [
    { kind: "comment", comment: actionsComment(variant) },
    { kind: "checks" },
  ];
  if (merged) {
    items.push({
      kind: "merged",
      actor: "alex-dev",
      sha: "a8f92c1",
      at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    });
  }
  return items;
}

function actionsComment(variant: ActionsVariant): Comment {
  return {
    author: "github-actions",
    bot: true,
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    body: actionsCommentBody(variant),
  };
}

export function releaseChecklistScene(): Scene {
  return {
    pr: {
      title: "feat: show a release checklist on every pull request",
      number: 42,
      author: "mira-chen",
      base: "main",
      head: "feat/release-checklist",
      state: "open",
    },
    timeline: [
      {
        kind: "comment",
        comment: {
          author: "github-actions",
          bot: true,
          createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
          body: RELEASE_CHECKLIST_BODY,
        },
      },
      { kind: "checks" },
    ],
    checks: [
      { name: "Lint & typecheck", status: "passed", workflow: "CI", duration: "14s" },
      { name: "Unit & integration", status: "running", workflow: "CI", duration: "32s" },
    ],
    mergeable: true,
  };
}
