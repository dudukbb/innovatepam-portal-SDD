# AI Workflow - GitHub Copilot + SpecKit

## 1. AI Usage Model
This project used GitHub Copilot as an implementation copilot across all MVP phases, with strict phase-scoped prompts and continuous validation loops.

Working mode:
- define target phase outcomes from SpecKit artifacts
- generate/modify code in small vertical slices
- run validation commands after each slice
- iterate on failures immediately

## 2. Prompt Evolution Across Phases
## Phase 1 prompts (foundation)
Prompt style:
- explicit entity/schema checklists
- strict request for simple, stable, TypeScript-safe outputs

Example:
- "Implement the data model and local persistence layer for the InnovatEPAM Portal MVP."

Result:
- domain types, form schemas, storage utilities, seed data.

## Phase 2 prompts (auth)
Prompt style:
- architecture correction prompt to remove ambiguity
- route migration directives with file-level actions

Example:
- "Important correction: this project is using Next.js App Router with the root app/ directory, not Pages Router."

Result:
- App Router auth routes, shell/navbar session behavior, Pages Router removal.

## Phase 3 prompts (idea workflow)
Prompt style:
- user story oriented feature requests
- explicit field and validation constraints

Example:
- "Create /submit with title, description, category, single file attachment; use React Hook Form + Zod."

Result:
- submit flow, dashboard listing, detail route, status badges, idea persistence.

## Phase 4 prompts (admin review)
Prompt style:
- operational workflow prompts (admin queue -> review -> submitter visibility)
- permission and transition guard constraints

Example:
- "Add filtering by status, admin review actions, feedback persistence, and prevent invalid status transitions if practical."

Result:
- admin dashboard filter/list, status update actions, comment metadata, timeline visibility.

## 3. SpecKit Guidance in AI Delivery
SpecKit artifacts were treated as source-of-truth constraints:
- `specs/spec.md` for feature scope and route behavior
- `specs/tasks.md` for phase decomposition and expected outputs
- `specs/data-model.md` for persistence contract and status semantics
- `.specify/memory/constitution.md` for quality constraints

Effect on prompt engineering:
- prompts referenced exact artifacts
- acceptance criteria were embedded directly in requests
- reduced drift between planned and implemented scope

## 4. Prompt Engineering Strategy
Patterns that worked:
- checklist prompts with explicit file targets
- one-phase-at-a-time prompts to reduce context bleed
- requirement-first prompts (validation + access control + UI quality)
- "do not implement unrequested features" framing for MVP control

Patterns avoided:
- broad "build full system" prompts
- mixed architectural instructions (Pages + App Router)
- non-verifiable claims without command outputs

## 5. Debugging Workflow with AI
Standard loop used:
1. implement focused change
2. run `npm run type-check`
3. run `npm run lint`
4. run `npm run dev`
5. inspect errors and patch immediately

Representative issues resolved:
- App Router vs Pages Router conflict
- client/server boundary mismatch for local persistence utilities
- type nullability issues in dynamic route params
- status transition rule enforcement for admin actions

## 6. Iterative Validation Process
Validation was performed at the end of each phase and after major refactors.

Core commands:
- `npm run type-check`
- `npm run lint`
- `npm run dev`

Success criteria:
- compile clean under TypeScript strict mode
- lint clean under Next.js ESLint rules
- app boots and key routes compile in dev mode

## 7. AI-Native Engineering Outcomes
Benefits observed:
- faster phase execution through targeted prompt iteration
- strong traceability from phase goals to implemented code
- rapid refactor support when architecture corrections were needed
- consistent evaluator-ready outputs (code + validation + documentation)

## 8. Portfolio/Evaluator Readiness
Documentation and implementation were aligned for portfolio review:
- real commit references for completed phases
- explicit acknowledgement of uncommitted but validated work when applicable
- phase-based engineering artifacts suitable for Module 08 sprint evaluation
