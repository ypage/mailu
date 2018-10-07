<template>
  <div>
    <Navbar></Navbar>
    <section class="page-content">
      <Search :placeholder="placeholder" choose="活动"></Search>
    </section>
    <Top></Top>
  </div>
</template>

<script>
// 导入模块
import Navbar from '../layout/Navbar'
import Foot from '../layout/Footer'
import Search from '../layout/Search'
import Waterfall from '../layout/Waterfall'
import Top from '../layout/Top'

export default {
  data() {
    return {
      placeholder: '嘿! 想找什么活动呀？'
    }
  },
  components: {
    Navbar,
    Foot,
    Search,
    Waterfall,
    Top
  }
}
</script>
