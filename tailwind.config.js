/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        void: '#020409',
        abyss: '#040a17',
        space: {
          950: '#030712',
          900: '#060f22',
          800: '#0a1a38',
          700: '#0f2750',
          600: '#15366c',
        },
        ice: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          cyan: '#00f0ff',
        },
        cobalt: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(56, 189, 248, 0.2)',
        'glow-md': '0 0 30px rgba(56, 189, 248, 0.25), 0 0 60px rgba(37, 99, 235, 0.15)',
        'glow-lg': '0 0 50px rgba(0, 240, 255, 0.3), 0 0 100px rgba(14, 165, 233, 0.15)',
        'cyber-card': '0 10px 40px -10px rgba(0, 4, 15, 0.8), inset 0 1px 0 0 rgba(56, 189, 248, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'reverse-spin': 'reverse-spin 25s linear infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
}