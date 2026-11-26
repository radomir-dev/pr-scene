import { execFileSync } from "node:child_process";
import { cp, mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";

const check = process.argv.includes("--check");
const generatedDir = await mkdtemp(join(tmpdir(), "pr-scene-docs-"));

try {
  execFileSync("npx", ["typedoc", "--out", generatedDir], { stdio: "inherit" });
  if (check) {
    const changed = await compare(generatedDir, "docs/api");
    if (changed.length > 0) {
      console.error(`docs are stale: ${changed.join(", ")}`);
      console.error("run `npm run docs` and commit the result");
      process.exitCode = 1;
    } else {
      console.log("docs are current");
    }
  } else {
    await rm("docs/api", { recursive: true, force: true });
    await cp(generatedDir, "docs/api", { recursive: true });
    console.log("wrote docs/api");
  }
} finally {
  await rm(generatedDir, { recursive: true, force: true });
}

async function compare(left, right) {
  const [a, b] = [await files(left), await files(right)];
  const names = [...new Set([...a, ...b])].sort();
  const changed = [];
  for (const name of names) {
    const [x, y] = [await text(left, name), await text(right, name)];
    if (x !== y) changed.push(name);
  }
  return changed;
}

async function files(root) {
  const entries = await readdir(root, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => relative(root, join(entry.parentPath, entry.name)))
    .sort();
}

async function text(root, name) {
  const file = await readFile(join(root, name), "utf8").catch(() => "");
  return normalize(file);
}

function normalize(markdown) {
  return markdown
    .split("\n")
    .filter((line) => !/^\s*\|?[\s:|-]+\|?\s*$/.test(line))
    .join("\n")
    .replace(/\s+/g, " ")
    .trim();
}
