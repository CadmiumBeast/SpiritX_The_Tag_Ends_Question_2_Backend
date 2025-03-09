/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9333EA',
          dark: '#7E22CE',
          light: '#A855F7'
        },
        dark: {
          DEFAULT: '#0F0720',
          lighter: '#1A0B38',
          card: '#150A2E'
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(147, 51, 234, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)',
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
      }
    },
  },
  plugins: [],
};