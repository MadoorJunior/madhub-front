import { useState } from "react"
import PostList from "../PostList/PostList"
import WhatsHappening from "../WhatsHappening/WhatsHappening"
import s from "./HomeMid.module.scss"
import { useSearchParams } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
const HomeMid = () => {
  const [isActive, setIsActive] = useState(true)
  const handleToggle = () => {
    setIsActive((prev) => !prev)
  }
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const { userInfo } = useSelector((state) => state.userInfo)
  const avatar = userInfo.avatarUrl
  useEffect(() => {
    // setSearchParams({ topic: "madoor", age: 11 })
    console.log(location.state)
    console.log(searchParams)
  }, [])
  return (
    <div className={s.wrapper}>
      <div className={s.pick}>
        <div className={isActive ? s.selected : ""} onClick={handleToggle}>
          Following
        </div>
        <div className={!isActive ? s.selected : ""} onClick={handleToggle}>
          Broadcasting
        </div>
      </div>
      <WhatsHappening avatar={avatar} />
      <PostList topic={location?.state?.topic} />
    </div>
  )
}
export default HomeMid
