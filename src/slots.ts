const TASK = /^(\s*[-*+]\s+\[)([ xX])(\])/gm;

export function countTasks(source: string): number {
  return [...source.matchAll(TASK)].length;
}

export function flipTask(source: string, index: number): string {
  let position = 0;
  return source.replace(TASK, (match, head: string, mark: string, tail: string) => {
    const current = position;
    position += 1;
    if (current !== index) return match;
    return `${head}${mark === " " ? "x" : " "}${tail}`;
  });
}

export function replaceSlot(source: string, name: string, text: string): string {
  const pattern = slotPattern(name);
  if (!pattern.test(source)) throw new Error(`no slot "${name}" in the comment`);
  return source.replace(pattern, `$1\n${text}\n$2`);
}

export function replaceSlots(source: string, slots: Record<string, string>): string {
  return Object.entries(slots).reduce(
    (markdown, [name, text]) => replaceSlot(markdown, name, text),
    source,
  );
}

function slotPattern(name: string): RegExp {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(<!--\\s*slot:${escaped}\\s*-->)[\\s\\S]*?(<!--\\s*/slot:${escaped}\\s*-->)`);
}
