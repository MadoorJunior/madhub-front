import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { useRef } from "react"
import { useConditionalListener } from "../../hooks/useConditionalListener"
export const EmojiPicker = ({
  displayPicker,
  setDisplayPicker,
  pickBtn,
  pickerBlock,
  editorClass,
}) => {
  const pickRef = useRef(null)
  const handleKeyDown = (e) => {
    if (e.key === "Escape") setDisplayPicker(false)
  }
  const handlePointerDown = (e) => {
    console.log("pointer down")
    if (
      !pickBtn.current?.contains(e.target) &&
      !pickRef.current?.contains(e.target) &&
      !pickerBlock.current?.contains(e.target)
    ) {
      setDisplayPicker(false)
    }
  }
  const handleAddEmoji = (e) => {
    const editor = document.getElementById(editorClass)
    const childrenData = editor?.innerHTML || ""
    editor.innerHTML = childrenData + e.native
  }
  useConditionalListener("keydown", handleKeyDown, displayPicker)
  useConditionalListener("pointerdown", handlePointerDown, displayPicker)
  return (
    <div
      ref={pickRef}
      style={{
        position: "absolute",
        zIndex: 1111,
      }}
    >
      <Picker
        data={data}
        onEmojiSelect={handleAddEmoji}
        previewPosition={"none"}
        maxFrequentRows={2}
      />
    </div>
  )
}
