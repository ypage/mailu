<!-- Updated on 2017-08-04 15:42:41 By fmain -->
<!-- Created by fmain on Tue Aug 01 2017 -->
<!--
  父组件调用方法:
  1.导入组件: import selectBox from 'components/SelectBox/selectBox'
  2.注册组件: components: { selectBox },
  3.使用组件: <select-box @ReceiveValues="ReceiveValues"></select-box>
  接收参数:
  methods: {
    ReceiveValues(data){
      // console.log(data)
      this.selectValues = data;
    }
  }
-->
<template>
  <div class="select-box">
    <!-- 选择栏 -->
    <!-- -{{badgeData}}- -->
    <ul>
      <li v-for="item in dataList" :key="item">
        <span>{{item.title}}：</span>
        <Radio-group v-model="item.value" type="button" size="small">
          <Radio v-for="option in item.options" :key="option" :label="option.value">
            {{option.name}}
            <!-- 占位用 -->{{badgeDatas}}<!-- 占位用 -->
            <Badge class-name="radio-badge" v-show="option.showBadge" :count="option.count" overflow-count="9999"></Badge>
          </Radio>
        </Radio-group>
      </li>
      <!-- {{dataValue}} -->
    </ul>
    <!-- 自定义时间选择框 -->
    <Date-picker v-show="showPicker" :value="dataValue" @on-change="handleChange" :options="DatePicker" type="daterange" format="yyyy-MM-dd" placeholder="请选择时间段" style="width: 180px" placement="bottom-end"></Date-picker>
  </div>
</template>

<script>
  import {
    formatDate
  } from 'utils/formatDate';
  export default {
    data() {
      return {
        dataValue: [],
        DatePicker: {
          shortcuts: [{
              text: '今天',
              value() {
                const end = new Date();
                const start = new Date();
                end.setTime(start.getTime() + 3600 * 1000 * 24);
                return [start, end];
              },
              onClick: (picker) => {
                this.$Message.info('您选择了今天');
              }
            },
            {
              text: '昨天',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                return [start, end];
              },
              onClick: (picker) => {
                this.$Message.info('您选择了昨天');
              }
            },
            {
              text: '最近一周',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              },
              onClick: (picker) => {
                this.$Message.info('您选择了最近一周');
              }
            },
            {
              text: '最近一月',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              },
              onClick: (picker) => {
                this.$Message.info('您选择了最近一月');
              }
            },
            {
              text: '最近三月',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              },
              onClick: (picker) => {
                this.$Message.info('您选择了最近三月');
              }
            }
          ],
          disabledDate(date) {
            return date && date.valueOf() > Date.now() + 31536000;
          }
        },
        dataList: [{
          'title': '时间',
          'options': [{
              name: '全部',
              value: "0",
              showBadge: false
            },
            {
              name: '今天',
              value: "1",
              showBadge: false
            },
            {
              name: '昨天',
              value: "-1",
              showBadge: false
            },
            {
              name: '近7天',
              value: "-7",
              showBadge: false
            },
            {
              name: '近30天',
              value: "-30",
              showBadge: false
            },
            {
              name: '自定义',
              value: "2",
              showBadge: false
            },
          ],
          'value': '0'
        }, {
          'title': '支出',
          'options': [{
              name: '全部',
              value: "all",
              showBadge: false
            },
            {
              name: '活动',
              value: "positive",
              showBadge: false
            },
            {
              name: '补贴',
              value: "neutral",
              showBadge: false
            },
            {
              name: '其他',
              value: "negative",
              showBadge: false
            },
          ],
          'value': 'all'
        }, {
          'title': '部门',
          'options': [{
              name: '全部',
              value: "all",
              showBadge: true,
              count: 0
            },
            {
              name: '活动',
              value: "page",
              showBadge: true,
              count: 0
            },
            {
              name: '财务',
              value: "wechat",
              showBadge: true,
              count: 0
            },
            {
              name: '秘书',
              value: "weibo",
              showBadge: true,
              count: 0
            },
            {
              name: '助童',
              value: "newspaper",
              showBadge: true,
              count: 0
            },
            {
              name: '会长',
              value: "client",
              showBadge: true,
              count: 0
            },
            {
              name: '会员',
              value: "bbs",
              showBadge: true,
              count: 0
            },
          ],
          'value': 'all'
        }],
        showPicker: false,
      }
    },
    props: ['badgeData'],
    computed: {
      timeArr() {
        let start = new Date();
        let end = new Date();
        let value = this.dataList[0].value
        // console.log('this.dataValue', this.dataValue)
        switch (value) {
          case '0':
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            this.showPicker = false;
            break;
          case '1':
            end.setTime(start.getTime() + 3600 * 1000 * 24);
            this.showPicker = false;
            break;
          case '-1':
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            this.showPicker = false;
            break;
          case '-7':
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.showPicker = false;
            break;
          case '-30':
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            this.showPicker = false;
            break;
          case '2':
            this.showPicker = true;
            // console.log('2', this.dataValue)
            start = this.dataValue[0]
            end = this.dataValue[1]
            break;
        }
        if (typeof(end) == 'object') {
          start = formatDate(start, 'yyyy-MM-dd')
          end = formatDate(end, 'yyyy-MM-dd')
        }
        return [start, end]
      },
      selectValues() {
        let arr = Array.of(this.timeArr[0], this.timeArr[1])
        for (let data of this.dataList) {
          // console.log('1.data.value', data.value)
          arr.push(data.value)
        }
        // console.log('2.arr', arr)
        return arr
      },
      badgeDatas() {
        // console.log('badgeData', this.badgeData)
        if (this.badgeData != undefined) {
          this.dataList[2].options[0].count = this.badgeData.all
          this.dataList[2].options[1].count = this.badgeData.page
          this.dataList[2].options[2].count = this.badgeData.wechat
          this.dataList[2].options[3].count = this.badgeData.weibo
          this.dataList[2].options[4].count = this.badgeData.newspaper
          this.dataList[2].options[5].count = this.badgeData.client
          this.dataList[2].options[6].count = this.badgeData.bbs
        } else {
          return
        }
      }
    },
    methods: {
      sendValues() {
        // console.log('sendMsg', this.selectValues)
        this.$emit('ReceiveValues', this.selectValues)
      },
      handleChange(daterange) {
        this.dataValue = daterange;
      }
    },
    mounted() {
      this.sendValues()
    },
    updated() {
      // console.log("selectBox-updated")
      this.sendValues()
    }
  }
</script>

<style lang="stylus">
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
    top: -5px;
    left: 400px;
  }
}
.ivu-badge-count-alone {
  top: -5px;
  display: inline;
  background-color: #19be6b;
}
</style>

