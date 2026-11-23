/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: 'rgb(var(--paper-rgb) / <alpha-value>)',
          2: 'rgb(var(--paper-2-rgb) / <alpha-value>)',
          3: 'rgb(var(--paper-3-rgb) / <alpha-value>)',
        },
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-orange': 'rgb(var(--accent-rgb) / <alpha-value>)',
        'text-muted': 'rgb(var(--ink-rgb) / 0.55)',
        border: 'rgb(var(--ink-rgb) / 0.12)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-instrument-serif)', 'Times New Roman', 'serif'],
        display: ['var(--font-instrument-serif)', 'Times New Roman', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'tech-marquee': 'tech-marquee 48s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(180deg)' },
        },
        'tech-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      spacing: {
        'safe-area-top': 'env(safe-area-inset-top)',
        'safe-area-bottom': 'env(safe-area-inset-bottom)',
        'safe-area-left': 'env(safe-area-inset-left)',
        'safe-area-right': 'env(safe-area-inset-right)',
      },
      maxWidth: {
        'screen-xs': '320px',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
      },
       screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      // 👇 custom iPad / tablet range
      tablet: { min: '768px', max: '1023px' },
    },
      minWidth: {
        '0': '0',
        'xs': '320px',
        'sm': '640px',
      },
    },
  },
  plugins: [],
}

