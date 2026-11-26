import { expect } from "storybook/test";

export function expectScene(canvasElement: HTMLElement): void {
  expect(canvasElement.querySelector(".ps-header")).toBeTruthy();
  expect(canvasElement.querySelector(".ps-checks")).toBeTruthy();
}
