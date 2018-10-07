<template>
  <div class="about-show">
    <a class="about-item">
      <div class="about-img">
        <div class='about-time'>
          <div v-for="year in years" :key="year" :class='year % 2 ===0 ? "foot-left" : "foot-right"' @click='trigger(year)'>
            <div class='foot'>
              <span class='year'>{{year}}</span>
            </div>
          </div>
        </div>
      </div>
      <h5>{{about.title}}</h5>
    </a>
  </div>
</template>

<style lang="scss">
.about-show {
  width: 100%;
  height: 305px;
  background-color: white;
  margin-bottom: 20px; // padding: 8px;//图片展示图片与边框之间的宽度
  text-align: center;

  .about-time {
    float: right;
    margin-right: 100px;
    padding-top: 35px;
    align-items: center!important;
    .foot {
      background-size: cover;
      background-image: url('../../../assets/foot.png');
      font-size: 14px;
      width: 20px;
      height: 40px;
      opacity: 0.5;
      color: black;
      &:hover {
        opacity: 1;
        cursor: pointer
      }
    }

    .foot-right {
      display: flex;
      justify-content: flex-end;
      width: 40px;
    }

    .foot-left {
      display: flex;
      justify-content: flex-start;
      width: 40px;
      div {
        background-position: 0% 0%;
      }
    }

    .foot-right div {
      background-position: 100% 0%;
    }

    .foot-left .year {
      right: 40px;
    }

    .foot-right .year {
      left: 25px;
    }

    .foot span {
      position: relative;
    }
  }

  a.about-item {
    width: 100%;
    height: 305px;
    display: block;
    z-index: 1;
  }

  h5 {
    color: black;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .about-img {
    height: 85%;
    overflow: hidden;
    transition: all 0.25s ease-out;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.25s ease-out;
      transform: scale(1.1);
      background-size: cover;
    }
  } // a.about-id {
  //   display: none;
  //   position: absolute;
  //   top: 8px;
  //   left: 22px;
  //   z-index: 99;
  //   color: gray;
  //   min-width: 100px;
  //   height: 30px;
  //   background-color: white;
  //   padding-top: 3px;
  //   i {
  //     padding-left: 4px;
  //     padding-right: 4px;
  //   }
  // }
  // a.about-id:hover span {
  //   color: #02a388;
  // }
  // .about-item:hover img {
  //   width: 90%;
  //   height: 94%;
  //   opacity: 0.8;
  // }
}

@media screen and (max-width: 420px) {
  .about-show {
    a.about-id:hover span {
      color: #02a388;
    }

    .about-item:hover img {
      width: 100%;
      height: 100%;
      opacity: 1;
    }
  }
}
</style>



<script>
import $ from 'jquery'

export default {
  props: ['about'],
  ready() {
    $('.about-show').mouseover(function() {
      $(this).children('a.about-id').show()
    }).mouseout(function() {
      $(this).children('a.about-id').hide()
    })
  },
  data() {
    return {
      years: [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006]
    }
  },
  methods: {
    trigger(year) {
      this.$emit('yearClick', year)
    }
  }
}
</script>
