import { request } from "../utils/request"

export const getAllLikeNotification = (params) => {
  return request({
    method: "post",
    url: "/api/posts/allLike/" + params,
  })
}
export const getNotification = (params) => {
  return request({
    method: "post",
    url: "/api/notification/query",
    data: params,
  })
}
