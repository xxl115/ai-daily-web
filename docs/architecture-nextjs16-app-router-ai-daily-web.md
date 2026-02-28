# Architecture Review: Next.js 16 App Router in ai-daily-web (Feb 2026)

Purpose
- Provide a concise reference of observed patterns, file structure, and recommended practices for the Next.js 16 App Router in this project.

Scope
- Patterns observed in ai-daily-web: server components by default, client components for interactivity, Tailwind integration, TanStack/React Query usage, simple state management, and server actions for forms/auth.

Key patterns
- Server vs Client components
  - Default: Server Components
  - Client Components: use 'use client' only where interactivity is required
  - Routing/layout in app directory; components can be server-rendered and client-interactive zones

- Data fetching and caching
  - Server-side: fetch data in server components for SEO and initial render
  - Client-side: optional data fetching with TanStack Query; caching and background updates
  - Suspense boundaries for streaming UI

- Tailwind CSS
  - Tailwind 4.x, approach includes CSS variables/theme extension and utility classes
  - cn for conditional classes

- State management
  - Context-based provider pattern
  - Minimal global state to avoid prop-drilling

- Authentication and security
  - Server actions for mutation/registration processes
  - Stateless JWT vs server-side DB sessions discussion; recommended initial approach: server-side checks with cookies

- Performance considerations
  - Streaming with Suspense
  - Server Components where possible
  - Optimize images with next/image

File structure references (illustrative)
- app/layout.tsx, app/page.tsx, app/(api)/route.ts
- components/ (UI primitives)
- hooks/ (custom hooks)
- contexts/ (providers)
- lib/ (types/utilities)
- app/api/... (server routes)

- Migration guidance
 - Start with documenting architecture in docs, then pick 2-3 critical pages to implement server/client separation
 - Incrementally integrate TanStack Query and authentication

Next steps
- Create a minimal 1-2 page migration/implementation plan
- Align with existing TODOS:
 - todo_arch_summary
 - todo_pattern_audit

Notes
- This document consolidates findings from background exploration bg_e737b5c1 and related tasks.
