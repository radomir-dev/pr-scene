import { readFileSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")) as {
  name: string;
};
const basePath = `/${pkg.name}/`;
const port = 4310;
const url = `http://127.0.0.1:${port}${basePath}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: url, trace: "on-first-retry" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: `npm run build:demo && npm run preview -- --host 127.0.0.1 --port ${port} --strictPort --bypass-lock`,
    url,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
