<template>
  <div class="cbfxUser">
    <Row :gutter="16">
      <Col span="12" v-for="item in firstChartData" :key="item">
      <div class="title">{{item.title}}</div>
      <section class="panel log">
        <div class="panel-body">
          <div :id="item.id" style="width:100%;height: 350px;"></div>
        </div>
      </section>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col span="12" v-for="item in secondChartData" :key="item">
      <div class="title">{{item.title}}</div>
      <section class="panel log">
        <div class="panel-body">
          <div :id="item.id" style="width:100%;height: 350px;"></div>
        </div>
      </section>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstChartData: [{
        id: 'yqzs',
        title: '中国互联网用户规模'
      }, {
        id: 'mtfb',
        title: '中国互联网智库规模'
      }],
      secondChartData: [{
        id: 'hymt',
        title: '中国互联网投资'
      }, {
        id: 'tjrq',
        title: '中国互联网+指数'
      }],
      yqzsOption: {
        title: {
          text: '中国互联网用户规模(万)'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          boundaryGap: false,
          data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          startValue: '2010-01-01'
        }, {
          type: 'inside'
        }],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 15000,
            color: '#096'
          }, {
            gt: 15000,
            lte: 30000,
            color: '#ffde33'
          }, {
            gt: 30000,
            lte: 45000,
            color: '#ff9933'
          }, {
            gt: 45000,
            lte: 60000,
            color: '#cc0033'
          }, {
            gt: 60000,
            lte: 75000,
            color: '#660099'
          }, {
            gt: 75000,
            color: '#7e0023'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: '中国互联网规模(万)',
          type: 'line',
          data: ['30274', '35558', '41997', '50006', '55678', '61981', '69531', '75051'],
          markLine: {
            silent: true,
            data: [{
              yAxis: 15000
            }, {
              yAxis: 30000
            }, {
              yAxis: 45000
            }, {
              yAxis: 60000
            }, {
              yAxis: 75000
            }]
          }
        }

      },
      mtfbOption: {
        title: {
          text: "中国互联网智库规模",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
          x: 'left',
          data: ["中国互联网智库规模"]
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            name: "x",
            data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']
          }
        ],
        yAxis: [
          {
            name: "y"
          }
        ],
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: true
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
        series: [
          {
            name: "中国互联网智库规模",
            type: "line",
            data: ['173', '296', '356', '481', '549', '678', '741', '896'],

          }
        ]
      },
      hymtOption: {
        title: {
            text: '中国互联网投资(亿)',
            x: 'left'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['中国互联网投资'],
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
            data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              formatter: '{value} 亿'
            },
            textStyle: {
              fontSize: 1
            },
          }],
          series: [{
              name: '中国互联网投资',
              type: 'line',
              data: ['3022','3382','3616','3755','3993','4539','4915','5532']
            }
          ]
      },
      tjrqOption: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['中国互联网+指数']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['北京', '上海', '广州', '深圳', '重庆', '天津', '武汉', '南京', '杭州', '成都']
          }
        ],
        yAxis: [
          {
            type: 'value',
            max:'100'
          }
        ],
        series: [
          {
            name: '中国互联网+指数',
            type: 'bar',
            data: [92.0, 95.9, 91.0, 98.2, 85.6, 76.7, 82.6, 83.2, 89.6, 86.0],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      },
    }
  },
  mounted() {
    this.initChart()
    this.createChart()
  },
  methods: {
    initChart() {
      this.$echarts.init(document.getElementById('yqzs'));
      this.$echarts.init(document.getElementById('mtfb'));
      this.$echarts.init(document.getElementById('hymt'));
      this.$echarts.init(document.getElementById('tjrq'));
    },
    createChart() {
      let yqzs = this.$echarts.getInstanceByDom(document.getElementById('yqzs'));
      let mtfb = this.$echarts.getInstanceByDom(document.getElementById('mtfb'));
      let hymt = this.$echarts.getInstanceByDom(document.getElementById('hymt'));
      let tjrq = this.$echarts.getInstanceByDom(document.getElementById('tjrq'));
      yqzs.setOption(this.yqzsOption);
      mtfb.setOption(this.mtfbOption);
      hymt.setOption(this.hymtOption);
      tjrq.setOption(this.tjrqOption);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.cbfxUser {
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
