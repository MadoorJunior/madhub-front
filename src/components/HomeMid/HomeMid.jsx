import { useState } from 'react'
import PostList from '../PostList/PostList'
import WhatsHappening from '../WhatsHappening/WhatsHappening'
import s from './HomeMid.module.scss'
import cookie from "react-cookies";
const HomeMid = ()=>{
    const [isActive, setIsActive] = useState(true)
    const handleToggle = ()=>{
        setIsActive(prev=>!prev)
    }
    const avatar = cookie.load('avatarUrl')
    return (
        <div className={s.wrapper}>
            <div className={s.pick}>
                <div className={isActive?s.selected:''} onClick={handleToggle}>Following</div>
                <div className={!isActive?s.selected:''} onClick={handleToggle}>广场</div>
            </div>
            <WhatsHappening avatar={avatar}/>
            <PostList/>
        </div>
    )
}
export default HomeMid
