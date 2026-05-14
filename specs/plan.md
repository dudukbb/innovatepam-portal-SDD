# InnovatEPAM Portal - MVP Implementation Plan

**Total Sprint Duration:** 10 hours  
**Phases:** 5 phases × ~2 hours each

> Roadmap note: API route handlers, SQLite/database migration, and full automated testing are not part of current MVP implementation and are tracked as Future Improvement / Production Roadmap.

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
**Duration:** ~1 hour | **Status:** ⏳ TODO

### Objective
Set up data structures and file-based persistence layer

### Tasks
- [ ] Create types (User, Idea, Comment) in `types/index.ts`
- [ ] Create Zod validation schemas in `lib/schemas.ts`
- [ ] Create utility functions in `lib/utils.ts` (formatDate, generateId, etc.)
- [ ] Create data storage layer (`lib/storage.ts`):
  - Load/save users from JSON file
  - Load/save ideas from JSON file
  - Load/save comments from JSON file
  - Session management (in-memory or localStorage)
- [ ] Create components directory structure

### Files to Create
- `types/index.ts` - Type definitions
- `lib/schemas.ts` - Zod schemas (already exists, extend)
- `lib/storage.ts` - Data persistence functions
- `lib/utils.ts` - Helper utilities

### Acceptance Criteria
- [ ] All types properly defined
- [ ] Storage functions work in isolation
- [ ] Test data can be read/written

---

## Phase 2: Authentication
**Duration:** ~2 hours | **Status:** ⏳ TODO

### Objective
Implement user registration, login, logout with role distinction

### Tasks
- [ ] Create registration page (`app/register/page.tsx`)
  - Form: email, password, name, role (radio buttons)
  - Validation with Zod
  - Success: redirect to login
- [ ] Create login page (`app/login/page.tsx`)
  - Form: email, password
  - Validate credentials
  - Set session/cookie
  - Redirect to dashboard
- [ ] Create logout function
- [ ] Create middleware/hook for session management (`lib/auth.ts`)
- [ ] Update home page (`app/page.tsx`) to show login form or redirect
- [ ] Create header component with logout button
- [ ] Add API routes:
  - `api/auth/register` - POST
  - `api/auth/login` - POST
  - `api/auth/logout` - POST

### Components to Create
- `components/RegisterForm.tsx`
- `components/LoginForm.tsx`
- `components/Header.tsx`

### Acceptance Criteria
- [ ] User can register with email/password/name/role
- [ ] Duplicate email rejected
- [ ] Invalid inputs show errors
- [ ] User can login with valid credentials
- [ ] Invalid credentials show error
- [ ] Session persists on page refresh
- [ ] Logout clears session
- [ ] Redirect to login if not authenticated

---

## Phase 3: Idea Submission & Listing
**Duration:** ~2.5 hours | **Status:** ⏳ TODO

### Objective
Enable submitters to submit ideas and view their own ideas

### Tasks
- [ ] Create idea submission page (`app/submit/page.tsx`)
  - Form: title, description, category, file upload
  - Validation with Zod
  - File handling (store filename, optionally base64)
  - Success: show confirmation, redirect to ideas list
- [ ] Create ideas listing page (`app/dashboard/page.tsx`)
  - Show user's own ideas only (for submitters)
  - Display: title, status, date submitted
  - Clickable rows to view detail
  - Create new idea button
  - Filter by status (optional)
- [ ] Create idea detail page (`app/ideas/[id]/page.tsx`)
  - Show full idea: title, description, category, status, file, date
  - Show comments from admin
  - Submitter can delete own idea if status = "submitted"
  - Back button
- [ ] Add API routes:
  - `api/ideas` - POST (create), GET (list)
  - `api/ideas/[id]` - GET (detail), DELETE (owner)

### Components to Create
- `components/IdeaForm.tsx`
- `components/IdeaCard.tsx`
- `components/IdeasList.tsx`
- `components/CommentsSection.tsx` (read-only for submitter)

