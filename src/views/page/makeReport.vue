<template>
  <div class="make_report">
    <!-- <button @click="createChart">test</button> -->
    <!-- 舆情总览 -->
    <div class="yqzl">
      <h5>一、舆情总览</h5>
      <div class="text">
        根据智讯舆情监测系统，自{{wordData.startTime}}至{{wordData.endTime}}, 简报{{wordData.name}}方案下共监测到相关舆情信息{{'1677'}}条。 其中网页 {{'1677'}}篇，占比{{'100'}}；微信{{'0'}}篇，占比{{'0'}}； 论坛{{'0'}}篇， 占比 {{'0'}}； 微博{{'0'}}篇， 占比{{'0'}}； 报刊{{'0'}}篇，占比{{'0'}}；客户端{{'0'}} 篇，占比{{'0'}}。 而{{'网页'}}的比重最大，共有{{'1677'}}篇，达到信息总量的{{'100'}}
        。 目前主要的报道集中在“{{'ikanchai'}}”、“{{'腾讯科技'}}”、“{{'砍柴网'}}”等几大站点。 详细报告请继续浏览。
      </div>
    </div>
    <!-- 处置建议 -->
    <div class="czjy">
      <h5>二、 处置建议</h5>
      <div class="text">
        对于舆情信息中具有潜在危害的事件及情况应给予关注并积极处理，防止不良影响产生及扩散。 此外，密切关注此前敏感预警事件的发展情况，及时制定有效应对措施。鉴于监测结果中负 面舆情时有发生，应吸取相关经验教训，做好预防和处理工作。
      </div>
    </div>
    <!-- 舆情走势 -->
    <div class="yqzs">
      <h5>三、 舆情走势</h5>
      <div class="text">
        据下图可知，{{'网页'}}舆情信息热度波动最大，在{{'2017'}}达到波谷，在 {{'2017'}}达到波峰，{{'2017'}}达到次波峰。{{'微信'}}、{{'微博'}}、 {{'报刊'}}、{{'论坛'}}、{{'客户端'}}的舆情信息热度小于{{'网页'}}平台。
      </div>
      <div>
        <Row>
          <Col span="24" justify="center">
          <section class="panel log">
            <div class="panel-body">
              <div id="yqzs" style="width:500px;height:350px;"></div>
            </div>
          </section>
          </Col>
        </Row>
      </div>
    </div>
    <!-- 媒体分布 -->
    <div class="mtfb">
      <h5>四、 媒体分布</h5>
      <div class="text">
        据下图可知，{{'2017'}}至{{'2017'}}时间段内，{{'网页'}}舆情信息{{'1677'}} 条，占比{{'100'}}；{{'微信'}}舆情信息{{'0'}}条，占比{{'0'}}；{{'论坛'}} 舆情信息{{'0'}}条，占比{{'0'}}；{{'微博'}}舆情信息{{'0'}}条，占比{{'0'}}； {{'报刊'}}舆情信息{{'0'}}条，占比{{'0'}}；{{'客户端'}}舆情信息{{'0'}}条，占比 {{'0'}}。
      </div>
      <div>
        <Row>
          <Col span="24">
          <section class="panel log">
            <div class="panel-body">
              <div id="mtfb" style="width:500px;height: 350px;"></div>
            </div>
          </section>
          </Col>
        </Row>
      </div>
    </div>
    <!-- 情感属性 -->
    <div class="qgsx">
      <h5>五、 情感属性</h5>
      <div class="text">
        据下图可知，{{'2017'}}至{{'2017'}}，{{'负面'}}舆情信息{{'104'}}条， 占比{{'6'}}；{{'中性'}}舆情信息{{'380'}}条，占比{{'22'}}；{{'正面'}} 舆情信息{{'1191'}}条，占比{{'71'}}。
      </div>
      <div>
        <Row>
          <Col span="24">
          <section class="panel log">
            <div class="panel-body">
              <div id="qgsx" style="width:500px;height: 350px;"></div>
            </div>
          </section>
          </Col>
        </Row>
      </div>
    </div>
    <!-- 重要舆情 -->
    <div class="zyyq">
      <h5>六、 重要舆情(TOP10)</h5>
    </div>
    <!-- 敏感舆情 -->
    <div class="mgyq">
      <h5>七、 敏感舆情(TOP10)</h5>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  export default {
    data() {
      return {
        wordData: {},
        yqzsOption: {
          title: {
            text: '舆情走势',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            // data: tlegend,
            data: ['全部', '网页', '微信', '微博', '报刊', '客户端', '论坛'],
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
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: []
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              formatter: '{value} 条'
            },
            textStyle: {
              fontSize: 1
            },
          }],
          series: [{
              name: '全部',
              type: 'line',
              data: [],
            }, {
              name: '网页',
              type: 'line',
              data: [],
            },
            {
              name: '微信',
              type: 'line',
              data: [],
            },
            {
              name: '微博',
              type: 'line',
              data: [],
            },
            {
              name: '报刊',
              type: 'line',
              data: [],
            },
            {
              name: '客户端',
              type: 'line',
              data: [],
            },
            {
              name: '论坛',
              type: 'line',
              data: [],
            }
          ]
        },
        mtfbOption: {
          title: {
            text: '媒体分布',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            y: 'bottom',
            data: ['网页', '微信', '微博', '报刊', '客户端', '论坛'],
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
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: false,
          series: [{
            name: '媒体分布',
            type: 'pie',
            radius: [50, 80],
            x: '60%',
            width: '35%',
            funnelAlign: 'left',
            max: 1048,
            data: [{
                value: 0,
                name: '网页'
              },
              {
                value: 0,
                name: '微信'
              },
              {
                value: 0,
                name: '微博'
              },
              {
                value: 0,
                name: '报刊'
              },
              {
                value: 0,
                name: '客户端'
              },
              {
                value: 0,
                name: '论坛'
              }
            ]
          }]
        },
        qgsxOption: {
          title: {
            text: '情感属性',
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
            name: '情感属性',
            type: 'pie',
            radius: [50, 80],
            // for funnel
            x: '60%',
            width: '35%',
            funnelAlign: 'left',
            max: 1048,
            data: [{
                value: 0,
                name: '正面'
              },
              {
                value: 0,
                name: '中性'
              },
              {
                value: 0,
                name: '负面'
              }
            ]
          }]
        },
      }
    },
    props: ['reportData'],
    mounted() {
      // console.log('makeReport-M1', this.reportData)
      this.initChart()
      // this.createChart()
    },
    watch: {
      reportData(newVal, oldVal) {
        if (newVal != oldVal) {
          // console.log('reportData值发生改变', newVal)
          this.createChart()
        }
      }
    },
    methods: {
      initChart() {
        this.$echarts.init(document.getElementById('yqzs'));
        this.$echarts.init(document.getElementById('mtfb'));
        this.$echarts.init(document.getElementById('qgsx'));
      },
      createChart() {
        let yqzs = this.$echarts.getInstanceByDom(document.getElementById('yqzs'));
        let mtfb = this.$echarts.getInstanceByDom(document.getElementById('mtfb'));
        let qgsx = this.$echarts.getInstanceByDom(document.getElementById('qgsx'));
        if (this.reportData.opinionTrend !== undefined) {
          console.log('mC1', this.reportData)
          this.wordData = this.reportData.wordData
          // 舆情走势
          this.yqzsOption.xAxis[0].data = []
          this.yqzsOption.series[0].data = []
          this.yqzsOption.series[1].data = []
          this.yqzsOption.series[2].data = []
          this.yqzsOption.series[3].data = []
          this.yqzsOption.series[4].data = []
          this.yqzsOption.series[5].data = []
          this.yqzsOption.series[6].data = []
          for (let key in this.reportData.opinionTrend) {
            // x轴日期
            this.yqzsOption.xAxis[0].data.push(key)
            if (this.reportData.opinionTrend[key].all) {
              this.yqzsOption.series[0].data.push(this.reportData.opinionTrend[key].all)
            } else {
              this.yqzsOption.series[0].data.push(0)
            }
            if (this.reportData.opinionTrend[key].page) {
              this.yqzsOption.series[1].data.push(this.reportData.opinionTrend[key].page)
            } else {
              this.yqzsOption.series[1].data.push(0)
            }
            if (this.reportData.opinionTrend[key].wechat) {
              this.yqzsOption.series[2].data.push(this.reportData.opinionTrend[key].wechat)
            } else {
              this.yqzsOption.series[2].data.push(0)
            }
            if (this.reportData.opinionTrend[key].blog) {
              this.yqzsOption.series[3].data.push(this.reportData.opinionTrend[key].blog)
            } else {
              this.yqzsOption.series[3].data.push(0)
            }
            if (this.reportData.opinionTrend[key].newspaper) {
              this.yqzsOption.series[4].data.push(this.reportData.opinionTrend[key].newspaper)
            } else {
              this.yqzsOption.series[4].data.push(0)
            }
            if (this.reportData.opinionTrend[key].client) {
              this.yqzsOption.series[5].data.push(this.reportData.opinionTrend[key].client)
            } else {
              this.yqzsOption.series[5].data.push(0)
            }
            if (this.reportData.opinionTrend[key].bbs) {
              this.yqzsOption.series[6].data.push(this.reportData.opinionTrend[key].bbs)
            } else {
              this.yqzsOption.series[6].data.push(0)
            }
          }
          // 媒体分布
          this.mtfbOption.series[0].data[0].value = this.reportData.mediaDistribution.page
          this.mtfbOption.series[0].data[1].value = this.reportData.mediaDistribution.wechat
          this.mtfbOption.series[0].data[2].value = this.reportData.mediaDistribution.blog
          this.mtfbOption.series[0].data[3].value = this.reportData.mediaDistribution.newspaper
          this.mtfbOption.series[0].data[4].value = this.reportData.mediaDistribution.client
          this.mtfbOption.series[0].data[5].value = this.reportData.mediaDistribution.bbs
          // 情感属性
          this.qgsxOption.series[0].data[0].value = this.reportData.emotionalAttr.正面
          this.qgsxOption.series[0].data[1].value = this.reportData.emotionalAttr.中性
          this.qgsxOption.series[0].data[2].value = this.reportData.emotionalAttr.负面
          console.log('mC2', this.mtfbOption.series[0].data)
          yqzs.setOption(this.yqzsOption);
          mtfb.setOption(this.mtfbOption);
          qgsx.setOption(this.qgsxOption);
          // let img = new Image();
          // img.src = yqzs.getDataURL();
          // console.log('---', img)
          let bulletinId = this.reportData.bulletin[0].id
          let vm = this
          setTimeout(function() {
            let yqzsSrc = yqzs.getDataURL();
            let mtfbSrc = mtfb.getDataURL();
            let qgsxSrc = qgsx.getDataURL();
            let params = {
              "bulletinId": bulletinId,
              "username": Cookies.get('username'),
              "pic1": yqzsSrc,
              "pic2": mtfbSrc,
              "pic3": qgsxSrc
            }
            console.log('mC3', params)
            vm.$http({
              url: '/myinfo/writeword',
              method: 'post',
              data: params
            }).then(res => {
              // console.log('CWrit', res)
              if (res.data.code == '20000') {
                vm.$Message.info(res.data.message);
                vm.$emit('getInfo')
              } else {
                vm.$Message.info("创建失败,请重新创建");
              }
            }).catch(err => {
              console.log(err)
            })
            // alert("Hello");
          }, 1000);
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .make_report {
    padding: 10px 0 30px 0;
    margin-left: 2%;
    width: 96%;
    .panel-body div {
      width: 80%;
      margin-left: 10%;
    }
    .yqzl {
      // min-height: 200px;
      margin: 15px;
      overflow: hidden;
      color: #000000;
      background: #fff;
      border-radius: 4px;
      .text {
        margin: 15px;
        text-indent: 2em;
      }
    }
    .czjy {
      margin: 15px;
      overflow: hidden;
      color: #000000;
      background: #fff;
      border-radius: 4px;
      .text {
        margin: 15px;
        text-indent: 2em;
      }
    }
    .yqzs {
      margin: 15px;
      overflow: hidden;
      color: #000000;
      background: #fff;
      border-radius: 4px;
      .text {
        margin: 15px;
        text-indent: 2em;
      }
    }
    .mtfb {
      margin: 15px;
      overflow: hidden;
      color: #000000;
      background: #fff;
      border-radius: 4px;
      .text {
        margin: 15px;
        text-indent: 2em;
      }
    }
    .qgsx {
      margin: 15px;
      overflow: hidden;
      color: #000000;
      background: #fff;
      border-radius: 4px;
      .text {
        margin: 15px;
        text-indent: 2em;
      }
    }
    .zyyq {
      margin: 15px;
      overflow: hidden;
      color: #000000;
      background: #fff;
      border-radius: 4px;
    }
    .mgyq {
      margin: 15px;
      overflow: hidden;
      color: #000000;
      background: #fff;
      border-radius: 4px;
    }
  }
</style>

