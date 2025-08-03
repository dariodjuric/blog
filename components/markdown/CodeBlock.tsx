import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { getThemeStyle, SyntaxTheme, defaultDarkTheme } from './themes';

interface CodeBlockProps {
  children: string;
  className?: string;
  inline?: boolean;
  theme?: SyntaxTheme;
}

export function CodeBlock({
  children,
  className,
  inline = false,
  theme = defaultDarkTheme,
}: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  const themeStyle = getThemeStyle(theme);

  // For inline code blocks
  if (inline || !language) {
    return (
      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
        {children}
      </code>
    );
  }

  // For code blocks with language syntax highlighting
  return (
    <SyntaxHighlighter
      style={themeStyle}
      language={language}
      PreTag="div"
      showLineNumbers={true}
      customStyle={{
        margin: '1rem 0',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        lineHeight: '1.5',
      }}
      codeTagProps={{
        style: {
          fontSize: '0.875rem',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        },
      }}
      lineNumberStyle={{
        minWidth: '3em',
        paddingRight: '1em',
        textAlign: 'right',
        userSelect: 'none',
      }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
}
