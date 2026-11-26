# pr-scene

Renders GitHub pull request scenes from JSON fixtures, for demos, docs and screenshot pipelines.

Private and unpublished while it takes shape. The library is framework-agnostic HTML with a scoped stylesheet; the playground is a plain Vite page.

## Requirements

Node 22 or newer. `mise install` picks it up from `mise.toml`.

## Development

1. `npm install`
2. `npm run dev` serves the playground
3. `npm test` runs the unit tests
4. `npm run build` emits `dist/` with ESM, types and `styles.css`

## Checks

1. `npm run doctor` runs every check: typecheck, lint, format, coverage, build and dist verification.
2. `npm run doctor -- --fast` skips the slow ones, which is what CI runs.
3. `npm install` installs the lefthook hooks; `LEFTHOOK=0` skips them for one command.

## Layout

1. `src/` is the library: scene types, escaping and renderers.
2. `demo/` is the playground and the demo chrome.
3. `test/` holds behaviour tests.
4. `scripts/` holds build helpers.

Files stay under 150 lines and functions under 30, enforced later by the linter.
