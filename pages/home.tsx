import React from "react"
import styles from "../styles/pages/completed.module.scss"
import { userState } from "../recoil/atoms"
import { useRecoilValue } from "recoil"

export default function Home(): JSX.Element {
  const user = useRecoilValue(userState)

  if (!user) {
    return null
  }

  return (
    <div className={styles["completed-wrapper"]}>
      <div className={styles["completed-container"]}>
        <span className={styles["completed-message"]}>
          Hello {user.username}
        </span>
      </div>
    </div>
  )
}
