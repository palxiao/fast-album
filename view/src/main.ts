/*
 * @Author: ShawnPhang
 * @Date: 2021-07-22 01:07:24
 * @Description:  
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-10-11 15:46:06
 * @site: book.palxp.com
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import utils from './utils'

import 'normalize.css/normalize.css'
import '@/assets/styles/index.scss';

createApp(App).use(router).use(utils).mount('#app')

