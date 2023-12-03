import React, {useEffect, useRef, useState} from 'react';
import {Comment} from "./Comment";
import s from './CommentBlock.module.scss'
import {BiAt, BiHappyAlt, BiHash} from "react-icons/bi";
import {postComment} from "../../api/comment.js";
import cookie from "react-cookies";
import {EmojiPicker} from "../WhatsHappening/EmojiPicker.jsx";
import {Button, Tooltip} from "antd";
export const CommentBlock = ({ isDisplay, postId, comments=[], getComments, increComments }) => {
    const [content, setContent] = useState('')
    const [hintInfo, setHintInfo] = useState({})
    const [displayPicker, setDisplayPicker] = useState(false)
    const showPickerBtn = useRef(null)
    const replyRef = useRef(null)
    const replyToSb = ()=>{
        replyRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    const getCommentListTree = (comments)=>{
        const commentList = Array.prototype.map.call(comments, comment=>({
            id: comment.id,
            text: comment.content,
            time: comment.createTime,
            like: comment.likes,
            userId: comment.userId,
            username: comment.username,
            replyTo: comment.replyTo,
            isLike: comment.isLiked,
            avatar: comment.avatar
        }))
        const commentsMap = {}
        for(let comment of commentList){
            commentsMap[comment.id] = comment
        }
        for (let comment of commentList){
            if (comment.replyTo){
                commentsMap[comment.replyTo].children?
                    commentsMap[comment.replyTo].children.push(comment):
                    commentsMap[comment.replyTo].children = [comment]
            }
        }
        const res = []
        for (const id in commentsMap){
            if (!commentsMap[id].replyTo){
                res.push({...commentsMap[id]})
            }
        }
        return res
    }
    const toNodes = (item)=>{
        return (
            <Comment id={item.id} avatar={item.avatar} username={item.username} content={item.text} time={item.time} like={item.like} isLike={item.isLike} userId={item.userId} reply={replyToSb} setHint={setHintInfo}>
                {item.children&&item.children.map(toNodes)}
            </Comment>
        )
    }
    const comment = ()=>{
        const userId = cookie.load('userId')
        const { commentId } = hintInfo
        postComment({
            content: content,
            userId: userId,
            postId: postId,
            replyTo: commentId
        }).then(res=>{
            setContent('')
            getComments()
            increComments(prev=>prev+1)
        })
    }
    useEffect(()=>{

    }, [])
    return (
        <div style={{
            position: 'relative'
        }}>
            <div className={s.emoji} ref={showPickerBtn}>
                {displayPicker &&
                    <EmojiPicker
                        setContent={setContent}
                        displayPicker={displayPicker}
                        setDisplayPicker={setDisplayPicker}
                        pickBtn={showPickerBtn}
                    />}
            </div>
            <div className={s.container} style={
                {
                    gridTemplateRows: isDisplay?'1fr':'0fr'
                }
            }>
                <div>
                    <div className={s.reply}>
                    <textarea value={content} onChange={(e)=>{
                        setContent(e.target.value)
                    }} ref={replyRef} name="" id="" rows="3" className={s.text} placeholder={hintInfo.username?`reply to ${hintInfo?.username}`:''}></textarea>
                        <ul className={s.operatorContainer}>
                            <div className={s.icon} onClick={()=>{
                                setDisplayPicker(prev=>!prev)
                            }}><BiHappyAlt/></div>
                            <div className={s.icon}><BiHash/></div>
                            <div className={s.icon}><BiAt/></div>
                            <div className={s.btn}>
                                <button className={s.comment} onClick={comment}>comment</button>
                                <button className={s.cancel} onClick={()=>{
                                    if (content){
                                        setContent('')
                                    }else{
                                        setHintInfo({})
                                    }
                                }}>{content?'clear':'cancel'}</button>
                            </div>
                        </ul>
                    </div>
                    {
                        getCommentListTree(comments).map(toNodes)
                    }
                </div>
            </div>
        </div>
    );
};
