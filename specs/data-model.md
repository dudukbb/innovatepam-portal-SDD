# Data Model Specification

## TypeScript Interfaces

### User
```typescript
interface User {
  id: string;              // UUID or incrementing number
  email: string;           // unique, lowercase
  password: string;        // bcrypt hashed (or plain for MVP)
  name: string;
  role: "submitter" | "admin";
  createdAt: Date;
  updatedAt?: Date;
}
```

**Persistence:** `data/users.json`

```json
[
  {
    "id": "user_1",
    "email": "john@example.com",
    "password": "$hashed...",
    "name": "John Doe",
    "role": "submitter",
    "createdAt": "2026-05-14T10:00:00Z"
  }
]
```

---

### Idea
```typescript
type IdeaStatus = "submitted" | "under_review" | "accepted" | "rejected";

interface Idea {
  id: string;              // UUID or incremental
  title: string;
  description: string;
  category?: string;
  status: IdeaStatus;      // default: "submitted"
  fileUrl?: string;        // filename or base64 reference
  createdById: string;     // reference to User.id
  createdAt: Date;
  updatedAt: Date;
}
```

**Persistence:** `data/ideas.json`

```json
[
  {
    "id": "idea_1",
    "title": "Automated Testing Framework",
    "description": "Implement automated testing to improve code quality and reduce manual QA effort.",
    "category": "Process Improvement",
    "status": "submitted",
    "fileUrl": "proposal.pdf",
    "createdById": "user_1",
    "createdAt": "2026-05-14T11:00:00Z",
    "updatedAt": "2026-05-14T11:00:00Z"
  }
]
```

---

### Comment
```typescript
interface Comment {
  id: string;              // UUID or incremental
  content: string;
  ideaId: string;          // reference to Idea.id
  createdById: string;     // reference to User.id (should be admin)
  createdAt: Date;
  updatedAt?: Date;
}
```

**Persistence:** `data/comments.json`

```json
[
  {
    "id": "comment_1",
    "content": "Great idea! We need to investigate the ROI and feasibility. Please provide timeline and resource estimates.",
    "ideaId": "idea_1",
    "createdById": "admin_1",
    "createdAt": "2026-05-14T12:00:00Z"
  }
]
```

---

### Session
```typescript
interface Session {
  userId: string;
  email: string;
  name: string;
  role: "submitter" | "admin";
  createdAt: Date;
}
```

**Storage:** `localStorage` (client-side) or `lib/session.ts` (in-memory)

---

## Validation Schemas (Zod)

### RegisterInput
```typescript
const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
  name: z.string().min(2, "Min 2 characters"),
  role: z.enum(["submitter", "admin"]),
});

type RegisterInput = z.infer<typeof registerSchema>;
```

### LoginInput
```typescript
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

type LoginInput = z.infer<typeof loginSchema>;
```

### CreateIdeaInput
```typescript
const createIdeaSchema = z.object({
  title: z.string().min(5, "Min 5 characters"),
  description: z.string().min(20, "Min 20 characters"),
  category: z.string().optional(),
  file: z.instanceof(File).optional(),
});

type CreateIdeaInput = z.infer<typeof createIdeaSchema>;
```

### UpdateIdeaStatusInput
```typescript
const updateIdeaStatusSchema = z.object({
  status: z.enum(["submitted", "under_review", "accepted", "rejected"]),
});

type UpdateIdeaStatusInput = z.infer<typeof updateIdeaStatusSchema>;
```

### CreateCommentInput
```typescript
const createCommentSchema = z.object({
  content: z.string().min(5, "Min 5 characters"),
});

type CreateCommentInput = z.infer<typeof createCommentSchema>;
```

---

## API Response Types

### Success Response
```typescript
interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}
```

### Error Response
```typescript
interface ApiErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}
```

---

## File Structure for Data

```
public/
  data/
    users.json        # All users
    ideas.json        # All ideas
    comments.json     # All comments

lib/
  storage.ts         # Functions to read/write JSON files
  session.ts         # Session management
  auth.ts            # Auth helpers
  validation.ts      # Zod schemas
```

---

## Status Transitions

Valid state transitions for idea status:

```
submitted
  ├─→ under_review (admin action)
      ├─→ accepted (admin action) [FINAL]
      └─→ rejected (admin action) [FINAL]
```

**Invalid transitions:** rejected → accepted, etc.

---

## Relationships

```
User (1) ──┬─→ (N) Idea [createdById]
           └─→ (N) Comment [createdById]

Idea (1) ──→ (N) Comment [ideaId]
```

---

**Version:** 1.0  
**Last Updated:** May 14, 2026
