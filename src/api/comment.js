import {request} from "../utils/request.js";

export const postComment = (params)=>{
    return request({
        method: 'post',
        url: '/api/comments',
        data: params
    })
}
export const getComments = (postId)=>{
    return request({
        method: 'get',
        url: `/api/comments/${postId}`
    })
}
export const likeComment = (params)=>{
    return request({
        method: 'post',
        url: '/api/comments/like',
        data: params
    })
}
