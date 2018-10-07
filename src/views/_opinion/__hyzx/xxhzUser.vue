<!-- Updated on 2017-08-02 16:18:21 By fmain -->
<template>
  <div class="container">
    <!-- 树形控件 -->
    <div class="tree">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini">
      </el-input>
      <el-tree :filter-node-method="filterNode" class="filter-tree" :show-checkbox="true" :expand-on-click-node="false" :highlight-current="true" :data="treeData" :props="defaultProps" default-expand-all ref="tree2">
      </el-tree>
      <button @click="findproject()">test</button>
    </div>

    <div class="xxhzUser">

      <!-- 选择栏 -->
      <div class="tmt_top_left">
        <select-box :badge-data="BadgeData" @ReceiveValues="ReceiveValues"></select-box>
      </div>

      <div class="clear_float"></div>
      <!-- 标题 -->
      <div class="tabs-container">
        <a data-toggle="tab" href="javascript:;" aria-expanded="true">资讯</a>
        <!-- <el-button @click="getInfo">测试按钮</el-button> -->
      </div>
      <div class="line"></div>
      <!-- 表格 -->
      <div class="table">
        <!-- 表格 -->
        <Table border :highlight-row="true" size="small" :columns="tableColumns" :data="tableData"></Table>
        <!-- 分页 -->
        <div class="paging">
          <div class="fr">
            <Page :total="page.total" @on-page-size-change="changeSize" :page-size="page.size" @on-change="changePage" :current="page.current" size="small" placement="top" show-total show-elevator show-sizer></Page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import selectBox from 'components/SelectBox/selectBox'
  import Cookies from 'js-cookie';
  export default {
    name: 'industryinfo',
    components: {
      selectBox
    },
    data() {
      return {
        filterText: '',
        treeData: [{
          label: '信息汇总一',
          children: [{
            label: '恕我'
          }, {
            label: '直言'
          }]
        }, {
          label: '信息汇总二',
          children: [{
            label: '股票'
          }, {
            label: '内参'
          }]
        }, {
          label: '信息汇总三',
          children: [{
            label: '超级'
          }, {
            label: '制度'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        // selectBox 的数据
        selectValues: null,
        BadgeData: {},
        // 表格的数据
        tableColumns: [{
            title: '序号',
            type: 'index',
            key: 'index',
            align: 'center',
            width: '60'
          },
          {
            title: '标题',
            align: 'center',
            key: 'title', //设置传回数据中链接
            render: (h, params) => {
              return h('div', [
                h('a', {
                  domProps: {
                    target: '_blank',
                    href: params.row.url
                  }
                }, params.row.title)
              ]);
            }
          },
          {
            title: '性质',
            key: 'inclination',
            align: 'center',
            width: '80'
          },
          {
            title: '时间',
            align: 'center',
            key: 'publish_date',
            width: '150'
          },
          {
            title: '来源',
            align: 'center',
            key: 'source',
            width: '90'
          },
          {
            title: '摘要',
            align: 'center',
            key: 'summary',
          }
        ],
        tableData: [],
        // 分页的数据
        page: {
          total: null,
          size: 10,
          current: 1
        }
      }
    },
    beforeMount() {
      this.ReceiveValues()
    },
    mounted() {
      this.getInfo()
      this.getNum()
    },
    watch: {
      selectValues(newVal, oldVal) {
        if (newVal != oldVal) {
          this.getInfo()
          this.getNum()
        }
      },
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      findproject() {
        let params = {
          id: Cookies.get('id'),
        }
        this.$http({
          url: '/myinfo/searchproject',
          method: 'post',
          data: params
        }).then(res => {
          console.log(res)
        }).catch(err => console.log(err))
      },
      changePage(current) {
        console.log('1.handleChange', current)
        this.page.current = current
        this.getInfo()
      },
      changeSize(size) {
        console.log('2.changeSize', size)
        this.page.size = size
        this.getInfo()
      },
      ReceiveValues(data) {
        this.selectValues = data;
      },
      getInfo() {
        let params = {
          type: '1',
          start: this.selectValues[0],
          end: this.selectValues[1],
          emotional: this.selectValues[3],
          media: this.selectValues[4],
          from: (this.page.current - 1) * (this.page.size),
          size: this.page.size,
          'user.id': Cookies.get('id'),
          'user.name': Cookies.get('name'),
          'user.username': Cookies.get('username'),
        }
        // console.log(params)
        this.$http({
          url: '/myinfo/getdata',
          method: 'post',
          data: params
        }).then(res => {
          // this.getNum()
          this.tableData = res.data.data
          this.page.total = res.data.num
        }).catch(err => console.log(err))
      },
      getNum() {
        let params = {
          start: this.selectValues[0],
          end: this.selectValues[1],
          emotional: this.selectValues[3],
          'user.id': Cookies.get('id'),
          'user.username': Cookies.get('username'),
        }
        // console.log('params', params)
        this.$http({
          url: '/mycontent/getqty',
          method: 'post',
          data: params
        }).then(res => {
          // console.log('res', res.data.data)
          this.BadgeData = res.data.data
          console.log('BadgeData', this.BadgeData)
        }).catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped>
  .container {
    padding-top: 40px;
    width: 96%;
  }
  .tabs-container {
    margin-top: 20px;
  }
  .xxhzUser {
    padding: 0px 0 30px 0;
    margin-left: 14%;
    float: left;
    position: absolute;
    width: 70%;
  }
  .xxhzUser .tmt_top_left ul li {
    float: right;
    height: 32px;
    line-height: 32px;
  }
  .xxhzUser .table {
    margin-top: 20px;
  }
  .xxhzUser .table .paging {
    margin: 10px;
    overflow: hidden;
  }
  .xxhzUser .table .paging .fr {
    float: right;
  }
  .ivu-table .demo-table-row td {
    height: 16px;
    line-height: 16px;
    overflow: hidden;
    white-space: nowrap;
  }
  .line {
    width: 100%;
    height: 2px;
    margin: 15px 0 15px 0;
    background-color: #C1C1C1;
  }
  .tree {
    margin: 15px 0px 35px -10px;
    width: 15%;
    /* min-width: 123px; */
    max-height: 620px;
    float: left;
  }
  .el-tree {
    margin-top: 10px;
    color: #495060;
    /* background-color: initial; */
    background-color: #ECEFF1;
    border: none;
  }
  .tree .el-tree.is-current {
    background-color: #999;
  }
</style>


