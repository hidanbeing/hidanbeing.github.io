import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#002c5f',   // Hyundai Blue (포인트)
          light: '#2f6bbf',
          soft: '#e8eef6',
          dark: '#5b9ae6',      // 다크모드용 밝은 톤
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Apple SD Gothic Neo', 'Pretendard', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: { content: '1080px' },
    },
  },
  plugins: [],
};
export default config;
