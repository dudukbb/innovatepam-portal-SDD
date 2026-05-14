
# InnovatEPAM Portal - MVP Implementation Plan

**Total Sprint Duration:** 10 hours  
**Phases:** 5 phases × ~2 hours each

> **Roadmap note:** API route handlers, SQLite/database migration, and full automated testing are not part of current MVP implementation and are tracked as Future Improvement / Production Roadmap. All core MVP features are implemented and validated. Admin idea review uses the shared idea detail route (not a separate admin-only route). Logout is implemented via the navbar/app shell, not a dedicated /logout route.

---


## Phase 0: Foundation (Setup Complete ✅)
**Duration:** ~0.5 hours | **Status:** ✅ DONE

### Tasks
- [x] Next.js project initialized
- [x] TypeScript configured (strict mode)
- [x] Tailwind CSS configured
- [x] SpecKit artifacts created
- [x] Dev server running at localhost:3000

---


## Phase 1: Data Model & Persistence
**Duration:** ~1 hour | **Status:** ✅ DONE

### Objective
Set up data structures and file-based persistence layer (implemented with localStorage for MVP)

### Tasks
- [x] Create types (User, Idea, Comment) in `types/index.ts`
- [x] Create Zod validation schemas in `lib/schemas.ts`
- [x] Create utility functions in `lib/utils.ts` (formatDate, generateId, etc.)
- [x] Create data storage layer (`lib/storage.ts`):
  - Load/save users from localStorage
  - Load/save ideas from localStorage
  - Load/save comments from localStorage
  - Session management (localStorage)
- [x] Create components directory structure

### Files Created
- `types/index.ts` - Type definitions
- `lib/schemas.ts` - Zod schemas
- `lib/storage.ts` - Data persistence functions
- `lib/utils.ts` - Helper utilities

### Acceptance Criteria
- [x] All types properly defined
- [x] Storage functions work in isolation
- [x] Test data can be read/written

---


## Phase 2: Authentication
**Duration:** ~2 hours | **Status:** ✅ DONE

### Objective
Implement user registration, login, logout with role distinction (all via localStorage/session, no API routes in MVP)

### Tasks
- [x] Create registration page (`app/register/page.tsx`)
  - Form: email, password, name, role (radio buttons)
  - Validation with Zod
  - Success: redirect to login
- [x] Create login page (`app/login/page.tsx`)
  - Form: email, password
  - Validate credentials
  - Set session (localStorage)
  - Redirect to dashboard
- [x] Create logout function (navbar/app shell)
- [x] Create middleware/hook for session management (`lib/auth.ts`)
- [x] Update home page (`app/page.tsx`) to show login form or redirect
- [x] Create header component with logout button
- [ ] Add API routes (Future Improvement)
  - `api/auth/register` - POST
  - `api/auth/login` - POST
  - `api/auth/logout` - POST

### Components Created
- `components/RegisterForm.tsx`
- `components/LoginForm.tsx`
- `components/Header.tsx`

### Acceptance Criteria
- [x] User can register with email/password/name/role
- [x] Duplicate email rejected
- [x] Invalid inputs show errors
- [x] User can login with valid credentials
- [x] Invalid credentials show error
- [x] Session persists on page refresh
- [x] Logout clears session
- [x] Redirect to login if not authenticated

---


## Phase 3: Idea Submission & Listing
**Duration:** ~2.5 hours | **Status:** ✅ DONE

### Objective
Enable submitters to submit ideas and view their own ideas (all via localStorage for MVP)

### Tasks
- [x] Create idea submission page (`app/submit/page.tsx`)
  - Form: title, description, category, file upload
  - Validation with Zod
  - File handling (store filename)
  - Success: show confirmation, redirect to ideas list
- [x] Create ideas listing page (`app/dashboard/page.tsx`)
  - Show user's own ideas only (for submitters)
  - Display: title, status, date submitted
  - Clickable rows to view detail
  - Create new idea button
  - Filter by status (optional)
- [x] Create idea detail page (`app/ideas/[id]/page.tsx`)
  - Show full idea: title, description, category, status, file, date
  - Show comments from admin
  - Submitter can delete own idea if status = "submitted"
  - Back button
- [ ] Add API routes (Future Improvement)
  - `api/ideas` - POST (create), GET (list)
  - `api/ideas/[id]` - GET (detail), DELETE (owner)

### Components Created
- `components/IdeaForm.tsx`
- `components/IdeaCard.tsx`
- `components/IdeasList.tsx`
- `components/CommentsSection.tsx` (read-only for submitter)

### Acceptance Criteria
- [x] Submitter can create idea with validation
- [x] File attachment optional but stored
- [x] Ideas listing shows only user's ideas
- [x] Status displayed with badge
- [x] Can view idea details
- [x] Can delete idea if status = "submitted"
- [x] Comments visible below idea
- [x] Error handling for all operations

---


