import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { SCENE_SCHEMA } from "../dist/scene-schema.js";

const json = `${JSON.stringify(SCENE_SCHEMA, null, 2)}\n`;

await mkdir(new URL("../schema/", import.meta.url), { recursive: true });
await writeFile(new URL("../schema/scene.schema.json", import.meta.url), json);
await writeFile(new URL("../dist/scene.schema.json", import.meta.url), json);
const formatter = new URL("../node_modules/.bin/oxfmt", import.meta.url).pathname;
execFileSync(formatter, ["schema/scene.schema.json", "dist/scene.schema.json"], {
  stdio: "ignore",
});
console.log("wrote schema/scene.schema.json and dist/scene.schema.json");
