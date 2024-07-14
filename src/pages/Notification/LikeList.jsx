export const LikeList = ({ likes }) => {
  return (
    <div>
      {likes.map((like) => {
        return (
          <div key={like.id} className={s.like}>
            <div className={s.from}>
              <div>
                <Avatar
                  size="large"
                  src={
                    "http://222.192.6.51:9099/madhub/9335pwgi1pr-van-gogh-the-starry-night-sc3hj6ka4za2ajsa.jpg"
                  }
                />
              </div>
              <div className={s.info}>
                <div className={s.name}>madoor</div>
                <div className={s.time}>2023-10-2 00:10:00</div>
              </div>
            </div>
            <div className={s.text}>
              赞了你的发帖&nbsp;
              <LikeOutlined />
            </div>
            <div className={s.content}>
              <div className={s.ava}>
                <Avatar
                  src={
                    like.cover.startsWith("http")
                      ? like.cover
                      : "http://" + like.cover
                  }
                  size={78}
                  shape="square"
                />
              </div>

              <div className={s.info}>
                <div className={s.to}>@Madoor.junior</div>
                <div className={s.overview}>
                  数组是非常基础的数据结构，在面试中，考察数组的题目一般在思维上都不难，主要是考察对代码的掌控能力
                  也就是说，想法很简单，但实现起来 可能就不是那么回事了。
                  首先要知道数组在内存中的存储方式，这样才能真正理解数组相关的面试题
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
