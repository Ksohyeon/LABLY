import Navbar from "@/components/Navbar";
import ThemeContext from "@/store/ThemeContext";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useState } from "react";
import { useApollo } from "@/lib/apollo";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import styled from "styled-components";

const PageWrapper = styled.div<{ theme: string }>`
  width: 100%;
  min-height: 100vh;
  background: ${(prop) => (prop.theme === "light" ? "white" : "black")};
  color: ${(prop) => (prop.theme === "light" ? "black" : "white")};
  #container {
    margin-top: 130px;
  }
`;

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
          <PageWrapper theme={theme}>
            <Navbar />
            <div id="container">
              <Component {...pageProps} />
            </div>
          </PageWrapper>
        </ThemeContext.Provider>
      </UserProvider>
    </ApolloProvider>
  );
}
