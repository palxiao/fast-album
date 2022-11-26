/*
 * @Author: ShawnPhang
 * @Date: 2022-11-13 17:34:04
 * @Description: 瀑布流排版
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-26 11:21:14
 * @site: book.palxp.com
 */
let columnNums = 2 // 有多少列
const gap = 8 // 图片之间的间隔

export default (state: any, data: any) => {
  const columnHeights: any = [] // 列的高度
  let { offsetWidth: pW } = state.listEl.parentNode
  pW > 1000 && (columnNums =  3)
  pW -= gap * (columnNums - 1) // 总体宽度数值等于减去间隔
  const newList = JSON.parse(JSON.stringify(data))
  for (let i = 0; i < newList.length; i++) {
    let index = i % columnNums
    const item = newList[i]
    const ratio = pW / columnNums / item.width
    item.w = pW / columnNums
    item.h = item.height * ratio
    item.left = index * (pW / columnNums + gap)
    item.top = columnHeights[index] + gap || 0
    // columnHeights[index] = isNaN(columnHeights[index]) ? item.h : item.h + columnHeights[index] + gap
    // TODO: 解决瘸腿问题
    if (isNaN(columnHeights[index])) {
      columnHeights[index] = item.h
    } else {
      index = columnHeights.indexOf(Math.min(...columnHeights))
      item.left = index * (pW / columnNums + gap)
      item.top = columnHeights[index] + gap || 0
      columnHeights[index] = item.h + columnHeights[index] + gap
    }
  }

  state.list.length <= 0 && (state.list = newList)
  for (let i = 0; i < state.list.length; i++) {
    state.list[i].left = newList[i].left
    state.list[i].top = newList[i].top
    state.list[i].w = newList[i].w
    state.list[i].h = newList[i].h
    state.list[i].m = 0
  }
  state.listHeight = Math.max(...columnHeights)
}
