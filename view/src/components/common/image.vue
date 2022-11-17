<!--
 * @Author: ShawnPhang
 * @Date: 2022-11-13 17:17:05
 * @Description: 特殊img标签，接收一个动态src
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-13 23:35:40
 * @site: book.palxp.com
-->
<template>
  <div class="img">
    <!-- <div v-if="loading" class="load"></div> -->
    <img v-show="!loading" :src="src" :raw="data.url" :date="data.datetime" @load="loadDone" />
    <div v-if="loading" class="color" :style="{ background: data.color }" />
  </div>
</template>

<script>
export default {
  props: {
    src: {},
    data: {},
  },
  data() {
    return {
      loading: true,
    }
  },
  watch: {
    src() {
      this.loading = true
    },
  },
  methods: {
    loadDone() {
      this.loading = false
    },
  },
}
</script>

<style scoped>
.img {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.img > img {
  display: block;
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
}
/* .load {
  position: absolute;
  width: 100%;
  height: 100%;
}
.load::after {
  position: absolute;
  content: ' ';
  top: 50%;
  left: 50%;
  width: 30px;
  margin-left: -15px;
  height: 30px;
  margin-top: -15px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-top-color: transparent;
  border-radius: 100%;
  animation: circle infinite 0.75s linear;
} */
/* @keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
} */

.color {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  animation: breathe 600ms ease-out infinite alternate;
}
@keyframes breathe {
  0% {
    opacity: 0.85;
  }
  100% {
    opacity: 1;
  }
}
</style>