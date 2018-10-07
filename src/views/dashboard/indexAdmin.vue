<template>
  <div class="app">
    <div class="app-body">
      <!-- <Sidebar/> -->
      <div class="place-fix">
      <main class="main">
        <breadcrumb :list="list" />
        <div class="container-fluid">
          <div class="animated fadeIn">
  
            <div class="pane-count">
              <Card class="pane-count-table col-sm-6 col-md-2">
                <Icon type="ios-people-outline" class="pane-count-icon" />
                <div class="pane-count-position">132</div>
                <div class="pane-count-font">用户总量</div>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              </Card>
  
              <Card class="pane-count-table col-sm-6 col-md-2">
                <Icon type="ios-search-strong" class="pane-count-icon" />
                <div class="pane-count-position">11</div>
                <div class="pane-count-font">昨日注册</div>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              </Card>
  
              <Card class="pane-count-table col-sm-6 col-md-2">
                <Icon type="ios-chatboxes-outline" class="pane-count-icon" />
                <div class="pane-count-position">60%</div>
                <div class="pane-count-font">日均活跃度</div>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              </Card>
  
              <Card class="pane-count-table col-sm-6 col-md-2">
                <Icon type="ios-list-outline" class="pane-count-icon" />
                <div class="pane-count-position">35</div>
                <div class="pane-count-font">活动总数</div>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              </Card>
  
              <Card class="pane-count-table col-sm-6 col-md-2">
                <Icon type="ios-personadd-outline" class="pane-count-icon" />
                <div class="pane-count-position">2</div>
                <div class="pane-count-font">今日新增活动</div>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              </Card>
  
              <Card class="pane-count-table col-sm-6 col-md-2">
                <Icon type="social-twitch-outline" class="pane-count-icon" />
                <div class="pane-count-position">398</div>
                <div class="pane-count-font">评论信息</div>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              </Card>
  
            </div>
  
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <section class="panel">
                  <div class="panel-heading">
                    浏览量
                    <a href="javascript:;" class="pull-right panel-toggle">
                      <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div class="panel-body" style="height: 130px;">
                    <div class="">
                      <div style="float: left">
                        <h5>&nbsp;&nbsp;&nbsp;&nbsp;浏览量</h5>
                      </div>
                      <div style="float: right">
                        <span style="color: #17a084;">周&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        356
                      </div>
                    </div>
                    <br/>
                    <div>
                      <div style="float: left">
                        <h1 style="font-size: 22px;color: #1a1a1a" id="userview7"> </h1>
                      </div>
                      <div style="float: right;margin-top:25px">
                        <div id="userpercent">
                          <!-- <i class="fa fa-bolt"></i> -->
                        </div>
                        <small>总计浏览量&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</small>
                        6475
                      </div>
  
                    </div>
                  </div>
                </section>
              </div>
            </div>
  
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <section class="panel log">
                  <div class="panel-heading">
                    最近七天会员注册量
                    <a href="javascript:;" class="pull-right panel-toggle">
                      <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div class="panel-body">
                    <div id="myechart" style="width:513px;height: 350px;"></div>
                  </div>
                </section>
  
              </div>
  
              <div class="col-xs-12 col-md-6">
                <section class="panel">
                  <div class="panel-heading">
                    部门成员情况
                    <a href="javascript:;" class="pull-right panel-toggle">
                      <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div class="panel-body">
                    <div id="myecharts" style="width:513px; height: 350px;"></div>
                  </div>
                </section>
              </div>
            </div>
  
          </div>
          <router-view></router-view>
        </div>
      </main>
      </div>
      <!-- <AppAside/> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'navigation',
  components: {

  },
  computed: {
    name() {
      return this.$route.name
    },

    list() {
      return this.$route.matched
    }
  },
  mounted() {
    var mye = this.$echarts.init(document.getElementById('myechart'));
    this.dre();
    var myec = this.$echarts.init(document.getElementById('myecharts'));
    this.are();
  },
  methods: {
    dre() {
      var wChart = this.$echarts.getInstanceByDom(document.getElementById('myechart'));
      wChart.setOption({
        title: {
          // text: '最近七天会员注册量',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['注册量']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          data: ['2017-07-06', '', '2017-07-08', '', '2017-07-10', '', '2017-07-12']
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '注册量',
          type: 'bar',
          data: [2, 4, 7, 3, 5, 6, 15],
          markLine: {
            data: [{
              type: 'average',
              name: '平均值'
            }]
          }
        }
        ]
      });
    },
    are() {
      var wChart = this.$echarts.getInstanceByDom(document.getElementById('myecharts'));
      wChart.setOption({
        title: {
          text: '部门成员情况',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['活动部', '财务部', '秘书处']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 26, name: '活动部' },
              { value: 3, name: '财务部' },
              { value: 1, name: '秘书处' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
  }
}

</script>



<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/yuan.scss";

.place-fix{
  padding: 30px 0 40px 0;
}

.pane-count {
  margin-top: 25px;
  height: 175px;
}

.pane-count-table {
  height: 150px;
  background-color: #FFFFFF;
}

.pane-count-icon {
  font-size: 50px;
  color: #B0BEC5;
  float: right;
}

.pane-count-position {
  margin-top: 55px;
  font-size: 24px;
  color: #009688;
}

.pane-count-font {
  margin-left: 15px;
  font-size: 12px;
  color: #2D2D2D;
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
  float: right;
  margin-right: -20px;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
