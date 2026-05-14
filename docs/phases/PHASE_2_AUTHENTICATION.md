# Phase 2 - Authentication

## 1. Overview
### Phase goal
Deliver MVP authentication: registration, login, logout, session persistence, and role-based routing behavior.

### Why this phase mattered
Authentication was the gate for all role-specific workflows (submitter vs admin). Without this, dashboard, submission, and review flows could not be validated end to end.

## 2. Features Implemented
- Registration and login pages migrated to App Router routes:
  - `/register`
  - `/login`
- Session persistence via browser `localStorage`.
- Logout implemented through navbar client action.
- Role-aware redirect behavior after login:
  - submitter -> `/dashboard`
  - admin -> `/admin`
- Global app shell and navbar integration for authenticated UX continuity.

## 3. AI-Assisted Development Workflow
### Example Copilot prompts used
- "Start Phase 2: Authentication System implementation."
- "Important correction: this project is using Next.js App Router with the root app/ directory, not Pages Router."
- "Remove src/pages/_app.tsx and refactor to App Router structure."

### Why prompts were structured this way
- Prompt correction explicitly forced architectural consistency and eliminated dual routing systems.
- Route-level requirements prevented generic auth scaffolding and focused implementation on project constraints.
- Required scripts and validation commands made the phase auditable.

### How SpecKit artifacts influenced implementation
- `specs/spec.md` defined role behavior and auth acceptance criteria.
- `specs/tasks.md` clarified expected outputs and route-level scope.
- Constitution guidance kept implementation simple and production-safe for a local demo context.

## 4. Technical Decisions
- App Router chosen as the single routing model; Pages Router removed.
- Browser-safe auth refactor to avoid server-only filesystem usage in client components.
- Shared app shell pattern for navbar/logout and cross-route session refresh.
- Local session object designed for minimal role and identity needs.

## 5. Files Added or Updated
- `app/register/page.tsx`
- `app/login/page.tsx`
- `app/layout.tsx`
- `src/components/AppShell.tsx`
- `src/components/Navbar.tsx`
- `src/components/AuthForm.tsx`
- `src/lib/auth.ts`
- Removed legacy `src/pages/*` auth routes.

## 6. Validation Performed
Commands executed:
- `npm run type-check`
- `npm run lint`
- `npm run dev`

Outcomes:
- Type-check passed.
- Lint passed.
- Dev server started successfully (auto-fallback to available port when 3000/3001 were occupied).

## 7. Challenges and Fixes
- Challenge: Pages Router and App Router implementations coexisted and caused architecture drift.
- Fix: Migrated all auth routes to `app/*`, removed `src/pages/*`, and centralized shell behavior in App Router.
- Challenge: Initial auth persistence relied on patterns incompatible with client-only route usage.
- Fix: Refactored auth utilities to browser-safe localStorage-backed operations.

## 8. Git Commit Reference
- `94ab85a` - `Phase 2: refactor authentication to App Router with role-based sessions`

## 9. Next Phase
Implement submitter idea workflow: submission form, dashboard listing, and idea detail visibility using local persistence.
