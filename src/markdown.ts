import DOMPurify from "dompurify";
import { marked } from "marked";
import { escapeHtml } from "./escape";
import { normalizeGitHubHtml } from "./markdown-normalize";

export type MarkdownMode = "rendered" | "source";

export interface MarkdownOptions {
  mode?: MarkdownMode;
}

export function renderMarkdown(source: string, options: MarkdownOptions = {}): string {
  if (options.mode === "source") return renderSource(source);
  const html = marked.parse(source, { async: false, gfm: true });
  const clean = DOMPurify.sanitize(html);
  return `<div class="ps-markdown markdown-body">${normalizeGitHubHtml(clean)}</div>`;
}

function renderSource(source: string): string {
  return `<pre class="ps-markdown-source"><code>${escapeHtml(source)}</code></pre>`;
}
