<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>
<style lang="scss">
  @import './styles/mailu3.scss'; // 全局自定义的css样式
  .ivu-message {
    font-size: 12px;
    position: fixed;
    z-index: 1010;
    width: 100%;
    top: 60px;
    left: 0;
  }
</style>


