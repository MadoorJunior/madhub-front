import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './Register.module.scss'
import { signUp } from '../../api/auth'
import { toast } from 'react-toastify'
import {AvatarUpload} from "../../components/Upload/AvatarUpload.jsx";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^.{3,20}$/;
const PASSWORD_REGEX = /^.{6,20}$/;
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [avatar, setAvatar] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const { name, email, password, confirmPassword } = formData;

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    const navigate = useNavigate()
    const navigateToLogin = () => {
        navigate('/login')
    }

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        setErrorMsg(null)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!name || !email || !password || !confirmPassword) {
            setErrorMsg('请填满所有信息')
        } else if (!EMAIL_REGEX.test(emailRef.current.value)) {
            setErrorMsg('邮箱格式错误')
        } else if (!NAME_REGEX.test(nameRef.current.value)) {
            setErrorMsg('昵称长度请在3-20以内')
        } else if (!PASSWORD_REGEX.test(passwordRef.current.value)) {
            setErrorMsg('密码长度请在6-20以内')
        } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setErrorMsg('两次密码输入不一致')
        } else {
            signUp({
                username: name,
                email,
                password,
                avatarUrl: avatar
            }).then(({ data }) => {
                if(data.code!==20000){
                    setErrorMsg(data.message)
                }else{
                    toast.success('注册成功')
                    navigate('/login')
                }
            })
        }
    }
    const handleKeyup = e => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }
    return (
        <>
            <div className={s.container}>
                <img src="\madhub.png" alt="" className={s.logo} />
                <div className={s.title}>Avatar:</div>
                <AvatarUpload setAvatar={setAvatar}/>
                <div className={s.title}>Email:</div>
                <input
                    type="email"
                    name='email'
                    className={s.input}
                    onChange={handleChange}
                    onKeyUp={handleKeyup}
                    ref={emailRef}
                />
                <div className={s.title}>Name:</div>
                <input
                    type="text"
                    name='name'
                    className={s.input}
                    onChange={handleChange}
                    onKeyUp={handleKeyup}
                    ref={nameRef}
                />
                <div className={s.title}>Password:</div>
                <input
                    type="password"
                    name='password'
                    className={s.input}
                    onChange={handleChange}
                    onKeyUp={handleKeyup}
                    ref={passwordRef}
                />
                <div className={s.title}>Confirm Password:</div>
                <input
                    type="password"
                    name='confirmPassword'
                    className={s.input}
                    onChange={handleChange}
                    onKeyUp={handleKeyup}
                    ref={confirmPasswordRef}
                />
                <div className={s.error}> {errorMsg}</div>
                <div className={s.btnWrapper}>
                    <button className={s.btn} onClick={handleSubmit}>sign up</button>
                </div>
                <div className={s.signup}>Have an account? <span onClick={navigateToLogin}>Login in here</span></div>
            </div>
        </>
    )
}
export default Register
