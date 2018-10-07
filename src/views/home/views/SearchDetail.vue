<template>
  <div>
    <Navbar></Navbar>
    <section class="page-content searchDetail">
      <Search :placeholder="placeholder" choose="简介"></Search>
      <div class="loading">
        <p class="loadingSearch">
          <i class="fa fa-repeat fa-3x" aria-hidden="true"></i>
        </p>
      </div>
      <About-List :imgs="imgs">
      </About-List>
    </section>
    <section class="search-more" v-show="searchMore">
      <a v-on:click="more">
        <i class="fa fa-spinner" aria-hidden="true"></i>点击加载更多...</a>
    </section>
    <foot></foot>
    <Top></Top>
  </div>
</template>

<style lang="scss">
section.searchDetail {
  .show-more {
    display: none;
  }
  .loading {
    position: relative;
    height: 200px;
    width: 400px;
    left: 53%;
    top: 30%;
    padding-top: 10px;
    margin-left: -200px;
    /*一半的高度*/
    font-size: 16px;
    text-align: center;

    .loadingSearch {
      margin-left: -50px;
      i {
        animation: search 0.3s infinite;
        padding: 5px;
        @keyframes search {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(180deg);
          }
          75% {
            transform: rotate(270deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
}

.search-more {
  width: 100%;
  background-color: #e8eded;
  padding-bottom: 20px;

  a {
    display: block;
    width: 180px;
    height: 30px;
    color: black;
    margin: auto;
    padding: 2px;
    padding-left: 15px;
    border: 1px solid black;
    border-radius: 5px;

    i {
      animation: start 0.5s infinite;
      padding: 5px;
      @keyframes start {
        0% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(90deg);
        }
        50% {
          transform: rotate(180deg);
        }
        75% {
          transform: rotate(270deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}

@media screen and (max-width: 420px) {
  section.searchDetail {
    .loading {
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>

<script>
// 导入模块
import Navbar from '../layout/Navbar'
import AboutList from '../layout/AboutList'
import Top from '../layout/Top'
import $ from 'jquery'
import Search from '../layout/Search'
import Foot from '../layout/Footer'

export default {
  data() {
    return {
      imgs: [],
      page: 1,
      searchMore: false,
      placeholder: '输入关键词搜索',
      url: 'https://pixabay.com/api/?key=2831718-1f9b7c1b490ec182487b38a60&lang=zh&image_type=photo&webformatURL=_320&q='
    }
  },
  components: {
    Navbar,
    AboutList,
    Top,
    Search,
    Foot
  },
  methods: {
    searching() {
      const that = this
      const search = [].concat(this.imgs)
      this.searchMore = false
      $.get(that.url + that.$route.query.text + '&page=' + that.page, function(data) {
        for (var i = 0; i < data.hits.length; i++) {
          search.push(data.hits[i])
        }
        if (search.length > 0) {
          that.imgs = search
          $('.loading').html('<span style="color:green;">成功</span> 关键词:' + that.$route.query.text)
          if (search.length >= 20 * that.page) {
            that.searchMore = true
          }
        } else {
          $('.loading').html('<span style="color:red;">失败</span> 关键词:' + that.$route.query.text)
        }
      })
    },
    more() {
      this.page += 1
      this.searching()
    }
  },
  route: {
    data() {
      this.imgs = []
      this.page = 1
      this.searching()
    }
  }
}
</script>
