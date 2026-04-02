import { Link } from '@tanstack/react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = '',
}: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, href, ...props }) => {
            if (href?.includes('darios.blog')) {
              return (
                <Link
                  to={href || ''}
                  {...props}
                  className="text-primary hover:text-primary/80 underline"
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href || ''}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline"
                {...props}
              >
                {children}
              </a>
            );
          },

          img: ({ src, alt }) => {
            if (!src) {
              return null;
            }
            return (
              <img
                src={src}
                alt={alt || 'Blog post image'}
                loading="lazy"
                className="rounded-lg shadow-md my-4"
              />
            );
          },

          pre: ({ children }) => {
            return <>{children}</>;
          },
          code: ({ children, className, ...props }) => {
            const isInline = !className?.includes('language-');
            return (
              <CodeBlock className={className} inline={isInline} {...props}>
                {String(children)}
              </CodeBlock>
            );
          },

          ol: ({ children, className, ...props }) => (
            <ol
              className={`list-decimal ml-6 space-y-1 my-4 ${className || ''}`}
              {...props}
            >
              {children}
            </ol>
          ),
          ul: ({ children, className, ...props }) => (
            <ul
              className={`list-disc ml-6 space-y-1 my-4 ${className || ''}`}
              {...props}
            >
              {children}
            </ul>
          ),
          li: ({ children, className, ...props }) => (
            <li className={className || ''} {...props}>
              {children}
            </li>
          ),

          h1: ({ children, className, ...props }) => (
            <h1
              className={`text-2xl font-bold mt-6 mb-2 ${className || ''}`}
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, className, ...props }) => (
            <h2
              className={`text-lg font-bold mt-6 mb-1 ${className || ''}`}
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, className, ...props }) => (
            <h3
              className={`text-base font-bold mt-4 mb-1 ${className || ''}`}
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, className, ...props }) => (
            <h4 className={`font-bold mt-6 mb-1 ${className || ''}`} {...props}>
              {children}
            </h4>
          ),

          blockquote: ({ children, className, ...props }) => (
            <blockquote
              className={`border-l-4 border-muted-foreground/30 pl-4 my-4 italic ${className || ''}`}
              {...props}
            >
              {children}
            </blockquote>
          ),

          table: ({ children, className, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className={`min-w-full border-collapse border border-border ${className || ''}`}
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, className, ...props }) => (
            <thead className={`bg-muted/50 ${className || ''}`} {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, className, ...props }) => (
            <tbody className={className || ''} {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, className, ...props }) => (
            <tr
              className={`border-b border-border ${className || ''}`}
              {...props}
            >
              {children}
            </tr>
          ),
          th: ({ children, className, ...props }) => (
            <th
              className={`border border-border px-4 py-2 text-left font-medium text-foreground ${className || ''}`}
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, className, ...props }) => (
            <td
              className={`border border-border px-4 py-2 ${className || ''}`}
              {...props}
            >
              {children}
            </td>
          ),

          p: ({ children, className, ...props }) => (
            <p className={`my-2 ${className || ''}`} {...props}>
              {children}
            </p>
          ),

          hr: ({ className, ...props }) => (
            <hr
              className={`my-8 border-border ${className || ''}`}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
