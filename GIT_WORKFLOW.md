# Git Workflow for MVP

**When to Commit:** After each phase (5 commits total)  
**Where to Commit:** From the project root

---

## Initial Setup Commit (Do This Now)

```bash
cd Course_Project/innovatepam-portal-sdd

git add .
git commit -m "Initial: SpecKit MVP setup - foundation, config, dependencies fixed

- Fixed package.json dependencies (removed unavailable radix-ui packages)  
- Converted next.config.ts to next.config.js for compatibility
- Configured TypeScript strict mode with proper path mappings
- Set up Tailwind CSS with professional color system
- Created SpecKit artifacts: constitution, spec, plan, tasks, data-model
- Dev server running successfully at localhost:3000
- Ready for Phase 1 implementation

Linked to: .specify/memory/constitution.md, all specs/*"

git push origin main
```

---

## Phase 1 Commit (After Data Model Complete)

```bash
git add .
git commit -m "Phase 1: Data model and persistence layer - complete

- Created User, Idea, Comment types in types/index.ts
- Implemented Zod validation schemas for all inputs
- Built JSON file storage layer in lib/storage.ts
- Created utility functions: generateId, formatDate, password helpers
- Added demo data in public/data/
- All types pass TypeScript strict mode

Linked to: specs/spec.md, specs/tasks.md Phase 1, specs/data-model.md"

git push origin main
```

---

## Phase 2 Commit (After Auth Complete)

```bash
git add .
git commit -m "Phase 2: User authentication system - register, login, logout

- Created registration page with email/password/name/role selection
- Implemented login page with credential validation
- Built session management in lib/auth.ts
- Added logout functionality with session clearing
- Implemented client-side auth workflow for MVP (no `app/api/*` handlers yet)
- Added header component with logout button
- Validated inputs with Zod schemas

Acceptance criteria met: All auth features working, role distinction functional

Linked to: specs/spec.md Features 1-2, specs/tasks.md Phase 2"

git push origin main
```

---

## Phase 3 Commit (After Submission Complete)

```bash
git add .
git commit -m "Phase 3: Idea submission and listing - form, dashboard, details

- Created idea submission form with file attachment support
- Built submitter dashboard showing only user's own ideas
- Implemented idea detail page with read-only comments section
- Implemented idea persistence/actions in `src/lib/ideas.ts` using localStorage
- Submitters can view their ideas and see admin feedback
- Status badges with color coding for visual clarity

Acceptance criteria met: Submit, view, delete ideas working

Linked to: specs/spec.md Features 3-5, specs/tasks.md Phase 3"

git push origin main
```

---

## Phase 4 Commit (After Admin Complete)

```bash
git add .
git commit -m "Phase 4: Admin review dashboard - review interface, workflow, comments

- Created admin dashboard showing all submitted ideas with filtering
- Built admin review interface for managing idea status
- Implemented status update workflow: submitted → under_review → accepted/rejected  
- Added comments/feedback system (admin write, submitter read)
- Implemented admin review actions in the client service layer (`src/lib/ideas.ts`)
- Added admin-only route protection middleware
- Comments display with admin name and timestamp

Acceptance criteria met: Full admin workflow functional, can accept/reject ideas

Linked to: specs/spec.md Features 6-7, specs/tasks.md Phase 4"

git push origin main
```

---

## Phase 5 Commit (After Polish & Testing)

```bash
git add .
git commit -m "Phase 5: UI polish, error handling, end-to-end validation - MVP complete

- Improved Tailwind CSS styling for professional appearance
- Added loading states and disabled buttons during async operations
- Implemented comprehensive error handling in forms and client-side service actions
- Added validation feedback messages for user guidance
- Tested complete end-to-end workflows:
  ✓ Register submitter → submit idea → view idea
  ✓ Register admin → login → review all ideas
  ✓ Admin accepts/rejects with feedback → submitter sees decision
- Fixed responsive design for desktop/mobile views
- Cleaned up TypeScript errors and console warnings
- Updated README with demo walkthrough

All MVP acceptance criteria met:
✓ User registration/login with roles
✓ Idea submission with file attachment
✓ Submitter can view own ideas
✓ Admin can review all ideas
✓ Admin can update status and add comments
✓ Professional UI with Tailwind
✓ Zero TypeScript errors
✓ All workflows tested and working
✓ Project runs cleanly at localhost:3000

MVP Status: ✅ COMPLETE AND READY FOR DEMO

Linked to: specs/spec.md (all), specs/tasks.md Phase 5, .specify/memory/constitution.md"

git push origin main
```

---

## Future Improvement / Production Roadmap Commits

Use separate commits for deferred production work so the MVP scope stays clear:

```bash
git commit -m "roadmap: add app/api route handlers for auth and idea workflows"
git commit -m "roadmap: migrate persistence layer from localStorage to SQLite"
git commit -m "roadmap: add full automated test suite (unit/component/integration/e2e)"
```

---

## View Commit History

```bash
# See all commits
git log --oneline

# Should show 6 commits total:
# - Initial setup
# - Phase 1: Data model
# - Phase 2: Auth
# - Phase 3: Submission
# - Phase 4: Admin review
# - Phase 5: Polish & complete
```

---

## Final Status Check

After Phase 5:
```bash
# Should have 0 errors
npm run type-check

# Should have 0 errors (warnings ok)
npm run lint

# Should be ready
npm run dev

# Open browser
# http://localhost:3000
```

---

**Remember:** Every commit links to SpecKit artifacts. This creates a clear trace from requirement → implementation → validation.

The git history tells the story of how you built the MVP, phase by phase, always referring back to the specifications.
