import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";

const source = new URL("../src/styles/", import.meta.url);
const target = new URL("../dist/styles.css", import.meta.url);
const primer = await readFile(
  new URL("../node_modules/@primer/css/dist/markdown.css", import.meta.url),
  "utf8",
);
const files = (await readdir(source)).filter((file) => file.endsWith(".css")).sort();
const parts = await Promise.all(files.map((file) => readFile(new URL(file, source), "utf8")));

await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
await writeFile(target, [primer, ...parts].join("\n"));
