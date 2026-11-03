/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Brochure palette: royal blue headers, cream content pages, gold accents
        'gold-light': '#e6c473',
        navy: '#163a96',
        'gold-dark': '#b3842a',
        cream: '#fcf8f0',
        'navy-deep': '#0a2672',
        // Theme roles, switched by [data-theme] in styles.css
        page: 'rgb(var(--c-page) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        overlay: 'rgba(10, 38, 114, 0.72)',
      },
      maxWidth: {
        // Shared content width for every section
        site: '1440px',
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

