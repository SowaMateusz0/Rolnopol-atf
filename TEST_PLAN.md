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

| Role | Access |
|---|---|
| User (farmer) | Own profile, farm data, fields/animals/staff/assignments, marketplace (buy/create offers), own financial account |
| Admin | All user-level access + oversight of other users' resources, admin dashboards, audit logs |
| Superadmin | Full system access, financial statistics for all users |

## 5. Feature Areas & Test Scenarios

### 5.1 Registration & Login
- Register with valid unique email/displayed name/password → account created, auto-login, redirect to `/profile.html`
- Register with duplicate email → validation error
- Register with invalid input (missing fields, weak password, invalid email format) → error shown
- Login with valid credentials → auth token set as cookie (`rolnopolToken`), `rolnopolLoginTime` cookie set
- Login with invalid credentials → error, no token issued
- Login with deactivated account → error
- Rate limiting on repeated failed login attempts
- Session expiration: 24h for users, 1h for admin
- Logout → cookies cleared, session invalidated, protected routes no longer accessible
- Protected API requests without token/with expired token → rejected (401)
- Auth via cookie vs Authorization Bearer header both work

### 5.2 RBAC / Access Control
- Farmer cannot access admin/superadmin pages or endpoints
- Admin can view/manage all users' resources; superadmin has full access
- Verify UI hides/disables actions not permitted for current role

### 5.3 Farm & Resource Management
- Add/edit/delete a field (name, area)
- Add/edit/delete an animal (type, amount), optionally assign to a field
- Add/edit/delete staff (name, age)
- Create/remove assignment linking staff to a field
- Farm overview reflects all created resources accurately
- Admin/superadmin can view and manage other users' resources

### 5.4 Marketplace Trading
- Browse, filter, and search marketplace offers
- Create offer for an owned, unassigned resource → offer status `active`
- Attempt to create offer for an assigned/in-use resource → offer status `unavailable`
- Attempt to create offer for an already-offered resource → blocked
- Buy an active offer as a non-owner with sufficient funds → success:
  - ownership transferred
  - buyer/seller balances updated
  - offer marked `sold`
  - marketplace transaction recorded
- Attempt to buy own offer → blocked
- Attempt to buy with insufficient funds → blocked with "Insufficient funds" error, no state changes
- Attempt to buy an already-sold/cancelled/unavailable offer → blocked
- Cancel own active offer → status `cancelled`, no longer purchasable

### 5.5 Financial Operations
- View current balance and transaction history
- Balance updates automatically after purchase/sale
- Transfer funds to another user → both accounts updated, transaction recorded
- Attempt transaction exceeding balance → blocked, no overdraft
- Admin/superadmin can view financial statistics across all users

### 5.6 System Health Check
- Health/status endpoint returns expected system and database status for users/admins

### 5.7 API (via Swagger / direct calls)
- Endpoints require authentication (except public ones)
- API versioning path `/api/v1/` responds correctly
- Swagger UI loads and allows executing sample requests
- OpenAPI schema is valid and accessible at `/public/schema/openapi.json`

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
- **Smoke suite**: homepage load, login, and one flow per feature area (auth, marketplace, financial).
- **Regression suite**: all scenarios in section 5.

## 9. Suggested Priorities

| Priority | Scenarios |
|---|---|
| P0 | Login/logout, RBAC boundaries, marketplace buy/sell happy path, insufficient funds check |
| P1 | Registration edge cases, resource CRUD, financial transfers, offer cancellation |
| P2 | Session expiration timing, rate limiting, health check, Swagger exploration |
