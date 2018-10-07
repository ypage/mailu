<template>
  <div>
    <Navbar></Navbar>
    <section class="page-content">
      <Search :placeholder="placeholder" choose="会员"></Search>
    </section>
    <Top></Top>
  </div>
</template>

<style lang="scss">
section.page-content {
  .searchDiv {
    position: relative;
    width: 100%;

    .search {
      width: 100%;
      top: 0;
    }

    .option {
      width: 20%;
      position: absolute;
      top: 40px; //其他页面的select与箭头高度　原72
      right: 0;
      z-index: 999;

      ul {
        float: right;
        width: 100%;
      }
    }
  }
}
</style>

<script>
// 导入模块
import Navbar from '../layout/Navbar'
import Search from '../layout/Search'
import Top from '../layout/Top'

export default {
  data() {
    return {
      placeholder: '嘿! 想找什么信息呀？'
    }
  },
  components: {
    Navbar,
    Search,
    Top
  }
}
</script>
