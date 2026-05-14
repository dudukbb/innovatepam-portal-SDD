# InnovatEPAM Portal - Engineering Constitution

## Project Principles

### Vision
Build a reliable, user-friendly employee innovation management platform that encourages participation and facilitates idea review.

### Core Values
- **Clarity**: Clear user flows and explicit error handling
- **Reliability**: Type-safe code and comprehensive testing
- **Maintainability**: Clean architecture and well-documented components
- **Inclusivity**: Accessible design following WCAG guidelines

---

## Technology Standards

### Code Quality
- **TypeScript**: Strict mode enforced (`strict: true`)
- **Linting**: ESLint with Next.js rules
- **Formatting**: Prettier for consistent code style
- **No**: Any-typed values in components

### Frontend Architecture
- **Component Design**: Functional components with hooks
- **State Management**: React hooks (useState, useContext)
- **Styling**: Tailwind CSS utility-first approach
- **UI Components**: shadcn/ui for consistency

### Database & Persistence
- **MVP Persistence**: Browser localStorage with seed JSON files
- **Production Roadmap**: SQLite/Postgres with ORM and migrations

---

## Feature Development Workflow

### Phase 1: Specification
1. Define user stories and acceptance criteria
2. Create wireframes/mockups
3. Plan API contracts for production roadmap

### Phase 2: Implementation
1. Create TypeScript types and interfaces
2. Build components with Tailwind CSS
3. Implement forms with React Hook Form + Zod validation
4. For MVP, implement client-side services and local persistence
5. Backend/database integration is production roadmap work

### Phase 3: Testing
1. MVP manual validation with type-check/lint/runtime checks
2. Unit/component/E2E automation tracked as production roadmap work

### Phase 4: Documentation
1. Update README with new features
2. Document API endpoints
3. Add usage examples

---

## Feature Categories

### Authentication & Authorization
- User registration (employee, admin)
- Login/logout functionality
- Role-based access control
- Session management

### Idea Management
- Submit innovation ideas
- Attach files (single file per idea)
- View submitted ideas
- Edit own ideas (before review)
- Delete own ideas (before review)

### Admin Functions
- Review submitted ideas
- Add comments and feedback
- Accept/reject ideas
- Track idea status
- Generate reports

### Data Models
- **User**: email, password, name, role, createdAt
- **Idea**: title, description, category, status, fileAttachment, createdBy, createdAt, updatedAt
- **Comment**: content, ideaId, userId, createdAt

---

## UI/UX Guidelines

### Components
- Use shadcn/ui for consistency
- Follow accessibility best practices
- Responsive design (mobile-first)
- Dark mode support (future)

### Forms
- Client-side validation with Zod
- Error messages are helpful and specific
- Loading states for async operations
- Success feedback after submission

### Navigation
- Clear, predictable routes
- Breadcrumbs for deep pages
- Mobile-friendly navigation

---

## Security & Privacy

### Authentication
- Passwords hashed (bcrypt or similar)
- Secure session tokens
- CSRF protection for forms

### Data Protection
- Validate all user inputs
- Sanitize file uploads
- Enforce access controls

---

## Performance

### Optimization
- Code splitting at route level
- Image optimization with Next.js Image
- Lazy loading for components
- Efficient database queries

### Monitoring
- Error logging and tracking
- Performance metrics collection
- User analytics (privacy-respecting)

---

## Documentation Standards

### Code Comments
- Explain "why", not "what"
- Include JSDoc for functions
- Type interfaces are self-documenting

### README
- Setup instructions
- Feature overview
- Contributing guidelines

### Specification Files
- One feature per spec file
- Clear acceptance criteria
- Examples and edge cases

---

## Definition of Done (Feature)

- [x] Feature specification complete
- [x] TypeScript types defined
- [x] Components implemented
- [x] Forms validated with Zod
- [x] Tests written (unit/component)
- [x] Accessibility checked
- [x] Documentation updated
- [x] Code review passed
- [x] Merged to main branch

---

## Project Success Metrics

1. **Code Quality**: TypeScript strict mode, ESLint pass, >80% test coverage
2. **User Experience**: Responsive design, <3s page load, accessible
3. **Maintainability**: Clear naming, documented architecture, easy onboarding
4. **Functionality**: All acceptance criteria met, no critical bugs

---

## Anti-Patterns to Avoid

- [ ] Mixing presentational and container logic
- [ ] Over-nesting components (prop drilling)
- [ ] Unvalidated user inputs
- [ ] Hardcoded values in components
- [ ] Missing error boundaries
- [ ] Untested edge cases
- [ ] Inconsistent error handling

---

## Tools & Frameworks

| Tool | Purpose |
|------|---------|
| Next.js | Frontend framework |
| TypeScript | Type safety |
| React | UI library |
| Tailwind CSS | Styling |
| shadcn/ui | Component library |
| React Hook Form | Form management |
| Zod | Schema validation |
| SQLite | Local database |
| ESLint | Code linting |
| Prettier | Code formatting |

---

**Last Updated**: May 14, 2026
**Maintainer**: Project Team
