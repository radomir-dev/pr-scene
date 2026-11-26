import type { SceneTheme } from "../src/scene";
import { renderChrome } from "./chrome";
import { createSession, wireScene, type Session } from "./interaction";
import { renderLandingPage } from "./landing";
import {
  applyState,
  mountScene,
  renderControls,
  wireControls,
  type ControlPatch,
  type PlaygroundAction,
} from "./playground";
import { parseState, type PlaygroundState } from "./state";
import "@primer/css/dist/markdown.css";
import "../src/styles/app.css";
import "./chrome.css";
import "./landing.css";
import "./landing-scene.css";
import "./landing-content.css";
import "./landing-responsive.css";
import "./playground.css";

const chrome = renderChrome();
document.body.insertAdjacentHTML("afterbegin", chrome.header);
document.body.insertAdjacentHTML("beforeend", chrome.footer);

const root = document.querySelector<HTMLElement>("#scene");
if (root) root.innerHTML = renderLandingPage();

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const parsed = parseState(new URLSearchParams(location.search), prefersDark);
let state: PlaygroundState = parsed.state;
const hints = [...parsed.hints];

const themeOf = (): SceneTheme => state.theme;
let session: Session = buildSession();

function buildSession(): Session {
  const scene = structuredClone(state.scenario.scene);
  return createSession(scene, (next) => mountScene(next, themeOf()));
}

function paint(): void {
  const slot = document.querySelector(".js-controls");
  if (slot) slot.innerHTML = renderControls(state, hints);
  applyState(state);
  mountScene(session.current, state.theme);
  wireControls(onChange, onAction);
}

function onChange(patch: ControlPatch): void {
  const scenarioChanged = patch.scenario !== undefined && patch.scenario.id !== state.scenario.id;
  state = { ...state, ...patch };
  if (scenarioChanged) session = buildSession();
  hints.length = 0;
  paint();
}

function onAction(action: PlaygroundAction): void {
  if (action === "run") session.run();
  if (action === "reset") {
    session = buildSession();
    paint();
  }
}

wireScene(() => session);
paint();
