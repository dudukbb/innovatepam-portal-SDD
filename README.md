# InnovatEPAM Portal - MVP

**Final Course Project** | Employee Innovation Management Platform | SpecKit Workflow

An internal employee idea submission and evaluation portal built with Next.js, React, TypeScript, and Tailwind CSS.

## MVP Demo Features

**Local Demo Workflow:**
1. Register as **submitter** → submit an idea → view idea status
2. Login as **admin/jury** → review all ideas → accept/reject with feedback

## MVP Scope (10-hour Sprint)

### User System
- ✅ User registration (email, password, name, role selection)
- ✅ User login/logout
- ✅ Role distinction: **submitter** (normal user) vs **admin/jury**

### Idea Submission
- ✅ Submit idea with: title, description, category, single file attachment (optional)
- ✅ Submitters can view their own submitted ideas
- ✅ View idea status: submitted → under review → accepted/rejected

### Admin Review Workflow
- ✅ Admin dashboard to view all ideas
- ✅ See idea details: title, description, file, submitter
- ✅ Update idea status: submitted → under review → accepted → rejected
- ✅ Add feedback/comments to ideas

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14+ |
| **Language** | TypeScript (strict mode) |
| **UI** | React 18 + Tailwind CSS |
| **Forms** | React Hook Form + Zod validation |
| **Persistence** | JSON file storage (localStorage backup) |
| **Styling** | Tailwind CSS (professional, clean) |

## Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation & Run

```bash
cd innovatepam-portal-sdd
npm install
npm run dev
```

**Open:** http://localhost:3000

## Project Structure

```
innovatepam-portal-sdd/
├── .specify/               # SpecKit artifacts
│   └── memory/
│       └── constitution.md
├── specs/                  # Specifications
│   ├── spec.md            # Feature spec
│   ├── plan.md            # Implementation plan
│   ├── tasks.md           # Development tasks
│   ├── data-model.md      # Data structures
│   ├── quickstart.md      # Quick dev guide
│   └── research.md        # Research notes
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities & helpers
├── types/                 # TypeScript interfaces
└── public/               # Static files
```

## SpecKit Workflow

This project follows **SpecKit** specification-driven development:

```
📋 constitution → 📝 spec → 📋 plan → ✅ tasks → 💻 implement → ✔️ validate
```

**Artifacts:**
- `.specify/memory/constitution.md` - Project principles, definition of done
- `specs/spec.md` - Complete MVP specification
- `specs/plan.md` - Development plan (phased)
- `specs/tasks.md` - Task checklist with owners
- `specs/data-model.md` - Data structures and types
- `specs/research.md` - Investigation notes

## Implementation Guide

### Phase 1: Setup ✅
- [x] Next.js project scaffolding
- [x] TypeScript configuration
- [x] Tailwind CSS setup
- [x] SpecKit artifacts

### Phase 2: Authentication (TODO)
- [ ] Registration page + form
- [ ] Login page + form
- [ ] User persistence (JSON file)
- [ ] Session management
- [ ] Role selection (submitter vs admin)

### Phase 3: Idea Submission (TODO)
- [ ] Idea submission form
- [ ] File attachment handling
- [ ] Idea listing page
- [ ] Idea detail view

### Phase 4: Admin Dashboard (TODO)
- [ ] Admin review dashboard
- [ ] Status update functionality
- [ ] Comments/feedback system
- [ ] Accept/reject workflow

### Phase 5: Polish (TODO)
- [ ] Error handling
- [ ] Loading states
- [ ] Responsive UI
- [ ] Clean deployment

## Development Commands

```bash
npm run dev           # Start dev server (localhost:3000)
npm run build         # Build for production
npm run lint          # Check code quality
npm run type-check    # TypeScript validation
npm run format        # Format code with Prettier
```

## Git Workflow

After each major feature:
```bash
git add .
git commit -m "Phase X: Feature description - linked to spec"
git push origin main
```

Example commits:
- "Phase 2: User authentication system - auth pages, login/register forms"
- "Phase 3: Idea submission - submit form, file upload, idea listing"
- "Phase 4: Admin review dashboard - review interface, status updates, comments"

## Files to Review First

1. **`.specify/memory/constitution.md`** - Project principles & Definition of Done
2. **`specs/spec.md`** - Complete MVP feature specification
3. **`specs/plan.md`** - Phased implementation plan
4. **`specs/data-model.md`** - User, Idea, Comment data structures

## Important Notes

- **No Backend API required** - Use JSON file persistence for MVP
- **Focus on MVP** - Optional features: blind review, scoring, multimedia
- **Local Demo Only** - No deployment required, localhost:3000 is sufficient
- **SpecKit First** - Every implementation must reference specs
- **Clean Code** - Professional UI, no placeholder designs
- **TypeScript Strict** - Type safety mandatory

## Status

| Component | Status |
|-----------|--------|
| Setup | ✅ Complete |
| Dev Server | ✅ Running |
| SpecKit Artifacts | ✅ Defined |
| Authentication | ⏳ TODO |
| Idea Submission | ⏳ TODO |
| Admin Review | ⏳ TODO |

---

**Started:** May 14, 2026  
**Duration:** 10-hour sprint  
**Workflow:** SpecKit (Specification-Driven Development)  
**Course:** EPAM AI Tech Bootcamp - Final Project

