import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

const workflows = readdirSync(".github/workflows")
  .filter((file) => file.endsWith(".yml"))
  .map((file) => `.github/workflows/${file}`);

const has = (command, args) => spawnSync(command, args, { stdio: "ignore" }).status === 0;

if (has("actionlint", ["-version"])) {
  const result = spawnSync("actionlint", ["-shellcheck=", ...workflows], { stdio: "inherit" });
  process.exit(result.status ?? 1);
}

if (has("docker", ["info"])) {
  const args = [
    "run",
    "--rm",
    "-v",
    `${process.cwd()}:/repo`,
    "-w",
    "/repo",
    "rhysd/actionlint:latest",
  ];
  const result = spawnSync("docker", [...args, "-shellcheck=", ...workflows], { stdio: "inherit" });
  process.exit(result.status ?? 1);
}

console.log("actionlint: neither the binary nor docker is available, skipping");
