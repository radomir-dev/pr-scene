import { describe, expect, it } from "vitest";
import { scenarioById } from "../demo/scenarios";
import { parseState, toSearch } from "../demo/state";

describe("parseState", () => {
  it("defaults to the first scenario and the system theme", () => {
    const { state, hints } = parseState(new URLSearchParams(), true);
    expect(state.scenario.id).toBe("release-checklist");
    expect(state.theme).toBe("dark");
    expect(state.controls).toBe(true);
    expect(hints).toEqual([]);
  });

  it("honours every parameter", () => {
    const params = new URLSearchParams({ scenario: "merged", theme: "light", controls: "0" });
    const { state } = parseState(params, true);
    expect(state.scenario.id).toBe("merged");
    expect(state.theme).toBe("light");
    expect(state.controls).toBe(false);
  });

  it("falls back with a visible hint for unknown values", () => {
    const { state, hints } = parseState(
      new URLSearchParams({ scenario: "nope", theme: "purple" }),
      false,
    );
    expect(state.scenario.id).toBe("release-checklist");
    expect(state.theme).toBe("light");
    expect(hints.join(" ")).toContain("Unknown scenario “nope”");
    expect(hints.join(" ")).toContain("Unknown theme “purple”");
  });
});

describe("toSearch", () => {
  it("round-trips through parseState", () => {
    const { state } = parseState(
      new URLSearchParams({ scenario: "merged", theme: "dark", controls: "0" }),
      false,
    );
    const again = parseState(new URLSearchParams(toSearch(state)), false).state;
    expect(again).toEqual(state);
  });

  it("omits controls when they are visible", () => {
    const { state } = parseState(new URLSearchParams(), false);
    expect(toSearch(state)).not.toContain("controls");
  });
});

describe("scenarioById", () => {
  it("reports the unknown id", () => {
    expect(scenarioById("nope").unknown).toBe("nope");
    expect(scenarioById("merged").scenario.id).toBe("merged");
  });
});
