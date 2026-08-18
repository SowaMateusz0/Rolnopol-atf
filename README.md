# Rolnopol-atf

Automated test framework for the **Rolnopol** agricultural management system. Built with [Playwright](https://playwright.dev/) and TypeScript, it covers end-to-end scenarios for authentication, farm management, the internal marketplace, financial operations, and role-based access control (RBAC).

---

## Table of Contents

- [Project Description](#project-description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

---

## Project Description

Rolnopol-atf is the automated test suite for the Rolnopol web application (`http://localhost:3000`). It validates the core user flows across three roles — **User (farmer)**, **Admin**, and **Superadmin** — using Playwright in the Chromium browser.

Key feature areas covered:

- Registration & login (auth, cookies, session management)
- Farm & resource management (fields, animals, staff, assignments)
- Internal marketplace (offers, buying/selling)
- Financial operations (accounts, transactions)
- Role-based access control (RBAC)

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later
- The Rolnopol application running locally on `http://localhost:3000`

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SowaMateusz0/Rolnopol-atf.git
   cd Rolnopol-atf
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

---

## Configuration

The main Playwright configuration is in [`playwright.config.ts`](./playwright.config.ts). Key defaults:

| Setting      | Value                    |
| ------------ | ------------------------ |
| `testDir`    | `./tests`                |
| `baseURL`    | `http://localhost:3000`  |
| `timeout`    | 60 seconds per test      |
| `reporter`   | HTML (saved, never auto-opened) |
| `projects`   | Chromium (Desktop Chrome) |

To use a different base URL, update `baseURL` in `playwright.config.ts`.

---

## Running Tests

| Command | Description |
| --- | --- |
| `npm test` | Run all tests headlessly |
| `npm run test:headed` | Run all tests in a visible browser window |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run show-report` | Open the last HTML test report |
| `npm run trace` | Open Playwright Trace Viewer |
| `npm run lint` | Run ESLint |
| `npm run format` | Auto-format source files with Prettier |
| `npm run tsc:check` | Type-check TypeScript without emitting files |

Run a specific test file:

```bash
npx playwright test tests/main.smoke.spec.ts
```

Run tests by tag (e.g. smoke suite):

```bash
npx playwright test --grep "@smoke"
```

---

## Project Structure

```
Rolnopol-atf/
├── pages/                  # Page Object Model classes
│   ├── base.page.ts        # Base page with shared helpers
│   ├── home.page.ts        # Home page interactions
│   ├── login.page.ts       # Login page interactions
│   ├── registration.page.ts# Registration page interactions
│   └── page-urls.ts        # Centralised URL constants
├── src/
│   └── pages/              # Additional page objects / helpers
├── tests/
│   └── main.smoke.spec.ts  # Smoke test suite
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── CODING_STANDARDS.md     # Coding conventions for this project
├── TEST_PLAN.md            # Full test plan and tag legend
└── README.md               # This file
```

---

## Contributing

1. Read [`CODING_STANDARDS.md`](./CODING_STANDARDS.md) before writing any code or tests.
2. Follow the **Page Object Model** pattern — keep locators and interactions in `pages/`, keep assertions in test files.
3. Tag every test with the relevant feature, priority, and smoke tags defined in [`TEST_PLAN.md`](./TEST_PLAN.md#10-tag-legend).
4. Structure each test using **Arrange / Act / Assert** comments.
5. Run `npm run lint` and `npm run tsc:check` before opening a pull request.
6. Open a pull request against the `main` branch with a clear description of what was added or changed.
