# Quick Reference - InnovatEPAM Portal

## Getting Started in 3 Steps

### 1. Install
```bash
npm install
```

### 2. Run
```bash
npm run dev
```

### 3. Open
Visit [http://localhost:3000](http://localhost:3000)

---

## Key Files & Their Purpose

| File/Folder | Purpose |
|-------------|---------|
| `app/` | Next.js pages and routes |
| `components/` | Reusable React components |
| `lib/utils.ts` | Helper functions |
| `lib/schemas.ts` | Zod validation schemas |
| `types/index.ts` | TypeScript type definitions |
| `.specify/memory/constitution.md` | Project principles |
| `specs/` | Feature specifications |
| `tailwind.config.ts` | Tailwind CSS theme |

---

## Development Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start               # Run production build
npm run lint            # Check ESLint
npm run type-check      # Check TypeScript
npm run format          # Format with Prettier
npm run format:check    # Check formatting
```

---

## Adding New Features

### 1. Create Type Definition
File: `types/index.ts`
```typescript
export interface MyNewFeature {
  id: string;
  name: string;
  // ...
}
```

### 2. Create Validation Schema
File: `lib/schemas.ts`
```typescript
export const mySchema = z.object({
  name: z.string().min(1),
  // ...
});
```

### 3. Create Component
File: `components/MyComponent.tsx`
```typescript
export function MyComponent() {
  return <div>My Component</div>;
}
```

### 4. Create Page (if route)
File: `app/my-route/page.tsx`
```typescript
import { MyComponent } from "@/components/MyComponent";

export default function MyPage() {
  return <MyComponent />;
}
```

### 5. Add to Exports
Update component index files:
```typescript
export { MyComponent } from "./MyComponent";
```

---

## Tailwind CSS Classes Reference

### Spacing
- `m-4` = margin
- `p-4` = padding
- `gap-4` = gap between flex items

### Colors
- `text-gray-800` = text color
- `bg-blue-600` = background
- `border-gray-300` = border

### Layout
- `flex` = display flex
- `grid` = display grid
- `rounded-lg` = border radius

### Responsive
- `md:text-lg` = medium screens+
- `lg:p-8` = large screens+

---

## Common Patterns

### Form with Validation
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIdeaSchema } from "@/lib/schemas";

export function IdeaForm() {
  const form = useForm({
    resolver: zodResolver(createIdeaSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  );
}
```

### API Route
```typescript
// app/api/ideas/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: [] });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  return NextResponse.json({ success: true });
}
```

### Client Component with State
```typescript
"use client";

import { useState } from "react";

export function MyComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## Debugging Tips

### Check Types
```bash
npm run type-check
```

### Check Linting
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

### Browser DevTools
- Inspect elements
- Console for errors
- Network tab for API calls

---

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Zod Validation](https://zod.dev)

---

## Status

- ✅ Project initialized
- ✅ TypeScript configured
- ✅ Tailwind CSS ready
- ⏳ Features ready for implementation

Ready to code! 🚀
