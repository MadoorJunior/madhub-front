import React, {useImperativeHandle, useRef, useState} from 'react';
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import s from './ImageUploader.module.scss'
import {uploadPic} from "../../api/post.js";
import {isPic, isVideo} from "../../utils/fileType.js";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
export const ImageUploader = ({fileList, addPic, uploadRef}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [progress, setProgress] = useState(0)
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;
        const fmData = new FormData();
        const randomId = Math.random().toString(36).substr(2);
        const filename = `${randomId}-${file.name}`
        fmData.append("file", file);
        fmData.append('filename', filename)
        try {
            const res = await uploadPic(fmData)
            const host = import.meta.env.VITE_MINIO_HOST
            onSuccess(res.data, `${host}/madhub/${filename}`);
        } catch (err) {
            const error = new Error("Some error");
            onError({ err });
        }
        console.log(fileList)
    }
    const handleBeforeUpload = (file)=>{
        const filename = file.name
        return new Promise((resolve, reject)=>{
            if (isPic(filename)||isVideo(filename)){
                resolve(file)
            }else {
                reject(file)
            }
        })
    }
    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={addPic}
                className={s.previewContainer}
                customRequest={uploadImage}
                accept={'image/* ,video/*'}
                beforeUpload={handleBeforeUpload}
            >
                <div ref={uploadRef}>
                    <PlusOutlined />
                    <div
                        style={{
                            marginTop: 8
                        }}
                    >
                        Upload
                    </div>
                </div>
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
