import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { paper: '#F4F6F3', mist: '#E3EBE7', line: '#CFD9D4', ink: '#1C2826', stone: '#52605C', sage: { DEFAULT: '#3B6B60', dark: '#2F574E', soft: '#CFE0D9' } },
      fontFamily: { display: ['var(--font-display)', 'sans-serif'], sans: ['var(--font-body)', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config;
