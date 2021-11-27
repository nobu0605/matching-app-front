import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const axiosSetting = axios.create({ baseURL: BASE_URL })

axiosSetting.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("access-token")
    if (accessToken) {
      config.headers["access-token"] = accessToken
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosSetting
