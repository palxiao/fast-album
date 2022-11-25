/*
 * @Author: ShawnPhang
 * @Date: 2022-11-18 18:11:23
 * @Description:
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-25 02:26:50
 * @site: book.palxp.com
 */
import fetch from '@/utils/axios'
import { MUSIC_URL, playListId } from '../../../../../config.json'

export const getUrl = (params: Type.Object = {}) => fetch(MUSIC_URL + '/song/url', params, 'get')

// export const getDetail = (params: Type.Object) => fetch('http://localhost:9997/song/detail?ids=31134829,28762985', params, 'get')

export const getList = (params: Type.Object = {}) => fetch(MUSIC_URL + `/playlist/detail?id=${playListId}`, params, 'get')
