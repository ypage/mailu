<!-- Updated on 2017-08-07 09:22:49 By fmain -->
<template>
  <div class="nrfxUser">
    <!-- 选择栏 -->
    <div class="selectbox">
      <select-box @ReceiveValues="ReceiveValues"></select-box>
    </div>
    <!-- <button @click="getInfo">test</button> -->
    <div class="clear_float"></div>
    <div class="line"></div>
    <Row :gutter="16">
      <Col span="16">
      <!-- 重要舆情 -->
      <div class="zyyq">
        <div class="title">财务信息</div>
        <Table :columns="zyyqOption.zyyqTitle" :data="zyyqOption.zyyqData" :show-header="false" :border="true" size="small"></Table>
      </div>
      </Col>
      <Col span="8">
      <!-- 情感属性 -->
      <div class="title">主要流水</div>
      <section class="panel log">
        <div class="panel-body">
          <div id="qgsx" style="width:100%;height: 372px;"></div>
        </div>
      </section>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col span="16">
      <!-- 情感走势 -->
      <div class="title">收支走势</div>
      <section class="panel log">
        <div class="panel-body">
          <div id="qgzs" style="width:100%;height: 350px;"></div>
        </div>
      </section>
      </Col>
      <Col span="8">
      <!-- 文章类型 -->
      <div class="title">支出类型</div>
      <section class="panel log">
        <div class="panel-body">
          <div id="wzlx" style="width:100%;height: 350px;"></div>
        </div>
      </section>
      </Col>
    </Row>
  </div>
</template>

