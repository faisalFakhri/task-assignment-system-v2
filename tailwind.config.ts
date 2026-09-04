/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'pastel-violet': '#c084fc',
        'pastel-pink': '#f9a8d4',
        'pastel-blue': '#7dd3fc',
        'pastel-mint': '#86efac',
        'pastel-peach': '#fda4af',
        'pastel-lavender': '#ede9fe',
        'pastel-cream': '#fef3c7',
        'pastel-rose': '#fecdd3',
        'pastel-sky': '#bae6fd',
        'mesh-violet': '#a78bfa',
        'mesh-cyan': '#67e8f9',
        'mesh-blue': '#60a5fa',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}
