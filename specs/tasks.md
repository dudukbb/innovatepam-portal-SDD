# Development Tasks Checklist

**Sprint:** 10-hour MVP Implementation  
**Workflow:** SpecKit Specification-Driven Development  

---

## Phase 1: Data Model & Persistence

### Task 1.1: Create Type Definitions
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Define User interface
- [ ] Define Idea interface with IdeaStatus type
- [ ] Define Comment interface
- [ ] Define Session interface
- [ ] Define API response types
- **File:** `types/index.ts`
- **Verification:** All types export correctly, TypeScript passes

### Task 1.2: Create Validation Schemas
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Create registerSchema (Zod)
- [ ] Create loginSchema (Zod)
- [ ] Create createIdeaSchema (Zod)
- [ ] Create updateIdeaStatusSchema (Zod)
- [ ] Create createCommentSchema (Zod)
- **File:** `lib/schemas.ts`
- **Verification:** All schemas validate test data correctly

### Task 1.3: Create Storage Layer
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Create `lib/storage.ts` with functions:
  - `loadUsers()` - read users.json
  - `saveUsers(users)` - write users.json
  - `loadIdeas()` - read ideas.json
  - `saveIdeas(ideas)` - write ideas.json
  - `loadComments()` - read comments.json
  - `saveComments(comments)` - write comments.json
- [ ] Initialize data folder with seed data
- **File:** `lib/storage.ts` + `public/data/*.json`
- **Verification:** Storage functions work without errors

### Task 1.4: Create Utility Functions
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] `generateId()` - create unique IDs
- [ ] `formatDate(date)` - format dates for display
- [ ] `hashPassword(password)` - simple hash (or plain for MVP)
- [ ] `comparePassword(plain, hashed)` - verify password
- **File:** `lib/utils.ts`
- **Verification:** All functions execute correctly

---

## Phase 2: Authentication

### Task 2.1: Create Auth Helper Functions
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Create session management in `lib/auth.ts`
- [ ] `createSession(user)` - create session object
- [ ] `getSession()` - retrieve current session
- [ ] `clearSession()` - remove session
- **File:** `lib/auth.ts`
- **Verification:** Session persists correctly

### Task 2.2: Create Registration Page
**Estimated:** 45 min | **Assigned:** [Developer]
- [ ] Create `app/register/page.tsx`
- [ ] Build registration form with:
  - Email input
  - Password input
  - Name input
  - Role radio buttons (submitter/admin)
- [ ] Validate inputs with Zod
- [ ] Handle duplicate email
- [ ] Show success message
- [ ] Redirect to login on success
- **File:** `app/register/page.tsx`
- **Verification:** Can register new user with valid data

### Task 2.3: Create Login Page
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Create `app/login/page.tsx`
- [ ] Build login form with:
  - Email input
  - Password input
- [ ] Validate credentials against users data
- [ ] Create session on success
- [ ] Show error on invalid credentials
- [ ] Redirect to dashboard on success
- **File:** `app/login/page.tsx`
- **Verification:** Can login with valid credentials

### Task 2.4: Create Registration API Route
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] Create `app/api/auth/register/route.ts`
- [ ] POST handler: validate, check email, create user
- [ ] Return success/error response
- **File:** `app/api/auth/register/route.ts`
- **Verification:** API creates user correctly

### Task 2.5: Create Login API Route
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] Create `app/api/auth/login/route.ts`
- [ ] POST handler: validate, check credentials
- [ ] Create session cookie/response
- **File:** `app/api/auth/login/route.ts`
- **Verification:** API authenticates user correctly

### Task 2.6: Create Header Component with Logout
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Create `components/Header.tsx`
- [ ] Display user name and role
- [ ] Show logout button
- [ ] Logout clears session
- **File:** `components/Header.tsx`
- **Verification:** Logout works correctly

### Task 2.7: Update Home Page
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] Update `app/page.tsx` to redirect if logged in
- [ ] Show login form if not logged in
- **File:** `app/page.tsx`
- **Verification:** Proper redirect based on auth status

---

## Phase 3: Idea Submission & Listing

### Task 3.1: Create Idea Submission Page & Form
**Estimated:** 45 min | **Assigned:** [Developer]
- [ ] Create `app/submit/page.tsx`
- [ ] Create `components/IdeaForm.tsx`
- [ ] Build form with:
  - Title input
  - Description textarea
  - Category input (optional)
  - File upload (optional)
- [ ] Validate with Zod schema
- [ ] Handle file upload (store filename)
- [ ] Show success message on submit
- [ ] Redirect to dashboard
- **Files:** `app/submit/page.tsx`, `components/IdeaForm.tsx`
- **Verification:** Can submit idea with all fields

### Task 3.2: Create Idea Submission API Route
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
- [ ] Create `app/dashboard/page.tsx`
- [ ] Create `components/IdeasList.tsx`
- [ ] Create `components/IdeaCard.tsx`
- [ ] Display user's own ideas only
- [ ] Show: title, status badge, date
- [ ] Clickable to view detail
- [ ] Add "Create Idea" button
- [ ] Filter by status (optional)
- **Files:** `app/dashboard/page.tsx`, `components/IdeasList.tsx`, `components/IdeaCard.tsx`
- **Verification:** Can view own ideas with proper filtering

