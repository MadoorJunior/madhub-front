import Post from "./Post"
import { useEffect } from 'react'
import s from './PostList.module.scss'
import { useState } from "react"
import { getPost } from "../../api/post"
import InfiniteScroll from 'react-infinite-scroll-component';
const PostList = () => {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [hasNext, setHasNext] = useState(true)

    const fetchData = () => {
        getPost({
            curPage: currentPage,
            pageSize: 10
        }).then(({ data }) => {
            setPosts(before => {
                return [...before, ...data.data.records]
            })
            setCurrentPage(p => p + 1)
            setHasNext(data.data.hasNext)
        })
    }
    useEffect(() => {
        getPost({
            curPage: 1,
            pageSize: 10
        }).then(({ data }) => {
            setHasNext(data.data.hasNext)
            setPosts(data.data.records)
            setCurrentPage(p => p + 1)
        })
    }, [])
    return (
        <div className={s.container}>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchData}
                loader={<div>loading...</div>}
                hasMore={hasNext}
                style={{
                    overflow: 'visible'
                }}
            >
                {posts.map(post => {
                    return <Post
                        id={post.id}
                        username={post.username}
                        like={post.thumbUp}
                        text={post.text}
                        time={post.createTime}
                        comment={post.comment}
                        view={post.view}
                        forward={post.forward}
                        media={post.media}
                        isLike={post.isLiked}
                        avatar={post.avatar}
                    />
                })}
            </InfiniteScroll>
        </div>
    )
}
export default PostList
