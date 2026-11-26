import { flipTask, hasSlot, replaceSlot } from "../src/index";
import type { Comment, Scene } from "../src/scene";

const RUN_URL = "https://github.com/acme/storefront/actions/runs/1234";
const SHA = "a8f92c1";
const RUN_LINK = `[Workflow run #1234](${RUN_URL})`;
const RUNNING_SLOTS = {
  status: "🟡 Workflow running…",
  docs: "🟡 Building preview…",
  footer: "",
};
const DONE_SLOTS = {
  status: "✅ All checks passed",
  docs: "[API docs for this PR](https://pr-482.docs.internal) ✅",
  footer: RUN_LINK,
};
const MERGED_SLOTS = {
  status: "🎉 Merged",
  docs: "🎉 Merged and deployed ✅",
  footer: RUN_LINK,
};

export function toggleTaskInScene(scene: Scene, index: number, at: string): Scene {
  return withFirstComment(scene, (comment) => ({
    ...comment,
    body: flipTask(comment.body, index),
    edited: true,
    createdAt: at,
  }));
}

export function startChecks(scene: Scene): Scene {
  const checks = (scene.checks ?? []).map((check) => ({ ...check, status: "running" as const }));
  return withSlots({ ...scene, checks }, RUNNING_SLOTS);
}

export function passCheck(scene: Scene, index: number): Scene {
  const checks = (scene.checks ?? []).map((check, position) =>
    position === index ? { ...check, status: "passed" as const } : check,
  );
  const next = { ...scene, checks };
  if (!allPassed(next)) return next;
  return withSlots(next, DONE_SLOTS);
}

export function mergeScene(scene: Scene, at: string): Scene {
  const already = (scene.timeline ?? []).some((item) => item.kind === "merged");
  const timeline = already
    ? scene.timeline
    : [
        ...(scene.timeline ?? []),
        { kind: "merged" as const, actor: scene.pr.author, sha: SHA, at },
      ];
  return withSlots({ ...scene, pr: { ...scene.pr, state: "merged" }, timeline }, MERGED_SLOTS);
}

export function isRunning(scene: Scene): boolean {
  return (scene.checks ?? []).some((check) => check.status === "running");
}

export function allPassed(scene: Scene): boolean {
  const checks = scene.checks ?? [];
  return checks.length > 0 && checks.every((check) => check.status === "passed");
}

function withFirstComment(scene: Scene, update: (comment: Comment) => Comment): Scene {
  let used = false;
  const timeline = (scene.timeline ?? []).map((item) => {
    if (used || item.kind !== "comment") return item;
    used = true;
    return { ...item, comment: update(item.comment) };
  });
  return { ...scene, timeline };
}

function withSlots(scene: Scene, slots: Record<string, string>): Scene {
  return withFirstComment(scene, (comment) => ({
    ...comment,
    body: fillPresent(comment.body, slots),
  }));
}

function fillPresent(body: string, slots: Record<string, string>): string {
  return Object.entries(slots).reduce(
    (markdown, [name, text]) =>
      hasSlot(markdown, name) ? replaceSlot(markdown, name, text) : markdown,
    body,
  );
}
