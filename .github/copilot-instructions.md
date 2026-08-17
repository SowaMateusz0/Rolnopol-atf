# Commit conventions

When creating commit messages, follow the Conventional Commits specification.

## Required format

Example: type(scope): short summary

- type: one of feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- scope: optional but recommended; use a focused area such as auth, ui, api, tests
- summary: concise, imperative, lowercase, no trailing period

## Rules

- Use a single clear subject line.
- Keep the subject short, ideally under 72 characters.
- Use lowercase for the type and summary.
- Prefer present tense and imperative mood, for example: "add login validation".
- Use the scope only when it adds clarity.
- If a change is breaking, add ! before the colon, for example: "feat(api)!: change response format".
- Add a body only when needed to explain the why or impact.
- Do not use vague messages such as "update", "fix stuff", or "misc changes".

## Examples

- feat(ui): add search filter
- fix(auth): correct token refresh flow
- docs(readme): clarify local setup steps
- test(e2e): add smoke coverage for login
- chore(deps): bump playwright version
