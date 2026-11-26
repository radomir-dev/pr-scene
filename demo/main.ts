import { renderChrome } from "./chrome";
import { renderLandingPage } from "./landing";
import { applyState, renderControls, wireControls } from "./playground";
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

function paint(): void {
  const slot = document.querySelector(".js-controls");
  if (slot) slot.innerHTML = renderControls(state, hints);
  applyState(state);
  wireControls((patch) => {
    state = { ...state, ...patch };
    hints.length = 0;
    paint();
  });
}

paint();
