import { request } from "../utils/request"
export const signUp = (params)=>{
    return request({
        method: 'post',
        url: '/api/users/register',
        data: params
    })
}
export const login = (params)=>{
    return request({
        method: 'post',
        url: '/api/users/login',
        data: params
    })
}
export const logout = ()=>{
    return request({
        method: 'post',
        url: '/api/users/logout'
    })
}
export const getAuthInfo = ()=>{
    return request({
        method: 'post',
        url: '/api/users/info'
    })
}
export const checkLogin = ()=>{
    return request({
        method: 'get',
        url: '/api/users/check'
    })
}