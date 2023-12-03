import s from './RightBar.module.scss'
import {Input} from "antd";
import {ClockCircleOutlined, SearchOutlined} from "@ant-design/icons";
export const RightBar = () => {
    return <div className={s.right}>
        <div>
            <Input prefix={<SearchOutlined />} allowClear={true} />
        </div>
    </div>
};
