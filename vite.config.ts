import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")) as {
  name: string;
  version: string;
};

function repoSlug(): string {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY;
  try {
    const url = execSync("git config --get remote.origin.url", { encoding: "utf8" }).trim();
    return url.match(/github\.com[:/](.+?)(?:\.git)?$/)?.[1] ?? `radomir-dev/${pkg.name}`;
  } catch {
    return `radomir-dev/${pkg.name}`;
  }
}

const repoName = repoSlug().split("/").pop() ?? pkg.name;

export default defineConfig(({ command }) => ({
  base: command === "build" ? `/${repoName}/` : "/",
  build: { outDir: "dist-demo" },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __REPO_URL__: JSON.stringify(`https://github.com/${repoSlug()}`),
  },
}));
