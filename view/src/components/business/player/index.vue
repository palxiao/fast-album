<!--
 * @Author: ShawnPhang
 * @Date: 2022-11-18 18:09:51
 * @Description:  
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-18 23:44:18
 * @site: book.palxp.com
-->
<template>
  <div id="aplayer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as api from './api'

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

      setTimeout(async () => {
        // await load()
        const APlayer = (window as any).APlayer
        new APlayer({
          container: document.getElementById('aplayer'),
          fixed: true,
          autoplay: true,
          audio,
        })
      }, 300)
    })

    // async function load() {
    //   await import('./lib/APlayer.min.css')
    //   await import('./lib/APlayer.min.js')
    // }
  },
})
</script>
