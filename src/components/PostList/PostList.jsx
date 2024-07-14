import Post from "./Post"
import { useEffect } from "react"
import s from "./PostList.module.scss"
import { useState } from "react"
import { getPost } from "../../api/post"
import InfiniteScroll from "react-infinite-scroll-component"
const PostList = ({ topic = undefined }) => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNext, setHasNext] = useState(true)

  const fetchData = () => {
    getPost({
      curPage: currentPage,
      pageSize: 10,
      topic,
    }).then(({ data }) => {
      console.log(data)
      setPosts((before) => {
        return [...before, ...data.data.records]
      })
      setCurrentPage((p) => p + 1)
      setHasNext(data.data.hasNext)
    })
  }
  useEffect(() => {
    getPost({
      curPage: 1,
      pageSize: 10,
      topic,
    }).then(({ data }) => {
      setHasNext(data.data.hasNext)
      setPosts(data.data.records)
      setCurrentPage((p) => p + 1)
    })
  }, [topic])
  return (
    <div className={s.container}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchData}
        loader={<div>loading...</div>}
        hasMore={hasNext}
        style={{
          overflow: "visible",
          margin: "0",
          padding: "0",
        }}
      >
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              username={post.username}
              like={post.thumbUp}
              text={post.text}
              time={post.createTime}
              comment={post.comment}
              forward={post.forward}
              media={post.media}
              isLike={post.isLiked}
              avatar={post.avatar}
              userId={post.userId}
            />
          )
        })}
      </InfiniteScroll>
    </div>
  )
}
export default PostList
