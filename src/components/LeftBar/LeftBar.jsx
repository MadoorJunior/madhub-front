import cookie from "react-cookies"
import { useNavigate } from "react-router-dom"
import s from "./LeftBar.module.scss"
import { checkLogin, getAuthInfo, logout } from "../../api/auth"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, Dropdown } from "antd"
import { toast } from "react-toastify"
import {
  BorderlessTableOutlined,
  EllipsisOutlined,
  HomeOutlined,
  UserOutlined,
  VerticalLeftOutlined,
  BellOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import { EventSourcePolyfill } from "event-source-polyfill"
import { useEffect } from "react"
export const LeftBar = () => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.userInfo)
  const showInfo = () => {
    const info = cookie.loadAll()
    console.log(info)
    getAuthInfo().then((res) => {
      console.log(res)
    })
  }
  const handleLogout = () => {
    logout().then((res) => {
      cookie.remove("satoken")
      navigate("/login")
    })
  }
  const { avatarUrl, username, email, userId } = userInfo
  const items = [
    {
      key: "1",
      label: "logout",
      icon: <VerticalLeftOutlined />,
      onClick: () => {
        handleLogout()
      },
    },
  ]
  const notificationBtn = () => {
    navigate("/notification")
  }
  const createSseConnect = () => {
    if (window.EventSource) {
      const host = import.meta.env.VITE_BASE_URL
      var source = new EventSource(`${host}/notification/connect/${userId}`, {
        withCredentials: true,
      })
      console.log(document.cookie)
      source.onopen = (e) => {
        console.log("打开连接 onopen==>", e)
        toast.success("建立连接成功")
      }
      source.onerror = (e) => {
        console.log(e)
        toast.warn("已断开与后端连接")
      }
      // 监听消息事件
      source.onmessage = (e) => {
        console.log(e.data)
        toast.success(e.data)
      }

      // 关闭连接
      source.close = function (e) {
        toast.warn("断开 οnerrοr==>", e)
      }
    } else {
      alert("该浏览器不支持sse")
    }
  }
  useEffect(() => {
    createSseConnect()
  }, [])
  return (
    <div className={s.leftBar}>
      <div className={s.top}>
        <li
          onClick={() => {
            navigate("/")
          }}
        >
          <HomeOutlined className={s.ic} />
          Homepage
        </li>
        <li
          onClick={() => {
            navigate("/topic")
          }}
        >
          <BorderlessTableOutlined className={s.ic} />
          Topic
        </li>
        <li
          onClick={() => {
            navigate("/profile")
          }}
        >
          <UserOutlined className={s.ic} />
          Profile
        </li>
        <li onClick={notificationBtn}>
          <BellOutlined className={s.ic} />
          Notification
        </li>
      </div>
      <div className={s.bottom}>
        <div className={s.avatar}>
          <Avatar size={50} src={avatarUrl} />
        </div>
        <div className={s.userInfo}>
          <div className={s.username}>{username}</div>
          <div className={s.email}>{email}</div>
        </div>
        <div className={s.icon}>
          <Dropdown
            menu={{
              items,
            }}
            placement="top"
          >
            <EllipsisOutlined style={{ fontSize: "1.5rem" }} />
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
