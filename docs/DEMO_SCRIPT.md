# InnovatEPAM Portal MVP - Demo Script

## Demo Duration
3 to 5 minutes

## 1. Intro
"This is InnovatEPAM Portal, my Module 08 final course project MVP. It was built with Next.js App Router, TypeScript, Tailwind CSS, React Hook Form, and Zod using a SpecKit-driven, AI-assisted engineering workflow. The MVP supports two personas: submitter and admin."

## 2. Show Login and Demo Accounts
Open the application and explain the local demo accounts:
- Submitter: `submitter@test.com` / `Password123!`
- Admin: `admin@test.com` / `Password123!`

Mention:
- all data is local-first for MVP demonstration
- no deployment or backend service is claimed

## 3. Submitter Login or Registration
Option A:
- Login as submitter using the seeded demo account.

Option B:
- Open `/register`
- create a new submitter account
- explain that registration is part of the MVP workflow

## 4. Submit Idea
Navigate to `/submit`.
Show:
- title input
- description input
- category selector
- optional file attachment field

Explain:
- validation is handled with React Hook Form + Zod
- attachment is stored as filename only for local MVP scope

Submit a new idea.

## 5. View Dashboard
Navigate to `/dashboard`.
Show:
- the newly submitted idea in the submitter dashboard
- status badge
- created date
- link to idea detail

Open the idea detail page and point out:
- full description
- attachment filename
- current status
- timeline area for future admin feedback

## 6. Admin Login
Logout.
Login using the admin demo account.
Navigate to `/admin`.

Show:
- all ideas list
- submitter name
- category
- created date
- status badge
- status filter

## 7. Review Idea
Open the submitted idea from the admin dashboard.
Show:
- idea detail context reused for review efficiency
- admin review section
- status dropdown
- feedback textarea

Update the idea:
- change status to `under_review` or `accepted`
- add a short evaluation comment
- save review

Mention:
- transition guards prevent impractical invalid state moves
- review updates are persisted locally

## 8. Submitter Verifies Result
Logout admin.
Login again as the submitter.
Open the same idea detail page.

Show:
- updated status badge
- latest admin feedback
- review timeline/comments

## 9. Key Learning
Conclude with:
"The main learning from this project was that SpecKit plus AI assistance worked best when prompts were constrained by concrete artifacts and validated continuously. That made it possible to deliver the MVP in clear phases while keeping the repository reviewer-friendly and technically consistent."
