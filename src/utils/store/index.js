import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./taskSlice"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
const reducers = combineReducers({
  userInfo: taskReducer,
})

const persistConfig = {
  key: "root",
  storage,
  // 黑名单 不缓存的
  blacklist: ["page404"],
}
const persistedReducer = persistReducer(persistConfig, reducers)
// 切片模块
const store = configureStore({
  reducer: persistedReducer,
})

export default store
