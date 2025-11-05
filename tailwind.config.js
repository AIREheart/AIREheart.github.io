/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0a1128',
        navy: '#1a2332',
        'navy-light': '#2a3442',
        gold: '#d4af37',
        bronze: '#cd7f32',
        silver: '#c0c0c0',
        maroon: '#800020',
        moonlight: '#e8f1f5',
      },
      fontFamily: {
        serif: ['Crimson Text', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}