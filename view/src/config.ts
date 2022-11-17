/*
 * @Author: ShawnPhang
 * @Date: 2021-07-12 15:03:31
 * @Description: 
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2021-07-22 15:57:48
 * @site: book.palxp.com / blog.palxp.com
 */
// const prefix = import.meta.env
const prefix = process.env

console.log(prefix.NODE_ENV); // development

const isDev = prefix.NODE_ENV === 'development'

export default {
    BASE_URL:  isDev ? '/' : './',
    VERSION: '0.0.0',
    APP_COPYRIGHT: '',
    API_URL: 'http://localhost:9999',
    IMG_URL: '',
}