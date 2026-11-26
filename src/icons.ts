import { ICON_PATHS } from "./icon-data";

export type IconName = keyof typeof ICON_PATHS;

export type IconSize = 16 | 28;

export type CheckStatus = "passed" | "failed" | "running" | "queued" | "skipped";

interface StatusSpec {
  icon?: IconName;
  tone: CheckStatus;
  label: string;
}

const STATUS: Record<CheckStatus, StatusSpec> = {
  passed: { icon: "check-circle-fill", tone: "passed", label: "Passed" },
  failed: { icon: "x-circle-fill", tone: "failed", label: "Failed" },
  running: { tone: "running", label: "In progress" },
  queued: { icon: "dot-fill", tone: "queued", label: "Queued" },
  skipped: { icon: "skip", tone: "skipped", label: "Skipped" },
};

export function renderIcon(name: IconName, size: IconSize = 16): string {
  return `<svg class="ps-icon ps-icon--${size} octicon octicon-${name}" width="${size}" height="${size}" viewBox="0 0 16 16" aria-hidden="true" focusable="false">${ICON_PATHS[name]}</svg>`;
}

export function statusIcon(status: CheckStatus, size: IconSize = 16): string {
  const spec = STATUS[status];
  const glyph = spec.icon ? renderIcon(spec.icon, size) : spinner(size);
  return `<span class="ps-status ps-status--${spec.tone}" role="img" aria-label="${spec.label}">${glyph}</span>`;
}

function spinner(size: IconSize): string {
  return `<svg class="ps-icon ps-icon--${size} ps-spinner" width="${size}" height="${size}" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-opacity="0.25" stroke-width="2"></circle>
    <path d="M8 1.5A6.5 6.5 0 0 1 14.5 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
  </svg>`;
}
