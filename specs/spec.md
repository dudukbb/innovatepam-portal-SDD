# InnovatEPAM Portal - MVP Specification

**Sprint Duration:** 10 hours  
**Goal:** Build a working employee idea submission and evaluation portal  

---

## 1. Overview

InnovatEPAM Portal is an internal web application for:
- **Employees (Submitters)**: Submit innovation ideas with file attachments
- **Admins (Jury)**: Review, comment, and decide on submitted ideas

**Demo Scenario:**
1. A user registers as a **submitter**
2. Submits an idea with title, description, category, and optional file
3. Views the idea with status "submitted"
4. An admin logs in and reviews the idea
5. Admin updates status to "under review", adds comments, then accepts/rejects

---

## 2. User Types & Roles

### Role: Submitter (Normal User)
- Can register and login
- Can submit ideas (create, view, delete own ideas)
- Can see their idea status
- Cannot review other ideas
- Cannot see admin dashboard

### Role: Admin / Jury
- Can login (admin role assigned at registration)
- Can access admin dashboard
- Can view all submitted ideas
- Can see idea details, submitter info, attachments
- Can add comments/feedback to ideas
- Can change idea status: submitted → under review → accepted/rejected
- Cannot submit ideas (separate flow)

---

## 3. Core Features

### Feature 1: User Registration
**User Story:** As a new employee, I can register to participate in the innovation platform.

**Acceptance Criteria:**
- Form fields: email, password, name, role (submitter / admin)
- Email validation (valid format)
- Password validation (min 8 chars)
- Name validation (min 2 chars)
- Success: User account created, redirected to login
- Error: Display validation errors
- Duplicate email: Show error message

**UI Components:**
- Registration form (email, password, name, role radio buttons)
- Submit button
- Link to login page

---

### Feature 2: User Login / Logout
**User Story:** As a registered user, I can login to access my personalized portal.

**Acceptance Criteria:**
- Form fields: email, password
- Valid credentials: Login successful, redirect to dashboard
- Invalid credentials: Show error message
- Session persistence: User stays logged in on page refresh
- Logout: Clear session, redirect to login page

**UI Components:**
- Login form (email, password)
- Submit button
- Link to registration page
- Logout button in header

---

### Feature 3: Idea Submission
**User Story:** As a submitter, I can submit an innovation idea for review.

**Acceptance Criteria:**
- Form fields: title, description, category (optional), file attachment (optional)
- Validation:
  - Title: required, min 5 characters
  - Description: required, min 20 characters
  - Category: optional (dropdown or text)
  - File: optional, max 5MB
- Success: Idea saved, show confirmation message, redirect to idea listing
- Error: Display validation errors
- File upload: Store file temporarily (in MVP: show filename only)

**UI Components:**
- Idea submission form
- File input with drag-drop support
- Submit button
- Cancel button

---

### Feature 4: Idea Listing (Submitter View)
**User Story:** As a submitter, I can view all my submitted ideas and their statuses.

**Acceptance Criteria:**
- Display list of user's own ideas
- Show: title, status, date submitted
- Clickable to view details
- Status badges: submitted, under_review, accepted, rejected
- Empty state: "No ideas submitted yet"
- Option to create new idea

**UI Components:**
- Ideas table or card grid
- Status badge component
- Link to idea detail
- Create idea button

---

### Feature 5: Idea Detail View (Submitter)
**User Story:** As a submitter, I can see full details of my submitted idea.

**Acceptance Criteria:**
- Display: title, description, category, status, date, attachment
- Show comments/feedback from admin
- Submitter can delete own idea if status is "submitted"
- Cannot edit after submission

**UI Components:**
- Idea detail card
- Comments section (read-only for submitter)
- Delete button
- Back button

---

### Feature 6: Admin Dashboard
**User Story:** As an admin, I can review all submitted ideas and manage them.

**Acceptance Criteria:**
- Display list of ALL ideas (not just own)
- Show: idea title, submitter name, status, date submitted
- Filter by status (optional: submitted, under_review, accepted, rejected)
- Click to view idea for review
- Quick access to update status

