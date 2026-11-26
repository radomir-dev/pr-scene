import { execFileSync } from "node:child_process";
import { access, mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const work = await mkdtemp(join(tmpdir(), "pr-scene-pack-"));
const packed = execFileSync("npm", ["pack", "--silent", "--pack-destination", work], {
  encoding: "utf8",
}).trim();
const tarball = join(work, packed.split("\n").pop() ?? packed);

const consumer = join(work, "consumer");
await mkdir(consumer, { recursive: true });
await writeFile(
  join(consumer, "package.json"),
  JSON.stringify({ name: "consumer", private: true, type: "module" }),
);
execFileSync("npm", ["install", "--silent", "--no-audit", "--no-fund", tarball], {
  cwd: consumer,
  stdio: "inherit",
});

const script = `
import { renderScene, validateScene } from "pr-scene";
const html = renderScene({
  pr: { title: "t", number: 1, author: "a", base: "main", head: "b", state: "open" },
});
if (!html.includes("ps-root")) throw new Error("renderScene produced no root element");
if (validateScene({}).length === 0) throw new Error("validateScene accepted an empty scene");
await import("pr-scene/scene.schema.json", { with: { type: "json" } });
const { access } = await import("node:fs/promises");
await access("node_modules/pr-scene/dist/styles.css");
console.log("installed tarball renders, validates and ships its stylesheet");
`;
execFileSync(process.execPath, ["--input-type=module", "-e", script], {
  cwd: consumer,
  stdio: "inherit",
});