### Task 3.4: Create Ideas List API Route
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] Create GET handler in `app/api/ideas/route.ts`
- [ ] Filter ideas by user (if submitter) or show all (if admin)
- [ ] Return list of ideas
- **File:** `app/api/ideas/route.ts`
- **Verification:** API returns correct ideas

### Task 3.5: Create Idea Detail Page
**Estimated:** 45 min | **Assigned:** [Developer]
- [ ] Create `app/ideas/[id]/page.tsx`
- [ ] Create `components/IdeaDetail.tsx`
- [ ] Create `components/CommentsSection.tsx` (read-only)
- [ ] Display: title, description, category, status, file, date
- [ ] Show comments from admin
- [x] Show delete button if status = "submitted"
- [ ] Add back button
- **Files:** `app/ideas/[id]/page.tsx`, `components/IdeaDetail.tsx`, `components/CommentsSection.tsx`
- **Verification:** Can view full idea details with comments

### Task 3.6: Create Idea Detail & Delete API Routes
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
- [ ] Create `app/admin/page.tsx`
- [ ] Create `components/AdminDashboard.tsx`
- [ ] Create `components/AdminIdeasTable.tsx`
- [ ] Display ALL ideas (not just user's)
- [ ] Show: title, submitter, status, date
- [ ] Add status filter dropdown
- [ ] Clickable rows to open review
- [ ] Admin-only access check
- **Files:** `app/admin/page.tsx`, `components/AdminDashboard.tsx`
- **Verification:** Admin can see all ideas with filter

### Task 4.2: Create Admin Review Page
**Estimated:** 45 min | **Assigned:** [Developer]
- [ ] Create `app/admin/ideas/[id]/page.tsx`
- [ ] Create `components/AdminReviewForm.tsx`
- [ ] Create `components/StatusDropdown.tsx`
- [ ] Create `components/AdminCommentsSection.tsx` (read/write)
- [ ] Display idea details + submitter info
- [ ] Show status dropdown
- [ ] Show comments with write ability
- [ ] Add comment form
- [ ] Admin-only access check
- **Files:** `app/admin/ideas/[id]/page.tsx`, `components/AdminReviewForm.tsx`
- **Verification:** Admin can review and update ideas

### Task 4.3: Create Status Update API Route
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] Create PUT handler for `/api/ideas/[id]/status`
- [ ] Validate admin role
- [ ] Update idea status
- [ ] Save to ideas.json
- **File:** `app/api/ideas/[id]/status/route.ts`
- **Verification:** Status updates correctly

### Task 4.4: Create Comments API Routes
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Create POST handler for `/api/ideas/[id]/comments`
- [ ] Create GET handler for `/api/ideas/[id]/comments`
- [ ] Validate admin role for POST
- [ ] Save/load comments
- **File:** `app/api/ideas/[id]/comments/route.ts`
- **Verification:** Comments are created and retrieved

### Task 4.5: Create Admin Middleware
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
- [ ] Style forms with Tailwind
- [ ] Create status badge component with colors
- [ ] Create button component variants
- [ ] Create input component
- [ ] Improve card layouts
- [ ] Add responsive design
- **Files:** Various component files
- **Verification:** Professional appearance

### Task 5.2: Error Handling & Messages
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Add try/catch in API routes
- [ ] Show user-friendly error messages
- [ ] Add validation feedback in forms
- [ ] Handle network errors
- **Files:** All API routes and forms
- **Verification:** Errors are handled gracefully

### Task 5.3: Loading States
**Estimated:** 20 min | **Assigned:** [Developer]
- [ ] Add loading spinners to buttons
- [ ] Disable buttons during submission
- [ ] Show loading state on pages
- **Files:** Form components
- **Verification:** UX is smooth during operations

### Task 5.4: End-to-End Testing & Bug Fixes
**Estimated:** 30 min | **Assigned:** [Developer]
- [ ] Test workflow 1: Register submitter → Submit idea → View idea
- [ ] Test workflow 2: Register admin → Login → Review all ideas
- [ ] Test workflow 3: Add comments → View in submitter dashboard
- [ ] Test workflow 4: Reject idea → See rejection reason
- [ ] Fix any bugs found
- [ ] Clean up console errors/warnings
- **Verification:** All workflows work end-to-end

### Task 5.5: Final Documentation & Git Commits
**Estimated:** 15 min | **Assigned:** [Developer]
- [ ] Update README with demo steps
- [ ] Create git commits for each phase
- [ ] Verify no TypeScript errors
- [ ] Final test at localhost:3000
- **Verification:** Repository is clean and documented

---

## Task Status Summary

| Phase | Task Count | Estimated Hours | Status |
|-------|-----------|-----------------|--------|
| 1 | 4 | 1.5 | ⏳ TODO |
| 2 | 7 | 2.5 | ⏳ TODO |
| 3 | 6 | 2.5 | ⏳ TODO |
| 4 | 5 | 2.0 | ⏳ TODO |
| 5 | 5 | 1.5 | ⏳ TODO |
| **TOTAL** | **27** | **10** | **⏳ IN PROGRESS** |

---

**Version:** 1.0  
**Last Updated:** May 14, 2026  
**Status:** Ready for Development
