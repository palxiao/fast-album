/*
 * @Author: ShawnPhang
 * @Date: 2022-11-13 19:54:40
 * @Description:
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-13 23:46:21
 * @site: book.palxp.com
 */
const win = window as any
export default (file: any) => {
  return new Promise((resolve) => {
    win.EXIF.getData(file, function () {
      console.log(win.EXIF.getAllTags(this))
      const { Model, FNumber, ExposureTime, ISOSpeedRatings, FocalLength } = win.EXIF.getAllTags(this)
      const result = []
      Model && result.push({ name: '器材', value: Model })
      !isNaN(+FocalLength) && result.push({ name: '焦距', value: +FocalLength+'mm' })
      const f = FNumber ? `f/${FNumber}, ` : ''
      const et = ExposureTime ? `${(+ExposureTime).toFixed(2)}s, ` : ''
      const iso: any = ISOSpeedRatings ? `iso${ISOSpeedRatings}` : ''
      if (f || et || iso) {
        result.push({ name: '参数', value: f + et + iso })
      }
      resolve(result)
    })
  })
}
