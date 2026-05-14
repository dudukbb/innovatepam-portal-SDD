# InnovatEPAM Portal MVP

Module 08 final course project MVP for the EPAM AI Tech Bootcamp. InnovatEPAM Portal is a local-first employee innovation management application where submitters can register, submit ideas, and track review outcomes while admins evaluate submissions and provide feedback.

## MVP Overview
This repository delivers the core MVP workflow defined through SpecKit-driven, AI-assisted implementation:
- submitter authentication
- idea submission with attachment filename capture
- personal dashboard with idea tracking
- admin review dashboard with status filtering
- admin evaluation actions with feedback timeline

The project is intentionally local-demo oriented. It does not claim deployment, backend services, or production-grade persistence.

## Future Improvement / Production Roadmap
These items are intentionally not implemented in the current MVP and are tracked as production-oriented follow-up work:
- Database persistence migration from browser localStorage to SQLite or Postgres (with migrations/ORM).
- Next.js Route Handlers under `app/api/*` for auth, ideas, and comments.
- Full automated test suite (unit, component, integration, end-to-end) plus CI execution.

## Key Features Completed
### Authentication and Roles
- Submitter registration and login
- Admin login
- Session persistence using localStorage
- Role-aware redirects and guarded admin access
- Shared navbar with logout flow

### Idea Workflow
- Submit idea at `/submit`
- Validation with React Hook Form + Zod
- Optional category and single attachment filename storage
- Submitter dashboard at `/dashboard`
- Idea detail route at `/ideas/[id]`

### Admin Review Workflow
- Admin dashboard at `/admin`
- View all submitted ideas
- Filter ideas by status
- Update idea status
- Leave evaluation feedback comments
- Submitter visibility of latest feedback and review timeline

## Demo Credentials
These accounts are intended for local presentation and evaluator testing.

- Submitter
  - Email: `submitter@test.com`
  - Password: `Password123!`
- Admin
  - Email: `admin@test.com`
  - Password: `Password123!`

If your browser still contains older local demo data from previous runs, clear site localStorage once and reload the app.

## Tech Stack
- Next.js 14 App Router
- React 18
- TypeScript (strict mode)
- Tailwind CSS
- React Hook Form
- Zod
- Browser localStorage with JSON seed files in `public/data`

## SpecKit / Spec-Driven Development Workflow
This MVP was built using a specification-driven workflow aligned with the course sprint model:

1. Define scope in SpecKit artifacts
2. Break work into phased tasks
3. Implement one MVP slice at a time
4. Validate after each phase with type-check, lint, and local runtime checks
5. Document technical decisions and lessons learned

Key artifacts:
- `.specify/memory/constitution.md`
- `specs/spec.md`
- `specs/tasks.md`
- `specs/data-model.md`
- `specs/plan.md`

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
1. Login as submitter or register a new submitter account.
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
