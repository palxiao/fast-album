/*
 * @Author: ShawnPhang
 * @Date: 2022-11-18 18:11:23
 * @Description:  
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-18 18:54:37
 * @site: book.palxp.com
 */
import fetch from '@/utils/axios'

const MUSIC_URL  = "https://music.palxp.com"

export const getUrl = (params: Type.Object = {}) => fetch(MUSIC_URL + '/song/url', params, 'get')

// export const getDetail = (params: Type.Object) => fetch('http://localhost:9997/song/detail?ids=31134829,28762985', params, 'get')

export const getList = (params: Type.Object = {}) => fetch(MUSIC_URL + '/playlist/detail?id=5183094117', params, 'get')