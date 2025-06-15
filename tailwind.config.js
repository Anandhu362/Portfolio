/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // Merged fontFamily from the first file
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      // Merged animation and keyframes from the second file
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'neon-glow': 'neonGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        neonGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px 1px rgba(34, 197, 94, 0.3), 0 0 10px 2px rgba(34, 197, 94, 0.2)',
            borderColor: 'rgba(34, 197, 94, 0.4)',
          },
          '50%': { 
            boxShadow: '0 0 20px 5px rgba(34, 197, 94, 0.6), 0 0 30px 8px rgba(34, 197, 94, 0.4)',
            borderColor: 'rgba(34, 197, 94, 0.8)',
          },
        },
      },
    },
  },
  plugins: [],
};