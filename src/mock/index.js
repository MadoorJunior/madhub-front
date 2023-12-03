import { request } from "../utils/request"
export const getPost = (params)=>{
    return request({
        method: 'get',
        url: '/1954453-0-default/posts',
        params
    })
}