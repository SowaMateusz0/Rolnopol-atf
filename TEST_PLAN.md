# Rolnopol - Test Plan

Source: [Rolnopol Documentation](http://localhost:3000/docs.html)

## 1. Scope

Automated (Playwright) and manual test coverage for the Rolnopol agricultural management system: authentication, farm/resource management, internal marketplace, financial operations, and role-based access control (RBAC).

## 2. Out of Scope

- Load/performance testing
- Third-party integrations not documented (e.g., payment gateways)
- Infrastructure/deployment testing

## 3. Test Environment

- App under test: `http://localhost:3000`
- API base: `/api/v1/`
- API docs: `/swagger.html`, `/public/schema/openapi.json`
- Roles: User (farmer), Admin, Superadmin
- Demo accounts available for each role (see docs "Demo Accounts")

## 4. User Roles & Permissions

| Role          | Access                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| User (farmer) | Own profile, farm data, fields/animals/staff/assignments, marketplace (buy/create offers), own financial account |
| Admin         | All user-level access + oversight of other users' resources, admin dashboards, audit logs                        |
| Superadmin    | Full system access, financial statistics for all users                                                           |

## 5. Feature Areas & Test Scenarios

Each scenario is annotated with tags to be used as Playwright test tags (e.g. `test("...", { tag: ["@auth", "@p0"] }, ...)`). See [Tag Legend](#tag-legend) below for the full list.

### 5.1 Registration & Login

- Register with valid unique email/displayed name/password → success alert shown, redirect to `/login.html` `@auth` `@smoke` `@p1`
- Register with duplicate email → validation error `@auth` `@p1`
- Register with invalid input (missing fields, weak password, invalid email format) → error shown `@auth` `@p1`
- Login with valid credentials → auth token set as cookie (`rolnopolToken`), `rolnopolLoginTime` cookie set `@auth` `@smoke` `@p0`
- Login with invalid credentials → error, no token issued `@auth` `@p0`
- Login with deactivated account → error `@auth` `@p1`
- Rate limiting on repeated failed login attempts `@auth` `@p2`
- Session expiration: 24h for users, 1h for admin `@auth` `@p2`
- Logout → cookies cleared, session invalidated, protected routes no longer accessible `@auth` `@smoke` `@p0`
- Protected API requests without token/with expired token → rejected (401) `@auth` `@api` `@p0`
- Auth via cookie vs Authorization Bearer header both work `@auth` `@api` `@p1`

### 5.2 RBAC / Access Control

- Farmer cannot access admin/superadmin pages or endpoints `@rbac` `@p0`
- Admin can view/manage all users' resources; superadmin has full access `@rbac` `@p0`
- Verify UI hides/disables actions not permitted for current role `@rbac` `@p1`

### 5.3 Farm & Resource Management

- Add/edit/delete a field (name, area) `@farm` `@p1`
- Add/edit/delete an animal (type, amount), optionally assign to a field `@farm` `@p1`
- Add/edit/delete staff (name, age) `@farm` `@p1`
- Create/remove assignment linking staff to a field `@farm` `@p1`
- Farm overview reflects all created resources accurately `@farm` `@p1`
- Admin/superadmin can view and manage other users' resources `@farm` `@rbac` `@p0`

### 5.4 Marketplace Trading

- Browse, filter, and search marketplace offers `@marketplace` `@p2`
- Create offer for an owned, unassigned resource → offer status `active` `@marketplace` `@p1`
- Attempt to create offer for an assigned/in-use resource → offer status `unavailable` `@marketplace` `@p1`
- Attempt to create offer for an already-offered resource → blocked `@marketplace` `@p1`
- Buy an active offer as a non-owner with sufficient funds → success: `@marketplace` `@financial` `@smoke` `@p0`
  - ownership transferred
  - buyer/seller balances updated
  - offer marked `sold`
  - marketplace transaction recorded
- Attempt to buy own offer → blocked `@marketplace` `@p1`
- Attempt to buy with insufficient funds → blocked with "Insufficient funds" error, no state changes `@marketplace` `@financial` `@smoke` `@p0`
- Attempt to buy an already-sold/cancelled/unavailable offer → blocked `@marketplace` `@p1`
- Cancel own active offer → status `cancelled`, no longer purchasable `@marketplace` `@p1`

### 5.5 Financial Operations

- View current balance and transaction history `@financial` `@p2`
- Balance updates automatically after purchase/sale `@financial` `@marketplace` `@p0`
- Transfer funds to another user → both accounts updated, transaction recorded `@financial` `@p1`
- Attempt transaction exceeding balance → blocked, no overdraft `@financial` `@p0`
- Admin/superadmin can view financial statistics across all users `@financial` `@rbac` `@p2`

### 5.6 System Health Check

- Health/status endpoint returns expected system and database status for users/admins `@health` `@api` `@p2`

### 5.7 API (via Swagger / direct calls)

- Endpoints require authentication (except public ones) `@api` `@auth` `@p0`
- API versioning path `/api/v1/` responds correctly `@api` `@p2`
- Swagger UI loads and allows executing sample requests `@api` `@p2`
- OpenAPI schema is valid and accessible at `/public/schema/openapi.json` `@api` `@p2`

## 6. Key End-to-End Scenarios

1. **Register and Set Up Farm** - register → login → add field → add animals (assign to field) → add staff (assign to field) → verify farm overview.
2. **Sell a Field on the Marketplace** - User A creates offer for unassigned field → User B buys it → ownership and balances updated.
3. **Attempt to Buy with Insufficient Funds** - user selects offer priced above balance → purchase blocked with error → balance/history unaffected.

## 7. Data Consistency Checks (cross-cutting)

- Every completed sale produces: ownership transfer + buyer/seller financial transactions + updated offer + marketplace transaction record.
- Assigned/in-use assets can never be sold or bought.
- No account balance can go negative.
- `userId`/`fieldId`/`animalId` references remain consistent across all related data.

## 8. Test Types & Tools

- **E2E UI tests**: Playwright (`tests/` directory), following existing conventions in [main.smoke.spec.ts](tests/main.smoke.spec.ts).
- **API tests**: Playwright request fixtures against `/api/v1/` endpoints, cross-checked with Swagger schema.
- **Current smoke suite**: homepage title, login-page visibility, registration-page visibility, and successful registration redirect to login.
- **Planned smoke expansion**: valid login, logout, marketplace purchase, and insufficient-funds coverage.
- **Regression suite**: all scenarios in section 5.

## 9. Suggested Priorities

| Priority | Scenarios                                                                                |
| -------- | ---------------------------------------------------------------------------------------- |
| P0       | Login/logout, RBAC boundaries, marketplace buy/sell happy path, insufficient funds check |
| P1       | Registration edge cases, resource CRUD, financial transfers, offer cancellation          |
| P2       | Session expiration timing, rate limiting, health check, Swagger exploration              |

## 10. Tag Legend

Tags map to Playwright's `tag` option (`test("...", { tag: ["@auth"] }, ...)` or `test.describe("...", { tag: [...] }, ...)`) and can be filtered via `--grep`/`--grep-invert` or the `grep`/`grepInvert` config options, e.g. `npx playwright test --grep @smoke`.

| Category     | Tags                  | Meaning                               |
| ------------ | --------------------- | ------------------------------------- |
| Feature area | `@auth`               | Registration, login, logout, sessions |
|              | `@rbac`               | Role-based access control checks      |
|              | `@farm`               | Fields, animals, staff, assignments   |
|              | `@marketplace`        | Offer creation, buying, cancellation  |
|              | `@financial`          | Balances, transactions, transfers     |
|              | `@health`             | Health/status endpoint                |
|              | `@api`                | Direct API / Swagger / OpenAPI checks |
| Suite        | `@smoke`              | Included in the smoke suite           |
| Priority     | `@p0` / `@p1` / `@p2` | Priority per section 9                |
