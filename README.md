# pr-scene

Render GitHub pull request scenes from data: a header, a conversation timeline, comment cards, a checks box with its merge footer, and merge and review events. Framework-agnostic HTML with one scoped stylesheet, so a demo, README image or screenshot pipeline can show what a GitHub Action posts in a believable PR, without a real repository.

Not on npm yet; the playground lives at <https://radomir.dev/pr-scene/>.

## Install

Not published yet. Clone the repository and run `npm install && npm run build`; see Development below.

## Quick start

```ts
import { renderScene } from "pr-scene";
import "pr-scene/styles.css";

const scene = {
  pr: {
    title: "feat(api): add a sliding-window rate limiter",
    number: 482,
    author: "alex-dev",
    base: "main",
    head: "feat/rate-limiter",
    state: "open",
  },
  timeline: [
    {
      kind: "comment",
      comment: {
        author: "github-actions",
        bot: true,
        createdAt: "2026-11-26T11:58:00Z",
        body: "### CI\n\n- [x] Lint\n- [ ] Tests",
      },
    },
    { kind: "checks" },
  ],
  checks: [
    { name: "Lint", status: "passed", workflow: "CI", duration: "14s" },
    { name: "Tests", status: "running", workflow: "CI", duration: "32s" },
  ],
  mergeable: true,
};

document.querySelector("#pr").innerHTML = renderScene(scene, { theme: "light" });
```

`renderScene` returns the whole page: `.ps-root` carrying the theme, and `.ps-page` inside it. Pass `now` to freeze relative timestamps for screenshots.

## The scene

`pr`, `timeline`, `checks`, `mergeable` and `view` are documented with their types in [docs/scene.md](docs/scene.md). A minimal scene is just `{ pr }`; the checks box then reports that status is pending.

Timeline items render in order:

1. `{ kind: "comment", comment }` — a card with avatar, author, optional `bot` pill, relative time, `edited` marker and sanitised markdown.
2. `{ kind: "checks" }` — the checks box and merge footer, with a status badge on the timeline rail.
3. `{ kind: "review", review }` — approved, changes-requested or commented.
4. `{ kind: "merged", actor?, sha?, at? }` — the purple merge event.

## Theming

The stylesheet ships light and dark tokens switched by `data-theme` on `.ps-root`. `renderScene(scene, { theme })` sets it, and `scene.view.theme` is the fallback when no option is given.

## Markdown

Comment bodies run through `marked` with GFM, are sanitised with DOMPurify, and get GitHub's task-list classes with their checkboxes enabled. `renderMarkdown(source, { mode: "source" })` returns an escaped `pre` instead, which keeps `<!-- slot:name -->` markers visible.

## Known gaps

Fenced code with a language renders as plain code; GitHub wraps it in syntax-highlighted spans, and pr-scene does not. GitHub alerts (`> [!NOTE]`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION`) are supported and covered by the golden fixtures.

## Editing a comment

The helpers mirror the `radomir-dev/actions` contract, so a demo can react the way a workflow does:

```ts
import { countTasks, flipTask, replaceSlot, replaceSlots, hasSlot } from "pr-scene";

const body = "- [ ] preview\n- [ ] visual\n\n<!-- slot:footer -->\n\n<!-- /slot:footer -->";
flipTask(body, 1); // ticks the second task
replaceSlots(body, { footer: "[Workflow run](https://github.com/acme/app/actions/runs/1)" });
hasSlot(body, "footer"); // true
countTasks(body); // 2
```

## Validation

`validateScene(value)` returns messages that name the offending path, and `renderScene` throws with the same text. The JSON Schema ships as `pr-scene/scene.schema.json` and is committed at `schema/scene.schema.json`.

## API reference

Generated from the TypeScript types into [`docs/api/`](docs/api/index.md). `npm run docs` regenerates it; `npm run docs:check` fails when it is stale, and CI regenerates it on `main`.

## Development

1. `npm install` installs dependencies and the lefthook hooks.
2. `npm run dev` serves the playground.
3. `npm run doctor` runs every check: typecheck, lint, format, docs, coverage, build, dist verification and end-to-end tests.
4. `npm run doctor -- --fast` skips the slow end-to-end step, which is what CI runs.
5. `npm run shots` writes one screenshot per scenario into `screenshots/`.

Files stop at 150 lines, functions at 30, cognitive complexity at 5.

## Releasing

Nothing is published yet.

1. `npm run doctor`
2. `npm run build`
3. `npm publish --access public` from the tagged release commit, with provenance enabled by CI once the release workflow exists (#15).

The package is ESM-only. `files` ships `dist/`, which holds the compiled modules, declarations, `styles.css` and `scene.schema.json`; `sideEffects` names the stylesheet so the JavaScript stays tree-shakeable.

## License

MIT
