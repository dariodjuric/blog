import { useState } from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { SyntaxTheme, themeConfig, getThemeName } from './themes';

const sampleMarkdown = `
# Code Highlighting Example

Here's some TypeScript code with syntax highlighting:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

class UserService {
  private users: User[] = [];

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      id: crypto.randomUUID(),
      ...userData,
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
}
\`\`\`

And here's some Python:

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Generate first 10 fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
\`\`\`

Inline code looks like this: \`const greeting = "Hello, world!";\`
`;

export function ThemeExample() {
  const [selectedTheme, setSelectedTheme] = useState<SyntaxTheme>('oneDark');

  const themes = Object.keys(themeConfig) as SyntaxTheme[];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Syntax Highlighting Theme Demo</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-3 py-1 rounded text-sm border transition-colors ${
                selectedTheme === theme
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-muted text-foreground border-border hover:bg-muted/80'
              }`}
            >
              {getThemeName(theme)}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Current theme: <strong>{getThemeName(selectedTheme)}</strong>
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-2 border-b">
          <span className="text-sm font-medium text-foreground">Preview</span>
        </div>
        <div className="p-4">
          <MarkdownRenderer
            content={sampleMarkdown}
            className="prose-sm"
          />
        </div>
      </div>
    </div>
  );
}
