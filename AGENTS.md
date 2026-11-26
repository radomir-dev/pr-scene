# pr-scene

Renders GitHub pull request scenes from JSON fixtures: a TypeScript library, a Vite playground and Storybook. Solo-maintained.

## Speed over process

Work directly on `main`. No feature branches, no pull requests, no worktrees while this phase lasts: commit and push. Keep commits small and use Conventional Commits, because semantic-release reads them on every push to `main`.

Never force push or rewrite history. Never publish to npm until it is explicitly enabled.

## Commands

1. `npm run doctor -- --fast` runs the checks that gate CI.
2. `npm run lint`, `npm run format`, `npm test`.

## Limits

1. 150 lines per file.
2. 30 lines per function.
3. Cognitive complexity at most 5.

Split the unit instead of disabling the rule.

## Tests

Test behaviour, not constants. Pure logic in Vitest, visuals in Storybook, the edit-to-merge flow in Playwright.
