import { useState } from "react"
import s from "./Topic.module.scss"
import { useEffect } from "react"
import { getTopic, getTopicInfo } from "../../api/topic"
import PostList from "../../components/PostList/PostList"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Drawer } from "antd"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import { useSearchParams } from "react-router-dom"
import { setTopicNameAction } from "../../utils/store/taskSlice"
export const Topic = () => {
  const { topic } = useSelector((state) => state.userInfo)
  const dispatch = useDispatch()

  const [topicList, setTopicList] = useState([])
  const [open, setOpen] = useState(false)
  const [topicInfo, setTopicInfo] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    getTopic().then((res) => {
      setTopicList(res.data.data)
    })
  }, [])
  const handleTopicClick = (t) => {
    return () => {
      // navigate("/", { state: { topic: t.topicName } })
      dispatch(setTopicNameAction(t.topicName))
      setOpen(false)
    }
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handelClose = () => {
    setOpen(false)
  }
  const handleToggle = () => {
    setOpen((prev) => !prev)
  }
  useEffect(() => {
    getTopicInfo(topic).then((res) => {
      setTopicInfo(res.data.data)
    })
  }, [topic])
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          padding: "10px",
          fontSize: "1.3rem",
          color: "#aea0ce",
        }}
      >
        <div style={{ cursor: "pointer" }} onClick={handleToggle}>
          Topic Picker
          {open ? (
            <UpOutlined style={{ marginLeft: "5px" }} />
          ) : (
            <DownOutlined style={{ marginLeft: "5px" }} />
          )}
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <Drawer
          placement="top"
          closable={false}
          onClose={handelClose}
          open={open}
          getContainer={false}
        >
          <div className={s.topicWrapper}>
            {topicList.map((t) => {
              return (
                <div
                  key={t.id}
                  className={s.topicItem}
                  onClick={handleTopicClick(t)}
                >
                  #{t.topicName}
                </div>
              )
            })}
          </div>
        </Drawer>
        {topic ? (
          <div className={s.topicCard}>
            <div className={s.left}>
              <h2 className={s.title}>#{topicInfo.topicName}#</h2>
              <p className={s.description}>{topicInfo.description}</p>
              <div className={s.proper}>讨论：{topicInfo.heat}</div>
            </div>
            <div className={s.pic}>
              <img
                src="http://222.192.6.51:9099/madhub/i1z3zuub2v9-_LJzwMSc_400x400.jpg"
                width={"100px"}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <PostList topic={topic} />
    </div>
  )
}
