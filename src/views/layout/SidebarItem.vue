<template>
  <div>
    <template v-for="item in routes">
      <router-link :key="item" v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <Icon v-if='item.icon' :type="item.icon" /> {{item.children[0].name}}
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" :key="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <Icon v-if='item.icon' :type="item.icon" /> {{item.name}}
        </template>

        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' :key="child" v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
          <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
            <el-menu-item  class="second_item" :index="item.path+'/'+child.path">
              {{child.name}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.svg-icon {
  margin-right: 12px;
} // iview Icon
.ivu-icon {
  vertical-align: baseline;
  margin-right: 13px;
  font-size: 16px;
}

.hideSidebar .menu-indent {
  display: block;
  text-indent: 10px;
}

.default-active li {
  color: #20a0ff;
}

.second_item {
  padding-left: 60px !important;
  background: #282936;
}
</style>

