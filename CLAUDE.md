# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Production build (includes RSS feed generation)
- `npm start` - Start production server

### Build Process
The build command runs two processes concurrently:
1. RSS feed generation (`tsx scripts/rss.ts`)
2. Vite build (`vite build`)

## TanStack
Use `@tanstack/cli` to look up TanStack documentation or develop new features using TanStack.

## Architecture

This is a TanStack Start blog using TanStack Router (file-based routing), deployed at https://darios.blog.

### Key Directories
- `src/routes/` - TanStack Router file-based routes
  - Dynamic routes: `posts/$slug.tsx` and `tags/$slug.tsx`
  - API route: `api/contact.ts` for contact form (server handlers)
  - `__root.tsx` - Root layout (HTML shell, nav, footer, analytics)
- `src/components/markdown/` - Custom markdown rendering system with syntax highlighting
- `src/lib/` - Data loading and server functions
  - `posts.ts` - Post loading from filesystem
  - `posts.api.ts` - Server functions (createServerFn) for post fetching
- `src/styles/app.css` - Tailwind CSS v4 with theme tokens and font-face declarations
- `data/posts/` - MDX blog posts (format: `YYYY-MM-DD-slug.mdx`)
- `scripts/rss.ts` - RSS feed generation script

### Content System
Blog posts are MDX files with frontmatter:
```yaml
---
title: "Post Title"
tags: ['Next.js', 'TypeScript']
summary: "Brief description"
---
```

Posts are loaded via server functions. The `src/lib/posts.ts` module reads MDX files from disk and parses frontmatter.

### Styling
- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Fonts: Space Grotesk (display) and DM Sans (body) via Google Fonts
- Dark theme with HSL color variables in `src/styles/app.css`
- When using custom sizes, use rems instead of pixels (e.g. `text-[0.9375rem]` not `text-[15px]`)

### Important Patterns
1. **Markdown Components**: Custom ReactMarkdown implementation in `src/components/markdown/` handles:
   - External links open in new tabs
   - Internal links use TanStack Router Link
   - Syntax highlighting for code blocks

2. **URL Structure**:
   - Legacy `/blog/*` paths redirect to `/posts/*` via `src/routes/blog/$.tsx`
   - Tag filtering at `/tags/$slug`

3. **Server Functions**: Data fetching uses `createServerFn` from TanStack Start for type-safe server/client RPC

4. **RSS Feed**: Automatically generated during build via `scripts/rss.ts`
