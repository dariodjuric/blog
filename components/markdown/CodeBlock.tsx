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
      <code
        className="bg-primary-background-code/80 border border-primary-border-code/80 rounded-sm p-0.5 text-sm"
        style={{ whiteSpace: 'pre-wrap' }}
      >
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
      showLineNumbers={false}
      customStyle={{
        margin: '1rem 0',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
      codeTagProps={{
        style: {
          fontSize: '0.875rem',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          whiteSpace: 'pre-wrap',
        },
      }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
}
