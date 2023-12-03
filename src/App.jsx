import { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import {ConfigProvider} from "antd";
function App() {

  return (
    <>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimaryActive: 'red',
                    colorPrimaryHover: '#aea0ceff',
                    colorPrimaryTextActive: 'red',
                    colorPrimary: '#aea0ceff'
                },
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    </>

  )
}

export default App
