<!--
 * @Author: ShawnPhang
 * @Date: 2021-07-22 01:07:24
 * @Description:  
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-13 10:41:46
 * @site: book.palxp.com
-->
<template>
  <div class="home">
    <img-list @change="checkImage" :data="json" />
    <preview ref="preview" />
  </div>
</template>

<script lang="ts">
import imgList from '@/components/business/img-list'
import { defineComponent, toRefs, reactive } from 'vue'
import preview from '@/components/business/preview'
import json from '@/assets/data/datalist.json'

export default defineComponent({
  components: { preview, imgList },
  setup() {
    const state = reactive({
      preview: null,
      // urlPrefix: 'https://palxiao95.gitee.io/fast-photo-album/',
      // urlPrefix: '',
      json: json.sort(function (a, b) {
        return b.stamp - a.stamp
      }),
    })
    setTimeout(() => {
      console.log(groupBy(state.json, 'year'))
      console.log(groupBy(state.json, 'month'))
      console.log(groupBy(state.json, 'date'))
    }, 2000)

    function groupBy(arr, key) {
      const result = {}
      for (const item of arr) {
        result[item[key]] = result[item[key]] || []
        result[item[key]].push(item)
      }
      return result
    }

    const checkImage = (e) => {
      state.preview.open(e)
    }

    return {
      ...toRefs(state),
      checkImage,
    }
  },
})
</script>

<style lang="less" scoped>
.home {
  margin: 8px;
  // width: 100vw;
  // height: 100vh;
}
</style>

