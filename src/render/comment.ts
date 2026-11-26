import { escapeHtml } from "../escape";
import { renderMarkdown } from "../markdown";
import type { Comment } from "../scene";
import { renderAvatar } from "./avatar";
import { relativeTime } from "./relative-time";

export interface CommentOptions {
  now?: number;
}

export function renderComment(comment: Comment, options: CommentOptions = {}): string {
  const when = comment.createdAt ? relativeTime(comment.createdAt, options.now) : "just now";
  const datetime = comment.createdAt ? ` datetime="${escapeHtml(comment.createdAt)}"` : "";
  return `<div class="ps-comment-row">
    ${renderAvatar(comment)}
    <article class="ps-comment">
      <header class="ps-comment-header">
        <span class="ps-comment-author">${escapeHtml(comment.author)}</span>
        ${comment.bot ? '<span class="ps-comment-bot">bot</span>' : ""}
        <span class="ps-comment-meta">commented <time${datetime}>${escapeHtml(when)}</time></span>
        ${comment.edited ? '<span class="ps-comment-edited">edited</span>' : ""}
      </header>
      <div class="ps-comment-body">${renderMarkdown(comment.body)}</div>
    </article>
  </div>`;
}
