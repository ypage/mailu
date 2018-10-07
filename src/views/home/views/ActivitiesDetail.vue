<template>
  <div>
    <Navbar></Navbar>
    <section class="page-content">
      <Search :placeholder="placeholder" choose="简介"></Search>
    </section>
    <Foot></Foot>
  </div>
</template>

<style lang="scss">

</style>

<script>
// 导入模块
import Navbar from '../layout/Navbar'
import Search from '../layout/Search'
import About from '../layout/AboutShow'
import Foot from '../layout/Footer'
export default {
  data() {
    return {
      placeholder: 'hi ! 想找到什么图片'
    }
  },
  components: {
    Navbar,
    Search,
    About,
    Foot
  }
}
</script>
