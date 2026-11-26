# Contributing

Solo maintained and private while it takes shape, so work happens directly on `main`: commit and push, no branches, no pull requests.

## Commit messages

Conventional Commits, because semantic-release reads them. A pull request title is checked with the same rules.

Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

Scopes are free-form; use the area you touched, such as `render`, `checks`, `doctor` or `demo`.

## Checks

1. `npm run doctor` runs everything: typecheck, lint, format check, coverage, build and dist verification.
2. `npm run doctor -- --fast` skips the slow steps and is what CI runs.
3. `npm run doctor -- --only=lint,test` runs a subset and pulls in the build when a step needs it.

## Hooks

`npm install` installs lefthook. Pre-commit runs lint-staged (oxlint, oxfmt, related tests); commit-msg runs commitlint; pre-push runs typecheck and `doctor --fast`.

`LEFTHOOK=0 git commit …` skips the hooks for one command. They also skip when `CI` is set.

## Limits

Files stop at 150 lines, functions at 30, and cognitive complexity at 5. The linter enforces all three; split the unit rather than disabling the rule.

Cognitive complexity comes from `eslint-plugin-sonarjs` through oxlint's JS plugin host, which is still alpha: pin the plugin when upgrading oxlint.
