<template>
  <div class="xxhzUser">
    <div class="select-box">
      <ul>
        <li v-for="item in dataList" :key="item">
          <span>{{item.title}}：</span>
          <Radio-group v-model="item.value" type="button" size="small">
            <Radio v-for="option in item.options" :key="option" :label="option.value">{{option.name}}</Radio>
          </Radio-group>
        </li>
      </ul>
      <Date-picker v-show="showPicker" :value="dataValue" @on-change="handleChange" :options="DatePicker" type="datetimerange" format="yyyy" placeholder="请选择时间段" style="width: 120px" placement="bottom"></Date-picker>
    </div>
    <!-- {{selectValues}}-{{searchVal}} -->
    <div class="search">
      <span></span>
      <Input class="searchInput" icon="ios-close-empty" @on-click="clearText" @on-enter="searchInfo" v-model="searchVal" placeholder="关键词之间请用空格隔开"></Input>
      <!-- <Button slot="append" size="small" type="dashed" @click="searchInfo" icon="ios-close-empty"></Button> -->
      <Button class="searchButton" slot="append" @click="searchInfo" icon="ios-search"></Button>
    </div>
    <div class="line"></div>
    <div class="table">
      <Table border :highlight-row="true" size="small" :columns="tableColumns" :data="tableData"></Table>
      <div class="paging">
        <Page :total="page.total" @on-page-size-change="changeSize" :page-size="page.size" @on-change="changePage" :current="page.current" size="small" placement="top" show-total show-elevator show-sizer></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    formatDate
  } from 'utils/formatDate';
  export default {
    components: {},
    data() {
      return {
        dataValue: [], //暂存date-picker的选值
        showPicker: false,
        DatePicker: {
          shortcuts: [{
              text: '最近一年',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                return [start, end];
              },
              onClick: (picker) => {
                this.$Message.info('您选择了最近一年');
              }
            },
            {
              text: '最近两年',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 2);
                return [start, end];
              },
              onClick: (picker) => {
                this.$Message.info('您选择了最近两年');
              }
            },
            {
              text: '最近三年',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3);
                return [start, end];
              },
              onClick: (picker) => {
                this.$Message.info('您选择了最近三年');
              }
            },
            {
              text: '最近四年',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 4);
                return [start, end];
              },
              onClick: (picker) => {
                this.$Message.info('您选择了最近四年');
              }
            },
            {
              text: '最近五年',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 5);
                return [start, end];
              },
              onClick: (picker) => {
                this.$Message.info('您选择了最近五年');
              }
            },
          ],
          disabledDate(date) {
            return date && date.valueOf() > Date.now() + 31536000; //86400000
          }
        },
        searchVal: '', //暂存搜索框值
        dataList: [{
            "title": "行业",
            "options": [{
                "name": "全部",
                "value": "all"
              },
              {
                "name": "金融",
                "value": "金融"
              },
              {
                "name": "能源",
                "value": "能源"
              },
              {
                "name": "医药",
                "value": "医药"
              },
              {
                "name": "材料",
                "value": "材料"
              },
              {
                "name": "工业",
                "value": "工业"
              },
              {
                "name": "信息",
                "value": "信息"
              },
              {
                "name": "电信",
                "value": "电信"
              },
              {
                "name": "必须消费",
                "value": "必须消费"
              },
              {
                "name": "可选消费",
                "value": "可选消费"
              },
              {
                "name": "公用",
                "value": "公用"
              }
            ],
            "value": "all"
          },
          {
            "title": "机构",
            "options": [{
                "name": "全部",
                "value": "all"
              },
              {
                "name": "智库",
                "value": "智库"
              },
              {
                "name": "企业",
                "value": "企业"
              },
              {
                "name": "政府",
                "value": "政府"
              },
              {
                "name": "组织",
                "value": "组织"
              }
            ],
            "value": "all"
          },
          {
            "title": "区域",
            "options": [{
                "name": "全部",
                "value": "all"
              },
              {
                "name": "中国大陆",
                "value": "中国大陆"
              },
              {
                "name": "港澳台",
                "value": "港澳台"
              },
              {
                "name": "欧美",
                "value": "欧美"
              },
              {
                "name": "亚太",
                "value": "亚太"
              },
              {
                "name": "其他",
                "value": "其他"
              }
            ],
            "value": "all"
          },
          {
            "title": "时间",
            "options": [{
                "name": "全部",
                "value": "all"
              },
              {
                "name": "最近一年",
                "value": "1"
              },
              {
                "name": "最近三年",
                "value": "3"
              },
              {
                "name": "自定义",
                "value": "-1"
              }
            ],
            "value": "all"
          }
        ],
        tableColumns: [{
            title: '文档编号',
            key: 'id',
            align: 'center',
            width: '100'
          },
          {
            title: '标题',
            align: 'center',
            key: 'title',
            width: '120'
          },
          {
            title: '行业',
            key: 'industry',
            align: 'center',
            width: '100'
          },
          {
            title: '领域',
            key: 'area',
            align: 'center',
            width: '100'
          },
          {
            title: '来源',
            key: 'source',
            align: 'center',
            width: '100'
          },
          {
            title: '关键字',
            key: 'keywords',
            align: 'center',
            width: '140'
          },
          {
            title: '摘要',
            key: 'summary',
            align: 'center',
            render: (h, params) => {
              return h('Tooltip', {
                props: {
                  row: params.row,
                  content: params.row.summary,
                  placement: 'top-start',
                },
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
                slot: {
                  whiteSpace: 'normal'
                }
              }, params.row.summary)
            }
          },
          {
            title: '地址',
            // key: 'url',
            align: 'center',
            width: '80',
            render: (h, params) => {
              return h('a', {
                domProps: {
                  target: '_blank',
                  href: params.row.url
                }
              }, '下载')
            }
          },
          {
            title: '时间',
            key: 'createtime',
            align: 'center',
            width: '100'
          },
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
    computed: {
      selectValues() {
        let arr = []
        let start = new Date();
        let end = new Date();
        let value = this.dataList[3].value
        // console.log(value)
        switch (value) {
          case 'all':
            start = new Date(0)
            this.showPicker = false;
            break;
          case '1':
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 1);
            this.showPicker = false;
            break;
          case '3':
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3);
            this.showPicker = false;
            break;
          case '-1':
            this.showPicker = true;
            start = this.dataValue[0]
            end = this.dataValue[1]
            break;
        }
        if (typeof(end) == 'object') {
          start = formatDate(start, 'yyyy')
          end = formatDate(end, 'yyyy')
        }
        arr = [start, end]
        for (let data of this.dataList) {
          // console.log('1.data.value', data.value)
          arr.push(data.value)
        }
        // console.log(arr)
        return arr
      },
    },
    mounted() {
      this.getInfo()
    },
    watch: {
      selectValues(newVal, oldVal) {
        if (newVal != oldVal) {
          this.getInfo()
        }
      }
    },
    methods: {
      changePage(current) {
        // console.log('1.handleChange', current)
        this.page.current = current
        this.getInfo()
      },
      changeSize(size) {
        // console.log('2.changeSize', size)
        this.page.size = size
        this.getInfo()
      },
      clearText() {
        this.searchVal = ''
      },
      handleChange(datetimerange) {
        this.dataValue = datetimerange;
      },
      getInfo() {
        let params = {
          "from": (this.page.current - 1) * (this.page.size),
          "size": this.page.size,
          "dateFrom": this.selectValues[0],
          "dateEnd": this.selectValues[1],
          "report.industry": this.selectValues[2],
          "report.organize": this.selectValues[3],
          "report.area": this.selectValues[4]
        }
        // console.log('G1', params)
        this.$http({
          url: '/bisonreport/find',
          method: 'post',
          data: params
        }).then(res => {
          // console.log(res)
          if (res.data.data.length == 0) {
            console.log('暂无数据')
            this.$Message.info("暂无数据");
          } else {
            this.$Message.info("更新成功");
          }
          this.tableData = res.data.data
          this.page.total = res.data.totalQty
        }).catch(err => {
          console.log(err)
        })
      },
      searchInfo() {
        if (this.searchVal == '') {
          this.$Message.info("请输入数据");
        } else {
          let params = {
            "from": (this.page.current - 1) * (this.page.size),
            "size": this.page.size,
            "searchWord": this.searchVal
          }
          // console.log('G1', params)
          this.$http({
            url: '/bisonreport/search',
            method: 'post',
            data: params
          }).then(res => {
            if (res.data.data.length == 0) {
              console.log('暂无数据')
              this.$Message.info("暂无数据");
            } else {
              this.$Message.info("搜索成功");
            }
            this.tableData = res.data.data
            this.page.total = res.data.totalQty
            this.searchVal += ' '
            // this.searchVal = ''
          }).catch(err => {
            console.log(err)
            this.$Message.info("暂无数据,请重新输入");
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .xxhzUser {
    /* margin-top: 20px; */
    padding: 40px 0 30px 0;
    margin-left: 2%;
    width: 96%;
  }
  .select-box {
    position: relative;
    li {
      margin-top: 12px;
      span {
        position: relative;
        top: 4px;
      }
    }
    .ivu-date-picker {
      position: absolute;
      bottom: -5px;
      left: 321px;
    }
  }
  .search {
    height: 40px;
    width: 100%;
    span {
      display: inline-block;
      width: 60%;
    }
    .searchButton {
      // float: right;
      width: 4%;
    }
    .searchInput {
      // float: right;
      margin-right: -3px;
      width: 30%;
    }
  }
  .line {
    width: 100%;
    height: 2px;
    margin: 15px 0 15px 0;
    background-color: #C1C1C1;
  }
  .table {
    margin-top: 10px;
    .paging {
      margin: 10px;
      margin-bottom: 40px;
      float: right;
    }
  }
  .ivu-tooltip-inner {
    white-space: normal !important;
  }
</style>