/*
 * @Author: ShawnPhang
 * @Date: 2022-11-14 19:44:41
 * @Description:  
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-14 19:45:19
 * @site: book.palxp.com
 */
export default function (el: any, arr: any[]) {
  const original = el.style.cssText.split(';')
  original.pop()
  el.style.cssText = original.concat(arr).join(';') + ';'
}
