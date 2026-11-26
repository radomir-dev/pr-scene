import { renderScene } from "../src/index";
import type { SceneTheme } from "../src/scene";
import { SCENARIOS, type Scenario } from "./scenarios";
import { toSearch, type PlaygroundState } from "./state";

export function renderControls(state: PlaygroundState, hints: string[]): string {
  const options = SCENARIOS.map(
    (scenario) =>
      `<option value="${scenario.id}"${scenario.id === state.scenario.id ? " selected" : ""}>${scenario.title}</option>`,
  ).join("");
  const hint =
    hints.length > 0 ? `<p class="playground-hint" role="status">${hints.join(" ")}</p>` : "";
  return `<form class="playground-controls" data-controls>
    <label class="playground-field">Scenario
      <select name="scenario" data-scenario>${options}</select>
    </label>
    <label class="playground-field">Theme
      <select name="theme" data-theme>
        <option value="light"${state.theme === "light" ? " selected" : ""}>Light</option>
        <option value="dark"${state.theme === "dark" ? " selected" : ""}>Dark</option>
      </select>
    </label>
    <button class="playground-hide" type="button" data-hide>Hide controls</button>
    ${hint}
  </form>`;
}

export function applyState(state: PlaygroundState): void {
  document.documentElement.dataset.theme = state.theme;
  const sceneRoot = document.querySelector<HTMLElement>(".js-live-scene");
  if (sceneRoot) sceneRoot.innerHTML = renderScene(state.scenario.scene, { theme: state.theme });
  document.body.classList.toggle("playground-headless", !state.controls);
  history.replaceState(null, "", `${location.pathname}${toSearch(state)}`);
}

export function wireControls(
  onChange: (patch: { scenario?: Scenario; theme?: SceneTheme; controls?: boolean }) => void,
): void {
  const form = document.querySelector<HTMLFormElement>("[data-controls]");
  if (!form) return;
  form.addEventListener("change", (event) => {
    const target = event.target as HTMLSelectElement;
    if (target.matches("[data-scenario]")) onChange({ scenario: findScenario(target.value) });
    if (target.matches("[data-theme]")) onChange({ theme: target.value as SceneTheme });
  });
  form.querySelector("[data-hide]")?.addEventListener("click", () => onChange({ controls: false }));
}

function findScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((scenario) => scenario.id === id);
}
