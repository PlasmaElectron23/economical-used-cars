/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Keeping your existing brand colors just in case
        brandBlue: '#2563eb',
        silverCellSlate: '#1e293b',
        // Adding specific high-contrast 'Transformers' tones
        eucRed: '#dc2626', 
        eucBlack: '#000000',
      },
      animation: {
        'shine': 'shine 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shine: {
          '0%': { left: '-100%' },
          '20%': { left: '125%' },
          '100%': { left: '125%' },
        },
      },
      backgroundImage: {
        'mechanical-pattern': "radial-gradient(circle, #ffffff05 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}