
# InnovatEPAM Portal MVP

[![TypeScript Strict](https://img.shields.io/badge/typescript-strict-blue)](https://www.typescriptlang.org/) [![Lint Passed](https://img.shields.io/badge/lint-passed-brightgreen)](https://eslint.org/) [![Spec-It Compliant](https://img.shields.io/badge/spec--it-compliant-success)](specs/plan.md)

---

## 🚀 Project Overview
**InnovatEPAM Portal** is a local-first employee innovation management MVP built for the EPAM AI Tech Bootcamp. It enables employees to submit ideas and track review outcomes, while admins (jury) evaluate submissions and provide feedback—all in a simple, demo-friendly web app.

- **MVP Purpose:** Showcase a complete, Spec-It-driven workflow for innovation management, with clear separation of employee (submitter) and admin (jury) roles.
- **Submitter:** Register, log in, submit ideas, track status, view feedback.
- **Admin/Jury:** Log in, review all ideas, update status, leave feedback.

---

## ✨ Core Features
| Feature                | Description                                                      |
|------------------------|------------------------------------------------------------------|
| Registration/Login     | Register as submitter or admin; secure login/logout               |
| Role-based Access      | Employee/admin flows, protected routes, role-aware navigation      |
| Idea Submission        | Submit ideas with validation, optional category & attachment name  |
| Dashboard              | Submitter dashboard for tracking own ideas                        |
| Admin Review Workflow  | Admin dashboard, status filtering, review & feedback              |
| Status Tracking        | Idea status: submitted, under review, accepted, rejected          |
| Feedback/Comments      | Admin can leave feedback; submitter sees review timeline           |
| Protected Routing      | All sensitive routes are access-controlled                         |
| Demo Accounts          | Pre-seeded demo users for quick evaluation                        |

---

## 🛠️ Spec-It Workflow
- **Constitution:** `.specify/memory/constitution.md`
- **Specification:** `specs/spec.md`, `specs/tasks.md`, `specs/plan.md`
- **Phased Plan:** Implementation tracked by phase (foundation, auth, idea, admin, polish)
- **Tasks:** All MVP tasks checked off; roadmap items clearly marked
- **Validation:** Manual test checklist, validation report, and phase docs in `docs/`

---

## ⚙️ Tech Stack
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript** (strict mode)
- **Tailwind CSS**
- **React Hook Form**
- **Zod** (validation)
- **localStorage** (demo persistence)

---

## 📁 Project Structure
```
innovatepam-portal-sdd/
├── .specify/
├── app/
│   ├── admin/
│   ├── dashboard/
│   ├── ideas/
│   ├── login/
│   ├── register/
│   ├── submit/
│   └── ...
├── docs/
├── public/
│   └── data/
├── specs/
├── src/
│   ├── components/
│   ├── lib/
│   └── types/
└── README.md
```

---

## 🖥️ Local Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the dev server:**
   ```bash
   npm run dev
   ```
3. **Open:** [http://localhost:3000](http://localhost:3000)

---

## 👤 Demo Credentials
| Role      | Email                | Password      |
|-----------|----------------------|---------------|
| Submitter | submitter@test.com   | Password123!  |
| Admin     | admin@test.com       | Password123!  |

---

## ✅ Validation
- `npm run type-check` — **Passed**
- `npm run lint` — **Passed**
- Manual validation — **Completed** (see `docs/VALIDATION_REPORT.md`)

---

## 🛣️ Roadmap / Future Improvements
- Backend API routes (`app/api/*`)
- SQLite/PostgreSQL persistence
- Automated test suite (unit, component, E2E)
- Deployment & CI/CD
- Multi-user, multi-session support
- Advanced admin analytics

---

## 📚 Documentation & References
- [Spec-It Constitution](.specify/memory/constitution.md)
- [MVP Plan & Tasks](specs/plan.md), [specs/tasks.md](specs/tasks.md)
- [Validation Report](docs/VALIDATION_REPORT.md)
- [Manual Test Checklist](docs/MANUAL_TEST_CHECKLIST.md)
- [Demo Script](docs/DEMO_SCRIPT.md)

---

**This repository is a model of Spec-It-driven MVP delivery for the EPAM AI Tech Bootcamp. All MVP features are implemented, validated, and documented.**

## AI-Assisted Development Workflow
GitHub Copilot was used as an implementation copilot throughout the sprint.

AI was used to:
- translate SpecKit requirements into phase-scoped code changes
- refactor from Pages Router assumptions to App Router reality
- accelerate form, validation, and persistence scaffolding
- support iterative debugging through validation-command feedback
- generate engineering documentation from real repository history

See [docs/AI_WORKFLOW.md](docs/AI_WORKFLOW.md) for the full AI-native engineering process.

## Project Phases Summary
- Phase 1: Foundation
  - data models, schemas, local storage utilities, seed users
- Phase 2: Authentication
  - App Router auth flow, session persistence, role-aware navigation
- Phase 3: Idea Workflow
  - submit page, submitter dashboard, idea detail route, idea persistence
- Phase 4: Admin Review
  - admin dashboard, status filtering, evaluation actions, feedback timeline

Detailed sprint records:
- [docs/phases/PHASE_1_FOUNDATION.md](docs/phases/PHASE_1_FOUNDATION.md)
- [docs/phases/PHASE_2_AUTHENTICATION.md](docs/phases/PHASE_2_AUTHENTICATION.md)
- [docs/phases/PHASE_3_IDEA_WORKFLOW.md](docs/phases/PHASE_3_IDEA_WORKFLOW.md)
- [docs/phases/PHASE_4_ADMIN_REVIEW.md](docs/phases/PHASE_4_ADMIN_REVIEW.md)

## Architecture Overview
The application follows a local-first App Router architecture:
- `app/*` for route entry points and page orchestration
- `src/components/*` for reusable UI pieces
- `src/lib/*` for auth and persistence logic
- `src/types/*` for domain contracts and validation schemas
- `public/data/*` for seed data used on first local run

See [docs/ARCHITECTURE_OVERVIEW.md](docs/ARCHITECTURE_OVERVIEW.md) for the full architecture summary.

## Local Setup Instructions
### Prerequisites
- Node.js 18+
- npm

### Install and Run
```bash
npm install
npm run dev
```

Open the local URL printed by Next.js. On many machines this is `http://localhost:3000`, but it may fall back to another available port such as `3001` or `3002`.

## Demo Flow
Suggested evaluator flow:
1. Login as submitter or register a new account (select submitter/admin role), then continue from `/login`.
2. Submit a new innovation idea.
3. Review the idea on the submitter dashboard.
4. Open the idea detail page.
5. Login as admin.
6. Open the admin dashboard and filter ideas.
7. Review the idea, update status, and add feedback.
8. Return to the submitter account and verify the updated status and timeline.

A scripted presentation version is available in [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md).

## Folder Structure
```text
innovatepam-portal-sdd/
├── .specify/
├── app/
│   ├── admin/
│   ├── dashboard/
│   ├── ideas/
│   ├── login/
│   ├── register/
│   ├── submit/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── docs/
│   ├── phases/
│   ├── AI_WORKFLOW.md
│   └── ARCHITECTURE_OVERVIEW.md
├── public/
│   └── data/
├── specs/
├── src/
│   ├── components/
│   ├── lib/
│   └── types/
├── package.json
└── README.md
```

## Validation Commands
```bash
npm run type-check
npm run lint
npm run dev
```

Most recent validation outcome for this repository state:
- `npm run type-check` passed
- `npm run lint` passed
- `npm run dev` started successfully during phase validation

## Documentation References
- Architecture: [docs/ARCHITECTURE_OVERVIEW.md](docs/ARCHITECTURE_OVERVIEW.md)
- AI workflow: [docs/AI_WORKFLOW.md](docs/AI_WORKFLOW.md)
- Phase reports: [docs/phases](docs/phases)
- Demo script: [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md)

## Project Positioning
This repository is a Module 08 final course project MVP. The implementation emphasizes iterative delivery, evaluator clarity, and demonstrable alignment between SpecKit artifacts, AI-assisted development, and working application behavior.
