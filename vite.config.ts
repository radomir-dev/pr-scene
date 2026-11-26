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
const appVersion = process.env.APP_VERSION ?? pkg.version;

export default defineConfig(({ command, isPreview }) => {
  const base = command === "build" || isPreview ? `/${repoName}/` : "/";
  const canonicalUrl = `https://radomir.dev${base}`;
  return {
    base,
    plugins: [
      {
        name: "pr-scene-canonical-url",
        transformIndexHtml(html: string) {
          return html
            .replaceAll("__CANONICAL_URL__", canonicalUrl)
            .replaceAll("__OG_URL__", canonicalUrl);
        },
      },
    ],
    build: { outDir: "dist-demo" },
    define: {
      __APP_VERSION__: JSON.stringify(appVersion),
      __REPO_URL__: JSON.stringify(`https://github.com/${repoSlug()}`),
    },
  };
});
