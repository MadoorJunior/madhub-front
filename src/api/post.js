import { request } from "../utils/request"

export const getPost = (params) => {
  return request({
    method: "post",
    url: "/api/posts/list",
    data: params,
  })
}
export const postOne = (params) => {
  return request({
    method: "post",
    url: "/api/posts",
    data: params,
  })
}
export const uploadPic = (formData) => {
  return request({
    method: "post",
    url: "/api/posts/pic",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
export const likePost = (params) => {
  return request({
    method: "post",
    url: "/api/posts/like",
    data: params,
  })
}
export const getAtlist = () => {
  return request({
    method: "get",
    url: "/api/posts/atlist",
  })
}
