import { useRef, useState } from "react"
import { Avatar, Modal, Input, Flex, Typography } from "antd"
import { EnvironmentOutlined, PictureOutlined } from "@ant-design/icons"
import { MdOutlinePhotoCamera } from "react-icons/md"
import cookie from "react-cookies"
import s from "./Profile.module.scss"
import { useEffect } from "react"
import Compressor from "compressorjs"
import { uploadPic } from "../../api/post"
import { getProfile, saveProfile } from "../../api/auth"
import { MdOutlineMail } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { follow, followCount, isFollow } from "../../api/fan"
import { setUserInfo } from "../../utils/store/taskSlice"
const { TextArea } = Input
export const Profile = () => {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [avatarUrl, setAvatar] = useState()
  const [bgUrl, setBgUrl] = useState()
  const [email, setEmail] = useState()
  const [location, setLocation] = useState()
  const [isFollowed, setIsFollowed] = useState()
  const [followCountNum, setFollowCount] = useState(0)
  const [fanCountNum, setFanCount] = useState(0)

  const bg = useRef(null)
  const [open, setOpen] = useState(false)
  const bgFile = useRef(null)
  const avFile = useRef(null)
  const newBgRef = useRef(null)
  const params = useParams()
  const { userInfo } = useSelector((state) => state.userInfo)
  const dispatch = useDispatch()

  let isSelf = params.id === userInfo.userId
  if (!params.id) {
    isSelf = true
  }
  const onAvatarUpload = async (event) => {
    if (event.target.files[0]) {
      const fileInfo = event.target.files[0]
      const randomId = Math.random().toString(36).substr(2)
      const filename = `${randomId}-${fileInfo.name}`
      const fmData = new FormData()
      new Compressor(fileInfo, {
        width: 800,
        success: (file) => {
          fmData.append("file", file)
          fmData.append("filename", filename)
          uploadPic(fmData).then(() => {
            const host = import.meta.env.VITE_MINIO_HOST
            setAvatar(`http://${host}/madhub/${filename}`)
          })
        },
      })
    }
  }
  const onBgUpload = (event) => {
    if (event.target.files[0]) {
      const fileInfo = event.target.files[0]
      const randomId = Math.random().toString(36).substr(2)
      const filename = `${randomId}-${fileInfo.name}`
      const fmData = new FormData()
      fmData.append("file", fileInfo)
      fmData.append("filename", filename)
      uploadPic(fmData).then(() => {
        const host = import.meta.env.VITE_MINIO_HOST
        setBgUrl(`http://${host}/madhub/${filename}`)
      })
    }
  }
  const onProfileSave = () => {
    const userId = userInfo.userId
    saveProfile({
      userId: userId,
      username: name,
      bio: bio,
      avatarUrl: avatarUrl,
      bgUrl: bgUrl,
    }).then(() => {
      dispatch(
        setUserInfo({
          avatarUrl,
          username: name,
        })
      )
    })
    setOpen(false)
  }
  const handleFollow = () => {
    if (isFollowed) {
      setFanCount((prev) => prev - 1)
    } else {
      setFanCount((prev) => prev + 1)
    }
    follow({
      userId: userInfo.userId,
      followId: params.id,
    }).then(() => {
      setIsFollowed((prev) => !prev)
    })
  }
  useEffect(() => {
    const userId = params.id ? params.id : userInfo.userId
    getProfile(userId).then((res) => {
      const data = res.data.data
      setAvatar(data.avatarUrl)
      setBgUrl(data.bgUrl)
      setBio(data.bio)
      setName(data.username)
      setEmail(data.email)
      setLocation(data.location)
    })
    followCount(userId).then((res) => {
      const { followCount, fanCount } = res.data.data
      setFollowCount(followCount)
      setFanCount(fanCount)
    })
    if (isSelf === false) {
      isFollow({
        userId: userInfo.userId,
        followId: params.id,
      }).then((res) => {
        setIsFollowed(res.data.data)
      })
    }
  }, [isSelf])
  return (
    <div className={s.profile}>
      <div
        ref={bg}
        className={s.bg}
        style={{
          backgroundImage: `url('${bgUrl}')`,
        }}
      ></div>
      <div className={s.avatar}>
        <div>
          <Avatar size={128} src={avatarUrl} className={s.av} />
        </div>
        <div className={s.btn}>
          {isSelf ? (
            <button
              className={s.edit}
              onClick={() => {
                setOpen(true)
              }}
            >
              Edit profile
            </button>
          ) : (
            <button className={s.edit} onClick={handleFollow}>
              {isFollowed ? "已关注" : "关注"}
            </button>
          )}
        </div>
      </div>
      <div className={s.info}>
        <h3>{name}</h3>
        <div className={s.at}>
          <MdOutlineMail />
          &nbsp; {email}
        </div>

        <div className={s.at}>
          <EnvironmentOutlined />
          &nbsp; {location}
        </div>
        <p className={s.bio}>{bio}</p>
        <div className={s.at}>
          <span className={s.fblock}>
            <span className={s.num}>{followCountNum}</span> Following
          </span>
          &nbsp;
          <span className={`${s.follow} ${s.fblock}`}>
            <span className={s.num}>{fanCountNum}</span> Followers
          </span>
        </div>
      </div>
      <Modal
        title="Edit Profile"
        centered
        open={open}
        onOk={onProfileSave}
        onCancel={() => setOpen(false)}
      >
        <div
          className={s.bgWrap}
          ref={newBgRef}
          style={{
            backgroundImage: `url('${bgUrl}')`,
          }}
        >
          <input
            type="file"
            className={s.bgUp}
            ref={bgFile}
            onChange={onBgUpload}
          />
          <div className={s.ic}>
            <PictureOutlined
              className={s.icon}
              onClick={() => {
                bgFile.current.click()
              }}
            />
          </div>
        </div>
        <div className={s.avatarWrap}>
          <Avatar src={avatarUrl} className={s.avIcon} />
          <MdOutlinePhotoCamera
            className={s.avUp}
            onClick={() => {
              avFile.current.click()
            }}
          />
        </div>
        <input
          type="file"
          ref={avFile}
          className={s.op}
          onChange={onAvatarUpload}
        />
        <Flex
          vertical
          gap={22}
          style={{
            position: "relative",
            top: "-2rem",
          }}
        >
          <div>
            <Typography.Title level={5}>Name</Typography.Title>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              size="large"
              count={{
                show: true,
                max: 15,
              }}
              status={name.length === 0 ? "error" : ""}
            />
          </div>

          <div>
            <Typography.Title level={5}>Bio</Typography.Title>
            <TextArea
              title="mad"
              showCount
              maxLength={100}
              onChange={(e) => {
                setBio(e.target.value)
              }}
              value={bio}
              style={{
                height: 120,
                resize: "none",
              }}
            />
          </div>
        </Flex>
      </Modal>
    </div>
  )
}
