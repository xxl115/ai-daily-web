# AGENTS.md

This file provides guidance for AI agents working on this repository.

---

## Build Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint (Next.js built-in)
```

**Note:** No test framework configured. Add Vitest/Jest if adding tests.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **React:** 19.2.4
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4.1.18
- **State:** React Context + TanStack Query
- **Icons:** simple-icons (SVG)

---

## Code Style Guidelines

### Imports

```tsx
// Order: external deps → internal → types → utils
import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import type { Article } from '@/lib/types';
import { formatCount } from '@/lib/utils';

// Use @/* path alias for absolute imports
```

### TypeScript Rules

```tsx
// ✅ Use interface for object shapes
interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
}

// ✅ Use type for unions/utils
type ArticleCategory = 'hot' | 'deep' | 'new' | 'breaking';

// ✅ Export types separately
export type { Article, ArticleCategory };

// ❌ NEVER use any
const Bad = (data: any) => {};

// ✅ Use unknown or precise types
const Good = (data: { id: string; value: number }) => {};
```

### Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| Components | PascalCase | `ArticleCard.tsx`, `FilterPanel` |
| Hooks | camelCase + `use` prefix | `useFilters.ts`, `useArticles()` |
| Functions | camelCase | `formatCount()`, `getGradientBg()` |
| Constants | UPPER_SNAKE_CASE | `POPULAR_TAGS`, `CATEGORY_BADGES` |
| Types/Interfaces | PascalCase | `Article`, `FilterState` |

### Component Structure

```tsx
// 1. Imports
import { useState, useMemo } from 'react';

// 2. Types
interface Props { ... }

// 3. Component
const Component = ({ ... }: Props) => {
  // Hooks
  const [state, setState] = useState();
  const memoized = useMemo(() => ...);

  // Handlers (useCallback for props)
  const handleClick = useCallback(() => {}, []);

  // Render
  return <div>...</div>;
};

// 4. Exports
export default Component;
```

### Styling

```tsx
import { cn } from '@/lib/utils/cn';

// ✅ Use Tailwind classes
<div className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow" />

// ✅ Merge classes with cn utility
<div className={cn('base-class', isActive && 'active-class')} />

// ❌ Avoid inline styles (except dynamic values)
<div style={{ color: dynamicColor }} />
```

---

## Error Handling

```tsx
// API errors
class ApiError extends Error {
  constructor(public status: number, public statusText: string) {
    super(`API Error: ${status} ${statusText}`);
  }
}

// Component error boundaries
'use client';
export class ErrorBoundary extends React.Component<Props, State> {
  // Implement getDerivedStateFromError, componentDidCatch
}
```

---

## Git Workflow

### Branch Naming

```
feature/功能名     # New features
fix/问题名         # Bug fixes
refactor/模块名    # Refactoring
docs/文档名        # Documentation
```

### Commit Messages

```
<type>(<scope>): <subject>

<body>
```

**Types:** feat, fix, docs, style, refactor, perf, test, chore

**Example:**
```
feat(filter): add time range filtering

- Add today/yesterday/week/month options
- Update filter panel UI
- Integrate with useFilters hook

Closes #123
```

---

## Key Patterns

### Performance

```tsx
// Memoize expensive computations
const filtered = useMemo(() => articles.filter(fn), [articles, fn]);

// Memoize callbacks passed to children
const handleClick = useCallback(() => {}, []);

// Lazy load heavy components
const FilterPanel = dynamic(() => import('@/components/filters/FilterPanel'));
```

### Accessibility

```tsx
// Use semantic HTML
<header>, <main>, <article>, <section>

// ARIA attributes
<button aria-pressed={isActive} aria-label="Toggle filter" />

// Focus management
<input aria-describedby="hint" />
<span id="hint" className="sr-only">Search hint</span>
```

---

## Project Structure

```
app/                  # Next.js App Router
components/
  ui/                 # Reusable base components
  layout/             # Layout components (Header, SearchBar)
  filters/            # Filter components
  article/            # Article components
hooks/                # Custom React hooks
lib/
  types/              # TypeScript definitions
  constants/          # Constants (SOURCES, TAGS, etc.)
  utils/              # Utility functions
prototypes/           # HTML prototypes for reference
```

---

## Design System (from tailwind.config.ts)

```tsx
colors: {
  primary: '#FF6154',    // Product Hunt red - CTA, highlights
  secondary: '#42A5F5',  // Deep content markers
  dark: '#1A1A1A',       // Primary text, titles
  gray: '#6B6B6B',       // Secondary text, icons
  light: '#F5F5F5',      // Page background
}

fontFamily: {
  sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', ...]
}
```

---

## Reference Documentation

- **Development Guide:** `docs/DEVELOPMENT_GUIDE.md`
- **Design Spec:** `docs/DESIGN_SPEC.md`
- **Component Checklist:** `docs/COMPONENT_CHECKLIST.md`
- **Prototype:** `prototypes/search-filter/index.html`

**Always reference the prototype for exact UI/UX implementation.**
