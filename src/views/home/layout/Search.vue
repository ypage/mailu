<template>
  <div class="searchDiv">
    <section class="search">
      <div class="icon">
        <i class="fa fa-search fa-2x" v-on:click="startSearch"></i>
      </div>
      <div class="searchBar">
        <input
          type="text"
          v-model="input"
          :placeholder="placeholder">
        <i class="fa fa-times fa-2x"></i>
      </div>
      <div class="select">
        <div class="select-box">
          <span>{{choose}}<i class="fa fa-chevron-down"></i></span>
        </div>
      </div>
    </section>
    <section class="option">
      <ul class="show-item">
        <li class="hide">
          <a><i class="fa fa-check"></i>简介</a>
        </li>
        <li class="hide">
          <a><i class="fa fa-check"></i>活动</a>
        </li>
        <li class="hide">
          <a><i class="fa fa-check"></i>交流</a>
        </li>
        <li class="hide">
          <a><i class="fa fa-check"></i>会员</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss">
  .search {
    width: 800px;
    height: 40px;
    top: 190px;
    position: relative;
    background-color: #F2F2F2;
    margin: auto;
    overflow: hidden;
    transition: all 0.3s ease-out;
    opacity: 0.9;
    border-radius:5px;

    .icon {
      display: inline-block;
      width: 10%;
      height: 100%;
      position: relative;
      left: 5px;
      top: -15px;
      float: left;

      i {
        padding-left: 20%;
        padding-top: 20px;
        opacity: 0.8;
        cursor: pointer;
      }
    }
    .searchBar {
      display: inline-block;
      position: relative;
      width: 70%;
      height: 100%;
      top: 0;
      float: left;

      input {
        background-color: #F2F2F2;
        width: 90%;
        height: 100%;
        padding-top: 7px;
        border: 0;
        font-size: 20;//更多关于义协字体大小
        outline: inherit;
        z-index: 1;
      }

      i {
        position: relative;
        cursor: pointer;
        top: 5px;
        opacity: 0.8;
        display: none;
      }
    }

    .select {
      display: inline-block;
      position: relative;
      width: 20%;
      height: 100%;
      top: 5px;
      float: left;
      cursor: pointer;

      .select-box {
        margin-top: 0px;
        margin-bottom: 15px;
        height: 30px;
        border-left: 1px solid gray;
        padding-left: 30%;
        padding-top: 0px;
        font-size: 20px;

        i {
          padding-left: 10px;
        }
      }

      .select-box:hover i {
        color: #02a388;
      }

    }
  }

  .option {
    margin: auto;
    width: 800px;
    height: 0px;
    display: block;
    position: relative;
    top: 190px;
    transition: all 0.3s ease-out;
    opacity: 0.9;
    overflow: hidden;
    z-index: 9999;

    ul.show-item {
      width: 20%;
      height: 55%;
      margin-left: 80%;
      padding-left: 0;
      background-color: #F2F2F2;
      overflow: hidden;
      transition: all 0.5s ease-out;

      li {
        margin: auto;
        width: 90%;
        height: 30px;

         a {
           display: inline-block;
           width: 100%;
           height: 50px;
           font-size: 20px;
           padding-top: 5px;
           padding-left: 10%;
           color: black;
         }

         a:hover {
            color: #02a388;
         }

         i {
           padding-right: 10px;
           color: #02a388;
         }
      }
    }
  }

  @media screen and (max-width: 850px) {
    .searchDiv {
      -webkit-overflow-scrolling: touch;
      .search {
        width: 100%;
        height: 35px;
        top: 0;
        position: relative;
        background-color: white;
        margin: auto;
        overflow: hidden;
        transition: all 0.3s ease-out;
        opacity: 0.9;

        .icon {
          width: 10%;
          i {
            padding-top: 18px;
          }
        }

        .searchBar {
          width: 90%;
          input {
            font-size: 16px;
            padding-left: 15px;
          }

          i {
            position: relative;
            cursor: pointer;
            top: 0px;
            opacity: 0.8;
            display: none;
          }
        }

        .select {
          display: none;
        }
      }
      .option {
        display: none;
      }
    }
  }
  @media screen and (max-width: 440px) {
    .searchDiv {
      .search {
        .icon {
          width: 15%;
        }
        .searchBar {
          width: 85%;
          i {
            position: relative;
            cursor: pointer;
            top: -5px;
            opacity: 0.8;
            display: none;
          }

          .fa-times {
            float: right;
            font-size: 26px;
            margin-top: 10px;
            padding-right: 5px;
          }
        }
      }
    }
  }
</style>

<script>
  import $ from 'jquery'
  export default {
    data () {
      return {
        input: ''
      }
    },
    props: ['placeholder', 'choose'],
    watch: {
      input () {
        if (this.input.length > 0) {
          $('.searchBar i').show()
        } else {
          $('.searchBar i').hide()
        }
      },
      choose () {
        switch (this.choose) {
          case '图片':
            this.placeholder = 'hi ! 想找到什么图片'
            break
          case '表情包':
            this.placeholder = '搞笑的表情包给我来一打！！ ☺'
            break
          case '视频':
            this.placeholder = '搜什么视频呢 (*@ο@*) 哇～'
            break
          case '图标':
            this.placeholder = '什么图标呢  O(∩_∩)O~~'
            break
        }
      }
    },
    methods: {
      startSearch () {
        if (this.input !== '') {
          this.$router.push('/search?text=' + this.input)
        }
      }
    },
    mounted () {
      const that = this
      $('.searchBar input').focus(function () {
        $('.search').addClass('focus')
      }).blur(function () {
        $('.search').removeClass('focus')
      }).keydown(function (event) {
        if (event.keyCode === 13) {
          that.startSearch()
        }
      })

      $('.searchBar i').click(function () {
        that.input = ''
        $(this).hide()
      })

      // 右边的选择
      $('.select').click(function () {
        if ($('.option').height() > 0) {
          $('.option').height('0')
          $(this).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down')
        } else {
          $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up')
          $('.option').height('230px')
        }
      })

      $('.show-item>li').click(function () {
        $(this).removeClass('hide')
        .siblings().addClass('hide')
        $('.select').find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down')
        that.choose = $(this).children('a').text()
        $('.option').height('0')
      })

      // 默认选中
      var li = document.querySelectorAll('.show-item li a')
      for (var i = 0; i < li.length; i++) {
        if (li[i].text === that.choose) {
          li[i].parentNode.setAttribute('class', '')
        }
      }
    }
  }
</script>
