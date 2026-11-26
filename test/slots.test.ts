import { describe, expect, it } from "vitest";
import { countTasks, flipTask, replaceSlot, replaceSlots } from "../src/index";

const LIST = "- [x] done\n- [ ] todo\n- [ ] later";

describe("task helpers", () => {
  it("counts task list items", () => {
    expect(countTasks(LIST)).toBe(3);
    expect(countTasks("no tasks here")).toBe(0);
  });

  it("flips only the nth item", () => {
    expect(flipTask(LIST, 1)).toBe("- [x] done\n- [x] todo\n- [ ] later");
    expect(flipTask(LIST, 0)).toBe("- [ ] done\n- [ ] todo\n- [ ] later");
  });

  it("leaves the source alone for an out-of-range index", () => {
    expect(flipTask(LIST, 9)).toBe(LIST);
  });

  it("flips nested items in document order", () => {
    const nested = "- [ ] parent\n  - [ ] child";
    expect(flipTask(nested, 1)).toBe("- [ ] parent\n  - [x] child");
  });
});

describe("slots", () => {
  it("replaces what sits between the markers", () => {
    const source = "a\n<!-- slot:status -->\nold\n<!-- /slot:status -->\nb";
    expect(replaceSlot(source, "status", "new")).toBe(
      "a\n<!-- slot:status -->\nnew\n<!-- /slot:status -->\nb",
    );
  });

  it("replaces several slots in one pass", () => {
    const source = "<!-- slot:a --><!-- /slot:a -->\n<!-- slot:b --><!-- /slot:b -->";
    expect(replaceSlots(source, { a: "1", b: "2" })).toContain("1");
    expect(replaceSlots(source, { a: "1", b: "2" })).toContain("2");
  });

  it("fails loudly when the slot is absent", () => {
    expect(() => replaceSlot("no markers", "status", "x")).toThrow('no slot "status"');
  });
});
