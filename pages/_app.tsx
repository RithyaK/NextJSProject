import Layout from "@/components/Layout";
import { UsernameContextProvider } from "@/components/context/usernameContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UsernameContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UsernameContextProvider>
  );
}
