# Phase 3 - Idea Workflow

## 1. Overview
### Phase goal
Implement core submitter MVP flow: submit idea, track own ideas, and view detailed idea state.

### Why this phase mattered
This phase delivered the primary business value of the portal: capturing innovation proposals and making status visible to the author.

## 2. Features Implemented
- New submitter route:
  - `/submit` with title, description, category, and single file attachment field.
- Form implementation with React Hook Form + Zod validation.
- Dashboard enhancement (`/dashboard`) to show current submitter ideas with:
  - title
  - category
  - created date
  - status badge
- Idea detail route:
  - `/ideas/[id]` with full description, attachment name, status badge, and comments visibility.
- Navigation updates for submitter flow:
  - Dashboard
  - Submit Idea
  - role-aware links in navbar
- Local persistence for ideas/comments in browser storage with seed fallback from `public/data`.

## 3. AI-Assisted Development Workflow
### Example Copilot prompts used
- "Start Phase 3: Idea Submission and Dashboard implementation."
- "Use React Hook Form + Zod validation."
- "Only logged-in submitters can submit ideas."
- "Store ideas safely for local demo purposes."

### Why prompts were structured this way
- Feature list mapped directly to user-facing acceptance criteria.
- Explicit role restrictions ensured business rules were encoded, not assumed.
- UI quality constraints drove card/badge/spacing consistency without over-expanding scope.

### How SpecKit artifacts influenced implementation
- `specs/spec.md` supplied route and status expectations.
- `specs/tasks.md` guided file-level deliverables for submission/list/detail.
- `specs/data-model.md` informed persisted fields and relationship semantics.

## 4. Technical Decisions
- Introduced dedicated `ideas` persistence module separate from auth storage concerns.
- Kept file attachment MVP-safe by persisting filename reference only.
- Adopted reusable `StatusBadge` for consistent status rendering.
- Preserved local-first architecture to accelerate iterative delivery.

## 5. Files Added or Updated
- `app/submit/page.tsx`
- `app/dashboard/page.tsx`
- `app/ideas/[id]/page.tsx`
- `src/components/IdeaForm.tsx`
- `src/components/StatusBadge.tsx`
- `src/components/Navbar.tsx`
- `src/lib/ideas.ts`
- `src/types/models.ts`
- `src/types/forms.ts`
- `public/data/ideas.json`
- `public/data/comments.json`

## 6. Validation Performed
Commands executed:
- `npm run type-check`
- `npm run lint`
- `npm run dev`

Outcomes:
- Type-check passed.
- Lint passed.
- Dev server started successfully and routes were verified under App Router.

## 7. Challenges and Fixes
- Challenge: status vocabulary drift from earlier models.
- Fix: standardized status values to MVP set (`submitted`, `under_review`, `accepted`, `rejected`).
- Challenge: ensuring browser-safe persistence while preserving seed behavior.
- Fix: localStorage collections with first-load JSON seed fallback.

## 8. Git Commit Reference
- `e0aaf76` - `Phase 3: implement idea submission and dashboard workflow`

## 9. Next Phase
Implement admin/jury evaluation workflow: global idea review list, status decisions, and feedback persistence visible to submitters.
