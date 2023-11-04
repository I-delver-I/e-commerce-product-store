import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppHeader from "@/components/ui/AppHeader";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <header>
      <AppHeader />
    </header>
    <Component {...pageProps} />
  </>
}
