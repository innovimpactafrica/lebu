/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'gold-light': '#e6c473',
        navy: '#113068',
        'gold-dark': '#b3842a',
        cream: '#f8f4ec',
        'navy-deep': '#0a1e45',
        overlay: 'rgba(10, 30, 69, 0.72)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scaleY(1)' },
          '50%': { opacity: '1', transform: 'scaleY(1.3)' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 1s forwards',
        fadeIn: 'fadeIn 1s forwards',
        scrollPulse: 'scrollPulse 2s infinite',
      }
    },
  },
  plugins: [],
}

