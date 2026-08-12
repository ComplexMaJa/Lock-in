/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lockin: {
          bg: '#FFFDFB',
          secondary: '#F8F6F4',
          card: '#FFFFFF',
          'soft-pink': '#F7C6CE',
          red: '#D96B72',
          'soft-red': '#F5E6E8',
          blue: '#C7E4F5',
          yellow: '#F8E7A8',
          lavender: '#DDD2F4',
          cream: '#FFF1D6',
          dark: '#242424',
          muted: '#777777',
          border: '#EBE7E3',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(36, 36, 36, 0.05)',
        'soft-hover': '0 8px 30px -4px rgba(217, 107, 114, 0.12)',
        'pill': '0 2px 10px rgba(217, 107, 114, 0.15)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
