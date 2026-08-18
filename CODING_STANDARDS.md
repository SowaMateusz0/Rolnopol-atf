# Coding Standards

This document defines the engineering rules for implementation work in this repository. It complements the repo workflow guidance in [.github/copilot-instructions.md](.github/copilot-instructions.md).

## Page Object pattern

Use Page Objects to model a page or screen and to encapsulate user interactions.

### Keep Page Objects focused

- Keep selectors and page-specific locators in the Page Object.
- Keep page actions such as `goto()`, `login()`, `register()`, and form fills in the Page Object.
- Keep the Page Object free of test logic and browser assertions.

### Share common page behavior through BasePage

- All Page Objects must extend `BasePage`.
- Keep shared browser behavior, including navigation, in `BasePage`.
- Do not reimplement `goto()` or store a separate `Page` instance in a concrete Page Object.
- Concrete Page Objects should contain only page-specific locators and interactions.

### Centralize page URLs

- Define application page routes in `src/pages/page-urls.ts` using `PAGE_URLS`.
- Reference `PAGE_URLS` from Page Objects and tests instead of repeating URL literals.
- Each concrete Page Object must expose its route through its `url` property, and `BasePage.goto()` must navigate using that property.

### Do not put assertions in Page Objects

- Do not call `expect(...)` inside a Page Object.
- Do not verify UI state or success conditions from the Page Object.
- Do not mix business validation with page interaction methods.

### Keep verifications in test files only

- All assertions and checks belong in the spec file under `tests/`.
- Tests should verify what the user sees and what the application does.
- Page Objects should only perform actions and expose elements for test assertions.

### Example

- Good: Page Object method `register(email, password)` fills fields and clicks the submit button.
- Good: Test file checks that the page shows a success message or redirects to the next screen.
- Bad: Page Object method calls `expect(page.getByRole('alert')).toBeVisible()`.

### Summary

A Page Object should describe how to interact with a page, not how to validate the outcome. Validation belongs in the test file, where the scenario is asserted clearly and consistently.
