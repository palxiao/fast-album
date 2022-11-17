module.exports = {
  plugins: {
    // "postcss-import": {},
    // "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions', // 所有主流浏览器最近10版本用
      ],
      grid: true,
    },
    'postcss-write-svg': {
      // 处理前端1px问题
      uft8: false,
    },
    //   "postcss-cssnext": {}, // (不可用) css未来特性，似乎依赖webpack
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿宽度，一倍图375，二倍图750
      // viewportHeight: 1334, // 设计稿高度，可以不指定
      unitPrecision: 3, // px to vw无法整除时，保留几位小数
      viewportUnit: 'vw', // 转换成vw单位
      selectorBlackList: ['.home', '.img'], // 不转换的类名
      minPixelValue: 1, // 小于1px不转换
      mediaQuery: false, // 允许媒体查询中转换
      exclude: /(\/|\\)(node_modules)(\/|\\)/, //不转换我们引入的第三方包
    },
    // "postcss-viewport-units": {},
    'postcss-viewport-units': {
      filterRule: (rule) => rule.nodes.findIndex((i) => i.prop === 'content') === -1,
    },
    //   "cssnano": { // (不可用) 压缩清理css代码，似乎依赖webpack
    //     preset: "advanced",
    //     autoprefixer: false, // 和cssnext同样具有autoprefixer，保留一个
    //     "postcss-zindex": false
    //   }
  },
}
