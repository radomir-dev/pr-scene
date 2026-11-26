import { readFileSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")) as {
  name: string;
};
const port = 4311;
const url = `http://127.0.0.1:${port}/${pkg.name}/`;

export default defineConfig({
  testDir: "./e2e-shots",
  reporter: "list",
  use: { baseURL: url, deviceScaleFactor: 2 },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], deviceScaleFactor: 2 } }],
  webServer: {
    command: `npm run build:demo && npm run preview -- --host 127.0.0.1 --port ${port} --strictPort`,
    url,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
