/*
 * @Author: ShawnPhang
 * @Date: 2022-11-13 17:34:04
 * @Description: 书架流排版
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-25 23:52:18
 * @site: book.palxp.com
 */
const gap = 8 // 图片之间的间隔
let limitWidth = 0 // 宽度限制

export default async (state: any, data: any) => {
  limitWidth = state.listEl.parentNode.offsetWidth
  let neatArr: any = []

  const list = JSON.parse(JSON.stringify(data))
  neatArr = await createNewArr(list)

  state.list.length <= 0 && (state.list = neatArr)
  for (let i = 0; i < state.list.length; i++) {
    state.list[i].w = neatArr[i].w
    state.list[i].h = neatArr[i].h
    state.list[i].m = neatArr[i].m
    state.list[i].top = neatArr[i].top
  }
}

async function createNewArr(list: any) {
  const standardHeight = document.body.clientHeight/2.7 // 180 // 高度阈值
  const neatArr: any = [] // 整理后的数组
  let count = 0
  function factory(cutArr: any) {
    return new Promise((resolve) => {
      const lineup = list.shift()
      if (!lineup) {
        resolve({ height: calculate(cutArr), list: cutArr })
        return
      }
      cutArr.push(lineup)
      const finalHeight = calculate(cutArr)
      if (finalHeight > standardHeight) {
        resolve(factory(cutArr))
      } else {
        count++
        resolve({ height: finalHeight, top: count*finalHeight+gap, list: cutArr })
      }
    })
  }
  function calculate(cutArr: any) {
    let cumulate = 0
    for (const iterator of cutArr) {
      const { width, height } = iterator
      cumulate += width / height
    }
    return (limitWidth - gap * (cutArr.length - 1)) / cumulate
  }
  async function handleList() {
    // if (list.length <= 0) {
    //   return
    // }
    const { list: newList, height, top }: any = await factory([list.shift()])
    neatArr.push(
      newList.map((x: any, index: number) => {
        x.w = (x.width / x.height) * height
        x.h = height
        x.m = index ? `0 0 ${gap}px ${gap}px` : `0 0 ${gap}px 0`
        x.top = top
        return x
      }),
    )
    if (list.length > 0) {
      await handleList()
    }
  }

  await handleList()

  return neatArr.flat()
}
