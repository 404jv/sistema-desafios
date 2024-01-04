import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        ss: '460px',
        sm: '580px',
        md: '768px',
        lg: '916px',
        xl: '1440px',
      },
      colors: {
        blue: '#3E78CF',
        green: '#4C9453',
        red: '#944C4C',
        yellow: '#F8CC5B',
        'gray-900': '#121214',
        'gray-800': '#181819',
        'gray-700': '#202024',
        'gray-600': '#2B2B32',
        'gray-500': '#7C7C8A',
        'gray-100': '#E1E1E6',
        white: '#FFFFFF',
      },
      fontFamily: {
        inter: ["'Inter'", 'sans-serif'],
        roboto: ["'Roboto'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
