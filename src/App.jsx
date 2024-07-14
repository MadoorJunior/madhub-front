import { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { ConfigProvider } from "antd"
import HomeMid from "./components/HomeMid/HomeMid"
import { Profile } from "./pages/Profile/Profile"
import { Topic } from "./pages/Topic/Topic"
import { Notification } from "./pages/Notification/Notification"
function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimaryActive: "red",
            colorPrimaryHover: "#aea0ceff",
            colorPrimaryTextActive: "red",
            colorPrimary: "#aea0ceff",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<HomeMid />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/topic" element={<Topic />} />
              <Route path="/notification" element={<Notification />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  )
}

export default App
