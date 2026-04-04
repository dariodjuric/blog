import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import html from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('shell', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('dockerfile', docker);
SyntaxHighlighter.registerLanguage('python', python);

interface CodeBlockProps {
  children: string;
  className?: string;
  inline?: boolean;
}

export function CodeBlock({
  children,
  className,
  inline = false,
}: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  if (inline || !language) {
    return (
      <code className="font-mono text-[0.875em] bg-muted/80 text-foreground/90 px-1.5 py-0.5 rounded-md">
        {children}
      </code>
    );
  }

  return (
    <SyntaxHighlighter
      style={oneDark}
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
