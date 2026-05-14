# Quick Start Guide

**Objective:** Get the dev environment running and start implementing  

---

## 1. Environment Setup

### Terminal 1: Start Dev Server
```bash
cd Course_Project/innovatepam-portal-sdd
npm run dev
```

**Expected Output:**
```
✓ Ready in 2.5s
- Local: http://localhost:3000
```

Keep this terminal running throughout development.

---

### Terminal 2: Development Work
Use a second terminal for git commits, running commands, etc.

```bash
cd Course_Project/innovatepam-portal-sdd
```

---

## 2. Key Files to Know

| File | Purpose |
|------|---------|
| `types/index.ts` | All TypeScript interfaces |
| `lib/schemas.ts` | Zod validation schemas |
| `lib/storage.ts` | Read/write JSON data |
| `lib/auth.ts` | Session management |
| `lib/utils.ts` | Helper functions |
| `components/*.tsx` | Reusable components |
| `app/page.tsx` | Home page |
| `app/*/page.tsx` | Feature pages |
| `app/api/*/route.ts` | API endpoints |

---

## 3. Development Workflow

### Step 1: Implement Types
Edit `types/index.ts` - define User, Idea, Comment interfaces

### Step 2: Create Schemas  
Edit `lib/schemas.ts` - add Zod validation schemas

### Step 3: Build Storage
Edit `lib/storage.ts` - implement read/write functions

### Step 4: Create Components
Create `components/MyComponent.tsx` - build reusable UI

### Step 5: Create Pages
Create `app/feature/page.tsx` - implement page logic

### Step 6: Create API Routes
Create `app/api/resource/route.ts` - implement endpoints

### Step 7: Test in Browser
Visit http://localhost:3000 and test the feature

### Step 8: Commit
```bash
git add .
git commit -m "Phase X: Feature description"
```

---

## 4. Component Template

```typescript
'use client';

import { useState } from 'react';

interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      // Do something
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <button 
        onClick={handleClick}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Click Me'}
      </button>
    </div>
  );
}
```

---

## 5. API Route Template

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const inputSchema = z.object({
  name: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = inputSchema.parse(body);
    
    // Do something with data
    
    return NextResponse.json({
      success: true,
      data: { /* response */ },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get data
    return NextResponse.json({
      success: true,
      data: { /* response */ },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 400 }
    );
  }
}
```

---

## 6. Tailwind CSS Classes Reference

### Spacing
- `p-4` = padding
- `m-4` = margin
- `gap-4` = gap

### Colors
- `text-gray-800` = text
- `bg-blue-600` = background
- `border-gray-300` = border

### Layout
- `flex` = flex display
- `grid` = grid display
- `rounded-lg` = border radius

### Responsive
- `md:text-lg` = medium screens+
- `lg:p-8` = large screens+

### State
- `hover:bg-blue-700` = on hover
- `disabled:opacity-50` = disabled state

---

## 7. Common Tasks

### Create a form
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIdeaSchema } from '@/lib/schemas';

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(createIdeaSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(async (data) => {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
    })}>
      {/* form fields */}
    </form>
  );
}
```

### Call an API
```typescript
const response = await fetch('/api/users', {
  method: 'GET',
});
const data = await response.json();
```

### Use localStorage
```typescript
// Set
localStorage.setItem('key', JSON.stringify(value));

// Get
const value = JSON.parse(localStorage.getItem('key') || '{}');

// Remove
localStorage.removeItem('key');
```

---

## 8. Running Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code quality
npm run type-check   # TypeScript validation
npm run format       # Format with Prettier
```

---

## 9. Git Commands

```bash
# Check status
git status

# Stage all changes
git add .

# Commit
git commit -m "Phase X: Description"

# Push
git push origin main

# View log
git log --oneline
```

---

## 10. Debugging Tips

### Check Console
Open browser DevTools (F12) → Console tab

### TypeScript Errors
```bash
npm run type-check
```

### ESLint Issues
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

---

## 11. Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `Cannot find module` | Check import path |
| `Property doesn't exist` | Check type definition |
| `ReferenceError: X is not defined` | Add import statement |
| `CORS error` | This is Next.js, should not happen |
| `Page 404` | Check route name matches file structure |

---

## 12. Useful VS Code Extensions

- ESLint
- Prettier - Code formatter
- TypeScript Vue Plugin
- Thunder Client (for API testing)
- TODO Highlight

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Zod Validation](https://zod.dev)
- [React Hook Form](https://react-hook-form.com)

---

**Last Updated:** May 14, 2026
