export const htmlEscape = (html) => {
  return html.replace(/[<>"&]/g, function (match, pos, originalText) {
    switch (match) {
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case "&":
        return "&amp;"
      case '"':
        return "&quot;"
      default:
        return match
    }
  })
}
export function getNodeAndOffset(wrap_dom, start = 0, end = 0) {
  const txtList = []
  const map = function (children) {
    ;[...children].forEach((el) => {
      if (el.nodeName === "#text") {
        txtList.push(el)
      } else {
        map(el.childNodes)
      }
    })
  }
  // 递归遍历，提取出所有 #text
  map(wrap_dom.childNodes)
  console.log(wrap_dom.childNodes)
  const clips = txtList.reduce((arr, item, index) => {
    const end =
      item.textContent.length + (arr[index - 1] ? arr[index - 1][2] : 0)
    arr.push([item, end - item.textContent.length, end])
    return arr
  }, [])
  // 查找满足条件的范围区间
  const startNode = clips.find((el) => start >= el[1] && start < el[2])
  const endNode = clips.find((el) => end >= el[1] && end < el[2])
  return [startNode[0], start - startNode[1], endNode[0], end - endNode[1]]
}
