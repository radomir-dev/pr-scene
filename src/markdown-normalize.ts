const TASK_SELECTOR = 'input[type="checkbox"]';
const SHOW_COMMENT = 128;

export function normalizeGitHubHtml(html: string): string {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  for (const input of doc.querySelectorAll<HTMLInputElement>(TASK_SELECTOR)) markTaskItem(input);
  removeComments(doc.body);
  return doc.body.innerHTML;
}

function markTaskItem(input: HTMLInputElement): void {
  input.closest("li")?.classList.add("task-list-item");
  input.closest("ul, ol")?.classList.add("contains-task-list");
  input.removeAttribute("disabled");
  input.classList.add("task-list-item-checkbox");
  const label = input.hasAttribute("checked") ? "Completed task" : "Incomplete task";
  input.setAttribute("aria-label", label);
}

function removeComments(root: Element): void {
  const walker = root.ownerDocument.createTreeWalker(root, SHOW_COMMENT);
  const comments: Comment[] = [];
  while (walker.nextNode()) comments.push(walker.currentNode as Comment);
  for (const comment of comments) comment.remove();
}
