import React from "react"
import axios from "../utils/axios"
import { Button } from "semantic-ui-react"
import styles from "../styles/pages/register.module.scss"
import { useRouter } from "next/router"
import { ErrorMessage } from "../components/ErrorMessage"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSetRecoilState } from "recoil"
import { userState } from "../recoil/atoms"

export default function Register(): JSX.Element {
  const router = useRouter()
  const setUser = useSetRecoilState(userState)

  const varidation = yup.object().shape({
    username: yup.string().trim().required("名前を入力してください。"),
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
    confirm_password: yup
      .string()
      .trim()
      .required("パスワード（確認）を入力してください。")
      .min(6, "パスワード（確認）は6文字以上で入力してください。")
      .matches(
        /[a-zA-Z]/,
        "パスワード（確認）はアルファベットのみで入力してください。"
      )
      .oneOf([yup.ref("password"), null], "パスワードが一致しません。"),
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

    await axios
      .post(`/register`, {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        localStorage.setItem("access-token", response.data.token)
        setUser(response.data.user)
        router.push("/completed")
      })
      .catch((e) => {
        console.error(e)
        if (e.response.status === 400) {
          return alert("このメールアドレスは既に登録されています。")
        }
        return alert(
          "何らかのエラーが発生しています。申し訳ありませんが時間を空けて再度お試し下さい。"
        )
      })
  }

  return (
    <div className={styles["register-wrapper"]}>
      <div className={styles["register-input"]}>
        <span className={styles["register-input__title"]}>アカウント登録</span>
        <div className={styles["register-container"]}>
          <label className={styles["register-input__label"]} htmlFor="username">
            <span className={styles["register-input__asterisk"]}>*</span>
            ユーザーネーム
          </label>
          <input
            {...register("username")}
            className={styles["register-input__field"]}
            placeholder="Username"
            name="username"
            type="text"
          />
          <ErrorMessage
            isError={errors.username !== undefined}
            errorMessage={errors.username && errors.username.message}
          />
          <label className={styles["register-input__label"]} htmlFor="email">
            <span className={styles["register-input__asterisk"]}>*</span>
            メールアドレス
          </label>
          <input
            {...register("email")}
            className={styles["register-input__field"]}
            placeholder="E-mail address"
            name="email"
            type="text"
          />
          <ErrorMessage
            isError={errors.email !== undefined}
            errorMessage={errors.email && errors.email.message}
          />
          <label className={styles["register-input__label"]} htmlFor="password">
            <span className={styles["register-input__asterisk"]}>*</span>
            パスワード
          </label>
          <input
            {...register("password")}
            className={styles["register-input__field"]}
            placeholder="Password"
            name="password"
            type="password"
          />
          <ErrorMessage
            isError={errors.password !== undefined}
            errorMessage={errors.password && errors.password.message}
          />
          <label
            className={styles["register-input__label"]}
            htmlFor="confirm_password"
          >
            <span className={styles["register-input__asterisk"]}>*</span>
            パスワード(確認)
          </label>
          <input
            {...register("confirm_password")}
            className={styles["register-input__field"]}
            placeholder="Confirm password"
            name="confirm_password"
            type="password"
          />
          <ErrorMessage
            isError={errors.confirm_password !== undefined}
            errorMessage={
              errors.confirm_password && errors.confirm_password.message
            }
          />
        </div>
        <Button
          className={styles["register-input__button"]}
          primary
          onClick={handleSubmit(onSubmit)}
        >
          送信
        </Button>
      </div>
    </div>
  )
}
