<!--
 * @Author: ShawnPhang
 * @Date: 2022-10-11 15:27:28
 * @Description:
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-26 11:17:07
 * @site: book.palxp.com
-->

# fast-album

推荐使用 pnpm 安装项目依赖，如未安装请执行：

`npm install -g pnpm`

# 「手机」照片如何传输

1. 使用蓝牙、数据线、wifi等方式传输
2. 使用网盘传输（度盘限速，推荐用阿里云、蓝奏云、天翼云）

Iphone手机照片 HEIC 格式在线转换:
https://www.apowersoft.cn/heic-to-jpg

# 开始

1. fork项目，克隆本地，运行 `npm run pre`安装依赖
2. 将照片（原始图像）放至 `resource` 目录中
3. 修改`config.json`配置，运行 `npm run start` 生成项目
4. 配置好 Pages 即可

# 配置说明

```
{
  "thumbSize": 500, // 缩略图的目标分辨率宽度，越大越清晰
  "isPrivacy": false // 是否开启隐私模式，检测到敏感信息会抹除，缺点是处理过程会变慢
  "MUSIC_URL": "", // 一般不用改
  "playListId": 0 // 填写你的网易云歌单id
}
```
