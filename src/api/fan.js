import { request } from "../utils/request.js"

export const isFollow = (params) => {
  return request({
    method: "post",
    url: "/api/fans/isfollow",
    data: params,
  })
}
export const follow = (params) => {
  return request({
    method: "post",
    url: "/api/fans/follow",
    data: params,
  })
}
export const followCount = (userId) => {
  return request({
    method: "get",
    url: "/api/fans/count/" + userId,
  })
}
