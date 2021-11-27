import React from "react"
import "../styles/globals.css"
import "semantic-ui-css/semantic.min.css"
import { RecoilRoot } from "recoil"
import type { AppProps } from "next/app"
import { AuthRouteWrapper } from "../components/layout/AuthRouteWrapper"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_BASE_URL + "/graphql",
  cache: new InMemoryCache(),
})

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <AuthRouteWrapper>
          <Component {...pageProps} />
        </AuthRouteWrapper>
      </RecoilRoot>
    </ApolloProvider>
  )
}

export default App
