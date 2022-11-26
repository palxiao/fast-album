<!--
 * @Author: ShawnPhang
 * @Date: 2022-11-18 18:09:51
 * @Description: 音乐播放器
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-26 11:13:26
 * @site: book.palxp.com
-->
<template>
  <div id="aplayer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick } from 'vue'
import * as api from './api'
import loader from '@/utils/widgets/deferLoader'

export default defineComponent({
  setup() {
    onMounted(async () => {
      const ids = []
      const listObj = {}
      const { data: resList } = await api.getList()

      for (const x of resList.playlist.tracks) {
        ids.push(x.id)
        listObj[x.id] = { name: x.name, artist: x.ar[0] ? x.ar[0].name : '', cover: x.al.picUrl }
      }
      let { data: audio } = await api.getUrl({ id: ids + '', realIP: '116.25.146.177' })
      audio = audio.data.map((x: any) => {
        return Object.assign({ url: x.url }, listObj[x.id])
      })
      await load()
      setTimeout(async () => {
        await nextTick()
        const APlayer = (window as any).APlayer
        new APlayer({
          container: document.getElementById('aplayer'),
          fixed: true,
          autoplay: true,
          audio,
        })
      }, 100)
    })

    async function load() {
      await loader('script', 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js')
      await loader('link', 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css')
    }
  },
})
</script>

<style>
.aplayer.aplayer-fixed .aplayer-body {
  bottom: calc(constant(safe-area-inset-bottom));
  bottom: calc(env(safe-area-inset-bottom));
}
</style>