import { createSlice } from "@reduxjs/toolkit"

const taskSlice = createSlice({
  name: "task",
  // 设置次切片对应reducer中的初始状态
  initialState: {
    userInfo: {},
    topic: ''
  },
  // 编写业务代码处
  reducers: {
    setUserInfo(state, action) {
      // state:redux中公共状态信息.基于immer库,不需要自己克隆
      // action: 派发的行为对象,我们无需考虑行为标识,传递的其他信息,都是以action.payload的方式传递进来的值
      state.userInfo = { ...state.userInfo, ...action.payload }
    },
    setTopicNameAction(state,action){
      state.topic = action.payload
    }
  },
})

// 从切片中获取actionCreator:此处结构的方法和上线reducers中的方法,仅仅是函数名相同;执行方法,返回需要派发的行为对象,后期我们可以基于dispatch进行任务派发即可!!
export let { setUserInfo, setTopicNameAction } = taskSlice.actions

// 实现异步派发[redux-thunk]
// export const getTaskListAsync = () => {
//   return async (dispatch) => {
//     let res = await getTaskList()
//     // 注意派发时,需要使用 setTaskList
//     dispatch(setTaskList(res))
//   }
// }

export default taskSlice.reducer
