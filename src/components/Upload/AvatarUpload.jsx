import React, {useRef, useState} from 'react';
import s from './AvatarUpload.module.scss'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {Avatar, message, Upload} from 'antd';
import {uploadPic} from "../../api/post.js";

export const AvatarUpload = ({setAvatar})=>{
    const [loading, setLoading] = useState(false)
    const [imgUrl, setImg] = useState('')
    const inputRef = useRef(null)
    const handleUpload = ()=>{
        inputRef.current.click()
    }
    const fileInputChange = (event)=>{
        if (event.target.files[0]){
            setLoading(true)
            const fileInfo = event.target.files[0]
            const randomId = Math.random().toString(36).substr(2);
            const filename = `${randomId}-${fileInfo.name}`
            const fmData = new FormData()
            fmData.append('file', fileInfo)
            fmData.append('filename', filename)
            uploadPic(fmData).then(res=>{
                const host = import.meta.env.VITE_MINIO_HOST
                setLoading(false)
                setImg(`http://${host}/madhub/${filename}`)
                setAvatar(`http://${host}/madhub/${filename}`)
            })

        }

    }
    return <div className={s.box}>
        {
            imgUrl?<Avatar src={imgUrl} size={128} className={s.img} onClick={handleUpload}/>:
            <div className={s.upload} onClick={handleUpload}>
            {loading ? <LoadingOutlined style={{fontSize: '1.8rem'}}/> : <PlusOutlined style={{fontSize: '1.8rem'}}/>}
        </div>
        }
        <input id="file" type="file"
               style={{display:'none'}}
               onChange={fileInputChange}
               ref={inputRef}
               accept={'image/*'}
        />
    </div>
}
