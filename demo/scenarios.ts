import type { Scene } from "../src/scene";
import { actionsScene, releaseChecklistScene } from "./scenes";

export interface Scenario {
  id: string;
  title: string;
  scene: Scene;
}

export const SCENARIOS: Scenario[] = [
  { id: "actions-running", title: "Actions · checks running", scene: actionsScene("running") },
  { id: "actions-passed", title: "Actions · all passed", scene: actionsScene("passed") },
  { id: "actions-failed", title: "Actions · failed", scene: actionsScene("failed") },
  { id: "actions-merged", title: "Actions · merged", scene: actionsScene("merged") },
  { id: "release-checklist", title: "Release checklist · running", scene: releaseChecklistScene() },
];

export function scenarioById(id: string | null): { scenario: Scenario; unknown: string | null } {
  const found = SCENARIOS.find((scenario) => scenario.id === id);
  if (found) return { scenario: found, unknown: null };
  return { scenario: SCENARIOS[0] as Scenario, unknown: id };
}
