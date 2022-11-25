/*
 * @Author: ShawnPhang
 * @Date: 2022-11-11 21:11:42
 * @Description:
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-25 20:20:02
 * @site: book.palxp.com
 */
const fs = require('fs')
const path = require('path')
const sizeOf = require('image-size')
const ExifImage = require('exif').ExifImage
const images = require('images') // 版本锁定3.2.3
const dayjs = require('dayjs')
const ColorThief = require('colorthief')

const basePath = path.resolve('resources')
const jsonPath = path.resolve('view/src/assets/data/datalist.json')
const { thumbSize, isPrivacy } = require('./config.json')
const picsData = []

fs.readdir(basePath, async function (err, files) {
  //遍历读取到的文件列表
  for (let i = 0; i < files.length; i++) {
    const filename = files[i]
    const filedir = path.join(basePath, filename)
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = await fs.statSync(filedir)
    if (stats.isFile()) {
      console.log(`正在处理(${i}/${files.length})：` + filename)
      // 复制图片
      // cp(filedir, path.resolve(`view/public/${filename}`))
      try {
        // 复制图片
        // images(filedir).save(path.resolve(`view/public/${filename}`))
        // 生成压缩图
        images(filedir)
          .size(thumbSize)
          .save(path.resolve(`view/public/thumb-${filename}`), { quality: 75 })
      } catch (error) {}
      // 处理json数据
      let dimensions = { url: filename, datetime: dayjs(stats.birthtime).format('YYYY-MM-DD hh:mm:ss'), thumb: 'thumb-' + filename }
      try {
        dimensions = { ...dimensions, ...(await exifGetInfo(filename)) }
      } catch (error) {}
      try {
        dimensions = { ...dimensions, ...sizeOf(filedir) }
        if ([6, 8, 3].includes(dimensions.orientation) || dimensions.privacy) {
          // TODO：通过解码写入来复制图片，判断方向是否正确。
          console.log('图片解码中...')
          images(filedir).save(path.resolve(`view/public/${filename}`))
        } else {
          cp(filedir, path.resolve(`view/public/${filename}`))
        }
      } catch (error) {}
      if (dimensions.width) {
        const color = await getColor(filename)
        picsData.push({ ...dimensions, ...getDate(dimensions.datetime), color: rgbToHex(color) })
      }
    }
  }

  // 解析完毕，生成json
  fs.writeFileSync(jsonPath, JSON.stringify(picsData))
  console.log('🎉 All done, have fun! 😁')
})

// 获取图片元数据
function exifGetInfo(filename) {
  return new Promise((resolve, reject) => {
    const filedir = path.join(basePath, filename)
    new ExifImage({ image: filedir }, async function (error, exifData) {
      if (!error) {
        const { ImageWidth: width, ImageHeight: height, ModifyDate } = exifData.image
        const result = {}
        let datetime = exifData.exif.DateTimeOriginal || ModifyDate
        width && (result.width = width)
        height && (result.height = height)
        datetime && (result.datetime = datetime.split(' ')[0].replace(/:/g, '-') + ' ' + datetime.split(' ')[1].slice(0, 8))
        if (exifData.image && exifData.exif) {
          result.exif = await getExif({ ...exifData.image, ...exifData.exif })
        }
        if (isPrivacy && JSON.stringify(exifData.gps) === '{}') {
          result.privacy = true
        }
        resolve(result)
      } else reject()
    })
  })
}

// 获取日期详情
function getDate(datetime) {
  const day = dayjs(datetime)
  return { stamp: day.unix(), year: day.format('YYYY'), month: day.format('YYYY-MM'), date: day.format('YYYY-MM-DD'), dateStr: day.format('YYYY年MM月DD日') }
}

// 获取图片主颜色
function getColor(filename) {
  return new Promise((resolve) => {
    ColorThief.getColor(path.resolve(`view/public/thumb-${filename}`), 10)
      .then((color) => {
        resolve(color)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

// 转换三元色为16进制颜色
const rgbToHex = (rgb) =>
  '#' +
  rgb
    .map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')

// 复制文件
function cp(from, to) {
  fs.writeFileSync(to, fs.readFileSync(from))
}

// exif信息整理
function getExif(ExifImage) {
  return new Promise((resolve) => {
    const { Model, FNumber, ExposureTime, ISO, FocalLength } = ExifImage
    const result = []
    Model && result.push({ name: '器材', value: Model })
    !isNaN(+FocalLength) && result.push({ name: '焦距', value: +FocalLength + 'mm' })
    const f = FNumber ? `F${FNumber}, ` : ''
    const et = ExposureTime ? `1/${1 / +ExposureTime}s, ` : ''
    const iso = ISO ? `ISO${ISO}` : ''
    if (f || et || iso) {
      result.push({ name: '参数', value: f + et + iso })
    }
    resolve(result)
  })
}
