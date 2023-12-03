import dayjs from 'dayjs'
import TimeAgo from 'react-timeago'
import s from './Post.module.scss'
import { BiBarChart, BiComment, BiHeart, BiRepost } from 'react-icons/bi'
import {Avatar, Button, Dropdown, Image} from "antd";
import {CommentBlock} from "../Comment/CommentBlock.jsx";
import {useEffect, useState} from "react";
import {getComments} from "../../api/comment.js";
import {likePost} from "../../api/post.js";
import cookie from "react-cookies";
import ReactPlayer from "react-player";
import {isPic, isVideo} from "../../utils/fileType.js";
import {HeartFilled} from "@ant-design/icons";

const Post = ({id, username, avatar, time, text, comment, like, forward, view, media, isLike=false}) => {

    const [isDisplayComment, setIsDisplayComment] = useState(false)
    const [comments, setComments] = useState([])
    const [isLiked, setIsLiked] = useState(isLike)
    const [likeNum, setLikeNum] = useState(like)
    const [commentNum, setCommentNum] = useState(comment)

    let images = media?.picsUrl?Array.from(media?.picsUrl).filter(i=>isPic(i)):[]
    const videoPlayer = ()=>{
        if (media?.picsUrl){
            const videoUrl = [].find.call(media?.picsUrl, i=>isVideo(i))
            if (videoUrl){
                return (
                    <div>
                        <ReactPlayer width={'90%'} controls={true} url={`http://${videoUrl}`}/>
                    </div>
                )
            }
        }
    }
    const getCommentData = () => {
        getComments(id).then(({data}) => {
            setComments(data.data)
        })
    }
    const likePostMethod = ()=>{
        likePost({
            userId: cookie.load('userId'),
            postId: id,
            isLiked: isLiked
        }).then(res=>{
            console.log(res)
        })
        isLiked ? setLikeNum(prev => prev - 1) : setLikeNum(prev => prev + 1)
        setIsLiked(prev=>!prev)
    }

    useEffect(()=>{
        getCommentData()
    },[isDisplayComment])
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ]
    return (
        <div>
            <div className={s.post}>
                <div className={s.avatar}> <Avatar size={40} src={avatar}/></div>
                <div className={s.content}>
                    <div className={s.nickname}>{username}</div>
                    <div className={s.time}>
                        {dayjs(time).format('YYYY-MM-DD HH:mm')}
                        &nbsp;
                        (
                        <TimeAgo date={time}></TimeAgo>
                        )
                    </div>
                    <div className={s.text}>
                        {text}
                    </div>
                    <ul>
                        {videoPlayer()}
                        <Image.PreviewGroup
                            preview={{
                                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                            }}
                        >
                            {images&&images.map(i=><Image
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover'
                                }}
                                src={`http://${i}`}
                            />)}
                        </Image.PreviewGroup>
                    </ul>
                    <div className={s.operate}>
                        <div className={s.block}
                            onClick={()=>{
                                setIsDisplayComment(prevState => !prevState)
                            }}>
                            <BiComment/>
                            <span>{commentNum}</span>
                        </div>
                        <div className={s.block}
                            onClick={likePostMethod}
                        >
                            <div className={isLiked?`${s.heart} ${s.active}`:s.heart}></div>
                            <span className={s.likeNum}>{likeNum}</span>
                        </div>
                        <div className={s.block}><BiRepost /><span>{forward}</span></div>
                        <div className={s.block}><BiBarChart /><span>{view}</span></div>
                    </div>
                </div>
            </div>
            <div>
                <CommentBlock isDisplay={isDisplayComment} postId={id} comments={comments} getComments={getCommentData} increComments={setCommentNum}/>
            </div>

        </div>
        )


}
export default Post
