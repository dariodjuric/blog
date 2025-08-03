import {
  oneDark,
  oneLight,
  vscDarkPlus,
  materialLight,
  materialDark,
  atomDark,
  dracula,
  tomorrow,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

export type SyntaxTheme =
  | 'oneDark'
  | 'oneLight'
  | 'vscDarkPlus'
  | 'materialLight'
  | 'materialDark'
  | 'atomDark'
  | 'dracula'
  | 'tomorrow';

export const syntaxThemes = {
  oneDark,
  oneLight,
  vscDarkPlus,
  materialLight,
  materialDark,
  atomDark,
  dracula,
  tomorrow,
} as const;

export const themeConfig = {
  oneDark: {
    style: oneDark,
    isDark: true,
    name: 'One Dark',
  },
  oneLight: {
    style: oneLight,
    isDark: false,
    name: 'One Light',
  },
  vscDarkPlus: {
    style: vscDarkPlus,
    isDark: true,
    name: 'VS Code Dark+',
  },
  materialLight: {
    style: materialLight,
    isDark: false,
    name: 'Material Light',
  },
  materialDark: {
    style: materialDark,
    isDark: true,
    name: 'Material Dark',
  },
  atomDark: {
    style: atomDark,
    isDark: true,
    name: 'Atom Dark',
  },
  dracula: {
    style: dracula,
    isDark: true,
    name: 'Dracula',
  },

  tomorrow: {
    style: tomorrow,
    isDark: false,
    name: 'Tomorrow',
  },
} as const;

export function getThemeStyle(theme: SyntaxTheme) {
  return themeConfig[theme]?.style || oneDark;
}

export function isThemeDark(theme: SyntaxTheme): boolean {
  return themeConfig[theme]?.isDark ?? true;
}

export function getThemeName(theme: SyntaxTheme): string {
  return themeConfig[theme]?.name || 'Unknown Theme';
}

// Default themes for light/dark mode
export const defaultLightTheme: SyntaxTheme = 'oneLight';
export const defaultDarkTheme: SyntaxTheme = 'oneDark';
