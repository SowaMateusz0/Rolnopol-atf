# Repository instructions

These rules cover repo workflow, test conventions, and project-specific guidance for Playwright work.

## Coding standards

All engineering and implementation rules live in [../CODING_STANDARDS.md](../CODING_STANDARDS.md). Follow that document for code structure and Page Object usage, especially:

- Keep Page Objects focused on page interactions and locators.
- Do not put assertions inside Page Objects.
- Keep all verification logic in test files only.

## Commit conventions

When creating commit messages, follow the Conventional Commits specification.

### Required format

Example: type(scope): short summary

- type: one of feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- scope: optional but recommended; use a focused area such as auth, ui, api, tests
- summary: concise, imperative, lowercase, no trailing period

### Rules

- Use a single clear subject line.
- Keep the subject short, ideally under 72 characters.
- Use lowercase for the type and summary.
- Prefer present tense and imperative mood, for example: "add login validation".
- Use the scope only when it adds clarity.
- If a change is breaking, add ! before the colon, for example: "feat(api)!: change response format".
- Add a body only when needed to explain the why or impact.
- Do not use vague messages such as "update", "fix stuff", or "misc changes".

### Examples

- feat(ui): add search filter
- fix(auth): correct token refresh flow
- docs(readme): clarify local setup steps
- test(e2e): add smoke coverage for login
- chore(deps): bump playwright version

## Test tagging

When creating or updating Playwright tests, tag them using the tags defined in [TEST_PLAN.md](../TEST_PLAN.md#10-tag-legend) (e.g. `test("...", { tag: ["@auth", "@smoke", "@p0"] }, ...)`).

- Apply the relevant feature area tag(s) (`@auth`, `@rbac`, `@farm`, `@marketplace`, `@financial`, `@health`, `@api`).
- Add `@smoke` when the test belongs to the smoke suite.
- Add the appropriate priority tag (`@p0`, `@p1`, `@p2`).
- If a new tag/category is needed, add it to the Tag Legend table in [TEST_PLAN.md](../TEST_PLAN.md#10-tag-legend) so the reference stays up to date.

## Playwright test workflow

This repository uses the Playwright Test framework from `@playwright/test`.

Before creating or updating tests, review [playwright.config.ts](../playwright.config.ts) and follow its configured test directory, timeouts, projects, base URL, reporter, and other shared settings.

### AAA structure for tests

When creating or updating Playwright tests, structure them using Arrange / Act / Assert comments:

- Arrange: prepare the test data, page state, and target scenario.
- Act: navigate to the page and perform the user action under test.
- Assert: verify the expected UI result, URL, or state.

Use short comments in the test body to keep the flow explicit and easy to review, for example:

```ts
// Arrange
const email = `automation.${Date.now()}@example.com`;

// Act
await page.goto("/register.html");
await page.getByTestId("email-input").fill(email);

// Assert
await expect(page).toHaveURL(/\/login\.html$/);
```
