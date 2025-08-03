# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Production build (includes RSS feed generation)
- `npm run lint` - Run ESLint to check code quality
- `npm start` - Start production server

### Build Process
The build command runs two processes concurrently:
1. RSS feed generation (`ts-node scripts/rss`)
2. Next.js build (`next build`)

## Architecture

This is a Next.js 15 blog using App Router, deployed at https://darios.blog.

### Key Directories
- `app/` - Next.js App Router pages and API routes
  - Dynamic routes: `posts/[slug]` and `tags/[slug]`
  - API endpoint: `api/contact` for contact form
- `components/markdown/` - Custom markdown rendering system with syntax highlighting
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

Posts are statically generated at build time. The `data/posts.ts` module handles post loading and parsing.

### Styling
- Tailwind CSS with custom theme configuration
- Custom fonts: DIN 2014 and Roboto Slab (loaded from `/public/fonts/`)
- Design tokens for primary/secondary/brand colors

### Important Patterns
1. **Markdown Components**: Custom ReactMarkdown implementation in `components/markdown/` handles:
   - External links open in new tabs
   - Internal links use Next.js Link
   - Syntax highlighting for code blocks

2. **URL Structure**: 
   - Legacy `/blog/*` paths redirect to `/posts/*`
   - Tag filtering at `/tags/[slug]`

3. **Static Generation**: All pages use `generateStaticParams` for build-time generation

4. **RSS Feed**: Automatically generated during build via `scripts/rss.ts`