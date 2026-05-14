
# Development Tasks Checklist

**Sprint:** 10-hour MVP Implementation  
**Workflow:** SpecKit Specification-Driven Development  

> **Roadmap note:** In the current MVP, API routes, SQLite migration, and full automated tests are deferred as Future Improvement / Production Roadmap items. All core MVP features are implemented and validated. Admin idea review uses the shared idea detail route (not a separate admin-only route). Logout is implemented via the navbar/app shell, not a dedicated /logout route.

---

## Phase 1: Data Model & Persistence


### Task 1.1: Create Type Definitions
**Estimated:** 30 min | **Assigned:** [Developer]
- [x] Define User interface
- [x] Define Idea interface with IdeaStatus type
- [x] Define Comment interface
- [x] Define Session interface
- [x] Define API response types
- **File:** `types/index.ts`
- **Verification:** All types export correctly, TypeScript passes


### Task 1.2: Create Validation Schemas
**Estimated:** 30 min | **Assigned:** [Developer]
- [x] Create registerSchema (Zod)
- [x] Create loginSchema (Zod)
- [x] Create createIdeaSchema (Zod)
- [x] Create updateIdeaStatusSchema (Zod)
- [x] Create createCommentSchema (Zod)
- **File:** `lib/schemas.ts`
- **Verification:** All schemas validate test data correctly


### Task 1.3: Create Storage Layer
**Estimated:** 30 min | **Assigned:** [Developer]
- [x] Create `lib/storage.ts` with functions:
  - `loadUsers()` - read users.json
  - `saveUsers(users)` - write users.json
  - `loadIdeas()` - read ideas.json
  - `saveIdeas(ideas)` - write ideas.json
  - `loadComments()` - read comments.json
  - `saveComments(comments)` - write comments.json
- [x] Initialize data folder with seed data
- **File:** `lib/storage.ts` + `public/data/*.json`
- **Verification:** Storage functions work without errors


### Task 1.4: Create Utility Functions
**Estimated:** 20 min | **Assigned:** [Developer]
- [x] `generateId()` - create unique IDs
- [x] `formatDate(date)` - format dates for display
- [x] `hashPassword(password)` - simple hash (or plain for MVP)
- [x] `comparePassword(plain, hashed)` - verify password
- **File:** `lib/utils.ts`
- **Verification:** All functions execute correctly

---

## Phase 2: Authentication


### Task 2.1: Create Auth Helper Functions
**Estimated:** 30 min | **Assigned:** [Developer]
- [x] Create session management in `lib/auth.ts`
- [x] `createSession(user)` - create session object
- [x] `getSession()` - retrieve current session
- [x] `clearSession()` - remove session
- **File:** `lib/auth.ts`
- **Verification:** Session persists correctly


### Task 2.2: Create Registration Page
**Estimated:** 45 min | **Assigned:** [Developer]
- [x] Create `app/register/page.tsx`
- [x] Build registration form with:
  - Email input
  - Password input
  - Name input
  - Role radio buttons (submitter/admin)
- [x] Validate inputs with Zod
- [x] Handle duplicate email
- [x] Show success message
- [x] Redirect to login on success
- **File:** `app/register/page.tsx`
- **Verification:** Can register new user with valid data


### Task 2.3: Create Login Page
**Estimated:** 30 min | **Assigned:** [Developer]
- [x] Create `app/login/page.tsx`
- [x] Build login form with:
  - Email input
  - Password input
- [x] Validate credentials against users data
- [x] Create session on success
- [x] Show error on invalid credentials
- [x] Redirect to dashboard on success
- **File:** `app/login/page.tsx`
- **Verification:** Can login with valid credentials


### Task 2.4: Registration API Route (Future Improvement)
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] Create `app/api/auth/register/route.ts`
- [ ] POST handler: validate, check email, create user
- [ ] Return success/error response
- **File:** `app/api/auth/register/route.ts`
- **Verification:** API creates user correctly


### Task 2.5: Login API Route (Future Improvement)
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] Create `app/api/auth/login/route.ts`
- [ ] POST handler: validate, check credentials
- [ ] Create session cookie/response
- **File:** `app/api/auth/login/route.ts`
- **Verification:** API authenticates user correctly


