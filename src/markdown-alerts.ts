import { renderIcon } from "./icons";
import type { IconName } from "./icons";

type AlertKind = "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION";

const ALERTS: Record<AlertKind, { title: string; icon: IconName }> = {
  NOTE: { title: "Note", icon: "info" },
  TIP: { title: "Tip", icon: "light-bulb" },
  IMPORTANT: { title: "Important", icon: "report" },
  WARNING: { title: "Warning", icon: "alert" },
  CAUTION: { title: "Caution", icon: "stop" },
};

const MARKER = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i;

export function transformAlerts(root: Element): void {
  for (const quote of Array.from(root.querySelectorAll("blockquote"))) {
    const paragraph = quote.querySelector("p");
    const match = paragraph ? MARKER.exec(paragraph.textContent ?? "") : null;
    if (!paragraph || !match) continue;
    quote.replaceWith(buildAlert(quote, paragraph, match[1]?.toUpperCase() as AlertKind));
  }
}

function buildAlert(quote: Element, marker: Element, kind: AlertKind): Element {
  const doc = quote.ownerDocument;
  const spec = ALERTS[kind];
  const alert = doc.createElement("div");
  alert.className = `markdown-alert markdown-alert-${kind.toLowerCase()}`;

  const title = doc.createElement("p");
  title.className = "markdown-alert-title";
  title.innerHTML = renderIcon(spec.icon);
  title.append(spec.title);
  alert.append(title);

  const rest = (marker.textContent ?? "").replace(MARKER, "").trim();
  if (rest) {
    const lead = doc.createElement("p");
    lead.textContent = rest;
    alert.append(lead);
  }
  marker.remove();
  moveChildren(quote, alert);
  return alert;
}

function moveChildren(from: Element, to: Element): void {
  for (const child of Array.from(from.children)) to.append(child);
  for (const node of Array.from(from.childNodes)) if (node.nodeType === 3) node.remove();
}
