import s from "./WhatsHappening.module.scss"
import {
  BiChevronDown,
  BiHappyAlt,
  BiHash,
  BiImage,
  BiAt,
} from "react-icons/bi"
import { EmojiPicker } from "./EmojiPicker"
import { useState } from "react"
import Tribute from "tributejs"
import { useRef } from "react"
import { getAtlist, postOne } from "../../api/post"
import { ImageUploader } from "./ImageUploader"
import { useSelector } from "react-redux"
import { Avatar } from "antd"
import { useEffect } from "react"
import { addTopic, getTopic } from "../../api/topic"
import { getNodeAndOffset } from "../../utils/text"
const WhatsHappening = () => {
  const [displayPicker, setDisplayPicker] = useState(false)
  const [fileList, setFileList] = useState([])
  const [atList, setAtList] = useState([])
  const [poundList, setpoundList] = useState([])

  const showPickerBtn = useRef(null)
  const uploadRef = useRef(null)
  const emojiPickerBlock = useRef(null)
  let tributeRef = useRef(null)
  const picsUrl = fileList.map((file) => file.xhr)

  const { userInfo } = useSelector((state) => state.userInfo)
  const renderEditor = (_atList, _poundList) => {
    let tributeMultipleTriggers = new Tribute({
      allowSpaces: true,
      noMatchTemplate: function () {
        return null
      },
      collection: [
        {
          selectTemplate: function (item) {
            if (this.range.isContentEditable(this.current.element)) {
              return `<span contenteditable="false">
                  <span
                    class="at-item"
                    title="${item.original.value}"
                    data-atkey="${item.original.key}"
                    data-atvalue="${item.original.value}"
                  >
                    @${item.original.value}
                  </span>
                </span>`
            }

            return "@" + item.original?.value
          },
          menuItemLimit: 8,
          lookup: "value",
          values: _atList,
          menuItemTemplate: function (item) {
            return item.original.value
          },
        },
        {
          trigger: "#",
          selectTemplate: function (item) {
            if (this.range.isContentEditable(this.current.element)) {
              return `<span contenteditable="false">
                  <span
                    class="pound-item"
                    data-poundname="${item.original.name}"
                  >
                    #${item.original.name}
                  </span>
                </span>`
            }

            return "#" + item.original.name
          },
          values: _poundList,
          lookup: "name",
          fillAttr: "name",
          menuItemLimit: 5,
        },
      ],
    })
    tributeMultipleTriggers.attach(document.getElementById("editorMultiple"))
    tributeRef = tributeMultipleTriggers
  }
  const addPic = ({ fileList: newFileList }) => setFileList(newFileList)
  const post = (e) => {
    const topicNameList = []
    const atItemList = document.querySelectorAll("#editorMultiple .pound-item")
    Array.prototype.forEach.call(atItemList, function (el) {
      const topicName = el.getAttribute("data-poundname")
      console.log(topicName)
      if (!topicNameList.includes(topicName)) {
        topicNameList.push(topicName)
      }
      if (!poundList.find((p) => p.name === topicName)) {
        addTopic({
          topicName: topicName,
          username: userInfo.username,
        }).then((res) => {
          console.log(res)
        })
      }
    })
    postOne({
      content: document.getElementById("editorMultiple")?.innerHTML || "",
      isAnonymous: false,
      media: {
        picsUrl,
      },
      topics: topicNameList,
    }).then((res) => {
      document.getElementById("editorMultiple").innerHTML = ""
      window.location.reload()
      // console.log(picsUrl)
    })
  }
  const onInput = () => {
    const childrenData =
      document.getElementById("editorMultiple")?.innerHTML || ""
    var selection = window.getSelection()
    // var range = selection.getRangeAt(0)
    // var pos = range.startOffset
    const reg = /#(.+)&nbsp;$/
    if (reg.test(childrenData)) {
      let topic = childrenData.match(reg)[1]
      console.log(topic)
      let res = childrenData.replace(
        reg,
        `<span contenteditable="false">
      <span
        class="pound-item"
        data-poundname="${topic}"
      >
        #${topic}
      </span>
    </span>`
      )
      document.getElementById("editorMultiple").innerHTML = res
      let range = document.createRange()
      console.log(editorMultiple.lastChild.lastChild)
      range.setStart(editorMultiple.lastChild, 0)
      range.setEnd(editorMultiple.lastChild, 0)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
  const handleTopic = () => {
    const editor = document.getElementById("editorMultiple")
    tributeRef.showMenuForCollection(editor, 1)
  }
  const handleAt = () => {
    const editor = document.getElementById("editorMultiple")
    tributeRef.showMenuForCollection(editor, 0)
  }
  const handleDeleteKeydown = (e) => {
    if (e.keyCode === 8) {
      if (
        document.getElementById("editorMultiple").innerHTML.startsWith("<span")
      ) {
        const text = document.getElementById("editorMultiple").innerHTML
        console.log(text)
        if (/^<span[\w\W]*\/span>$/i.test(text)) {
          document.getElementById("editorMultiple").innerHTML = ""
        }
      }
    }
  }
  useEffect(() => {
    renderEditor(atList, poundList)
  })
  useEffect(() => {
    getAtlist().then((res) => {
      let list = res.data.data
      setAtList(list)
    })
    getTopic().then((res) => {
      setpoundList(
        res.data.data.map((item) => ({
          name: item.topicName,
        }))
      )
    })
  }, [])
  return (
    <div className={s.what}>
      <div className={s.avater}>
        <Avatar src={userInfo.avatarUrl} size={40} />
      </div>
      <div className={s.wrapper}>
        <div className={s.scope}>
          Everyone
          <BiChevronDown className={s.icon} />
        </div>
        <div className="at-demo">
          <div
            id="editorMultiple"
            className="tribute-demo-input"
            placeholder="what's happening..."
            onInput={onInput}
            onKeyDown={handleDeleteKeydown}
          ></div>
        </div>
        <ImageUploader
          fileList={fileList}
          addPic={addPic}
          uploadRef={uploadRef}
        />
        <ul className={s.container}>
          <div
            onClick={() => {
              uploadRef.current.click()
            }}
          >
            <BiImage />
          </div>
          <div
            ref={showPickerBtn}
            onClick={() => {
              setDisplayPicker((prev) => !prev)
            }}
          >
            <BiHappyAlt />
          </div>
          <div onClick={handleTopic}>
            <BiHash />
          </div>
          <div onClick={handleAt}>
            <BiAt />
          </div>
        </ul>
        <button className={s.post} onClick={post}>
          Post
        </button>
      </div>
      <div className={s.emoji} ref={emojiPickerBlock}>
        {displayPicker && (
          <EmojiPicker
            displayPicker={displayPicker}
            setDisplayPicker={setDisplayPicker}
            pickBtn={showPickerBtn}
            pickerBlock={emojiPickerBlock}
            editorClass={"editorMultiple"}
          />
        )}
      </div>
    </div>
  )
}
export default WhatsHappening
