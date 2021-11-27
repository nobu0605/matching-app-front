import React, { useEffect } from "react"
import { useRouter } from "next/router"
import axios from "../../utils/axios"
import { useSetRecoilState } from "recoil"
import { userState } from "../../recoil/atoms"

// We can add the routes we don't want to check authentication.
const urlsWithoutAuth = ["/", "/register", "/completed"]

export const AuthRouteWrapper = ({ children }) => {
  const router = useRouter()
  const setUser = useSetRecoilState(userState)

  useEffect(() => {
    checkAuth()
  }, [router.pathname])

  function checkAuth() {
    if (urlsWithoutAuth.includes(router.pathname)) {
      return
    }

    const accessToken = localStorage.getItem("access-token")
    if (!accessToken) {
      return (location.pathname = "/")
    }

    axios
      .get(`/user`)
      .then((response: any) => {
        const user = response.data

        setUser(user)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return children
}
