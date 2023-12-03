import s from './WhatsHappening.module.scss'
import { BiChevronDown, BiHappyAlt, BiHash, BiImage, BiAt } from 'react-icons/bi'
import { EmojiPicker } from './EmojiPicker'
import React, { useState } from 'react'
import { useRef } from 'react'
import { postOne } from '../../api/post'
import {ImageUploader} from "./ImageUploader";
import {Avatar} from "antd";
const WhatsHappening = ({avatar}) => {
    const [content, setContent] = useState('')
    const [displayPicker, setDisplayPicker] = useState(false)
    const [fileList, setFileList] = useState([]);
    const showPickerBtn = useRef(null)
    const uploadRef = useRef(null)
    const picsUrl = fileList.map(file=>file.xhr)
    const handleChange = e => {
        setContent(e.target.value)
    }
    const addPic = ({ fileList: newFileList }) => setFileList(newFileList)
    const post = ()=>{
        postOne({
            content: content,
            isAnonymous: false,
            media:{
                picsUrl
            }
        }).then(res=>{
            setContent('')
            window.location.reload()
            // console.log(picsUrl)
        })

    }
    return (
        <div className={s.what}>
            <div className={s.avater}>
                <Avatar src={avatar} size={40}/>
            </div>
            <div className={s.wrapper}>
                <div className={s.scope}>
                    Everyone
                    <BiChevronDown className={s.icon}/>
                </div>
                <textarea name="" id="" cols="30" rows="4" className={s.text} value={content} onChange={handleChange}/>
                <ImageUploader fileList={fileList} addPic={addPic} uploadRef={uploadRef}/>
                <ul className={s.container}>
                    <div
                        onClick={()=>{
                            uploadRef.current.click()
                        }}
                    ><BiImage/></div>
                    <div onClick={() => {
                        setDisplayPicker(prev => !prev)
                    }}><BiHappyAlt/></div>
                    <div><BiHash/></div>
                    <div><BiAt/></div>
                </ul>
                <button className={s.post} onClick={post}>Post</button>
            </div>
            <div className={s.emoji} ref={showPickerBtn}>
                {displayPicker &&
                    <EmojiPicker
                        setContent={setContent}
                        displayPicker={displayPicker}
                        setDisplayPicker={setDisplayPicker}
                        pickBtn={showPickerBtn}
                    />}

            </div>

        </div>
    );
}
export default WhatsHappening