## Phase 4: Admin Review Dashboard & Workflow
**Duration:** ~2.5 hours | **Status:** ✅ DONE (MVP, see roadmap for API/DB)

### Objective
Implement admin dashboard and review workflow (admin review uses shared idea detail route in MVP)

### Tasks
- [x] Create admin dashboard page (`app/admin/page.tsx`)
  - Show ALL ideas (not just own)
  - Display: title, submitter name, status, date
  - Filter by status (submitted, under_review, accepted, rejected)
  - Click to open review (shared idea detail route)
- [x] Create admin review page (`app/admin/ideas/[id]/page.tsx`)
  - Show idea details + submitter info
  - Status dropdown to change status
  - Comments section (read/write for admin)
  - Add comment form
  - Save status change
- [x] Create comments section component (write-enabled for admin)
- [ ] Add API routes (Future Improvement)
  - `api/ideas/[id]/status` - PUT (update status)
  - `api/ideas/[id]/comments` - POST (create), GET (list)
- [ ] Create middleware to check admin role (Future Improvement)

### Components Created
- `components/AdminDashboard.tsx`
- `components/ReviewForm.tsx`
- `components/StatusDropdown.tsx`
- `components/CommentForm.tsx`
- `components/AdminCommentsSection.tsx`

### Acceptance Criteria
- [x] Admin sees all ideas on dashboard
- [x] Filter by status works
- [x] Can open idea for review
- [x] Can change idea status
- [x] Can add comments
- [x] Comments show with admin name and timestamp
- [x] Non-admins cannot access admin pages
- [x] Submitter can see admin comments on their ideas

---


## Phase 5: Polish & Testing
**Duration:** ~1.5 hours | **Status:** ✅ DONE

### Objective
Polish UI, add error handling, test end-to-end workflow

### Tasks
- [x] Improve UI styling
  - Better form styling
  - Card layouts
  - Status badges (colors)
  - Responsive design
  - Dark mode (optional)
- [x] Add error handling
  - Try/catch in API routes (where applicable)
  - User-friendly error messages
  - Form validation feedback
- [x] Add loading states
  - Loading spinners
  - Disabled buttons during submission
- [x] Test end-to-end workflows
  - Register submitter → submit idea → view idea
  - Register admin → login → review idea → accept/reject
  - Add comments → see in submitter view
- [x] Fix bugs found during testing
- [x] Clean up console errors/warnings
- [x] Update README with demo steps

### Acceptance Criteria
- [x] All workflows work end-to-end
- [x] Professional appearance
- [x] No TypeScript errors
- [x] No console errors
- [x] Responsive on mobile (optional)
- [x] All git commits made with clear messages

---


## Timeline Overview

| Phase | Task | Hours | Status |
|-------|------|-------|--------|
| 0 | Foundation Setup | 0.5 | ✅ Done |
| 1 | Data & Persistence | 1 | ✅ Done |
| 2 | Authentication | 2 | ✅ Done |
| 3 | Idea Submission | 2.5 | ✅ Done |
| 4 | Admin Review | 2.5 | ✅ Done (MVP, see roadmap for API/DB) |
| 5 | Polish & Test | 1.5 | ✅ Done |
| **TOTAL** | **MVP Complete** | **10** | **✅ MVP Complete** |

---

## Implementation Order

**Strict Dependency Order:**
1. ✅ Phase 0: Foundation (already done)
2. Phase 1: Data Model (required for everything)
3. Phase 2: Auth (required for access control)
4. Phase 3: Submission (core feature)
5. Phase 4: Admin Review (uses submission data)
6. Phase 5: Polish (uses all features)

---

## Git Commit Strategy

After each phase, commit with clear message:

```bash
# Phase 1
git commit -m "Phase 1: Data model and persistence layer - User, Idea, Comment types + JSON storage"

# Phase 2
git commit -m "Phase 2: Authentication system - registration, login/logout, session management"

# Phase 3
git commit -m "Phase 3: Idea submission - submit form, idea listing, detail view"

# Phase 4
git commit -m "Phase 4: Admin review dashboard - review interface, status updates, comments"

# Phase 5
git commit -m "Phase 5: UI polish and end-to-end testing - improved styling, error handling, workflows validated"
```

---


## Success Criteria (MVP Definition of Done)

- [x] User registration works
- [x] User login/logout works
- [x] Role distinction functional
- [x] Submitter can submit ideas with file
- [x] Submitter can view own ideas
- [x] Admin can view all ideas
- [x] Admin can change status
- [x] Admin can add comments
- [x] Submitter sees admin comments
- [x] Professional UI with Tailwind
- [x] All routes accessible at localhost:3000
- [x] No TypeScript errors
- [x] Demo workflow fully functional
- [x] All phases committed to git

---


**Version:** 1.0 (MVP Plan)  
**Last Updated:** May 15, 2026  
**Status:** MVP Complete. All core features implemented. Roadmap items (API, SQLite, full automation) deferred for future improvement.
