# Research & Design Decisions

**Purpose:** Document investigation, analysis, and decisions made during MVP planning  

---

## 1. Tech Stack Decisions

### Next.js 14 (Framework)
**Why Next.js?**
- Full-stack framework (frontend + API routes)
- TypeScript support out of the box
- Built-in file routing (no config needed)
- Development speed
- Course requirement

**Alternative Considered:** Plain React + Express
- **Rejected:** More setup, separate codebases

---

### TypeScript (Language)
**Why TypeScript?**
- Type safety reduces bugs
- Better IDE support
- Course requirement (strict mode)
- Enforces interfaces at compile time

**Alternative Considered:** JavaScript
- **Rejected:** No type safety

---

### Tailwind CSS (Styling)
**Why Tailwind?**
- Utility-first = faster styling
- No CSS file management
- Responsive design helpers
- Professional appearance
- Course standard

**Alternative Considered:** CSS Modules, styled-components
- **Rejected:** More overhead for MVP

---

### JSON File Storage (Persistence)
**Why JSON files instead of database?**
- MVP speed requirement (no DB setup)
- LocalStorage not persistent across restarts
- Files are version-controllable
- No external dependencies
- Good enough for demo

**Alternatives Considered:**
1. SQLite - Too much setup for MVP
2. MongoDB - External service needed
3. localStorage only - Doesn't persist sessions
4. In-memory - Lost on restart

**Decision:** JSON files in `public/data/` with functions in `lib/storage.ts`

---

### React Hook Form + Zod (Forms)
**Why this combination?**
- React Hook Form: minimal re-renders, lightweight
- Zod: runtime validation, type inference
- Together: type-safe forms with good UX

**Alternative Considered:** Formik
- **Rejected:** Heavier, more boilerplate

---

## 2. Architectural Decisions

### Client-Side Sessions (No Backend DB)
**Decision:** Session in localStorage + in-memory
- Set session on login
- Check session before rendering protected pages
- Session lost on browser close (acceptable for MVP)

**Alternative:** Server-side sessions with cookies
- **Rejected:** Would need backend session store

---

### Feature Scope (MVP Definition)
**Included:**
- User registration/login
- Submitter view (own ideas)
- Admin dashboard (all ideas)
- Status workflow
- Comments

**Excluded (Intentional):**
- Email notifications
- Blind review
- Scoring system
- File upload to storage (filename only)
- User profiles
- Advanced search
- Analytics

**Rationale:** Complete core workflow in 10 hours

---

### Role-Based Access Control
**Approach:** Check `session.role` in components/pages

```typescript
if (session.role !== 'admin') {
  redirect('/dashboard');
}
```

**Alternative:** Middleware
- **Rejected:** Adds complexity, not needed for MVP

---

## 3. Data Model Decisions

### Idea Status Enum
```typescript
type IdeaStatus = "submitted" | "under_review" | "accepted" | "rejected";
```

**Why?** 
- Prevents invalid states
- Type-safe in code
- Clear workflow

---

### Comment Relationship
Comments belong to Ideas, not stored separately

**Why?**
- Simpler model
- No orphaned comments
- Load with idea easily

---

### File Attachment Strategy
Store filename only (not actual file)

**Why?**
- MVP simplification
- Next.js can't save to filesystem easily
- For real app: use cloud storage (S3, etc.)

---

## 4. UI/UX Decisions

### Single Dashboard Per Role
- **Submitter Dashboard:** Shows own ideas
- **Admin Dashboard:** Shows all ideas

**Alternative:** Single unified dashboard
- **Rejected:** Confusing for users

---

### Status Workflow Visualization
- Color-coded badges (submitted=blue, accepted=green, rejected=red)
- Text labels + colors

**Why?** 
- Quick visual recognition
- Accessible with text fallback

---

### Comments as Feedback Channel
- Only admins can write comments
- Submitters can read comments
- Replying not supported (MVP)

**Why?**
- Simpler implementation
- One-way feedback matches workflow
- Comment threading can be future feature

---