<script>
  import selectBox from 'components/SelectBox/selectBox'
  export default {
    components: {
      selectBox
    },
    data() {
      return {
        selectValues: null,
        zyyqOption: {
          zyyqTitle: [{
              title: '标题',
              // align: 'center',
              key: 'title',
              //设置传回数据中链接
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
              title: 'similarNum',
              key: 'similarNum',
              // align: 'center',
              width: "35%",
              // render: (h, params) => {
              //   return h('div', '相似文章' + params.row.similarNum + '条');
              // }
            }
          ],
          zyyqData: [
          {
            title:'[2018-01-01]银龄守望”项目敬老院活动',
            similarNum:'35'
          },
          {
            title:'[2018-01-02]>江西省儿童医院亲亲宝贝活动',
            similarNum:'20'
          },
          {
            title:'[2018-01-03]百里健行活动',
            similarNum:'67'
          },
          {
            title:'[2018-01-04]国际社工日现场',
            similarNum:'82'
          },
          {
            title:'[2018-01-05]交通协管报告',
            similarNum:'22'
          },
          {
            title:'[2018-01-06]快闪活动',
            similarNum:'70'
          },
          {
            title:'[2018-01-07]志愿快递',
            similarNum:'104'
          },
          {
            title:'[2018-01-08]江西财经大学麦庐义工协会宣讲会',
            similarNum:'160'
          },
          ]
        },
        qgsxOption: {
          title: {
            text: '主要流水',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            y: 'bottom',
            data: ['正面', '中性', '负面']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {
                show: true
              },
              dataView: {
                show: true,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: false,
          series: [{
            name: '主要流水',
            type: 'pie',
            radius: [50, 80],
            // for funnel
            x: '60%',
            width: '35%',
            funnelAlign: 'left',
            max: 1048,
            data: [{
                value: 46,
                name: '报销'
              },
              {
                value: 132,
                name: '活动'
              },
              {
                value: 56,
                name: '其他'
              }
            ]
          }]
        },
        qgzsOption: {
          title: {
            text: '收支走势',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['报销', '活动', '其他'],
            y: 'bottom'
          },
          toolbox: {
            show: true,
            feature: {
              mark: {
                show: true
              },
              dataView: {
                show: true,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['line', 'bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['2018-5-1','2018-5-2','2018-5-3','2018-5-4','2018-5-5','2018-5-6','2018-5-7']
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              formatter: '{value} 条'
            },
            textStyle: {
              fontSize: 1
            },
            //data : tData_property[0].data+tData_property[1].data+tData_property[2].data
          }],
          series: [{
              name: '报销',
              type: 'line',
              data: ['23','12','0','45','0','0','66'],
            },
            {
              name: '活动',
              type: 'line',
              data: ['0','22','0','0','34','55','16'],
            },
            {
              name: '其他',
              type: 'line',
              data: ['20','0','10','5','20','0','42'],
            }
          ]
        },
        wzlxOption: {
          title: {
            text: '支出类型',
            x: 'center'
          },
          legend: {
            // x: 'center',
          },
          tooltip: {
            trigger: 'axis'
          },
          polar: [{
            indicator: [{
                text: '科技',
                min: 0
              },
              {
                text: '金融',
                min: 0
              },
              {
                text: '政治',
                min: 0
              },
              {
                text: '娱乐',
                min: 0
              },
              {
                text: '教育',
                min: 0
              },
              {
                text: '文化',
                min: 0
              },
              {
                text: '军事',
                min: 0
              },
              {
                text: '体育',
                min: 0
              },
              {
                text: '法律',
                min: 0
              }
            ],
            radius: 70
          }],
          calculable: true,
          series: [{
            name: '深圳 vs 全国',
            type: 'radar',
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                }
              }
            },
            data: [{
              value: []
            }]
          }]
        }
      }
    },
    mounted() {
      this.initChart()
      this.createChart()
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
      ReceiveValues(data) {
        this.selectValues = data;
      },
      initChart() {
        // 基于准备好的dom，初始化echarts实例
        this.$echarts.init(document.getElementById('qgsx'));
        this.$echarts.init(document.getElementById('qgzs'));
        this.$echarts.init(document.getElementById('wzlx'));
      },
      createChart() {
        // 使用刚指定的配置项和数据显示图表。
        let qgsx = this.$echarts.getInstanceByDom(document.getElementById('qgsx'));
        let qgzs = this.$echarts.getInstanceByDom(document.getElementById('qgzs'));
        let wzlx = this.$echarts.getInstanceByDom(document.getElementById('wzlx'));
        qgsx.setOption(this.qgsxOption);
        qgzs.setOption(this.qgzsOption);
        wzlx.setOption(this.wzlxOption);
      },
      getInfo() {
        let params = {
          "start": this.selectValues[0],
          "end": this.selectValues[1],
          "media": this.selectValues[4],
          "user.username": this.$store.getters.name,
          // "user.id": 40
          "user.id": this.$store.getters.id
        }
        // console.log("1.params", params)
        this.$http({
          url: '/mycontent/contentanalysis',
          method: 'post',
          data: params
        }).then(res => {
          // console.log("2.res", res.data)
          // 重要舆情
          this.zyyqOption.zyyqData = res.data.importantEvent
          // 情感属性
          this.qgsxOption.series[0].data[0].value = res.data.emotionalAttr.正面
          this.qgsxOption.series[0].data[1].value = res.data.emotionalAttr.中性
          this.qgsxOption.series[0].data[2].value = res.data.emotionalAttr.负面
          // 情感走势
          this.qgzsOption.xAxis[0].data = []
          this.qgzsOption.series[0].data = []
          this.qgzsOption.series[1].data = []
          this.qgzsOption.series[2].data = []
          for (let key in res.data.emotionalTrend) {
            // x轴日期
            this.qgzsOption.xAxis[0].data.push(key)
            if (res.data.emotionalTrend[key].正面) {
              this.qgzsOption.series[0].data.push(res.data.emotionalTrend[key].正面)
            } else {
              this.qgzsOption.series[0].data.push(0)
            }
            if (res.data.emotionalTrend[key].中性) {
              this.qgzsOption.series[1].data.push(res.data.emotionalTrend[key].中性)
            } else {
              this.qgzsOption.series[1].data.push(0)
            }
            if (res.data.emotionalTrend[key].负面) {
              this.qgzsOption.series[2].data.push(res.data.emotionalTrend[key].负面)
            } else {
              this.qgzsOption.series[2].data.push(0)
            }
          }
          // 文章类型
          this.wzlxOption.series[0].data[0].value = []
          for (let key in res.data.articleType) {
            this.wzlxOption.series[0].data[0].value.push(res.data.articleType[key])
          }
          this.createChart()
        }).catch(err => console.log(err))
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .nrfxUser {
    padding: 40px 0 30px 0;
    margin-left: 2%;
    width: 96%;
    .line {
      width: 100%;
      height: 2px;
      margin: 15px 0 15px 0;
      background-color: #C1C1C1;
    }
    .title {
      height: 38px;
      line-height: 38px;
      text-align: left;
      padding-left: 5%;
      font-size: 12px;
      font-weight: bold;
      color: #495060;
      background-color: #fff;
      border: 1px solid #dddee1;
    }
  }
</style>