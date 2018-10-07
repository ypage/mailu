<template>
  <div class="app-container">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in picSrc" :key="item">
          <!-- <h3>{{ item }}111</h3> -->
          <img :src="item"></img>
          <!-- <img src="./reportPic/01.jpg"></img> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div class="line"></div> -->
    <div class="content">
      <Row gutter="32">
        <Col span="16" class="artic">
        <div class="title">您可能感兴趣的内容: </div>
        <ul class="news">
          <li>
            <a href="javascript:;">
              <span>“银龄守望”项目敬老院活动报告.pdf</span>
              <em>2018-04-21</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>江西省儿童医院亲亲宝贝活动.pdf</span>
              <em>2018-04-21</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>百里健行活动.pdf</span>
              <em>2018-04-21</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>国际社工日现场.pdf</span>
              <em>2018-04-21</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>交通协管报告.pdf</span>
              <em>2018-04-21</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>快闪活动.pdf</span>
              <em>2018-04-21</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>志愿快递.pdf</span>
              <em>2018-04-21</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>江西财经大学麦庐义工协会宣讲会.pdf</span>
              <em>2018-04-21</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>动物领养活动.pdf</span>
              <em>2018-04-21</em>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>秋水广场捡垃圾活动.pdf</span>
              <em>2017-07-21</em>
            </a>
          </li>
        </ul>
        </Col>
        <Col span="8" class="hotpic">
        <!-- <div class="mainpic">
          <img src="./reportPic/05.jpg"></img>
        </div>
        <Row gutter="8">
          <Col span="12" class="leftpic"><img src="./reportPic/11.jpg"></img>
          </Col>
          <Col span="12" class="rightpic "><img src="./reportPic/12.jpg"></img>
          </Col>
        </Row> -->
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import Home1 from '../../../assets/images/home-ztzj.png'
import Home2 from '../../../assets/images/home-yxwh.png'
import Home3 from '../../../assets/images/home-bljx.jpg'
import Home4 from '../../../assets/images/home-qfkt.png'
import Home5 from '../../../assets/images/home-sp1.jpg'
import Home6 from '../../../assets/login.jpg'
  export default {
    data() {
      return {
        picSrc: [Home1, Home2, Home3, Home4, Home5, Home6],
        msg: 'this is testUser page11'
      }
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .app-container {
    padding: 60px 0 30px 0;
    margin-left: 2%;
    width: 96%;
    .carousel {
      .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 250px;
        margin: 0;
      }
      .el-carousel__item img {
        width: 100%;
        height: 100%;
      }
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }
      .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
      }
    }
    .line {
      height: 1px;
      margin: 0;
      background-color: #C1C1C1;
    }
  }
  .content {
    width: 100%;
    margin-top: 40px;
    .title {
      padding-bottom: 13px;
      border-bottom: 1px solid #c6c6c6;
      margin-bottom: 15px;
      font-size: 26px;
      line-height: 20px;
      color: #404040;
      font-weight: normal;
    }
    .news li span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      float: left;
      width: 80%;
      padding-right: 10px;
    }
    .mainpic img,.leftpic img,.rightpic img {
      border-radius: 1%;
      margin-bottom: 8px;
      width: 100%;
      height: 150px;
    }

  }
</style>
