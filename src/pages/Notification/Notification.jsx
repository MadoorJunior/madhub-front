import { useState } from "react"
import s from "./Notification.module.scss"
import { useEffect } from "react"
import { getAllLikeNotification, getNotification } from "../../api/notification"
import { useSelector } from "react-redux"
import { Avatar } from "antd"
import { LikeOutlined } from "@ant-design/icons"
import InfiniteScroll from "react-infinite-scroll-component"
export const Notification = () => {
  const [isActive, setIsActive] = useState(0)
  const [likeList, setLikeList] = useState([])
  const [hasNext, setHasNext] = useState(true)
  const { userInfo } = useSelector((state) => state.userInfo)
  const headItems = ["Like", "Post Replies", "Follow", "Mentions"]
  const activeTab = (index) => {
    return () => {
      setIsActive(index)
    }
  }
  const fetchData = () => {}
  useEffect(() => {
    getNotification({
      curPage: 0,
      pageSize: 10,
    }).then((res) => {
      console.log(res.data.data)
      setLikeList(res.data.data.records)
      setHasNext(res.data.data.hasNext)
    })
  }, [])
  return (
    <div>
      <div className={s.head}>
        {headItems.map((value, index) => {
          return (
            <div
              key={index}
              onClick={activeTab(index)}
              className={isActive === index ? s.selected : ""}
            >
              {value}
            </div>
          )
        })}
      </div>
      <div>
        <InfiniteScroll
          dataLength={likeList.length}
          next={fetchData}
          loader={<div>loading...</div>}
          hasMore={hasNext}
          style={{
            overflow: "visible",
            margin: "0",
            padding: "0",
          }}
        ></InfiniteScroll>
      </div>
    </div>
  )
}
