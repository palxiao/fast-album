<!--
 * @Author: ShawnPhang
 * @Date: 2022-11-14 20:45:59
 * @Description: css loading
 * @LastEditors: ShawnPhang
 * @LastEditTime: 2022-11-17 00:05:48
 * @site: book.palxp.com
-->
<template>
  <div class="loading"></div>
</template>

<style lang="less" scoped>
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
}
.loading::after {
  position: absolute;
  content: '';
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
}
@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>