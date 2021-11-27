import React, { useState } from "react"
import axios from "../utils/axios"
import { Button } from "semantic-ui-react"
import styles from "../styles/pages/index.module.scss"
import Link from "next/link"
import { useRouter } from "next/router"
import { Dimmer, Loader } from "semantic-ui-react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ErrorMessage } from "../components/ErrorMessage"
import { userState } from "../recoil/atoms"
import { useSetRecoilState } from "recoil"

export default function Login(): JSX.Element {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useSetRecoilState(userState)

  const varidation = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required("メールアドレスを入力してください。")
      .email("メールアドレスの形式で入力してください。"),
    password: yup
      .string()
      .trim()
      .required("パスワードを入力してください。")
      .min(6, "パスワードは6文字以上で入力してください。")
      .matches(
        /[a-zA-Z]/,
        "パスワードはアルファベットのみで入力してください。"
      ),
  })

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(varidation),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirm_password: "",
    },
  })

  const onSubmit = async () => {
    const values = getValues()

    setIsLoading(true)

    await axios
      .post(`/login`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        localStorage.setItem("access-token", response.data.token)
        setUser(response.data.user)
        router.push("/home")
      })
      .catch((e) => {
        console.error(e)
        setIsLoading(false)
        if (e.response.status === 400) {
          return alert("メールアドレスもしくはパスワードが間違っています。")
        }
        return alert(
          "何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。"
        )
      })
  }

  if (isLoading) {
    return (
      <Dimmer active={true} inverted>
        <Loader inline="centered" size="huge">
          Loading
        </Loader>
      </Dimmer>
    )
  }

  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles["login-input"]}>
        <span className={styles["login-input__title"]}>
          matching-appにログイン
        </span>
        <input
          {...register("email")}
          className={styles["login-input__field"]}
          placeholder="E-mail address"
          name="email"
          type="text"
        />
        <ErrorMessage
          isError={errors.email !== undefined}
          errorMessage={errors.email && errors.email.message}
        />
        <input
          {...register("password")}
          className={styles["login-input__field"]}
          placeholder="Password"
          name="password"
          type="password"
        />
        <ErrorMessage
          isError={errors.password !== undefined}
          errorMessage={errors.password && errors.password.message}
        />
        <Button
          className={styles["login-input__button"]}
          primary
          onClick={handleSubmit(onSubmit)}
        >
          送信
        </Button>
        <Link href={`/register`}>
          <a className={styles["login-input__register-not-yet"]}>
            登録がお済みでない方はこちら
          </a>
        </Link>
      </div>
    </div>
  )
}
