/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class', // forced dark
  theme: {
    extend: {
      colors: {
        'mesh-violet': '#7c3aed',
        'mesh-cyan': '#06b6d4',
        'mesh-blue': '#0ea5e9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}
