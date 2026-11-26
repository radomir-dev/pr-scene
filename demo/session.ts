import { flipTask, replaceSlots } from "../src/index";
import type { Comment, Scene } from "../src/scene";

export const RUN_URL = "https://github.com/acme/storefront/actions/runs/1234";
const SHA = "a8f92c1";

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
  return withSlots({ ...scene, checks }, { status: "🟡 Workflow running…", footer: "" });
}

export function passCheck(scene: Scene, index: number): Scene {
  const checks = (scene.checks ?? []).map((check, position) =>
    position === index ? { ...check, status: "passed" as const } : check,
  );
  const next = { ...scene, checks };
  if (!allPassed(next)) return next;
  return withSlots(next, {
    status: "✅ All checks passed",
    footer: `[Workflow run #1234](${RUN_URL})`,
  });
}

export function mergeScene(scene: Scene, at: string): Scene {
  const already = (scene.timeline ?? []).some((item) => item.kind === "merged");
  const timeline = already
    ? scene.timeline
    : [
        ...(scene.timeline ?? []),
        { kind: "merged" as const, actor: scene.pr.author, sha: SHA, at },
      ];
  return withSlots(
    { ...scene, pr: { ...scene.pr, state: "merged" }, timeline },
    {
      status: "🎉 Merged",
      footer: `[Workflow run #1234](${RUN_URL})`,
    },
  );
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
    body: hasSlots(comment.body) ? replaceSlots(comment.body, slots) : comment.body,
  }));
}

function hasSlots(body: string): boolean {
  return body.includes("<!-- slot:");
}
