import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SearchAppBar from "@/components/SearchAppBar";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <SearchAppBar />
    <Component {...pageProps} />
  </>
}
