import cookie from 'react-cookies'
import { useNavigate } from 'react-router-dom'
import s from './LeftBar.module.scss'
import { checkLogin, getAuthInfo, logout } from '../../api/auth';
import {Avatar, Dropdown} from "antd";
import {
    BorderlessTableOutlined,
    EllipsisOutlined,
    HomeOutlined,
    UserOutlined,
    VerticalLeftOutlined
} from "@ant-design/icons";
export const LeftBar = ()=>{
    const navigate = useNavigate()
    const showInfo = ()=>{
        const info = cookie.loadAll()
        console.log(info);
        getAuthInfo().then(res=>{
            console.log(res);
        })
    }
    const handleLogout= ()=>{
        logout().then(res=>{
            cookie.remove('satoken')
            navigate('/login')
        })
    }
    const avatarUrl = cookie.load('avatarUrl')
    const username = cookie.load('username')
    const email = cookie.load('email')
    const items = [
        {
            key: '1',
            label: 'logout',
            icon: <VerticalLeftOutlined />,
            onClick:()=>{
                handleLogout()
            }
        }
    ];
    return (
        <div className={s.leftBar}>
            <div className={s.top}>
                <li><HomeOutlined className={s.ic}/>Homepage</li>
                <li><BorderlessTableOutlined className={s.ic}/>Topic</li>
                <li><UserOutlined className={s.ic}/>Profile</li>
            </div>
            <div className={s.bottom}>
                <div className={s.avatar}>
                    <Avatar size={40} src={avatarUrl}/>
                </div>
                <div className={s.userInfo}>
                    <div className={s.username}>{username}</div>
                    <div className={s.email}>{email}</div>
                </div>
                <div className={s.icon}>
                    <Dropdown
                        menu={{
                            items,

                        }}
                        placement="top"
                    >
                        <EllipsisOutlined style={{fontSize:'1.5rem'}}/>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}
