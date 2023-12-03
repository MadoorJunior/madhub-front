import HomeMid from '../../components/HomeMid/HomeMid'
import { LeftBar } from '../../components/LeftBar/LeftBar'
import s from './Home.module.scss'
import {RightBar} from "../../components/RightBar/RightBar";
const Home = () => {
    return (
        <>
            <div className={s.container}>
                <div className={s.left}>
                    <LeftBar/>
                </div>
                <div className={s.middle}>
                    <HomeMid/>
                </div>
                <div>
                    <RightBar/>
                </div>
            </div>
        </>
    )
}
export default Home
