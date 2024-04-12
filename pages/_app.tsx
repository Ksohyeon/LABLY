import Navbar from "@/components/Navbar";
import ThemeContext from "@/components/ThemeContext";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useState } from "react";
import { useApollo } from "@/lib/apollo";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<string>("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <div
            style={{
              width: "100%",
              minHeight: "100vh",
              background: theme === "light" ? "white" : "black",
              color: theme === "light" ? "black" : "white",
            }}
          >
            <Navbar />
            <Component {...pageProps} />
          </div>
        </ThemeContext.Provider>
      </UserProvider>
    </ApolloProvider>
  );
}
