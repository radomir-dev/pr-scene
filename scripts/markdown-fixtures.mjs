import { execFileSync } from "node:child_process";
import { readFile, readdir, writeFile } from "node:fs/promises";

const dir = new URL("../test/fixtures/markdown/", import.meta.url);
const sources = (await readdir(dir)).filter((file) => file.endsWith(".md"));

for (const name of sources) {
  const text = await readFile(new URL(name, dir), "utf8");
  const input = JSON.stringify({ mode: "gfm", text });
  const html = execFileSync("gh", ["api", "/markdown", "--input", "-"], {
    input,
    encoding: "utf8",
  });
  await writeFile(new URL(name.replace(/\.md$/, ".expected.html"), dir), html);
  console.log(`wrote ${name.replace(/\.md$/, ".expected.html")}`);
}
