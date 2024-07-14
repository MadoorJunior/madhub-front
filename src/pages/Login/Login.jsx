import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../../api/auth"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import cookie from "react-cookies"
import s from "./Login.module.scss"
import { setUserInfo } from "../../utils/store/taskSlice"
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const navigateToRegister = () => {
    navigate("/register")
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData
  const [errorMsg, setErrorMsg] = useState("")
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setErrorMsg("")
  }
  const handleSubmit = () => {
    login({ email, password }).then(({ data }) => {
      if (data.code !== 20000) {
        setErrorMsg(data.message)
      } else {
        const {
          saTokenInfo: { tokenName, tokenValue, loginId },
          avatarUrl,
          username,
          email,
        } = data.data

        dispatch(
          setUserInfo({
            tokenName: tokenValue,
            userId: loginId,
            avatarUrl,
            username,
            email,
          })
        )
        cookie.save(tokenName, tokenValue)
        toast.success("登录成功")
        navigate("/")
      }
    })
  }
  const handleKeyup = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }
  return (
    <>
      <div className={s.container}>
        <img src="\madhub.png" alt="" className={s.logo} />
        <div className={s.title}>Email:</div>
        <input
          type="email"
          name="email"
          className={s.input}
          onChange={handleChange}
          onKeyUp={handleKeyup}
        />
        <div className={s.title}>Password:</div>
        <input
          type="password"
          name="password"
          className={s.input}
          onChange={handleChange}
          onKeyUp={handleKeyup}
        />
        <div className={s.error}> {errorMsg}</div>
        <div className={s.btnWrapper}>
          <button className={s.btn} onClick={handleSubmit}>
            login
          </button>
        </div>
        <div className={s.signup}>
          New here? <span onClick={navigateToRegister}>Create an account</span>
        </div>
      </div>
    </>
  )
}
export default Login