**UI Components:**
- Ideas table with columns: title, submitter, status, date
- Status filter dropdown
- Idea row clickable to view details

---

### Feature 7: Idea Review (Admin)
**User Story:** As an admin, I can review an idea and provide feedback.

**Acceptance Criteria:**
- Display: full idea details (title, description, category, attachment, submitter)
- Show: all previous comments/feedback
- Admin can:
  - Update idea status (dropdown): submitted → under_review → accepted/rejected
  - Add comments/feedback (textarea)
  - View submitter name and email
- Success message after status update
- Comments persist and show with admin name and timestamp

**UI Components:**
- Idea detail card
- Status update dropdown
- Comments section (read/write for admin)
- Add comment form
- Back button

---

## 4. Data Model

### User
```typescript
{
  id: string              // unique ID
  email: string           // unique, required
  password: string        // hashed, required
  name: string           // required
  role: "submitter" | "admin"
  createdAt: Date
}
```

### Idea
```typescript
{
  id: string              // unique ID
  title: string           // required, min 5 chars
  description: string     // required, min 20 chars
  category: string?       // optional
  status: IdeaStatus      // one of: submitted, under_review, accepted, rejected
  fileUrl: string?        // optional attachment
  createdById: string     // user ID of submitter
  createdAt: Date
  updatedAt: Date
}
```

### Comment
```typescript
{
  id: string              // unique ID
  content: string         // required, min 5 chars
  ideaId: string          // reference to idea
  createdById: string     // user ID of commenter (admin)
  createdAt: Date
}
```

---

## 5. Status Workflow

```
Submitted
    ↓
Under Review (admin updates)
    ↓
├─ Accepted (admin decision)
└─ Rejected (admin decision)
```

---

## 6. Pages & Routes

**Unauthenticated:**
- `/` - Home/Login page
- `/register` - Registration page

**Authenticated (All Users):**
- `/dashboard` - User dashboard (idea listing)
- `/ideas/[id]` - Idea detail view
- `/submit` - Idea submission page
- `/logout` - Logout

**Authenticated (Admin Only):**
- `/admin` - Admin dashboard (all ideas)
- `/admin/ideas/[id]` - Admin idea review page

---

## 7. Production Roadmap: Planned API Endpoints (Next.js Route Handlers)

Note: The current MVP implementation is local-first and client-side (`src/lib/*` + localStorage). The following endpoints are planned for production hardening.

### Authentication
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout

### Ideas
- `POST /api/ideas` - Create idea (submitter)
- `GET /api/ideas` - Get ideas (filtered by role)
- `GET /api/ideas/[id]` - Get idea details
- `DELETE /api/ideas/[id]` - Delete idea (owner only)

### Ideas (Admin)
- `PUT /api/ideas/[id]/status` - Update status
- `POST /api/ideas/[id]/comments` - Add comment
- `GET /api/ideas/[id]/comments` - Get comments

---

## 8. Acceptance Criteria for MVP Complete

- [x] User registration working
- [x] User login working
- [x] Role distinction functional
- [x] Idea submission working with file attachment
- [x] Submitter can view own ideas
- [x] Submitter can delete own idea only while status is "submitted"
- [x] Admin dashboard shows all ideas
- [x] Admin can update idea status
- [x] Admin can add comments
- [x] Comments visible to submitter
- [x] Professional UI (Tailwind CSS)
- [x] All pages respond at localhost:3000
- [x] Demo workflow functional end-to-end

---

## 9. Out of Scope (MVP)

- Blind review system
- Scoring/rating system
- Advanced file handling (images, videos)
- Email notifications
- User profile management
- Idea search/advanced filtering
- Analytics dashboard
- Multi-level approval workflow
- SQLite/database-backed persistence
- Full automated testing suite (unit/component/integration/e2e)

---

**Version:** 1.0 (MVP)  
**Last Updated:** May 14, 2026  
**Status:** Specification Complete, Ready for Implementation
