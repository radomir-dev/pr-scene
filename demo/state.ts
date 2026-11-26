import type { SceneTheme } from "../src/scene";
import { scenarioById, type Scenario } from "./scenarios";

export interface PlaygroundState {
  scenario: Scenario;
  theme: SceneTheme;
  controls: boolean;
}

export interface ParsedState {
  state: PlaygroundState;
  hints: string[];
}

export function parseState(params: URLSearchParams, prefersDark: boolean): ParsedState {
  const { scenario, unknown } = scenarioById(params.get("scenario"));
  const { theme, unknownTheme } = resolveTheme(params.get("theme"), prefersDark);
  const state = { scenario, theme, controls: params.get("controls") !== "0" };
  return { state, hints: buildHints(scenario, unknown, unknownTheme, theme) };
}

export function toSearch(state: PlaygroundState): string {
  const params = new URLSearchParams();
  params.set("scenario", state.scenario.id);
  params.set("theme", state.theme);
  if (!state.controls) params.set("controls", "0");
  return `?${params.toString()}`;
}

function buildHints(
  scenario: Scenario,
  unknownScenario: string | null,
  unknownTheme: string | null,
  theme: SceneTheme,
): string[] {
  const hints: string[] = [];
  if (unknownScenario)
    hints.push(`Unknown scenario “${unknownScenario}”, showing “${scenario.id}”.`);
  if (unknownTheme) hints.push(`Unknown theme “${unknownTheme}”, using ${theme}.`);
  return hints;
}

function resolveTheme(
  value: string | null,
  prefersDark: boolean,
): { theme: SceneTheme; unknownTheme: string | null } {
  if (value === "light" || value === "dark") return { theme: value, unknownTheme: null };
  return { theme: prefersDark ? "dark" : "light", unknownTheme: value };
}
