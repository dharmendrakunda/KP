/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kp: {
          navy: '#0b2545',
          blue: '#134074',
          accent: '#0066cc',
          gold: '#e5a93c',
          goldlight: '#fcd34d',
          golddark: '#b47b10',
          bg: '#f8fafc',
          card: '#ffffff'
        }
      }
    },
  },
  plugins: [],
}
