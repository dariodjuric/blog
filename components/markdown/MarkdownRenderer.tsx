import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className={`prose prose-gray max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Links
          a: ({ children, href, ...props }) => {
            if (href?.includes('darios.blog')) {
              return (
                <Link
                  href={href || ''}
                  {...props}
                  className="text-blue-600 hover:text-blue-800 underline"
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
                className="text-blue-600 hover:text-blue-800 underline"
                {...props}
              >
                {children}
              </a>
            );
          },

          // Images
          img: ({ src, alt, width, height, ...props }) => {
            if (!src) return null;
            const widthNum =
              typeof width === 'string' ? parseInt(width, 10) : width || 800;
            const heightNum =
              typeof height === 'string' ? parseInt(height, 10) : height || 600;
            return (
              <Image
                src={src}
                alt={alt || ''}
                width={widthNum}
                height={heightNum}
                className="rounded-lg shadow-md"
                {...props}
              />
            );
          },

          // Code blocks
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

          // Lists
          ol: ({ children, className, ...props }) => (
            <ol
              className={`list-decimal ml-6 space-y-1 ${className || ''}`}
              {...props}
            >
              {children}
            </ol>
          ),
          ul: ({ children, className, ...props }) => (
            <ul
              className={`list-disc ml-6 space-y-1 ${className || ''}`}
              {...props}
            >
              {children}
            </ul>
          ),
          li: ({ children, className, ...props }) => (
            <li className={`${className || ''}`} {...props}>
              {children}
            </li>
          ),

          // Headings
          h1: ({ children, className, ...props }) => (
            <h1
              className={`text-3xl font-bold mt-8 mb-4 ${className || ''}`}
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, className, ...props }) => (
            <h2
              className={`text-2xl font-semibold mt-6 mb-3 ${className || ''}`}
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, className, ...props }) => (
            <h3
              className={`text-xl font-semibold mt-5 mb-2 ${className || ''}`}
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, className, ...props }) => (
            <h4
              className={`text-lg font-semibold mt-4 mb-2 ${className || ''}`}
              {...props}
            >
              {children}
            </h4>
          ),

          // Blockquotes
          blockquote: ({ children, className, ...props }) => (
            <blockquote
              className={`border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700 ${className || ''}`}
              {...props}
            >
              {children}
            </blockquote>
          ),

          // Tables
          table: ({ children, className, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className={`min-w-full border-collapse border border-gray-300 ${className || ''}`}
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, className, ...props }) => (
            <thead className={`bg-gray-50 ${className || ''}`} {...props}>
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
              className={`border-b border-gray-300 ${className || ''}`}
              {...props}
            >
              {children}
            </tr>
          ),
          th: ({ children, className, ...props }) => (
            <th
              className={`border border-gray-300 px-4 py-2 text-left font-medium ${className || ''}`}
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, className, ...props }) => (
            <td
              className={`border border-gray-300 px-4 py-2 ${className || ''}`}
              {...props}
            >
              {children}
            </td>
          ),

          // Paragraphs
          p: ({ children, className, ...props }) => (
            <p className={`mb-4 leading-relaxed ${className || ''}`} {...props}>
              {children}
            </p>
          ),

          // Horizontal rule
          hr: ({ className, ...props }) => (
            <hr
              className={`my-8 border-gray-300 ${className || ''}`}
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
