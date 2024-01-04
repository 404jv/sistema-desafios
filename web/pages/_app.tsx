import { Roboto, Inter } from 'next/font/google'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

const inter = Inter({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
})

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