### Acceptance Criteria
- [ ] Submitter can create idea with validation
- [ ] File attachment optional but stored
- [ ] Ideas listing shows only user's ideas
- [ ] Status displayed with badge
- [ ] Can view idea details
- [ ] Can delete idea if status = "submitted"
- [ ] Comments visible below idea
- [ ] Error handling for all operations

---

## Phase 4: Admin Review Dashboard & Workflow
**Duration:** ~2.5 hours | **Status:** ⏳ TODO

### Objective
Implement admin dashboard and review workflow

### Tasks
- [ ] Create admin dashboard page (`app/admin/page.tsx`)
  - Show ALL ideas (not just own)
  - Display: title, submitter name, status, date
  - Filter by status (submitted, under_review, accepted, rejected)
  - Click to open review modal or detail page
- [ ] Create admin review page (`app/admin/ideas/[id]/page.tsx`)
  - Show idea details + submitter info
  - Status dropdown to change status
  - Comments section (read/write for admin)
  - Add comment form
  - Save status change
- [ ] Create comments section component (write-enabled for admin)
- [ ] Add API routes:
  - `api/ideas/[id]/status` - PUT (update status)
  - `api/ideas/[id]/comments` - POST (create), GET (list)
- [ ] Create middleware to check admin role

### Components to Create
- `components/AdminDashboard.tsx`
- `components/ReviewForm.tsx`
- `components/StatusDropdown.tsx`
- `components/CommentForm.tsx`
- `components/AdminCommentsSection.tsx`

### Acceptance Criteria
- [ ] Admin sees all ideas on dashboard
- [ ] Filter by status works
- [ ] Can open idea for review
- [ ] Can change idea status
- [ ] Can add comments
- [ ] Comments show with admin name and timestamp
- [ ] Non-admins cannot access admin pages
- [ ] Submitter can see admin comments on their ideas

---

## Phase 5: Polish & Testing
**Duration:** ~1.5 hours | **Status:** ⏳ TODO

### Objective
Polish UI, add error handling, test end-to-end workflow

### Tasks
- [ ] Improve UI styling
  - Better form styling
  - Card layouts
  - Status badges (colors)
  - Responsive design
  - Dark mode (optional)
- [ ] Add error handling
  - Try/catch in API routes
  - User-friendly error messages
  - Form validation feedback
- [ ] Add loading states
  - Loading spinners
  - Disabled buttons during submission
- [ ] Test end-to-end workflows
  - Register submitter → submit idea → view idea
  - Register admin → login → review idea → accept/reject
  - Add comments → see in submitter view
- [ ] Fix bugs found during testing
- [ ] Clean up console errors/warnings
- [ ] Update README with demo steps

### Acceptance Criteria
- [ ] All workflows work end-to-end
- [ ] Professional appearance
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Responsive on mobile (optional)
- [ ] All git commits made with clear messages

---

## Timeline Overview

| Phase | Task | Hours | Status |
|-------|------|-------|--------|
| 0 | Foundation Setup | 0.5 | ✅ Done |
| 1 | Data & Persistence | 1 | ⏳ TODO |
| 2 | Authentication | 2 | ⏳ TODO |
| 3 | Idea Submission | 2.5 | ⏳ TODO |
| 4 | Admin Review | 2.5 | ⏳ TODO |
| 5 | Polish & Test | 1.5 | ⏳ TODO |
| **TOTAL** | **MVP Complete** | **10** | **⏳ IN PROGRESS** |

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

- [ ] User registration works
- [ ] User login/logout works
- [ ] Role distinction functional
- [ ] Submitter can submit ideas with file
- [ ] Submitter can view own ideas
- [ ] Admin can view all ideas
- [ ] Admin can change status
- [ ] Admin can add comments
- [ ] Submitter sees admin comments
- [ ] Professional UI with Tailwind
- [ ] All routes accessible at localhost:3000
- [ ] No TypeScript errors
- [ ] Demo workflow fully functional
- [ ] All phases committed to git

---

**Version:** 1.0 (MVP Plan)  
**Last Updated:** May 14, 2026  
**Status:** Plan Defined, Ready for Phase 1 Execution
