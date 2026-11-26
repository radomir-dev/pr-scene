import { escapeHtml } from "../escape";
import { statusIcon } from "../icons";
import type { CheckStatus } from "../icons";
import type { CheckRun } from "../scene";

const SAMPLE_LOG: Record<CheckStatus, string> = {
  passed: "Check completed successfully.",
  failed: "Check failed. Review the output below.",
  running: "Check is still running.",
  queued: "Check is queued.",
};

export function renderChecks(runs: CheckRun[], mergeable?: boolean, merged = false): string {
  const counts = countStatuses(runs);
  const title = checksTitle(counts, runs.length);
  return `<section class="ps-checks" aria-label="Checks">
    <header class="ps-checks-heading">
      <h2 class="ps-checks-title">${escapeHtml(title)}</h2>
      <p class="ps-checks-summary">${escapeHtml(checksSummary(counts))}</p>
    </header>
    <ul class="ps-check-list">${runs.map(renderCheck).join("")}</ul>
    ${renderMergeFooter(runs, counts, mergeable, merged)}
  </section>`;
}

function checksTitle(counts: { failed: number; pending: number }, runCount: number): string {
  if (runCount === 0) return "Waiting for status to be reported";
  if (counts.failed > 0) return "Some checks were not successful";
  if (counts.pending > 0) return "Some checks haven’t completed yet";
  return "All checks have passed";
}

function countStatuses(runs: CheckRun[]): { passed: number; failed: number; pending: number } {
  return runs.reduce(
    (counts, run) => {
      if (run.status === "passed") counts.passed += 1;
      if (run.status === "failed") counts.failed += 1;
      if (run.status === "running" || run.status === "queued") counts.pending += 1;
      return counts;
    },
    { passed: 0, failed: 0, pending: 0 },
  );
}

function checksSummary(counts: { passed: number; failed: number; pending: number }): string {
  const successfulLabel = counts.passed === 1 ? "successful check" : "successful checks";
  const summary = [
    formatCount(counts.failed, "failing"),
    formatCount(counts.passed, successfulLabel),
    formatCount(counts.pending, "in progress"),
  ].filter(Boolean);
  return summary.join(", ") || "No checks reported";
}

function formatCount(count: number, label: string): string {
  return count === 0 ? "" : `${count} ${label}`;
}

function renderCheck(run: CheckRun): string {
  return `<li class="ps-check-row">
    ${statusIcon(run.status)}
    <span class="ps-check-workflow">${escapeHtml(run.workflow ?? "Checks")}</span>
    <span class="ps-check-name">${escapeHtml(run.name)}</span>
    <span class="ps-check-duration">${escapeHtml(run.duration ?? "—")}</span>
    <details class="ps-check-details">
      <summary>Details</summary>
      <pre class="ps-check-log">${escapeHtml(run.details ?? SAMPLE_LOG[run.status])}</pre>
    </details>
  </li>`;
}

function renderMergeFooter(
  runs: CheckRun[],
  counts: { failed: number; pending: number },
  mergeable?: boolean,
  merged = false,
): string {
  const canMerge =
    !merged &&
    mergeable !== false &&
    counts.failed === 0 &&
    counts.pending === 0 &&
    runs.length > 0;
  const message = mergeMessage(runs.length, counts, mergeable, merged, canMerge);
  const buttonClass = merged ? "ps-merge-button ps-merge-button--merged" : "ps-merge-button";
  const buttonText = merged ? "Merged" : "Merge pull request";
  return `<footer class="ps-merge-footer">
    <p class="ps-merge-copy">${escapeHtml(message)}</p>
    <button class="${escapeHtml(buttonClass)}" type="button"${canMerge ? "" : " disabled"}>${escapeHtml(buttonText)}</button>
  </footer>`;
}

function mergeMessage(
  runCount: number,
  counts: { failed: number; pending: number },
  mergeable: boolean | undefined,
  merged: boolean,
  canMerge: boolean,
): string {
  if (merged) return "Pull request successfully merged and closed";
  if (counts.failed > 0) return "Merging is blocked";
  if (counts.pending > 0 || runCount === 0) return "Some checks haven’t completed yet";
  if (mergeable === false) return "Merging is blocked";
  return canMerge ? "This branch has no conflicts with the base branch" : "Merging is blocked";
}
