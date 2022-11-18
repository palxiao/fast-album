
<template>
  <div class="list" ref="listEl" :style="{ height: type === 0 ? listHeight + 'px' : '' }">
    <div @click="changeType" class="button">切换样式</div>
    <div class="img-box" :style="{ position: type === 0 ? 'absolute' : '', width: `${img.w}px`, height: `${img.h}px`, margin: img.m, left: `${img.left}px`, top: `${img.top}px` }" v-for="(img, i) in list" :index="i" :key="'img' + i">
      <my-image @click="change($event, img)" :src="img.show" :data="img" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, nextTick, watch, onMounted } from 'vue'
import myImage from '@/components/common/image.vue'
import waterfall from './waterfall'
import bookcase from './bookcase'

export default defineComponent({
  components: { myImage },
  props: {
    data: {
      default: () => [],
    },
  },
  setup(props, context) {
    const state = reactive({
      listEl: null,
      list: [],
      listHeight: 0,
      type: 1,
    })

    onMounted(() => {
      changeList(props.data)
    })
    watch(props.data, async (newList) => {
      changeList(newList)
    })
    window.onresize = function () {
      changeList(props.data)
    }

    async function changeList(data?: any) {
      const typeExecute = { 0: waterfallFn, 1: bookcaseFn }
      data = data || props.data
      await typeExecute[state.type](data)
      observer()
    }

    async function waterfallFn(data?: any) {
      await waterfall(state, data)
    }

    async function bookcaseFn(data?: any) {
      await bookcase(state, data)
    }

    const change = (e, imgData) => {
      context.emit('change', {e, imgData})
    }

    const changeType = () => {
      state.type = state.type === 0 ? 1 : 0
      changeList()
    }

    function observer() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((item) => {
          if (item.isIntersecting) {
            const index = +item.target.getAttribute('index')
            state.list[index].show = state.list[index].thumb
            observer.unobserve(item.target) // 停止监听该div DOM节点
          }
        })
      }) //不传options参数，默认根元素为浏览器视口
      document.querySelectorAll('.img-box').forEach((div) => observer.observe(div)) // 遍历监听所有div DOM节点
    }

    return {
      ...toRefs(state),
      change,
      changeType,
    }
  },
})
</script>

<style lang="less" scoped>
.list {
  position: relative;
  font-size: 0;
}
.img-box {
  border-radius: 4px;
  transition: all 0.6s;
  //   position: absolute;
  display: inline-block;
  cursor: pointer;
  //   background-size: cover;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.button {
  position: fixed;
  right: 4px;
  top: 4px;
  z-index: 9999;
  color: #ffffff;
  font-size: 13px;
  background: rgba(0, 0, 0, 0.6);
  padding: 7px 12px;
  border-radius: 15px;
}
</style>