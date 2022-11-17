import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import config from '@/config'
import hook from './hook'

import Base from './Base'

const routes: Array<RouteRecordRaw> = [
  ...Base
]

const router = createRouter({
  history: createWebHashHistory(config.BASE_URL), // import.meta.env.BASE_URL
  routes
})

hook(router)

export default router
