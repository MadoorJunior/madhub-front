import React, { useState } from "react"
import s from "./Comment.module.scss"
import dayjs from "dayjs"
import TimeAgo from "react-timeago"
import { BiComment } from "react-icons/bi"
import { likeComment } from "../../api/comment.js"
import { Avatar } from "antd"

export const Comment = ({
  id,
  username = "madoor",
  avatar,
  time,
  content = "123",
  like = 10,
  userId,
  reply,
  isLike = false,
  setHint,
  children,
}) => {
  const [isLiked, setIsLiked] = useState(isLike)
  const [likeNum, setLikeNum] = useState(like)
  const likeCommentMethod = () => {
    likeComment({
      userId: userId,
      postId: id,
      isLiked: isLiked,
    }).then((res) => {
      console.log(res)
    })
    isLiked ? setLikeNum((prev) => prev - 1) : setLikeNum((prev) => prev + 1)
    setIsLiked((prev) => !prev)
  }
  return (
    <div
      style={{
        margin: "0 !important",
        padding: 0,
      }}
    >
      <div className={s.block}>
        <div className={s.avatar}>
          <Avatar src={avatar} />
        </div>
        <div className={s.content}>
          <div className={s.nickname}>{username}</div>
          <div className={s.time}>
            {dayjs(time).format("YYYY-MM-DD HH:mm")}
            &nbsp; (<TimeAgo date={time}></TimeAgo>)
          </div>
          <div className={s.text}>{content}</div>
          <div className={s.operate}>
            <div className={s.wrapper} onClick={likeCommentMethod}>
              <div
                className={isLiked ? `${s.heart} ${s.active}` : s.heart}
              ></div>
              <span className={s.likeNum}>{likeNum}</span>
            </div>
            <div
              className={s.wrapper}
              onClick={() => {
                reply()
                setHint({
                  commentId: id,
                  userId: userId,
                  time: time,
                  username: username,
                })
              }}
            >
              <BiComment />
            </div>
          </div>
        </div>
      </div>
      {children && <div className={s.childContainer}>{children}</div>}
    </div>
  )
}
