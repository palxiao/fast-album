<!--
 * @Author: ShawnPhang
 * @Date: 2022-10-11 17:29:58
 * @Description: 遮罩弹窗
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-18 18:37:37
 * @site: book.palxp.com
-->
<template>
  <div v-show="show" @click="close" :class="['modal']">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick, toRefs, reactive, watch } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      default: false,
    },
  },
  setup(props, context) {
    const state = reactive({
      show: false,
    })

    watch(
      () => props.modelValue,
      (val) => {
        val !== state.show && (state.show = val)
        document.querySelector('body').style.overflow = val ? 'hidden' : ''
        // document.documentElement.style.touchAction = 'none'
      },
    )

    // onMounted(async () => {
    //   await nextTick();
    // });

    const close = () => {
      context.emit('update:modelValue', false)
      document.querySelector('body').style.overflow = ''
    }

    return {
      ...toRefs(state),
      close,
    }
  },
})
</script>


<style lang="less" scoped>
.modal {
  touch-action: none;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
}
</style>