/*
 * @Author: ShawnPhang
 * @Date: 2021-07-22 01:07:24
 * @Description:  
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-18 18:25:54
 * @site: book.palxp.com
 */
import axios from 'axios'

// export default axios;
const fetch = (url: string, params: Type.Object, type: string | undefined = 'get') => {
  if (type === 'get') {
    return axios.get(url, {
      headers: {},
      params,
    })
  } else {
    return (axios as Type.Object)[type](url, params, {
      headers: {},
    })
  }
}

export default fetch
