const SKIPPED_CLASSES = new Set(["notranslate"]);
const KEPT_ATTRIBUTES = ["align", "checked", "href", "src", "type"];

export function canonicalMarkdown(html: string): string {
  const doc = new DOMParser().parseFromString(`<div id="root">${html}</div>`, "text/html");
  const root = doc.getElementById("root");
  if (!root) throw new Error("could not parse html");
  return children(root);
}

export function markdownBody(html: string): string {
  const doc = new DOMParser().parseFromString(`<div id="root">${html}</div>`, "text/html");
  return doc.querySelector(".ps-markdown")?.innerHTML ?? "";
}

function children(node: Element): string {
  return [...node.childNodes].map(serialize).filter(Boolean).join("\n");
}

function serialize(node: Node): string {
  if (node.nodeType === 3) return normalizeText(node.textContent ?? "");
  if (node.nodeType !== 1) return "";
  const element = node as Element;
  if (element.tagName.toLowerCase() === "markdown-accessiblity-table") return children(element);
  if (element.tagName.toLowerCase() === "svg") return "";
  const tag = element.tagName.toLowerCase();
  const classes = [...element.classList].filter((name) => !SKIPPED_CLASSES.has(name)).sort();
  const attributes = KEPT_ATTRIBUTES.filter((name) => element.hasAttribute(name)).map(
    (name) => `${name}=${element.getAttribute(name) ?? ""}`,
  );
  const head = [tag, ...classes].join(".");
  const suffix = attributes.length > 0 ? `[${attributes.join(",")}]` : "";
  return `<${head}${suffix}>${children(element)}</${tag}>`;
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}
