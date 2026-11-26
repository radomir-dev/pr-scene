import type { Scene } from "../src/scene";

export interface Scenario {
  id: string;
  title: string;
  scene: Scene;
}

const NOW = Date.now();

export const SCENARIOS: Scenario[] = [
  {
    id: "release-checklist",
    title: "Open · checks running",
    scene: {
      pr: {
        title: "feat: show a release checklist on every pull request",
        number: 42,
        author: "mira-chen",
        base: "main",
        head: "feat/release-checklist",
        state: "open",
      },
      timeline: [
        {
          kind: "comment",
          comment: {
            author: "github-actions",
            bot: true,
            createdAt: new Date(NOW - 4 * 60 * 1000).toISOString(),
            body: `### CI summary

| Check | Status |
| :--- | :---: |
| **Lint** | ✅ Passed |
| **Tests** | 🟡 Running |

- [x] OpenAPI validated
- [ ] E2E smoke completed`,
          },
        },
        { kind: "checks" },
      ],
      checks: [
        { name: "Lint & typecheck", status: "passed", workflow: "CI", duration: "14s" },
        { name: "Unit & integration", status: "running", workflow: "CI", duration: "32s" },
      ],
      mergeable: true,
    },
  },
  {
    id: "merged",
    title: "Merged · all checks passed",
    scene: {
      pr: {
        title: "feat: show a release checklist on every pull request",
        number: 42,
        author: "mira-chen",
        base: "main",
        head: "feat/release-checklist",
        state: "merged",
        commits: 3,
      },
      timeline: [
        {
          kind: "comment",
          comment: {
            author: "github-actions",
            bot: true,
            createdAt: new Date(NOW - 26 * 60 * 1000).toISOString(),
            body: "### CI summary\n\nAll checks passed. Preview is live at https://pr-42.preview.internal.",
          },
        },
        { kind: "review", review: { author: "alex-dev", state: "approved" } },
        { kind: "checks" },
        {
          kind: "merged",
          actor: "mira-chen",
          sha: "a8f92c1",
          at: new Date(NOW - 20 * 60 * 1000).toISOString(),
        },
      ],
      checks: [
        { name: "Lint & typecheck", status: "passed", workflow: "CI", duration: "14s" },
        { name: "Unit & integration", status: "passed", workflow: "CI", duration: "1m 32s" },
      ],
      mergeable: true,
    },
  },
];

export function scenarioById(id: string | null): { scenario: Scenario; unknown: string | null } {
  const found = SCENARIOS.find((scenario) => scenario.id === id);
  if (found) return { scenario: found, unknown: null };
  return { scenario: SCENARIOS[0] as Scenario, unknown: id };
}
