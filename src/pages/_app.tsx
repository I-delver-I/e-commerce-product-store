import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SearchAppBar from "@/components/ui/SearchAppBar";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <header>
      <SearchAppBar />
    </header>
    <Component {...pageProps} />
  </>
}
