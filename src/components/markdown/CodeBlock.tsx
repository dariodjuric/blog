import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { defaultDarkTheme, getThemeStyle, SyntaxTheme } from './themes';

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

  if (inline || !language) {
    return (
      <code className="font-mono text-[0.875em] bg-muted/80 text-foreground/90 px-1.5 py-0.5 rounded-md">
        {children}
      </code>
    );
  }

  return (
    <SyntaxHighlighter
      style={themeStyle}
      language={language}
      PreTag="div"
      showLineNumbers={false}
      customStyle={{
        margin: '1.25rem 0',
        borderRadius: '0.5rem',
        fontSize: '0.75rem',
        lineHeight: '1.625',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        border: '1px solid hsl(245 15% 18%)',
      }}
      codeTagProps={{
        style: {
          fontSize: '0.75rem',
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
