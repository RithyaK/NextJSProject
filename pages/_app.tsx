import { UsernameContextProvider } from "@/components/context/usernameContext";
import Layout from "@/components/pages/reusable-ui/Layout";
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
