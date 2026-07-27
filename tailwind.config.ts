import type { Config } from 'tailwindcss';

/**
 * 색은 전부 globals.css의 CSS 변수(RGB 트리플)에서 온다.
 * 다크모드는 변수만 갈아끼우면 되므로 컴포넌트에 dark: 색을 중복 선언하지 않는다.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        raised: 'rgb(var(--raised) / <alpha-value>)',
        sunken: 'rgb(var(--sunken) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        signal: 'rgb(var(--signal) / <alpha-value>)',
        verify: 'rgb(var(--verify) / <alpha-value>)',
        flag: 'rgb(var(--flag) / <alpha-value>)',
        warn: 'rgb(var(--warn) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-plex-kr)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
        xl: '10px',
      },
      maxWidth: {
        content: '1120px',
        prose: '68ch',
      },
      letterSpacing: {
        display: '-0.03em',
        technical: '0.14em',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        draw: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        rise: 'rise .55s cubic-bezier(.22,.61,.36,1) both',
        draw: 'draw .9s cubic-bezier(.22,.61,.36,1) both',
      },
    },
  },
  plugins: [],
};
export default config;
