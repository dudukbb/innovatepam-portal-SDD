# InnovatEPAM Portal - Architecture Overview

## 1. System Architecture
The MVP uses Next.js 14 App Router as a local-first web application architecture optimized for iterative Module 08 sprint delivery.

Core layers:
- `app/*`: route-level UI and page orchestration
- `src/components/*`: reusable UI building blocks
- `src/lib/*`: auth/session and local persistence services
- `src/types/*`: domain contracts and validation schemas
- `public/data/*`: seed data for first-run local bootstrap

## 2. Next.js App Router Structure
Primary routes:
- `/register` - submitter registration
- `/login` - authentication entry
- `/dashboard` - submitter idea tracking
- `/submit` - idea submission
- `/ideas/[id]` - idea detail and review timeline
- `/admin` - admin evaluation dashboard

Global shell:
- `app/layout.tsx` loads global styles and wraps content with app shell behavior.
- `src/components/AppShell.tsx` handles session-aware navbar display and logout.

## 3. Component Structure
Key component responsibilities:
- `AuthForm`: shared auth form rendering and error handling
- `Navbar`: role-aware navigation + logout action
- `IdeaForm`: RHF + Zod submit flow for idea creation
- `StatusBadge`: standardized status visualization

Design intent:
- keep components small and focused
- separate persistence/auth logic from presentational UI
- reuse badges and shell structure for consistency

## 4. Auth and Session Flow
Authentication model:
- users are persisted in browser localStorage (`innovatepam_users`)
- active session stored in localStorage (`innovatepam_session`)

Flow:
1. register/login writes session state
2. app shell reads session on route change
3. role-based route redirects:
   - submitter -> dashboard/submit
   - admin -> admin dashboard
4. logout clears session and returns to login

## 5. Local Persistence Model
Persistence strategy is local-first for MVP:
- ideas collection: `innovatepam_ideas`
- comments collection: `innovatepam_comments`
- users collection: `innovatepam_users`

Seed behavior:
- on first run, collections load from `public/data/*.json` where available
- subsequent reads/writes occur in localStorage

Rationale:
- zero backend dependency for sprint delivery
- deterministic local demo setup
- rapid iteration with low operational overhead

## 6. Role-Based Routing and Access
Submitter:
- create ideas
- view own dashboard list
- view own idea details and feedback

Admin:
- view all ideas
- filter by status
- open idea detail for review actions
- update status + add evaluation comments

Access controls are enforced in page load guards and UI action rendering.

## 7. Submitter/Admin Workflow Lifecycle
1. Submitter authenticates.
2. Submitter submits idea (`submitted`).
3. Admin views global queue in `/admin`.
4. Admin sets `under_review`, then `accepted` or `rejected`.
5. Admin feedback comments are persisted.
6. Submitter views updated status, latest feedback, and timeline on `/ideas/[id]`.

## 8. Status Lifecycle and Guardrails
Supported statuses:
- `submitted`
- `under_review`
- `accepted`
- `rejected`

Practical transition guard:
- `submitted -> submitted|under_review`
- `under_review -> under_review|accepted|rejected`
- terminal states remain stable

This prevents accidental state regressions during admin review.

## 9. Rationale for Local-First MVP
This architecture was selected to align with SpecKit-driven incremental delivery:
- validates product behavior before backend investment
- supports AI-native rapid iteration and refactoring
- keeps evaluator setup simple (`npm install`, `npm run dev`)
- preserves clear upgrade path to API/database-backed services in future phases
