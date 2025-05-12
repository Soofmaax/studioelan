/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable dark mode with class
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f7f2',
          100: '#e9eade',
          200: '#d4d6be',
          300: '#b9bc96',
          400: '#9ca174',
          500: '#848a59',
          600: '#6a7047',
          700: '#555839',
          800: '#464830',
          900: '#3c3e2b',
          950: '#1f2115',
        },
        secondary: {
          50: '#f7f9f9',
          100: '#e2ecec',
          200: '#c5d8d8',
          300: '#a0bdbd',
          400: '#7d9e9e',
          500: '#648484',
          600: '#4d6767',
          700: '#415454',
          800: '#394747',
          900: '#343e3e',
          950: '#1a2121',
        },
        accent: {
          50: '#fcf5ef',
          100: '#f8e8d8',
          200: '#f0cdb1',
          300: '#e8ac80',
          400: '#e08b54',
          500: '#d96e36',
          600: '#c44f25',
          700: '#a33920',
          800: '#853021',
          900: '#6e291e',
          950: '#3c120e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      spacing: {
        '128': '32rem',
      },
      height: {
        'screen-90': '90vh',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};