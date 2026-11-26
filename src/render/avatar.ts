import { escapeHtml } from "../escape";
import type { AvatarSource } from "../scene";

export function renderAvatar(source: AvatarSource): string {
  const url = safeUrl(source.avatarUrl);
  const inner = url
    ? `<img class="ps-avatar-image" src="${escapeHtml(url)}" alt="" width="40" height="40">`
    : `<span class="ps-avatar-initials" aria-hidden="true">${escapeHtml(initials(source.author))}</span>`;
  return `<div class="ps-avatar">${inner}</div>`;
}

function safeUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

function initials(author: string): string {
  return author
    .split(/[-_\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
