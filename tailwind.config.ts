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
        'prussian-blue': {
          DEFAULT: '#003049',
          50: '#02A8FF',
          100: '#009BEC',
          200: '#0080C3',
          300: '#00669B',
          400: '#004B72',
          500: '#003049',
          600: '#000B11',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
        'half-colonial-white': {
          DEFAULT: '#FDF0D5',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFEFC',
          500: '#FDF0D5',
          600: '#FADD9F',
          700: '#F8CA6A',
          800: '#F5B734',
          900: '#E79F0B',
          950: '#CC8D0A',
        },
        'hippie-blue': {
          DEFAULT: '#569FB6',
          50: '#D6E8ED',
          100: '#C8E0E7',
          200: '#ABD0DB',
          300: '#8FBFCF',
          400: '#72AFC2',
          500: '#569FB6',
          600: '#408094',
          700: '#2F5E6D',
          800: '#1E3C46',
          900: '#0D1A1E',
          950: '#05090B',
        },
        thunderbird: {
          DEFAULT: '#C1121F',
          50: '#F5959D',
          100: '#F3838B',
          200: '#F05D68',
          300: '#EC3846',
          400: '#E61525',
          500: '#C1121F',
          600: '#8E0D17',
          700: '#5A080F',
          800: '#270406',
          900: '#000000',
          950: '#000000',
        },
      },
      boxShadow: {
        light: '2px 2px 0px 0px rgba(0, 0, 0, 0.08)',
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
