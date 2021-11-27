import React from "react"
import styles from "../styles/pages/completed.module.scss"
import { userState } from "../recoil/atoms"
import { useRecoilValue } from "recoil"
import { useQuery } from "@apollo/client"
import { GET_USER } from "../graphql/userQuery"

export default function Home(): JSX.Element {
  //   const user = useRecoilValue(userState)
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { _id: "619f635e3a2e928524e60f87" },
  })

  console.log("loading: ", data)
  if (loading) {
    return null
  }

  return (
    <div className={styles["completed-wrapper"]}>
      <div className={styles["completed-container"]}>
        <span className={styles["completed-message"]}>
          Hello {data.username}
        </span>
      </div>
    </div>
  )
}
