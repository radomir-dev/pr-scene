import { renderScene } from "../src/index";
import type { Scene } from "../src/scene";
import { renderChrome } from "./chrome";
import "../src/styles/app.css";
import "./chrome.css";

const scene: Scene = {
  pr: {
    title: "feat(render): render a pull request scene from a fixture",
    number: 1,
    author: "tiriana",
    base: "main",
    head: "feat/scaffold",
    state: "open",
  },
};

const chrome = renderChrome();
document.body.insertAdjacentHTML("afterbegin", chrome.header);
document.body.insertAdjacentHTML("beforeend", chrome.footer);

const root = document.querySelector<HTMLElement>("#scene");
const theme = new URLSearchParams(location.search).get("theme") === "dark" ? "dark" : "light";
document.documentElement.dataset.theme = theme;
if (root) root.innerHTML = renderScene(scene, { theme });
