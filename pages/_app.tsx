import React from "react"
import "../styles/globals.css"
import "semantic-ui-css/semantic.min.css"
import { RecoilRoot } from "recoil"
import type { AppProps } from "next/app"
import { AuthRouteWrapper } from "../components/layout/AuthRouteWrapper"

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthRouteWrapper>
        <Component {...pageProps} />
      </AuthRouteWrapper>
    </RecoilRoot>
  )
}

export default App
