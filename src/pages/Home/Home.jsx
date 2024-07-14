import { LeftBar } from "../../components/LeftBar/LeftBar"
import s from "./Home.module.scss"
import { RightBar } from "../../components/RightBar/RightBar"
import { Outlet } from "react-router-dom"
const Home = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.left}>
          <LeftBar />
        </div>
        <div className={s.middle}>
          <Outlet />
        </div>
        <div className={s.right}>
          <RightBar />
        </div>
      </div>
    </>
  )
}
export default Home
