import { Roboto, Inter } from 'next/font/google'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

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
  const clearTokenFromCache = () => {
    localStorage.removeItem('token@sistemadesafios');
    localStorage.removeItem('user@sistemadesafios');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', clearTokenFromCache);
    return () => {
      window.removeEventListener('beforeunload', clearTokenFromCache);
    };
  }, []);

  return <Component {...pageProps} />
}
