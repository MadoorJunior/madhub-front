import { request } from "../utils/request"
export const getTopic = () => {
  return request({
    method: "get",
    url: "/api/topic",
  })
}
export const addTopic = (params) => {
  return request({
    method: "post",
    url: "/api/topic",
    data: params,
  })
}
export const getTopicInfo = (params) => {
  return request({
    method: "get",
    url: "/api/topic/" + params,
  })
}
