import { renderScene } from "../src/index";
import type { Scene, SceneTheme } from "../src/scene";
import { renderChrome } from "./chrome";
import { renderLandingPage } from "./landing";
import "../src/styles/app.css";
import "./chrome.css";
import "./landing.css";
import "./landing-scene.css";
import "./landing-content.css";
import "./landing-responsive.css";

const scene: Scene = {
  pr: {
    title: "feat: show a release checklist on every pull request",
    number: 42,
    author: "mira-chen",
    base: "main",
    head: "feat/release-checklist",
    state: "open",
  },
};

const chrome = renderChrome();
document.body.insertAdjacentHTML("afterbegin", chrome.header);
document.body.insertAdjacentHTML("beforeend", chrome.footer);

const root = document.querySelector<HTMLElement>("#scene");
if (root) root.innerHTML = renderLandingPage();

const sceneRoot = document.querySelector<HTMLElement>(".js-live-scene");
const themeQuery = new URLSearchParams(location.search).get("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const setTheme = (theme: SceneTheme): void => {
  document.documentElement.dataset.theme = theme;
  if (sceneRoot) sceneRoot.innerHTML = renderScene(scene, { theme });
};

let initialTheme: SceneTheme = "light";
if (themeQuery === "dark" || (themeQuery !== "light" && prefersDark.matches)) initialTheme = "dark";
setTheme(initialTheme);

if (themeQuery !== "dark" && themeQuery !== "light") {
  prefersDark.addEventListener("change", ({ matches }) => setTheme(matches ? "dark" : "light"));
}
