/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GTA V Los Santos Design System
        'gta': {
          'black': '#0D0D0D',         // Deep black (background)
          'panel': '#1A1A1A',         // Panel dark gray
          'panel-light': '#252525',   // Lighter panel
          'gray': '#404040',          // Mid gray
          'gray-light': '#666666',    // Light gray
          'white': '#FFFFFF',         // Pure white
        },
        'accent': {
          'blue': '#5E9CD3',          // GTA V Blue (primary)
          'blue-light': '#7DB3DB',    // Light blue
          'blue-dark': '#4A7FB0',     // Dark blue
          'yellow': '#F7B731',        // GTA V Yellow/Gold
          'yellow-light': '#F9C74F',  // Light yellow
          'yellow-dark': '#E5A826',   // Dark yellow
          'green': '#2ECC40',         // Money green
          'red': '#E74C3C',           // Alert red
          'purple': '#9B59B6',        // Purple accent
        },
        // Status colors
        'status': {
          'online': '#2ECC40',        // Green
          'offline': '#E74C3C',       // Red
          'warning': '#F7B731',       // Yellow
        },
        // Overlay colors
        'overlay': {
          'dark': 'rgba(13, 13, 13, 0.95)',
          'medium': 'rgba(13, 13, 13, 0.8)',
          'light': 'rgba(13, 13, 13, 0.6)',
          'blue': 'rgba(94, 156, 211, 0.1)',
          'yellow': 'rgba(247, 183, 49, 0.1)',
        }
      },
      fontFamily: {
        'display': ['Bebas Neue', 'Impact', 'sans-serif'],      // GTA-style headlines
        'heading': ['Rajdhani', 'Quantico', 'sans-serif'],      // GTA V UI style
        'body': ['Roboto Condensed', 'Roboto', 'sans-serif'],   // Body text
        'ui': ['Quantico', 'Rajdhani', 'sans-serif'],           // UI elements
        'mono': ['JetBrains Mono', 'Roboto Mono', 'monospace'], // Stats & numbers
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'ken-burns': 'kenBurns 20s ease-out infinite',
        'loading-bar': 'loadingBar 2s cubic-bezier(0.4, 0, 0.2, 1)',
        'parallax': 'parallax 10s linear infinite',
        'film-grain': 'filmGrain 8s steps(10) infinite',
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
        'slide-left': 'slideLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-right': 'slideRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'reveal': 'reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(-2%, -2%)' },
        },
        loadingBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        parallax: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' },
        },
        filmGrain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-1%, -1%)' },
          '20%': { transform: 'translate(1%, 1%)' },
          '30%': { transform: 'translate(-1%, 1%)' },
          '40%': { transform: 'translate(1%, -1%)' },
          '50%': { transform: 'translate(-1%, 0)' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        reveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
      },
      backgroundImage: {
        'gta-gradient': 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)',
        'gta-panel': 'linear-gradient(180deg, #1A1A1A 0%, #252525 100%)',
        'blue-gradient': 'linear-gradient(135deg, #5E9CD3 0%, #4A7FB0 100%)',
        'yellow-gradient': 'linear-gradient(135deg, #F7B731 0%, #E5A826 100%)',
        'diagonal-stripes': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(94, 156, 211, 0.03) 10px, rgba(94, 156, 211, 0.03) 20px)',
        'hud-grid': 'linear-gradient(rgba(94, 156, 211, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(94, 156, 211, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'hud-grid': '20px 20px',
      },
      boxShadow: {
        'gta': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'gta-hover': '0 8px 30px rgba(0, 0, 0, 0.6)',
        'gta-inner': 'inset 0 1px 2px rgba(0, 0, 0, 0.5)',
        'blue-glow': '0 0 20px rgba(94, 156, 211, 0.3), 0 0 40px rgba(94, 156, 211, 0.1)',
        'yellow-glow': '0 0 20px rgba(247, 183, 49, 0.3), 0 0 40px rgba(247, 183, 49, 0.1)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'hard': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'card': '0 2px 4px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}