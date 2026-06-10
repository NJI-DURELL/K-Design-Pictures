/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core brand identity
        ink: {
          DEFAULT: '#0A0A0A',
          950: '#050505',
          900: '#0A0A0A',
          850: '#0F0F10',
          800: '#141416',
          700: '#1C1C1F',
          600: '#26262B',
          500: '#33333A',
        },
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FBF6E6',
          100: '#F4E9C1',
          200: '#EAD78A',
          300: '#E0C45A',
          400: '#D9B946',
          500: '#D4AF37',
          600: '#B7942A',
          700: '#8F7220',
          800: '#665119',
          900: '#3F320F',
        },
        mist: {
          DEFAULT: '#B0B0B0',
          100: '#F5F5F5',
          200: '#E2E2E2',
          300: '#C9C9C9',
          400: '#B0B0B0',
          500: '#8A8A8A',
          600: '#6B6B6B',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        'fluid-hero': ['clamp(2.75rem, 8vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'fluid-display': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        'fluid-title': ['clamp(1.5rem, 3vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        brand: '0.42em',
        wide: '0.18em',
      },
      maxWidth: {
        shell: '1440px',
        prose: '68ch',
      },
      boxShadow: {
        'gold-glow': '0 0 0 1px rgba(212,175,55,0.25), 0 18px 60px -18px rgba(212,175,55,0.35)',
        'card': '0 24px 70px -28px rgba(0,0,0,0.85)',
        'card-hover': '0 40px 110px -32px rgba(0,0,0,0.9)',
        'inset-hair': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'gold-line': 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
        'gold-sheen': 'linear-gradient(135deg, #F4E9C1 0%, #D4AF37 45%, #8F7220 100%)',
        'fade-ink': 'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.7) 60%, #0A0A0A 100%)',
        'radial-spot': 'radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)',
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        'cinema': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'sheen': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '40%': { opacity: '1' },
          '80%, 100%': { transform: 'translateY(12px)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'sheen': 'sheen 6s linear infinite',
        'pulse-soft': 'pulse-soft 2.8s ease-in-out infinite',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
