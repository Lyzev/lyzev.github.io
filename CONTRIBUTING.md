# Contributing

This site is free software; contributions are licensed under the same [AGPL-3.0](LICENSE). It is plain HTML/CSS with no build step and no JavaScript — keep it that way.

## Asking

Ask the full question directly: don't ask to ask ([dontasktoask.com](https://dontasktoask.com)), don't open with just "hello" ([nohello.net](https://nohello.net/en)). Describe the goal, not just the failed step ([xyproblem.info](https://xyproblem.info)). For bug reports, use the issue template and include a minimal reproducible example ([sscce.org](https://sscce.org)) plus what you already tried ([itdidnt.work](https://itdidnt.work)). See also [How To Ask Questions The Smart Way](http://www.catb.org/~esr/faqs/smart-questions.html).

## Changes

1. Branch off `master`: `git checkout -b feat/my-change master` — one logical change per branch.
2. Test by opening `index.html` in a browser.
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`, ...).
4. Open a pull request against `master` describing the *why*; include before/after screenshots for visual changes.

Pre-commit hooks (whitespace, EOF, LF endings) run in CI; run them locally with `pre-commit run --all-files`.
