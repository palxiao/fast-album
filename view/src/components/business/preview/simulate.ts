/*
 * @Author: ShawnPhang
 * @Date: 2022-11-13 23:01:28
 * @Description: 异步加载图片
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-13 23:03:40
 * @site: book.palxp.com
 */
export default (url: string, cb: Function) => {
  const image = new Image()
  image.src = url
  image.onload = function () {
    cb()
  }
}