### Task 2.6: Create Header Component with Logout
**Estimated:** 30 min | **Assigned:** [Developer]
- [x] Create `components/Header.tsx`
- [x] Display user name and role
- [x] Show logout button
- [x] Logout clears session (via navbar/app shell)
- **File:** `components/Header.tsx`
- **Verification:** Logout works correctly


### Task 2.7: Update Home Page
**Estimated:** 20 min | **Assigned:** [Developer]
- [x] Update `app/page.tsx` to redirect if logged in
- [x] Show login form if not logged in
- **File:** `app/page.tsx`
- **Verification:** Proper redirect based on auth status

---

## Phase 3: Idea Submission & Listing


### Task 3.1: Create Idea Submission Page & Form
**Estimated:** 45 min | **Assigned:** [Developer]
- [x] Create `app/submit/page.tsx`
- [x] Create `components/IdeaForm.tsx`
- [x] Build form with:
  - Title input
  - Description textarea
  - Category input (optional)
  - File upload (optional)
- [x] Validate with Zod schema
- [x] Handle file upload (store filename)
- [x] Show success message on submit
- [x] Redirect to dashboard
- **Files:** `app/submit/page.tsx`, `components/IdeaForm.tsx`
- **Verification:** Can submit idea with all fields


### Task 3.2: Idea Submission API Route (Future Improvement)
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Create `app/api/ideas/route.ts` POST handler
- [ ] Validate input with Zod
- [ ] Create idea with submitter ID
- [ ] Save to ideas.json
- [ ] Return created idea
- **File:** `app/api/ideas/route.ts`
- **Verification:** API creates idea correctly


### Task 3.3: Create Ideas Dashboard Page
**Estimated:** 45 min | **Assigned:** [Developer]
- [x] Create `app/dashboard/page.tsx`
- [x] Create `components/IdeasList.tsx`
- [x] Create `components/IdeaCard.tsx`
- [x] Display user's own ideas only
- [x] Show: title, status badge, date
- [x] Clickable to view detail
- [x] Add "Create Idea" button
- [x] Filter by status (optional)
- **Files:** `app/dashboard/page.tsx`, `components/IdeasList.tsx`, `components/IdeaCard.tsx`
- **Verification:** Can view own ideas with proper filtering


### Task 3.4: Ideas List API Route (Future Improvement)
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] Create GET handler in `app/api/ideas/route.ts`
- [ ] Filter ideas by user (if submitter) or show all (if admin)
- [ ] Return list of ideas
- **File:** `app/api/ideas/route.ts`
- **Verification:** API returns correct ideas


### Task 3.5: Create Idea Detail Page
**Estimated:** 45 min | **Assigned:** [Developer]
- [x] Create `app/ideas/[id]/page.tsx`
- [x] Create `components/IdeaDetail.tsx`
- [x] Create `components/CommentsSection.tsx` (read-only)
- [x] Display: title, description, category, status, file, date
- [x] Show comments from admin
- [x] Show delete button if status = "submitted"
- [x] Add back button
- **Files:** `app/ideas/[id]/page.tsx`, `components/IdeaDetail.tsx`, `components/CommentsSection.tsx`
- **Verification:** Can view full idea details with comments


### Task 3.6: Idea Detail & Delete API Routes (Future Improvement)
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Create GET handler for `/api/ideas/[id]`
- [ ] Create DELETE handler for `/api/ideas/[id]`
- [x] Verify owner before delete
- [x] Only allow delete if status = "submitted"
- **File:** `app/api/ideas/[id]/route.ts`
- **Verification:** Can get and delete ideas correctly (implemented in localStorage layer `src/lib/ideas.ts` for current MVP architecture)

---


## Phase 4: Admin Review Dashboard