## 5. Performance Considerations

### No Optimization (MVP Phase)
- No caching
- No pagination
- Load all ideas at once

**Rationale:** 
- MVP dataset small
- Optimization premature
- Can add later if needed

---

## 6. Security Considerations

### Password Hashing
**Plan:** Use bcryptjs for production
**MVP:** Can use plain passwords for demo (not recommended)

```typescript
// MVP (for demo):
password: input

// Production:
password: bcrypt.hash(input, 10)
```

---

### Authorization
Check user ownership/role before operations

```typescript
// Delete idea - only owner can delete
if (idea.createdById !== session.userId) {
  throw new Error('Not authorized');
}
```

---

### Input Validation
All inputs validated with Zod schemas

```typescript
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});
```

---

## 7. Testing Strategy (MVP)

### No Automated Tests (Time Constraint)
**Instead:** Manual testing workflow

**Test Scenarios:**
1. Register new submitter account
2. Login as submitter
3. Submit idea with all fields
4. View submitted idea
5. Logout
6. Register new admin account
7. Login as admin
8. View all ideas on dashboard
9. Open idea for review
10. Update status
11. Add comment
12. Logout, login as submitter
13. View comment on own idea

**Tools:** Browser DevTools, manual clicking

---

## 8. Deployment Strategy (MVP)

### No Deployment (Local Demo Only)
- Project runs at localhost:3000
- Uses local JSON files
- Suitable for live demo
- Git repository for submission

**Production Ready Checklist (Future):**
- [ ] Move to real database (PostgreSQL)
- [ ] Add authentication (JWT/OAuth)
- [ ] Deploy to Vercel/Netlify
- [ ] Set up environment variables
- [ ] Add error logging (Sentry)

---

## 9. Timeline Assumptions

**10-hour sprint breakdown:**
- Phase 1 (Data/Persistence): 1 hour
- Phase 2 (Auth): 2 hours
- Phase 3 (Submission): 2.5 hours
- Phase 4 (Admin Review): 2.5 hours
- Phase 5 (Polish/Test): 1.5 hours
- Buffer: 0.5 hours

**Assumes:**
- Developer familiar with Next.js/React/TypeScript
- Pre-configured environment
- No external blockers

---

## 10. SpecKit Workflow Application

### Constitution
Defines project principles and Definition of Done

### Specification
Complete feature requirements with acceptance criteria

### Plan
Phased implementation with time estimates

### Tasks
Detailed checklist of work items with ownership

### Data Model
Types, schemas, relationships

### Research (This Document)
Decisions and alternatives

### Implementation
Incremental feature development with git commits

### Validation
Manual testing of workflows at each phase

---

## 11. Future Enhancement Ideas

**If Time Permits (Not in MVP):**
1. Idea search/filtering (advanced)
2. Category statistics dashboard
3. Export ideas to CSV
4. Email digest notifications
5. Idea commenting threads (nested replies)
6. Blind review mode (admin sees submitter ID hidden)
7. Scoring system (admin rates ideas 1-5)
8. Submitter editing before admin review
9. Idea draft/published states
10. User profile pages

**Post-MVP (Production):**
1. Real database (PostgreSQL)
2. Authentication (JWT/OAuth2)
3. File upload to S3/GCS
4. Email service (SendGrid)
5. Analytics dashboard
6. Audit logging
7. Admin user management
8. API documentation (OpenAPI)
9. Mobile app
10. Multi-language support

---

## 12. Key Learnings & Principles

### Code Organization
- Keep components small and focused
- One component per file
- Reusable components in `/components`
- Page-specific logic in `/app`
- Business logic in `/lib`

### Type Safety
- Define interfaces first
- Use Zod for runtime validation
- Catch errors at compile time

### State Management
- React hooks (useState) for local state
- No need for Redux for MVP
- Session in localStorage

### Testing Philosophy
- Test workflows manually in browser
- Focus on user scenarios
- Save unit testing for production

---

**Version:** 1.0  
**Last Updated:** May 14, 2026  
**Status:** Design Complete
