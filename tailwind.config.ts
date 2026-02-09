import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        // 品牌色 - 珊瑚橙
        brand: {
          DEFAULT: '#FF6B4A',
          light: '#FF8A6D',
          dark: '#E55538',
        },
        // 背景色 - 亮色系
        background: {
          primary: '#FFFFFF',
          secondary: '#F8F9FA',
          card: '#FFFFFF',
          hover: '#F1F3F5',
        },
        // 文字色
        text: {
          primary: '#1A1A1A',
          secondary: '#5A5A5A',
          muted: '#9A9A9A',
        },
        // 强调色
        accent: {
          blue: '#0066FF',
          green: '#00C853',
          purple: '#8B5CF6',
        },
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 107, 74, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 107, 74, 0.4)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}

export default config