### Task 4.1: Create Admin Dashboard Page
**Estimated:** 45 min | **Assigned:** [Developer]
- [x] Create `app/admin/page.tsx`
- [x] Create `components/AdminDashboard.tsx`
- [x] Create `components/AdminIdeasTable.tsx`
- [x] Display ALL ideas (not just user's)
- [x] Show: title, submitter, status, date
- [x] Add status filter dropdown
- [x] Clickable rows to open review (uses shared idea detail route)
- [x] Admin-only access check
- **Files:** `app/admin/page.tsx`, `components/AdminDashboard.tsx`
- **Verification:** Admin can see all ideas with filter

### Task 4.2: Create Admin Review Page
**Estimated:** 45 min | **Assigned:** [Developer]
- [x] Create `app/admin/ideas/[id]/page.tsx` (implemented as shared idea detail route)
- [x] Create `components/AdminReviewForm.tsx`
- [x] Create `components/StatusDropdown.tsx`
- [x] Create `components/AdminCommentsSection.tsx` (read/write)
- [x] Display idea details + submitter info
- [x] Show status dropdown
- [x] Show comments with write ability
- [x] Add comment form
- [x] Admin-only access check
- **Files:** `app/admin/ideas/[id]/page.tsx`, `components/AdminReviewForm.tsx`
- **Verification:** Admin can review and update ideas

### Task 4.3: Status Update API Route (Future Improvement)
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] Create PUT handler for `/api/ideas/[id]/status`
- [ ] Validate admin role
- [ ] Update idea status
- [ ] Save to ideas.json
- **File:** `app/api/ideas/[id]/status/route.ts`
- **Verification:** Status updates correctly

### Task 4.4: Comments API Routes (Future Improvement)
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Create POST handler for `/api/ideas/[id]/comments`
- [ ] Create GET handler for `/api/ideas/[id]/comments`
- [ ] Validate admin role for POST
- [ ] Save/load comments
- **File:** `app/api/ideas/[id]/comments/route.ts`
- **Verification:** Comments are created and retrieved

### Task 4.5: Admin Middleware (Future Improvement)
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] Create `lib/adminCheck.ts`
- [ ] Check if user is admin
- [ ] Redirect non-admins from /admin routes
- **File:** `lib/adminCheck.ts`
- **Verification:** Non-admins cannot access admin pages

---

## Phase 5: Polish & Testing


### Task 5.1: UI Styling & Components
**Estimated:** 45 min | **Assigned:** [Developer]
- [x] Style forms with Tailwind
- [x] Create status badge component with colors
- [x] Create button component variants
- [x] Create input component
- [x] Improve card layouts
- [x] Add responsive design
- **Files:** Various component files
- **Verification:** Professional appearance

### Task 5.2: Error Handling & Messages
**Estimated:** 30 min | **Assigned:** [Developer]
- [x] Add try/catch in API routes (where applicable)
- [x] Show user-friendly error messages
- [x] Add validation feedback in forms
- [x] Handle network errors
- **Files:** All API routes and forms
- **Verification:** Errors are handled gracefully

### Task 5.3: Loading States
**Estimated:** 20 min | **Assigned:** [Developer]
- [x] Add loading spinners to buttons
- [x] Disable buttons during submission
- [x] Show loading state on pages
- **Files:** Form components
- **Verification:** UX is smooth during operations

### Task 5.4: End-to-End Testing & Bug Fixes
**Estimated:** 30 min | **Assigned:** [Developer]
- [x] Test workflow 1: Register submitter → Submit idea → View idea
- [x] Test workflow 2: Register admin → Login → Review all ideas
- [x] Test workflow 3: Add comments → View in submitter dashboard
- [x] Test workflow 4: Reject idea → See rejection reason
- [x] Fix any bugs found
- [x] Clean up console errors/warnings
- **Verification:** All workflows work end-to-end

### Task 5.5: Final Documentation & Git Commits
**Estimated:** 15 min | **Assigned:** [Developer]
- [x] Update README with demo steps
- [x] Create git commits for each phase
- [x] Verify no TypeScript errors
- [x] Final test at localhost:3000
- **Verification:** Repository is clean and documented

---


## Task Status Summary

| Phase | Task Count | Estimated Hours | Status |
|-------|-----------|-----------------|--------|
| 1 | 4 | 1.5 | ✅ Done |
| 2 | 7 | 2.5 | ✅ Done |
| 3 | 6 | 2.5 | ✅ Done |
| 4 | 5 | 2.0 | ✅ Done (MVP, see roadmap for API/DB) |
| 5 | 5 | 1.5 | ✅ Done |
| **TOTAL** | **27** | **10** | **✅ MVP Complete** |

---

**Version:** 1.0  
**Last Updated:** May 15, 2026  
**Status:** MVP Complete. All core features implemented. Roadmap items (API, SQLite, full automation) deferred for future improvement.
