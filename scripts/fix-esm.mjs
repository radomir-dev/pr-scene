import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const dist = "dist";
const files = (await readdir(dist, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.(js|d\.ts)$/.test(entry.name))
  .map((entry) => relative(dist, join(entry.parentPath, entry.name)));

for (const file of files) {
  const path = join(dist, file);
  const before = await readFile(path, "utf8");
  const after = before.replace(/(from\s+")(\.[^"]*?)(")/g, (match, head, spec, tail) =>
    spec.endsWith(".js") || spec.endsWith(".json") || spec.endsWith(".css")
      ? match
      : `${head}${spec}.js${tail}`,
  );
  if (after !== before) await writeFile(path, after);
}
console.log(`checked ${files.length} built modules for explicit extensions`);
