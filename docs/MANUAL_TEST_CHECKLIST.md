# MVP Manual Test Checklist

Date: 2026-05-15
Project: InnovatEPAM Portal MVP

How to use:
- Reset localStorage only if you need a clean run.
- Execute scenarios top to bottom.
- Mark each scenario Pass/Fail and add notes.

## 1. Auth Workflow

### 1.1 Registration (role-aware)
- [ ] Open `/register`.
- [ ] Enter valid name, email, password (8+ chars), and select role.
- [ ] Submit form.
- [ ] Verify success message appears.
- [ ] Verify redirect goes to `/login` (not dashboard/admin).
- [ ] Verify account can login with selected role.

Expected:
- Registration succeeds for new email.
- Registration does not auto-login.

### 1.2 Login
- [ ] Open `/login`.
- [ ] Login with seeded submitter account.
- [ ] Verify redirect to `/dashboard`.
- [ ] Logout.
- [ ] Login with seeded admin account.
- [ ] Verify redirect to `/admin`.

Expected:
- Role-based redirect is correct for submitter/admin.

## 2. Submitter Workflow

### 2.1 Submit Idea
- [ ] Login as submitter.
- [ ] Open `/submit`.
- [ ] Submit valid idea (title, description, optional category/file).
- [ ] Verify redirect to `/dashboard` and new idea visible.

### 2.2 View Own Idea Details
- [ ] Open created idea from dashboard.
- [ ] Verify title, description, status, timestamps, and optional attachment text.

Expected:
- Submitter sees only own ideas and detail pages.

## 3. Admin Review Workflow

### 3.1 Admin List and Filter
- [ ] Login as admin.
- [ ] Open `/admin`.
- [ ] Verify all ideas are listed.
- [ ] Apply status filter(s) and verify list updates.

### 3.2 Review and Comment
- [ ] Open one idea detail.
- [ ] Change status using allowed transition.
- [ ] Add feedback comment.
- [ ] Save review.
- [ ] Verify status/comment persist after refresh.

Expected:
- Admin can review, update status, and comment.
- Transition guard prevents invalid status moves.

## 4. Delete-Own-Submitted-Idea Workflow

### 4.1 Delete from Dashboard
- [ ] Login as submitter.
- [ ] Ensure idea status is `submitted`.
- [ ] Click delete on dashboard card.
- [ ] Confirm prompt.
- [ ] Verify idea disappears from dashboard.

### 4.2 Delete from Idea Detail
- [ ] Open own idea detail with status `submitted`.
- [ ] Click delete and confirm.
- [ ] Verify redirect to `/dashboard`.
- [ ] Verify idea no longer exists.

### 4.3 Guard Conditions
- [ ] Try to delete idea not in `submitted` status.
- [ ] Verify delete action is unavailable/blocked.
- [ ] Try to access another submitter's idea URL.
- [ ] Verify access is denied/redirected.

Expected:
- Submitter can delete only own ideas and only when status is `submitted`.

## 5. Role-Based Access Checks

- [ ] Unauthenticated user opening `/dashboard` is redirected to `/login`.
- [ ] Unauthenticated user opening `/admin` is redirected to `/login`.
- [ ] Submitter opening `/admin` is redirected to submitter default route.
- [ ] Admin opening submitter-only pages follows role-safe redirect behavior.

Expected:
- Route guards and role redirects are consistently enforced.

## 6. Known Limitations (for evaluator awareness)

- [ ] Confirm understanding: localStorage-backed persistence (client-only).
- [ ] Confirm understanding: no backend/API route runtime in MVP.
- [ ] Confirm understanding: no SQLite/database migration in MVP.
- [ ] Confirm understanding: no fully automated test suite yet.

## 7. Future Improvements

- [ ] Add `app/api/*` route handlers.
- [ ] Add SQLite/Postgres persistence and migrations.
- [ ] Add automated unit/component/integration/e2e tests.
- [ ] Add CI validation pipeline.
