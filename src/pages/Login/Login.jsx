import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import { toast } from 'react-toastify'
import cookie from 'react-cookies'
import s from './Login.module.scss'
const Login = () => {
    const navigate = useNavigate()
    const navigateToRegister = () => {
        navigate('/register')
    }
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    const [errorMsg, setErrorMsg] = useState('')
    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        setErrorMsg('')
    }
    const handleSubmit = () => {
        login({ email, password }).then(({ data }) => {
            if (data.code !== 20000) {
                setErrorMsg(data.message)
            } else {
                const {saTokenInfo: {tokenName, tokenValue, loginId}, avatarUrl, username, email} = data.data
                cookie.save(tokenName, tokenValue)
                cookie.save('userId', loginId)
                cookie.save('avatarUrl', avatarUrl)
                cookie.save('username', username)
                cookie.save('email', email)
                toast.success('登录成功')
                navigate('/')
            }
        })
    }
    const handleKeyup = e => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }
    return (
        <>
            <div className={s.container}>
                <img src="\madhub.png" alt="" className={s.logo} />
                <div className={s.title}>Email:</div>
                <input type="email" name='email' className={s.input} onChange={handleChange} onKeyUp={handleKeyup} />
                <div className={s.title}>Password:</div>
                <input type="password" name='password' className={s.input} onChange={handleChange} onKeyUp={handleKeyup} />
                <div className={s.error}> {errorMsg}</div>
                <div className={s.btnWrapper}>
                    <button className={s.btn} onClick={handleSubmit}>login</button>
                </div>
                <div className={s.signup}>New here? <span onClick={navigateToRegister}>Create an account</span></div>
            </div>

        </>
    )
}
export default Login
