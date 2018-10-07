<!-- Updated on 2017-08-02 16:18:21 By fmain -->
<template>
  <div class="xxhzUser">
    <!-- 选择栏 -->
    <div class="tmt_top_left">
      <select-box :badge-data="BadgeData" @ReceiveValues="ReceiveValues"></select-box>
      <!-- {{BadgeData}} -->
    </div>
    <div class="clear_float"></div>
    <!-- 标题 -->
    <div class="tabs-container">
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
    <!-- <Modal v-model="articleModel" width="1000" :closable="true" :scrollable="true" :transition-names="['modal', 'mui-fade']">
              <div slot="header" style="text-align:center;color:#030303;font-size:16px">
                {{article}}
              </div>
              <div class="article">
                <div class="source">来源:{{articlesource}}</div>
                <div class="date">{{articledate}}</div>
                <div class="content">{{articlecontent}}</div>
                <div class="img"><img :src="articleimg" /></div>
              </div>
              <div slot="footer" style="text-align:center;">
                <Button @click="onOk()" type="text">确定</Button>
              </div>
            </Modal> -->
    <div class="layout">
        <Row>
          <div style="text-align:center;color:#030303;font-size:16px">
            {{article}}
          </div>
          <div class="layout-article">
            <div class="layout-source">{{articlesource}}</div>
            <div class="layout-date">{{articledate}}</div>
            <div class="layout-content">
              <p v-html="articlecontent"></p>
            </div>
            <!-- <div class="img"><img :src="articleimg" /></div> -->
          </div>
        </Row>
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
      article: '',
      articledate: '',
      articlesource: '',
      articlecontent: '',
      // articleimg: {},
      // articleModel: false,
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
            h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              nativeOn: {
                click: () => {
                  this.checkPaper(params.index)
                  this.getarticle()
                  // this.articleModel = true;
                },
              }
            }, params.row.title),
            h('a', {
              domProps: {
                target: '_blank',
                href: params.row.url
              },
              style: {
                marginLeft: '10px',
                color: '#19BE6B'
              },
            }, '(原文)')
            // h('a', {
            //   domProps: {
            //     target: '_blank',
            //     href: params.row.url
            //   },
            // }, params.row.title)
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
    }
  },
  methods: {
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
        type: '2',
        start: this.selectValues[0],
        end: this.selectValues[1],
        emotional: this.selectValues[3],
        media: this.selectValues[4],
        from: (this.page.current - 1) * (this.page.size),
        size: this.page.size,
        'user.id': Cookies.get('id'),
        'user.name': Cookies.get('name'),
        'user.username': Cookies.get('username')
      }
      this.$http({
        url: '/myinfo/getdata',
        method: 'post',
        data: params
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data
        this.page.total = res.data.num
        // this.getNum()
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
        // console.log('BadgeData', this.BadgeData)
      }).catch(err => console.log(err))
    },
    checkPaper(index) {
      this.myIndex = index;
      // console.log(this.myIndex);
      this.index = index;
      this.changeArticle();
    },
    getarticle() {
      let params = {
        content_id: this.tableData[this.index].content_id,
        type: this.tableData[this.index].type,
      }
      this.$http({
        url: '/myinfo/getcontent',
        method: 'post',
        data: params
      }).then(res => {
        // console.log(res)
        // let articleimg = {}
        this.articledate = res.data.data.publish_date;
        this.articlesource = '来源:' + res.data.data.source;
        this.articlecontent = res.data.data.content.replace(/(\\r\\n)|(\\n)/g, "<br/>");
        console.log(this.articlesource)
        // articlecontent = res.data.data.content.split('\\n');
        // articleimg = res.data.data.img.slice(1, -1).split(',');
      }).catch(err => console.log(err))
    },
    changeArticle() {
      this.article = this.tableData[this.index].title;
      // console.log(this.tableData[this.index].title);
    },
    // onOk() {
    //   this.$Message.info('文章关闭！');
    //   this.articleModel = false;
    // },
  }
}
</script>

<style scoped>
.tabs-container {
  margin-top: 20px;
}

.xxhzUser {
  padding: 40px 0 30px 0;
  margin-left: 2%;
  width: 96%;
}

.xxhzUser .tmt_top_left ul li {
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

.xxhzUser .article {
  width: 96%;
}

.layout {
  border: 1px solid #d7dde4;
  background: #FFFFFF;
  margin: 0 0 35px 0;
  padding: 25px 10px 10px 10px;
  max-height: 500px;
  overflow: scroll;
}

.layout-date {
  margin: -10px 15px 0 0;
  float: right;
}

.layout-source {
  margin: -10px 35px 0 0;
  float: right;
}

.layout-content {
  text-indent: 2em;
  padding-top: 20px;
  color: #272822;
}

.layout-img {
  text-align: center;
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
</style>


