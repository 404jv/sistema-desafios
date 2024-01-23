import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
        'black-900': '#0D0D0D',
        'black-800': '#141A26',
        'black-700': '#2E3D59',
        'purple-900': '#5833A6',
        'purple-100': '#8679D9',
        'gray-900': '#121214',
        'gray-800': '#181819',
        'gray-700': '#202024',
        'gray-600': '#2B2B32',
        'gray-500': '#7C7C8A',
        'gray-100': '#E1E1E6',
        white: '#FFFFFF',
        green: '#1DBA54',
        blue: '#0085FF'
      },
      fontFamily: {
        inter: ['var(--font-inter)', ...fontFamily.sans],
        roboto: ['var(--font-roboto)', ...fontFamily.sans],
      },
      boxShadow: {
        'buttonBlue': '0px 0px 14px 1px rgba(0,133, 255,0.72)',
      }
    },
  },
  plugins: [],
}
export default config
