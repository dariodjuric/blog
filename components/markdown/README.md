# Markdown Components

This directory contains reusable components for rendering Markdown content with enhanced syntax highlighting using `react-markdown` and `react-syntax-highlighter`.

## Components

### MarkdownRenderer

The main component for rendering Markdown content with custom styling and syntax highlighting.

```tsx
import { MarkdownRenderer } from '@/components/markdown';

export function BlogPost({ content }: { content: string }) {
  return (
    <article>
      <MarkdownRenderer content={content} className="my-8" />
    </article>
  );
}
```

**Props:**
- `content: string` - The Markdown content to render
- `className?: string` - Additional CSS classes to apply to the wrapper

**Features:**
- GitHub Flavored Markdown support
- Custom link handling (internal vs external links)
- Optimized Next.js Image components for images
- Syntax highlighting for code blocks
- Styled tables, lists, headings, and blockquotes

### CodeBlock

A standalone component for rendering code blocks with syntax highlighting.

```tsx
import { CodeBlock } from '@/components/markdown';

export function Example() {
  return (
    <CodeBlock
      className="language-typescript"
      theme="oneDark"
    >
      {`const greeting = "Hello, world!";`}
    </CodeBlock>
  );
}
```

**Props:**
- `children: string` - The code content to highlight
- `className?: string` - Language class (e.g., "language-typescript")
- `inline?: boolean` - Whether to render as inline code
- `theme?: SyntaxTheme` - The syntax highlighting theme to use

## Themes

The package includes multiple syntax highlighting themes:

### Available Themes

- `oneDark` - One Dark theme (default dark)
- `oneLight` - One Light theme (default light)
- `vscDarkPlus` - VS Code Dark+ theme
- `materialLight` - Material Light theme
- `materialDark` - Material Dark theme
- `atomDark` - Atom Dark theme
- `dracula` - Dracula theme
- `tomorrow` - Tomorrow theme

### Using Themes

```tsx
import { MarkdownRenderer, getThemeStyle, defaultDarkTheme } from '@/components/markdown';

// Use a specific theme
<MarkdownRenderer content={content} theme="dracula" />

// Use theme utilities
const themeStyle = getThemeStyle('vscDarkPlus');
const themeName = getThemeName('oneDark'); // "One Dark"
const isDark = isThemeDark('dracula'); // true
```

## Supported Languages

The syntax highlighter supports a wide range of programming languages including:

- JavaScript/TypeScript
- Python
- Java
- C/C++
- Rust
- Go
- PHP
- Ruby
- Swift
- Kotlin
- And many more...

## Features

### Code Blocks
- Line numbers
- Language detection from fenced code blocks
- Customizable themes
- Copy-friendly formatting

### Links
- Automatic external link detection
- `target="_blank"` and `rel="noopener noreferrer"` for external links
- Next.js Link component for internal links

### Images
- Next.js Image component integration
- Automatic width/height handling
- Responsive images with proper styling

### Tables
- Responsive table wrapper
- Styled headers and borders
- Overflow scroll for wide tables

### Lists
- Proper spacing and indentation
- Support for both ordered and unordered lists
- Nested list support

## Example Usage

```tsx
import { MarkdownRenderer } from '@/components/markdown';

const blogContent = `
# My Blog Post

Here's some **bold text** and *italic text*.

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const user: User = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com'
};
\`\`\`

Check out [this external link](https://example.com) or [this internal link](/about).

> This is a blockquote with some important information.

## Features

- Feature 1
- Feature 2
- Feature 3
`;

export function BlogPost() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <MarkdownRenderer content={blogContent} />
    </div>
  );
}
```

## Customization

### Custom Styling

The components use Tailwind CSS classes. You can customize the appearance by:

1. Modifying the component files directly
2. Overriding styles with CSS
3. Using the `className` prop to add additional classes

### Adding New Themes

To add a new theme:

1. Import the theme from `react-syntax-highlighter`
2. Add it to the `themes.ts` file
3. Update the type definitions

```tsx
// In themes.ts
import { newTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const themeConfig = {
  // ... existing themes
  newTheme: {
    style: newTheme,
    isDark: true, // or false
    name: 'New Theme',
  },
};
```

## Dependencies

- `react-markdown` - Markdown parsing and rendering
- `react-syntax-highlighter` - Syntax highlighting
- `remark-gfm` - GitHub Flavored Markdown support
- `next` - Next.js Image component
- `tailwindcss` - Styling
