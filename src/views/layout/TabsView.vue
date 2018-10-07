<template>
  <div class='tabs-view-container'>
    <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
      <el-tag type="gray" :closable="true" @close='closeViewTabs(tag,$event)'>
        {{tag.name}}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
//标签页面
  export default {
    computed: {
      visitedViews() {
        return this.$store.state.app.visitedViews.slice(-6)
      }
    },
    methods: {
      closeViewTabs(view, $event) {
        this.$store.dispatch('delVisitedViews', view)
        $event.preventDefault()
      },
      generateRoute() {
        if (this.$route.matched[this.$route.matched.length - 1].name) {
          return this.$route.matched[this.$route.matched.length - 1]
        }
        this.$route.matched[0].path = '/'
        return this.$route.matched[0]
      },
      addViewTabs() {
        this.$store.dispatch('addVisitedViews', this.generateRoute())
      }
    },
    watch: {
      $route() {
        this.addViewTabs()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs-view-container {
    // display: inline-block;
    margin-top:-5px; 
    vertical-align: top;
    margin-left: 10px;
    .tabs-view {
      margin-left: 10px;
      
    }
    .router-link-exact-active .el-tag {
      background-color: rgba(32, 160, 255, .1);
      border-color: rgba(32, 160, 255, .2);
      color: #20a0ff;
    }
  }
</style>
