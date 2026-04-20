import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        western: {
          purple: '#4F2683',
          'purple-dark': '#3a1a6e',
          'purple-light': '#EDE8F5',
          'purple-mid': '#7B54AE',
        },
        ivey: {
          green: '#154733',
          'green-mid': '#2D6A4F',
          'green-light': '#E8F0EC',
          'green-accent': '#3A8C60',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
