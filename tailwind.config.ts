import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        content: ['DIN 2014'],
        logo: ['Roboto Slab'],
      },
      fontWeight: {
        semibold: '500',
      },
      colors: {
        primary: {
          content: {
            default: '#000',
            error: '#C1121F',
          },
          background: {
            DEFAULT: '#FDF0D5',
            dark: '#F7EBD2',
            light: '#FDF5E4',
          },
          button: '#C1121F',
          border: {
            active: '#569FB6',
            error: '#EA6771',
          },
        },
        secondary: {
          content: '#333',
          background: {
            DEFAULT: '#003049',
            light: '#569FB6',
          },
        },
        brand: {
          content: {
            DEFAULT: '#C1121F',
            inverse: '#FFF',
            hover: '#DE1524',
          },
          border: '#C1121F',
        },
        neutral: {
          content: {
            DEFAULT: '#569FB6',
            inverse: '#FDF0D5',
          },
          background: '#30829C',
        },
      },
      boxShadow: {
        light: '2px 2px 0px 0px rgba(0, 0, 0, 0.08)',
        'form-inner': 'inset 0px 0px 4px rgba(0, 0, 0, 0.08)',
      },
      textShadow: {
        DEFAULT: '2px 2px 0 rgba(0, 0, 0, 0.08)',
        low: '1px 1px 0 rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    }),
  ],
};
export default config;
